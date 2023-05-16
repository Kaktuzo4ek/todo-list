import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import tasksReducer from './tasks';
import { authReducer } from './auth';
import themeReducer from './theme';
import dogReducer from './widgets/dog';
import ipReducer from './widgets/ip';
import activityReducer from './widgets/activity';
import factReducer from './widgets/fact';
import weatherReducer from './widgets/weather';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    theme: themeReducer,
    dog: dogReducer,
    ip: ipReducer,
    activity: activityReducer,
    fact: factReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
