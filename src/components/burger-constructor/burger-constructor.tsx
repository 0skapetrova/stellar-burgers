import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  resetConstructorState,
  getConstructorItems
} from '../../services/features/constructorSlice';
import {
  clearOrderData,
  getOrderState,
  makeOrder
} from '../../services/features/orderSlice';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getConstructorItems);

  const orderRequest = useSelector(getOrderState).orderRequest;

  const orderModalData = useSelector(getOrderState).orderModalData;

  const onOrderClick = () => {
    if (!getCookie('accessToken')) {
      return navigate('/login');
    } else if (!constructorItems.bun || orderRequest) return;
    const orderData = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];
    dispatch(makeOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(resetConstructorState());
    dispatch(clearOrderData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
