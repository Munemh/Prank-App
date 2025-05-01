'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import themeSlice from './slices/themeSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
  mode: themeSlice,
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  // devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
