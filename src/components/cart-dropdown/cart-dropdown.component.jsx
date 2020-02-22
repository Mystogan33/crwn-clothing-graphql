import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import Spinner from '../spinner/spinner.component';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, toggleCartHidden, loading, history }) => {

  const navigateToCheckout = () => {
    toggleCartHidden();
    history.push('/checkout');
  };

  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        { !loading
          ? ( cartItems.length
              ? cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
              : <span className='empty-message'>Your cart is empty</span>
            )
          : <Spinner />
        }
      </div>
      <CustomButton onClick={navigateToCheckout}>
        GO TO CHECKOUT
      </CustomButton>
    </div>
  )
};

export default CartDropdown;
