import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import reducers from './reducers';
import middlewares from './middlewares';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['values'],
  //   whitelist: ['values'], // only navigation will be persist
};

const pReducer = persistReducer(persistConfig, reducers);

const store = createStore(pReducer, applyMiddleware(...middlewares));

const persister = persistStore(store);

export {store, persister};
