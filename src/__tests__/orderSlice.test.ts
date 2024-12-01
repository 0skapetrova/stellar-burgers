import {
  initialState,
  makeOrder,
  orderSlice
} from '../services/features/orderSlice';

const mockOrder = {
  order: {
    _id: '674819e6b27b06001c3eb88b',
    ingredients: [
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-11-28T07:21:10.899Z',
    updatedAt: '2024-11-28T07:21:13.384Z',
    number: 60824
  },
  name: 'test'
};

describe('orders reducer', () => {
  it('should initialize correctly', () => {
    const state = orderSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should setOrder correctly', () => {
    const action = {
      type: orderSlice.actions.setOrder.type,
      payload: mockOrder.order
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.order).toEqual(mockOrder.order);
  });

  it('should clearOrderData correctly', () => {
    const action = {
      type: orderSlice.actions.clearOrderData.type
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should makeOrder.pending correctly', () => {
    const action = {
      type: makeOrder.pending.type
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull;
  });

  it('should makeOrder.fulfilled correctly', () => {
    const action = {
      type: makeOrder.fulfilled.type,
      payload: { order: mockOrder }
    };
    const prevState = { ...initialState };
    const state = orderSlice.reducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.order).toEqual(mockOrder);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  it('should makeOrder.rejected correctly', () => {
    const action = {
      type: makeOrder.rejected.type,
      error: { message: 'Ошибка оформления заказа' }
    };
    const prevState = { ...initialState };
    const state = orderSlice.reducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка оформления заказа');
  });
});
