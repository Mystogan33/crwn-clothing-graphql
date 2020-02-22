import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_CART_ITEMS, GET_CART_TOTAL } from '../../graphql/resolvers';

import Spinner from '../../components/spinner/spinner.component';
import CheckoutPage from './checkout.component';

const CheckoutPageContainer = () => {
  const { loading: cartItemsLoading, data: cartItemsData } = useQuery(GET_CART_ITEMS);
  const { loading: cartTotalLoading, data: cartTotalData } = useQuery(GET_CART_TOTAL);

  if(cartItemsLoading && cartTotalLoading) return <Spinner />

  return (
    <CheckoutPage
      cartItems={cartItemsData.cartItems} 
      cartTotal={cartTotalData.cartTotal}
    />
  )
};

export default CheckoutPageContainer;
