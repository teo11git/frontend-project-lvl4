import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import paths from '../routes.js';

import AuthContext from '../Contexts/AuthContext.js';
import { useProvideAuth } from '../features/authorization.js';

import MainPage from './MainPage.jsx';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';

export default function App() {
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
            from={paths.mainPage()}
            to={paths.loginPage()}
          />
        ))}
    />
  );

  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <PrivateRoute exact path={paths.mainPage()}>
            <MainPage />
          </PrivateRoute>
          <Route path={paths.loginPage()}>
            <LoginForm />
          </Route>
          <Route exact path={paths.signupPage()}>
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
