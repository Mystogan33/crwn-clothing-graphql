import React from 'react';
import { TOGGLE_CART_HIDDEN, GET_ITEMS_COUNT } from '../../graphql/resolvers';

import { useMutation, useQuery } from '@apollo/react-hooks';

import CartIcon from './cart-icon.component';

const CartIconContainer = () => {
  const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN);
  const { data: { itemsCount} } = useQuery(GET_ITEMS_COUNT);
  return <CartIcon itemCount={itemsCount} toggleCartHidden={toggleCartHidden} />
};

export default CartIconContainer;
