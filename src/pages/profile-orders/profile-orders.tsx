import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getOrdersData,
  getOrdersState
} from '../../services/features/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrdersState).orders;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersData());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
