import {
  feedSlice,
  getFeedsData,
  initialState
} from '../services/features/feedsSlice';

const mockFeed = {
  success: true,
  orders: [
    {
      _id: '67489a05b27b06001c3eb9a2',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0943'
      ],
      status: 'done',
      name: 'Space флюоресцентный люминесцентный бургер',
      createdAt: '2024-11-28T16:27:49.422Z',
      updatedAt: '2024-11-28T16:27:50.304Z',
      number: 60839
    },
    {
      _id: '67488684b27b06001c3eb97f',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-11-28T15:04:36.865Z',
      updatedAt: '2024-11-28T15:04:37.887Z',
      number: 60837
    },
    {
      _id: '674880a9b27b06001c3eb978',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Краторный space люминесцентный бургер',
      createdAt: '2024-11-28T14:39:37.676Z',
      updatedAt: '2024-11-28T14:39:38.428Z',
      number: 60836
    }
  ],
  total: 60465,
  totalToday: 34
};

describe('ingredients reducer', () => {
  it('should initialize correctly', () => {
    const state = feedSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should getFeedsData.pending correctly', () => {
    const action = {
      type: getFeedsData.pending.type
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull;
  });

  it('should getFeedsData.fulfilled correctly', () => {
    const action = {
      type: getFeedsData.fulfilled.type,
      payload: {
        success: true,
        orders: mockFeed.orders,
        total: mockFeed.total,
        totalToday: mockFeed.totalToday
      }
    };
    const prevState = { ...initialState };
    const state = feedSlice.reducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockFeed.orders);
    expect(state.total).toEqual(mockFeed.total);
    expect(state.totalToday).toEqual(mockFeed.totalToday);
  });

  it('should getFeedsData.rejected correctly', () => {
    const action = {
      type: getFeedsData.rejected.type,
      error: { message: 'Ошибка загрузки всех заказов' }
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки всех заказов');
  });
});
