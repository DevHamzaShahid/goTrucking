import React, { useEffect, useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { persistedStore, store } from './App/redux/store';
import { ActivityIndicator, NativeModules, SafeAreaView, Text, NativeEventEmitter, TouchableOpacity, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import Index from './App/screens/auth';
import { MyStack } from './App/navigations';
import { MyTabs } from './App/navigations/BottomTabs'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { AuthStack } from './App/navigations/AuthStack';
import RootNavigator from './App/navigations/RootNavigator'
import messaging from '@react-native-firebase/messaging'
import { checkNotifications } from 'react-native-permissions';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { getFCMToken } from './App/helper';
import { Axios } from './App/utils/AxiosInstance';
import { config } from './App/config';
import InAppNotification from './App/components/InAppNotification'
const App = () => {
  const [notification, setNotification] = useState(null);
  const [notificationKey, setNotificationKey] = useState(0);
  const truckingState = store.getState(state => state);
  const { token } = truckingState?.userToken

  const { CustomModule } = NativeModules;


  useEffect(() => {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });


    messaging().onMessage(remoteMessage => {
      setNotification(remoteMessage.notification);
      // Increment the notification key to trigger a re-render
      setNotificationKey(prevKey => prevKey + 1);
    });
  }, []);

  const closeNotification = () => {
    setNotification(null);
  };

  useEffect(() => {

    // Get your token and userId
    const token = 'yourTokenHere>>>token';
    const userId = 'yourUserIdHere>>>>userid';

    // Call the native method with token and userId
    CustomModule.setToken(token, userId);
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <NavigationContainer>
          <RootNavigator />
          {/* notiifcation all over the screens */}
          {token && <InAppNotification
            key={notificationKey} // Add this
            isVisible={notification !== null}
            notification={notification || { title: '', body: '' }}
            onClose={closeNotification}
          />}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
