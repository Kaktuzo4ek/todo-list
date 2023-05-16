import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Ip {
  country: string;
  regionName: string;
  city: string;
  lat: number;
  lon: number;
}

export interface IpState {
  data: Ip;
}

const initialState: IpState = {
  data: { country: '', regionName: '', city: '', lat: 0, lon: 0 },
};

export const fetchIpWidget = createAsyncThunk(
  'ipWidget/fetchIpWidget',
  async (ip: string) => {
    const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
    return data;
  },
);

export const ipSlice = createSlice({
  name: 'ip',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIpWidget.pending, (state) => {
      state.data = { country: '', regionName: '', city: '', lat: 0, lon: 0 };
    });
    builder.addCase(fetchIpWidget.fulfilled, (state, action) => {
      state.data.country = action.payload.country;
      state.data.city = action.payload.city;
      state.data.regionName = action.payload.regionName;
      state.data.lat = action.payload.lat;
      state.data.lon = action.payload.lon;
    });
    builder.addCase(fetchIpWidget.rejected, (state) => {
      state.data = { country: '', regionName: '', city: '', lat: 0, lon: 0 };
    });
  },
});

export default ipSlice.reducer;
