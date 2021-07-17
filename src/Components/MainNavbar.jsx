import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';

const MainNavbar = () => (
  <Navbar expand="lg" bg="dark" variant="dark">
    <Container>
      <h1><a className="text-light" href="#">Eazy Chat</a></h1>
      <Button type="button" variant="light">Switch</Button>
    </Container>
  </Navbar>
);

export default MainNavbar;
