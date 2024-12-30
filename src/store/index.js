import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
import { persistStore, persistReducer } from 'redux-persist';
import { api as baseApi } from './apiQuery/api'
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // transforms: [encryptTransform]
};

const appReducer = combineReducers({
  auth: AuthSlice,
  [baseApi.reducerPath]: baseApi.reducer
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
    }).concat(baseApi.middleware);
  }
});

// sagaMiddleware.run(rootSaga);
export const _persistorStore = persistStore(_store);
export default _store;
