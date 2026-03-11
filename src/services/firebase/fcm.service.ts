import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }

  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission granted for Android 13+');
    }
  }

  return enabled;
}

export const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log("FCM Token:", token);
      return token;
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
};

export const setupFCMListener = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        // You can add your local notification library here if you want to show
        // banner while app is in foreground.
    });
    return unsubscribe;
}
