import {
  getOrderByNumber,
  getOrdersData,
  initialState,
  ordersSlice
} from '../services/features/ordersSlice';

const mockOrders = {
  orders: [
    {
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
    {
      _id: '67479da3b27b06001c3eb85c',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2024-11-27T22:30:59.474Z',
      updatedAt: '2024-11-27T22:31:00.502Z',
      number: 60823
    },
    {
      _id: '67478bc1b27b06001c3eb836',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный метеоритный бургер',
      createdAt: '2024-11-27T21:14:41.398Z',
      updatedAt: '2024-11-27T21:14:42.380Z',
      number: 60822
    }
  ]
};

const mockOrder = {
  orders: [
    {
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
    }
  ]
};

describe('orders reducer', () => {
  it('should initialize correctly', () => {
    const state = ordersSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should setOrders correctly', () => {
    const action = {
      type: ordersSlice.actions.setOrders.type,
      payload: mockOrders
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.orders).toEqual(mockOrders);
  });

  it('should getOrdersData.pending correctly', () => {
    const action = {
      type: getOrdersData.pending.type
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull;
  });

  it('should getOrdersData.fulfilled correctly', () => {
    const action = {
      type: getOrdersData.fulfilled.type,
      payload: mockOrders.orders
    };
    const prevState = { ...initialState };
    const state = ordersSlice.reducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders.orders);
  });

  it('should getOrdersData.rejected correctly', () => {
    const action = {
      type: getOrdersData.rejected.type,
      error: { message: 'Ошибка загрузки заказов' }
    };
    const prevState = { ...initialState };
    const state = ordersSlice.reducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки заказов');
  });

  it('should getOrderByNumber.pending correctly', () => {
    const action = {
      type: getOrderByNumber.pending.type
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull;
  });

  it('should getOrderByNumber.fulfilled correctly', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrder.orders
    };
    const prevState = { ...initialState };
    const state = ordersSlice.reducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(mockOrder.orders);
  });

  it('should getOrderByNumber.rejected correctly', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Ошибка получения заказа по номеру' }
    };
    const prevState = { ...initialState };
    const state = ordersSlice.reducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка получения заказа по номеру');
  });
});
