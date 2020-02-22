import React from 'react';
import { withRouter } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { TOGGLE_CART_HIDDEN, GET_CART_ITEMS } from '../../graphql/resolvers';

import CartDropdown from './cart-dropdown.component';

const CartDropdownContainer = ({ cartItems, history }) => {
  const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN);
  const { loading, data } = useQuery(GET_CART_ITEMS);

  return (
    <CartDropdown
      cartItems={data.cartItems}
      toggleCartHidden={toggleCartHidden}
      history={history}
      loading={loading}
    />
  )
};

export default withRouter(CartDropdownContainer);
