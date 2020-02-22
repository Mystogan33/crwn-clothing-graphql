import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Spinner from '../spinner/spinner.component';

import CollectionsOverview from './collections-overview.component';

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionsOverviewContainer = () => {
  const { loading, error, data } = useQuery(GET_COLLECTIONS);

  if(error) {
    console.log(error);
    return <Spinner />
  }
  else if(loading) return <Spinner />
  else return <CollectionsOverview collections={data.collections} />
};

export default CollectionsOverviewContainer;
