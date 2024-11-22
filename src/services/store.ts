import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userSlice } from './features/userSlice';
import { ingredientsSlice } from './features/ingredientsSlice';
import { constructorSlice } from './features/constructorSlice';
import { orderSlice } from './features/orderSlice';
import { ordersSlice } from './features/ordersSlice';
import { feedSlice } from './features/feedsSlice';

export const rootReducer = combineSlices(
  userSlice,
  ingredientsSlice,
  constructorSlice,
  orderSlice,
  ordersSlice,
  feedSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
