import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { userLoginAction } from './App/redux/actions/auth';
import { persistedStore, store } from './App/redux/store';
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import Index from './App/screens/auth';
import { MyStack } from './App/navigations';
import {MyTabs} from './App/navigations/BottomTabs'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistedStore}>
      <NavigationContainer>
        {/* <MyStack /> */}
        <MyTabs />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
