import { gql } from 'apollo-boost';
import {
  addItemToCart,
  getCartItemsCount,
  getCartTotal,
  removeItemFromCart,
  clearItemFromCart
 } from './cart.utils';

export const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

export const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

export const GET_CART_TOTAL = gql`
  {
    cartTotal @client
  }
`;

export const GET_ITEMS_COUNT = gql`
  {
    itemsCount @client
  }
`;

export const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;

export const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

export const ADD_ITEM_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

export const REMOVE_ITEM_CART = gql`
  mutation RemoveItemToCart($item: Item!) {
    removeItemFromCart(item: $item) @client
  }
`;

export const CLEAR_ITEM_CART = gql`
  mutation ClearItemFromCart($item: Item!) {
    clearItemFromCart(item: $item) @client
  }
`;

export const SET_CURRENT_USER = gql`
  mutation SetCurrentUser($user: User!) {
    setCurrentUser(user: $user) @client
  }
`;

export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type DateTime {
    nanoseconds: Int!
    seconds: Int!
  }

  extend type User {
    id: ID!
    displayName: String!
    email: String!
    createdAt: DateTime!
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
    RemoveItemFromCart(item: Item!): [Item]!
    ClearItemFromCart(item: Item!): [Item]!
    SetCurrentUser(user: User!): User!
  }
`;

const updateCartItemsRelatedQueries = (cache, newCartItems) => {

  cache.writeQuery({
    query: GET_ITEMS_COUNT,
    data: { itemsCount: getCartItemsCount(newCartItems) }
  });

  cache.writeQuery({
    query: GET_CART_TOTAL,
    data: { cartTotal: getCartTotal(newCartItems) }
  });

  cache.writeQuery({
    query: GET_CART_ITEMS,
    data: { cartItems: newCartItems }
  });

};

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }) => {
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN
      });

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden }
      });

      return !cartHidden;
    },

    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const newCartItems = addItemToCart(cartItems, item);
      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },

    removeItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const newCartItems = removeItemFromCart(cartItems, item);
      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },

    clearItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const newCartItems = clearItemFromCart(cartItems, item);
      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },

    setCurrentUser: (_root, { user }, { cache }) => {
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: { currentUser: user }
      });
    }
  }
};
