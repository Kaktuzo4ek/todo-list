import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Weather {
  weather: string;
  description: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
}

export interface WeatherState {
  data: Weather;
}

const initialState: WeatherState = {
  data: {
    weather: '',
    description: '',
    temp: 0,
    tempMin: 0,
    tempMax: 0,
    pressure: 0,
    humidity: 0,
  },
};

export const fetchWeatherWidget = createAsyncThunk(
  'weatherWidget/fetchWeatherWidget',
  async (params: { lat: number; lon: number }) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=aeff975321105b04fbc5bea603568d18`,
    );
    return data;
  },
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherWidget.pending, (state) => {
      state.data = {
        weather: '',
        description: '',
        temp: 0,
        tempMin: 0,
        tempMax: 0,
        pressure: 0,
        humidity: 0,
      };
    });
    builder.addCase(fetchWeatherWidget.fulfilled, (state, action) => {
      state.data.weather = action.payload.weather[0].main;
      state.data.description = action.payload.weather[0].description;
      state.data.temp = action.payload.main.temp;
      state.data.tempMin = action.payload.main.temp_min;
      state.data.tempMax = action.payload.main.temp_max;
      state.data.pressure = action.payload.main.pressure;
      state.data.humidity = action.payload.main.humidity;
    });
    builder.addCase(fetchWeatherWidget.rejected, (state) => {
      state.data = {
        weather: '',
        description: '',
        temp: 0,
        tempMin: 0,
        tempMax: 0,
        pressure: 0,
        humidity: 0,
      };
    });
  },
});

export default weatherSlice.reducer;
