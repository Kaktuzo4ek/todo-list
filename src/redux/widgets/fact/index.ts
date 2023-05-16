import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Fact {
  fact: string;
}

export interface FactState {
  data: Fact;
}

const initialState: FactState = {
  data: { fact: '' },
};

export const fetchFactWidget = createAsyncThunk(
  'factWidget/fetchFactWidget',
  async () => {
    const { data } = await axios.get('https://catfact.ninja/fact');
    return data;
  },
);

export const factSlice = createSlice({
  name: 'fact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFactWidget.pending, (state) => {
      state.data = { fact: '' };
    });
    builder.addCase(fetchFactWidget.fulfilled, (state, action) => {
      state.data.fact = action.payload.fact;
    });
    builder.addCase(fetchFactWidget.rejected, (state) => {
      state.data = { fact: '' };
    });
  },
});

export default factSlice.reducer;
