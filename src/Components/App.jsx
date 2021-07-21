import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AuthContext from '../Contexts/AuthContext.js';
import { useProvideAuth, useAuth } from '../features/authorization.js';

import MainPage from './MainPage.jsx';
import LoginForm from './LoginForm.jsx';
import SigninForm from './SigninForm.jsx';
import paths from '../routes.js';

export default function App() {
  const { loginPagePath } = paths;

  console.log('Expirience from App -------');

  const PageNotFound = () => (<h2>Oops Page Not Found</h2>);

  const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    const result = (
      <AuthContext.Provider value={auth}>
        {children}
      </AuthContext.Provider>
    );
    return result
  };

  const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) => localStorage.getItem('token')
            ? (children)
            : (
              <Redirect from="/"
                to="/login"
              />
            )
        }
        />
      )
  };

  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <MainPage />
          </PrivateRoute>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/signin">
            <SigninForm />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}
