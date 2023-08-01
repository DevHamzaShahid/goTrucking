import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers/rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const middlewareList = [logger, thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user',],
  blacklist: [],
  timeout: null,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewareList),
);

export const persistedStore = persistStore(store);
