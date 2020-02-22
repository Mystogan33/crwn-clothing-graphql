import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import {
  ADD_ITEM_CART,
  REMOVE_ITEM_CART,
  CLEAR_ITEM_CART
} from '../../graphql/resolvers';

import CheckoutItem from './checkout-item.component';

const CheckoutItemContainer = ({ cartItem, clearItem, addItem, removeItem }) => {

  const [addItemToCart] = useMutation(ADD_ITEM_CART);
  const [removeItemFromCart] = useMutation(REMOVE_ITEM_CART);
  const [clearItemFromCart] = useMutation(CLEAR_ITEM_CART);

  return (
    <CheckoutItem
      cartItem={cartItem}
      addItem={addItemToCart}
      clearItem={clearItemFromCart}
      removeItem={removeItemFromCart}
    />
  )
};

export default CheckoutItemContainer;
