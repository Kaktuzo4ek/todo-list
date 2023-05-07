/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import tasksReducer from './tasks';
import widgetsReducer from './widgets';
import { authReducer } from './auth';
import themeReducer from './theme';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    widgets: widgetsReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
