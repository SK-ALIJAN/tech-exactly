import { useState, useCallback } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import supabase from '../services/supabase/supabase';
import { Session, User } from '@supabase/supabase-js';
// Configure Google Sign-In (call this once in your App.tsx or index.tsx)
export const configureGoogleSignIn = () => {
    GoogleSignin.configure({
        webClientId: '465040400659-s51t5d7360veurfhitd37uc18jknqidv.apps.googleusercontent.com', // From Firebase Console
        iosClientId: '465040400659-h4tuh0i81dubt1ta4qckri6tbrdkse3o.apps.googleusercontent.com', // Optional, for iOS
        // offlineAccess: true,
        scopes: ['profile', 'email'],
    });
};

interface GoogleSignInState {
    loading: boolean;
    error: string | null;
    user: User | null;
    session: Session | null;
}

export interface GoogleSupaUserData {
    user: User;
    session: Session;
    email: string;
    fullName: string | null;
    avatarUrl: string | null;
    userId: string;
}

interface GoogleSignInReturn extends GoogleSignInState {
    signInWithGoogle: () => Promise<GoogleSupaUserData | null>;
    signOut: () => Promise<void>;
    checkIfSignedIn: () => Promise<boolean>;
    getCurrentUser: () => Promise<User | null>;
}

export const useGoogleSignIn = (): GoogleSignInReturn => {
    const [state, setState] = useState<GoogleSignInState>({
        loading: false,
        error: null,
        user: null,
        session: null,
    });

    // Sign in with Google
    const signInWithGoogle = useCallback(async (): Promise<GoogleSupaUserData | null> => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            // 1. Check if Google Play Services are available
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });

            const userInfo = await GoogleSignin.signIn();

            console.log('Google Sign-In response:', JSON.stringify(userInfo, null, 2));

            // 2.5 Check if sign-in was cancelled (user pressed back) — handle silently
            if (userInfo?.type === 'cancelled') {
                console.log('Google Sign-In cancelled by user');
                setState(prev => ({ ...prev, loading: false }));
                return null;
            }

            // 3. Get ID token
            let idToken = userInfo?.data?.idToken;

            // Fallback: try getTokens() if idToken is null
            if (!idToken) {
                console.log('⚠️ idToken not in signIn response, trying getTokens()...');
                try {
                    const tokens = await GoogleSignin.getTokens();
                    idToken = tokens.idToken;
                    console.log('getTokens() idToken:', idToken ? 'received' : 'null');
                } catch (tokenError) {
                    console.error('getTokens() failed:', tokenError);
                }
            }

            if (!idToken) {
                throw new Error('No ID token returned from Google Sign-In. Please verify: 1) webClientId is a "Web application" type OAuth client, 2) google-services.json is in android/app/, 3) SHA-1 fingerprint is registered in Firebase/Google Cloud Console.');
            }

            // 4. Sign in to Supabase with Google ID token
            const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: idToken,
            });

            console.log("Supabase data>>>", data)
            console.log("Supabase error>>>", error)
            if (error) {
                throw error;
            }

            if (!data.user || !data.session) {
                throw new Error('No user or session returned from Supabase');
            }

            console.log('Supabase authentication successful:', data.user);

            setState({
                loading: false,
                error: null,
                user: data.user,
                session: data.session,
            });

            // Return formatted user data
            const userData: GoogleSupaUserData = {
                user: data.user,
                session: data.session,
                email: data.user.email || '',
                fullName: data.user.user_metadata?.full_name || null,
                avatarUrl: data.user.user_metadata?.avatar_url || null,
                userId: data.user.id,
            };

            return userData;
        } catch (error: any) {
            console.error('Google Sign-In Error:', error);

            let errorMessage = 'Failed to sign in with Google';

            if (error.code === 'SIGN_IN_CANCELLED') {
                errorMessage = 'Sign-in was cancelled';
            } else if (error.code === 'IN_PROGRESS') {
                errorMessage = 'Sign-in is already in progress';
            } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
                errorMessage = 'Google Play Services not available';
            } else if (error.message) {
                errorMessage = error.message;
            }

            setState(prev => ({
                ...prev,
                loading: false,
                error: errorMessage,
            }));

            return null;
        }
    }, []);

    // Sign out
    const signOut = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            // 1. Sign out from Google
            await GoogleSignin.signOut();

            // 2. Sign out from Supabase
            const { error } = await supabase.auth.signOut();

            if (error) {
                throw error;
            }

            setState({
                loading: false,
                error: null,
                user: null,
                session: null,
            });

            console.log('Sign-out successful');
        } catch (error: any) {
            console.error('Sign-out Error:', error);

            setState(prev => ({
                ...prev,
                loading: false,
                error: error.message || 'Failed to sign out',
            }));
        }
    }, []);

    // Check if user is already signed in
    const checkIfSignedIn = useCallback(async (): Promise<boolean> => {
        try {
            const isSignedIn = await GoogleSignin.hasPreviousSignIn();

            if (isSignedIn) {
                // Get current Supabase session
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
                    setState(prev => ({
                        ...prev,
                        user: session.user,
                        session: session,
                    }));
                    return true;
                }
            }

            return false;
        } catch (error: any) {
            console.error('Check sign-in status error:', error);
            return false;
        }
    }, []);

    // Get current user
    const getCurrentUser = useCallback(async (): Promise<User | null> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                setState(prev => ({ ...prev, user }));
            }

            return user;
        } catch (error: any) {
            console.error('Get current user error:', error);
            return null;
        }
    }, []);

    return {
        ...state,
        signInWithGoogle,
        signOut,
        checkIfSignedIn,
        getCurrentUser,
    };
};