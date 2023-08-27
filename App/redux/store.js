import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducerWithReset from './reducers/resetReduxState';
// import storage from 'redux-persist/lib/storage'
const middlewareList = [logger, thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userToken','getdirectionLine'], //Put those reducers here you for which want to persist the data
  // whitelist: ['userToken'], //Put those reducers here you for which want to persist the data
  blacklist: [],
  timeout: null,
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const persistedReducer = persistReducer(persistConfig, rootReducerWithReset);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewareList),
);

export const persistedStore = persistStore(store);
