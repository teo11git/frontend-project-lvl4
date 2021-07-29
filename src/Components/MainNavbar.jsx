import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useRedirect, useHistory } from 'react-router-dom';

import { useAuth } from '../features/authorization.js';

const MainNavbar = () => {
  const history = useHistory();
  const auth = useAuth();

  const makeRedirect = (to, history) => history.replace(to);

  const redirectToMain = () => {
    makeRedirect('./', history);
  };

  const logOut = () => {
   const logOutHandler = () => {
      makeRedirect('./', history);
   };
    
    auth.logout(logOutHandler);
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <h1><a className="text-light" href="#" onClick={redirectToMain}>Hexlet Chat</a></h1>
        <Button type="button" variant="light" onClick={logOut}>Log out</Button>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
