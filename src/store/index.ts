import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { offlineNotesMiddleware } from './middlewares/offlineNotesMiddleware';
import { offlineQueueReducer } from './slices/offlineQueue';
import { notesReducer } from './slices/notes';
import { notesApi } from './api';

const rootReducer = combineReducers({
  notes: notesReducer,
  offlineQueue: offlineQueueReducer,
  [notesApi.reducerPath]: notesApi.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['notes', 'offlineQueue'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(notesApi.middleware)
      .concat(offlineNotesMiddleware),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devToolsEnhancer()),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
