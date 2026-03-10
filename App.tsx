import React from 'react';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import QueryClientProviderWrapper from './src/services/tanstackQuery/QueryClientProviderWrapper';
import { NavigationContainers } from './src/navigation/NavigationContainers';
import { StatusBar } from 'react-native';
import { toastConfig } from './src/utils/toastConfig';
import Toast from 'react-native-toast-message';
import { createNavigationContainerRef } from '@react-navigation/native';
import { Screens } from './src/types';
import { useAuthSessionManager } from './src/hooks/useAuthSessionManager';

export const navigationRef = createNavigationContainerRef();

export const resetToSignIn = () => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: Screens.SignIn }],
    });
  } else {
    setTimeout(() => {
      if (navigationRef.isReady()) {
        navigationRef.reset({
          index: 0,
          routes: [{ name: Screens.SignIn }],
        });
      }
    }, 500);
  }
};

const AuthSessionManager = () => {
  useAuthSessionManager();
  return null;
};

function App(): React.JSX.Element {
  return (
    <QueryClientProviderWrapper>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SheetProvider>
          <>
            <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />
            <NavigationContainers />
            <AuthSessionManager />
            <Toast config={toastConfig} />
          </>
        </SheetProvider>
      </GestureHandlerRootView>
    </QueryClientProviderWrapper>
  );
}

export default App;
