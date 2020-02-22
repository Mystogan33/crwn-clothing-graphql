import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  const addItemToCart = () => {
    addItem({ variables: { item } })
  };

  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <CustomButton onClick={addItemToCart} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

export default CollectionItem;
