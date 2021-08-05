import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Channels from './Channels.jsx';
import CurrentChannel from './CurrentChannel.jsx';

const Chat = () => (
  <Container fluid="md" className="h-100 py-3 justify-content-around">
    <Row className="h-100 mb-3">
      <Col lg={3} className="d-flex flex-column mb-0 h-100 px-0">
        <Channels />
      </Col>
      <Col lg={9} className="d-flex flex-column border-left px-0">
        <CurrentChannel />
      </Col>
    </Row>

  </Container>
);

export default Chat;
