import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Dog {
  imageUrl: string;
}

export interface DogState {
  data: Dog;
}

const initialState: DogState = {
  data: { imageUrl: '' },
};

export const fetchDogWidget = createAsyncThunk(
  'dogWidget/fetchDogWidget',
  async () => {
    const { data } = await axios.get('https://dog.ceo/api/breeds/image/random');
    return data;
  },
);

export const dogSlice = createSlice({
  name: 'dog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDogWidget.pending, (state) => {
      state.data.imageUrl = '';
    });
    builder.addCase(fetchDogWidget.fulfilled, (state, action) => {
      state.data.imageUrl = action.payload.message;
    });
    builder.addCase(fetchDogWidget.rejected, (state) => {
      state.data.imageUrl = '';
    });
  },
});

export default dogSlice.reducer;
