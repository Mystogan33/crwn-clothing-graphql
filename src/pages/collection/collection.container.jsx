import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Spinner from '../../components/spinner/spinner.component';

import CollectionPage from './collection.component';

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
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

const CollectionPageContainer = ({ match }) => {
  const { loading, error, data } = useQuery(GET_COLLECTION_BY_TITLE, {
    variables: { title: match.params.collectionId }
  });

  if(loading) return <Spinner />
  else if(error) {
    console.log(error);
    return <Spinner />
  }
  else {
    const { getCollectionsByTitle: collection } = data;
    return <CollectionPage collection={collection} />
  }
};

export default CollectionPageContainer;
