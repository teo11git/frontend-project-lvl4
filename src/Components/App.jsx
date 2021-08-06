import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AuthContext from '../Contexts/AuthContext.js';
import { useProvideAuth } from '../features/authorization.js';

import MainPage from './MainPage.jsx';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';

export default function App() {
  console.log(window.location);
  const PageNotFound = () => (<h2>Oops Page Not Found</h2>);

  const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    const result = (
      <AuthContext.Provider value={auth}>
        {children}
      </AuthContext.Provider>
    );
    return result;
  };

  const PrivateRoute = ({ children }) => (
    <Route
      render={() => (localStorage.getItem('token')
        ? (children)
        : (
          <Redirect
            from="/"
            to="/login"
          />
        ))}
    />
  );

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
          <Route exact path="/signup">
            <SignupForm />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}
