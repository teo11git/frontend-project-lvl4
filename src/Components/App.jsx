import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext.js';
import Chat from './Chat.jsx';
import LoginForm from './LoginForm.jsx';
import paths from '../routes.js';

export default function App() {
  const { loginPagePath } = paths;
  const [isLoggedIn, setStatus] = useState('false');
  const setLoginState = (val) => setStatus(val);

  const hasAuthToken = () => {
    const storage = window.localStorage;
    return storage.getItem('token') !== null;
  };

  console.log('Expirience from App -------');
  console.log(isLoggedIn);

  const MainPage = () => (<h2>Main</h2>);
  const PageNotFound = () => (<h2>Oops Page Not Found</h2>);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoginState }}>
      <Router>
        <Switch>
          <Route exact path="/">
            {hasAuthToken() ? <Chat /> : <Redirect to={loginPagePath()} />}
          </Route>
          <Route path={loginPagePath()}>
            <LoginForm />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
