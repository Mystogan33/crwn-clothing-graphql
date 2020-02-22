import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import HomePage from '../pages/homepage/homepage.component';
import ShopPage from '../pages/shop/shop.component';
import { default as CheckoutPage } from '../pages/checkout/checkout.container';
import SignInAndSignUpPage from '../pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { default as Header } from '../components/header/header.container';

import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

const App = ({ currentUser, setCurrentUser })  => {

  useEffect(() => {
    
    let unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          const user = {
            id: snapShot.id,
            ...snapShot.data()
          };
          setCurrentUser(user);
        });
      }

      setCurrentUser(userAuth);
    });

    return () => {
      unsubscribeFromAuth();
    }
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route
          exact
          path='/signin'
          render={() =>
            currentUser ? (
              <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage />
            )
          }
        />
      </Switch>
    </div>
  );
}

export default App;
