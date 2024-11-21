import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeedsData = createAsyncThunk('orders/getFeeds', async () => {
  const data = await getFeedsApi();
  return data;
});

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
}

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedState: (state: IFeedState) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeedsData.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { getFeedState } = feedSlice.selectors;
