import {
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userSlice
} from '../services/features/userSlice';

const mockUser = {
  name: 'TestUser',
  email: 'test@test.com'
};

describe('user reducer', () => {
  it('should initialize correctly', () => {
    const state = userSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should setUser correctly', () => {
    const action = {
      type: userSlice.actions.setUser.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
  });

  it('should setIsAuthChecked correctly', () => {
    const action = {
      type: userSlice.actions.setIsAuthChecked.type,
      payload: true
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuthChecked).toEqual(true);
  });

  it('should registerUser.pending correctly', () => {
    const action = {
      type: registerUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull;
  });

  it('should registerUser.fulfilled correctly', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('should registerUser.rejected correctly', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe('Ошибка регистрации');
  });

  it('should loginUser.pending correctly', () => {
    const action = {
      type: loginUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull;
  });

  it('should loginUser.fulfilled correctly', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('should loginUser.rejected correctly', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Ошибка входа' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe('Ошибка входа');
  });

  it('should updateUser.pending correctly', () => {
    const action = {
      type: updateUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull;
  });

  it('should updateUser.fulfilled correctly', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  it('should updateUser.rejected correctly', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Ошибка обновления данных пользователя' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка обновления данных пользователя');
  });

  it('should logoutUser.pending correctly', () => {
    const action = {
      type: logoutUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull;
  });

  it('should logoutUser.fulfilled correctly', () => {
    const action = {
      type: logoutUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toBeNull;
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('should logoutUser.rejected correctly', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'Ошибка выхода' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe('Ошибка выхода');
  });
});
