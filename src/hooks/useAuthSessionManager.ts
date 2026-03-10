// src/hooks/useAuthSessionManager.ts
import { useEffect, useRef, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import supabase from '../services/supabase/supabase';
import { resetToSignIn } from '../../App';

// ✅ Global flag to track intentional logout
let isIntentionalLogout = false;

export const setIntentionalLogout = (value: boolean) => {
    console.log('🔐 Setting intentional logout:', value);
    isIntentionalLogout = value;
};

// Helper to refresh session
const refreshSession = async (): Promise<boolean> => {
    try {
        // ✅ First check if a session with a refresh token actually exists
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (!currentSession?.refresh_token) {
            console.log('⚠️ No refresh token available, skipping refresh');
            return false;
        }

        const { data, error } = await supabase.auth.refreshSession();
        if (error) {
            console.log('⚠️ Refresh failed:', error.message);
            return false;
        }
        return !!data.session;
    } catch (error) {
        return false;
    }
};

// Helper to check if session is valid
const isSessionValid = async (): Promise<boolean> => {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
            return false;
        }

        // ✅ No refresh token means session can't be refreshed
        if (!session.refresh_token) {
            return false;
        }

        const expiresAt = session.expires_at;
        if (expiresAt) {
            const now = Math.floor(Date.now() / 1000);
            const isExpired = expiresAt <= now;
            const isAboutToExpire = expiresAt - now < 60;

            if (isExpired || isAboutToExpire) {
                return await refreshSession();
            }
        }

        return true;
    } catch (error) {
        return false;
    }
};

export const useAuthSessionManager = () => {
    const hasRedirected = useRef(false);
    const appState = useRef(AppState.currentState);

    const handleSessionExpired = useCallback(() => {
        if (hasRedirected.current || isIntentionalLogout) {
            return;
        }

        hasRedirected.current = true;
        resetToSignIn();
    }, []);

    const validateAndRefreshSession = useCallback(async () => {
        if (isIntentionalLogout) return;

        try {
            const { data: { session } } = await supabase.auth.getSession();
            // ✅ Don't attempt refresh if no session or no refresh token
            if (!session || !session.refresh_token) return;

            const isValid = await isSessionValid();
            if (!isValid) {
                const refreshed = await refreshSession();
                if (!refreshed) {
                    handleSessionExpired();
                }
            }
        } catch (error) {
            console.error('Error validating session:', error);
        }
    }, [handleSessionExpired]);

    // App state listener
    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            async (nextAppState: AppStateStatus) => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === 'active' &&
                    !isIntentionalLogout
                ) {
                    await validateAndRefreshSession();
                }
                appState.current = nextAppState;
            }
        );
        return () => subscription.remove();
    }, [validateAndRefreshSession]);

    // Auth state listener
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event) => {
                console.log('🔔 Auth event:', event, '| Intentional:', isIntentionalLogout);

                switch (event) {
                    case 'TOKEN_REFRESHED':
                        hasRedirected.current = false;
                        isIntentionalLogout = false;
                        break;

                    case 'SIGNED_OUT':
                        if (isIntentionalLogout) {
                            setTimeout(() => {
                                isIntentionalLogout = false;
                                hasRedirected.current = false;
                            }, 1000);
                            return;
                        }
                        handleSessionExpired();
                        break;

                    case 'SIGNED_IN':
                        hasRedirected.current = false;
                        isIntentionalLogout = false;
                        break;
                }
            }
        );
        return () => subscription.unsubscribe();
    }, [handleSessionExpired]);

    useEffect(() => {
        if (!isIntentionalLogout) {
            validateAndRefreshSession();
        }
    }, [validateAndRefreshSession]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isIntentionalLogout) {
                validateAndRefreshSession();
            }
        }, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [validateAndRefreshSession]);

    return { validateAndRefreshSession };
};