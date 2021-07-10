import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import LoginForm from './LoginForm.jsx';

export default function App() {
  const loggedIn = false;

  const MainPage = () => (<h2>Main</h2>);
  const PageNotFound = () => (<h2>Oops Page Not Found</h2>);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <MainPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}
