import React from 'react';

import { GET_CURRENT_USER, SET_CURRENT_USER } from '../graphql/resolvers';
import { useQuery, useMutation } from '@apollo/react-hooks';

import App from './App';

const AppContainer = () => {
  const { data: { currentUser } } = useQuery(GET_CURRENT_USER);
  const [setCurrentUser] = useMutation(SET_CURRENT_USER);

  return (
    <App currentUser={currentUser} setCurrentUser={user => setCurrentUser({ variables: { user } })} />
  )
};

export default AppContainer;
