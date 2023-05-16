import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Activity {
  activity: string;
  accessibility: number;
  type: string;
  price: number;
}

export interface ActivityState {
  data: Activity;
}

const initialState: ActivityState = {
  data: {
    activity: '',
    accessibility: 0,
    type: '',
    price: 0,
  },
};

export const fetchActivityWidget = createAsyncThunk(
  'activityWidget/fetchActivityWidget',
  async () => {
    const { data } = await axios.get('https://www.boredapi.com/api/activity');
    return data;
  },
);

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActivityWidget.pending, (state) => {
      state.data = {
        activity: '',
        accessibility: 0,
        type: '',
        price: 0,
      };
    });
    builder.addCase(fetchActivityWidget.fulfilled, (state, action) => {
      state.data.activity = action.payload.activity;
      state.data.accessibility = action.payload.accessibility;
      state.data.type = action.payload.type;
      state.data.price = action.payload.price;
    });
    builder.addCase(fetchActivityWidget.rejected, (state) => {
      state.data = {
        activity: '',
        accessibility: 0,
        type: '',
        price: 0,
      };
    });
  },
});

export default activitySlice.reducer;
