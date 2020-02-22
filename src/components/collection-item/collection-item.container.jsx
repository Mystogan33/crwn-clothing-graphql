import React from 'react';

import { ADD_ITEM_CART } from '../../graphql/resolvers';
import { useMutation } from '@apollo/react-hooks';

import CollectionItem from './collection-item.component';

const CollectionItemContainer = ({ item }) => {
  const [addItemToCart] = useMutation(ADD_ITEM_CART);
  return <CollectionItem item={item} addItem={addItemToCart} />
};

export default CollectionItemContainer;
