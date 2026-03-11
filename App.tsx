import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import QueryClientProviderWrapper from './src/services/tanstackQuery/QueryClientProviderWrapper';

import { StatusBar } from 'react-native';
import { toastConfig } from './src/utils/toastConfig';
import Toast from 'react-native-toast-message';
import { createNavigationContainerRef } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { requestUserPermission, getFCMToken, setupFCMListener } from './src/services/firebase/fcm.service';

export const navigationRef = createNavigationContainerRef();




function App(): React.JSX.Element {
  useEffect(() => {
    // Request permission and get token
    const setupFCM = async () => {
      const hasPermission = await requestUserPermission();
      if (hasPermission) {
        await getFCMToken();
      }
    };
    setupFCM();

    // Setup foreground listener
    const unsubscribe = setupFCMListener();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <QueryClientProviderWrapper>
      <GestureHandlerRootView style={{ flex: 1 }}>
        
          <>
            <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />
             <RootNavigator/>
            <Toast config={toastConfig} />
          </>
       
      </GestureHandlerRootView>
    </QueryClientProviderWrapper>
  );
}

export default App;
