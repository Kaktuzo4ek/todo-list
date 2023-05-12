/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
}

export interface UserState {
  user: User;
}

const initialState: UserState = {
  user: window.localStorage.getItem('user')
    ? JSON.parse(window.localStorage.getItem('user') as string)
    : { name: '' },
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { name: '' };
    },
  },
});

export const selectIsAuth = (state: UserState): boolean =>
  Boolean(state.user.name !== '');

export const authReducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;
