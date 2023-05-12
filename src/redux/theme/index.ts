/* eslint-disable no-param-reassign */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unneeded-ternary */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkTheme: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeThemeToggle: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { changeThemeToggle } = themeSlice.actions;

export default themeSlice.reducer;
