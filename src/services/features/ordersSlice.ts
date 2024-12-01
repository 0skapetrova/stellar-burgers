import { getOrderByNumberApi, getOrdersApi } from './../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from './../../utils/types';

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
  error: string | null;
}

export const initialState: IOrdersState = {
  orders: [],
  order: null,
  isLoading: false,
  error: null
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
        state.error = null;
      })
      .addCase(getOrdersData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки заказов';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка получения заказа по номеру';
      });
  }
});

export const { setOrders } = ordersSlice.actions;
export const { getOrdersState } = ordersSlice.selectors;
