import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const makeOrder = createAsyncThunk(
  'order/makeOrder',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    return data;
  }
);

interface IOrderState {
  orderModalData: TOrder | null;
  orderRequest: boolean;
  order: TOrder | null;
  isLoading: boolean;
}

export const initialState: IOrderState = {
  orderModalData: null,
  orderRequest: false,
  order: null,
  isLoading: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<TOrder>): void => {
      state.order = action.payload;
    },
    clearOrderData: (state) => initialState
  },
  selectors: {
    getOrderState: (state: IOrderState) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.isLoading = true;
        state.orderRequest = true;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.order = action.payload.order;
        state.orderModalData = action.payload.order;
      })
      .addCase(makeOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderRequest = false;
      });
  }
});

export const { setOrder, clearOrderData } = orderSlice.actions;
export const { getOrderState } = orderSlice.selectors;
