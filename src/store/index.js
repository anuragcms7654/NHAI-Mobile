import { combineReducers, configureStore } from '@reduxjs/toolkit';
import EnquirySlice from './slices/EnquirySlice';
import AuthSlice from './slices/AuthSlice';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {encryptTransform} from '../config/encryption'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [encryptTransform]
};

const appReducer = combineReducers({
  enquiry: EnquirySlice,
  auth: AuthSlice,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const _store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  }
});

// sagaMiddleware.run(rootSaga);
export const _persistorStore = persistStore(_store);
export default _store;
