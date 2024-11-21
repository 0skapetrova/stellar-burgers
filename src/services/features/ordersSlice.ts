import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrdersData = createAsyncThunk('orders/getOrders', async () => {
  const data = await getOrdersApi();
  return data;
});

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (orderNumber: number) => {
    const data = await getOrderByNumberApi(orderNumber);
    return data.orders.length > 0 ? data.orders[0] : null;
  }
);

interface IOrdersState {
  orders: TOrder[];
  order: TOrder | null;
  isLoading: boolean;
}

export const initialState: IOrdersState = {
  orders: [],
  order: null,
  isLoading: false
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<TOrder[]>): void => {
      state.orders = action.payload;
    }
  },
  selectors: {
    getOrdersState: (state: IOrdersState): IOrdersState => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { setOrders } = ordersSlice.actions;
export const { getOrdersState } = ordersSlice.selectors;
