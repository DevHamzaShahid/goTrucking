import React, { useEffect, useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { persistedStore, store } from './App/redux/store';
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import Index from './App/screens/auth';
import { MyStack } from './App/navigations';
import { MyTabs } from './App/navigations/BottomTabs'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { AuthStack } from './App/navigations/AuthStack';
import RootNavigator from './App/navigations/RootNavigator'
const App = () => {
 
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <NavigationContainer>
          <RootNavigator/>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
