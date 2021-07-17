import React from 'react';
import {
  Container,
  Form,
  Button,
} from 'react-bootstrap';

const Message = () => (
  <div className="text-break mb-2 mr-auto">
    <b>somebody</b>
    : Hello
  </div>
);

const InputMessage = () => (
  <div className="mt-auto">
    <Form className="d-flex ml-1">
      <Form.Control type="text" placeholder="Your message" />
      <Button type="submit" variant="dark">Send</Button>
    </Form>
  </div>
);
const MessageBox = () => (
  <div id="message-box" className="p-3 d-flex flex-column scroll-enabled">
    <Message />
  </div>

);

const CurrentChannelHeader = () => (
  <Container className="py-3 border-bottom">
    <h4>Channel name</h4>
    <span className="text-mytted">30 messages</span>
  </Container>
);

const CurrentChannel = () => (
  <>
    <CurrentChannelHeader />
    <MessageBox />
    <InputMessage />
  </>
);
export default CurrentChannel;
