import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER, GET_CART_HIDDEN } from '../../graphql/resolvers';

import Header from './header.component';

const HeaderContainer = () => {
  const { data: cartHiddenData } = useQuery(GET_CART_HIDDEN);
  const { data: currentUserData } = useQuery(GET_CURRENT_USER);

  const { cartHidden } = cartHiddenData;
  const { currentUser } = currentUserData;

  return <Header hidden={cartHidden} currentUser={currentUser} />
};

export default HeaderContainer;
