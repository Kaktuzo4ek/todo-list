/* eslint-disable no-param-reassign */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unneeded-ternary */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Widget from '../../components/Widget';
// import type { PayloadAction } from '@reduxjs/toolkit';

export interface Widget {
  title: string;
  type: string;
  price: string;
  percent: string;
  description: string;
}

export interface WidgetsState {
  widgets: { items: Widget[] };
}

const initialState: WidgetsState = {
  widgets: { items: [] },
};

export const fetchWidget1 = createAsyncThunk(
  'widget1/fetchWidget1',
  async () => {
    const { data } = await axios.get('https://www.boredapi.com/api/activity');
    return data;
  },
);

export const fetchWidget2 = createAsyncThunk(
  'widget2/fetchWidget2',
  async () => {
    const { data } = await axios.get('http://ip-api.com/json/24.48.0.1');
    return data;
  },
);

export const fetchWidget3 = createAsyncThunk(
  'widget3/fetchWidget3',
  async () => {
    const { data } = await axios.get('https://catfact.ninja/breeds', {
      params: { limit: 1 },
    });
    return data;
  },
);

export const fetchWidget4 = createAsyncThunk(
  'widget4/fetchWidget4',
  async () => {
    const { data } = await axios.get(
      'https://dog.ceo/api/breeds/image/random',
      {},
    );
    return data;
  },
);

export const fetchWidget5 = createAsyncThunk(
  'widget5/fetchWidget5',
  async () => {
    const { data } = await axios.get(
      'https://dog.ceo/api/breeds/image/random',
      {},
    );
    return data;
  },
);

export const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWidget1.pending, (state) => {
      state.widgets.items = [];
    });
    builder.addCase(fetchWidget1.fulfilled, (state, action) => {
      state.widgets.items.push({
        title: action.payload.activity,
        type: action.payload.type,
        price: action.payload.price,
        percent: action.payload.accessibility,
        description: action.payload.key,
      });
    });
    builder.addCase(fetchWidget1.rejected, (state) => {
      state.widgets.items = [];
    });
    builder.addCase(fetchWidget2.pending, (state) => {
      state.widgets.items = [];
    });
    builder.addCase(fetchWidget2.fulfilled, (state, action) => {
      state.widgets.items.push({
        title: action.payload.org,
        type: action.payload.city,
        price: action.payload.lat,
        percent: action.payload.lon,
        description: action.payload.status,
      });
    });
    builder.addCase(fetchWidget2.rejected, (state) => {
      state.widgets.items = [];
    });
    builder.addCase(fetchWidget3.pending, (state) => {
      state.widgets.items = [];
    });
    builder.addCase(fetchWidget3.fulfilled, (state, action) => {
      state.widgets.items.push({
        title: action.payload.data[0].breed,
        type: action.payload.data[0].country,
        price: action.payload.from,
        percent: action.payload.last_page,
        description: action.payload.data[0].coat,
      });
    });
    builder.addCase(fetchWidget3.rejected, (state) => {
      state.widgets.items = [];
    });
    builder.addCase(fetchWidget4.pending, (state) => {
      state.widgets.items = [];
    });
    builder.addCase(fetchWidget4.fulfilled, (state, action) => {
      state.widgets.items.push({
        title: action.payload.message.slice(0, 15),
        type: 'Annual',
        price: '62.302',
        percent: '-12%',
        description: action.payload.status,
      });
    });
    builder.addCase(fetchWidget4.rejected, (state) => {
      state.widgets.items = [];
    });
  },
});

export default widgetsSlice.reducer;
