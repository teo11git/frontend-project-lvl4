import React from 'react';
import {
  Container,
  Form,
  Button,
} from 'react-bootstrap';

import { useSelector, useStore } from 'react-redux';

import InputMessage from './InputMessage.jsx';

const Message = ({ message }) => (
  <div className="text-break mb-2 mr-auto">
    <b>{message.autor}</b>
  {message.text}
  </div>
);
/*
const InputMessage = () => (
  <div className="mt-auto">
    <Form className="d-flex ml-1">
      <Form.Control type="text" placeholder="Your message" />
      <Button type="submit" variant="dark">Send</Button>
    </Form>
  </div>
);
*/
const MessageBox = () => {
  const messages = useSelector((state) => state.messages);
  return (
    messages.map((message) => (
      <div key={message.id} id="message-box" className="p-3 d-flex flex-column scroll-enabled">
        <Message message={message}/>
      </div>
    ))
  )
};

const CurrentChannelHeader = ({ channel }) => (
  <Container className="py-3 border-bottom">
    <h4>{channel.name}</h4>
    <span className="text-mytted">{channel.messagesCount} messages</span>
  </Container>
);

const CurrentChannel = () => {
  const { id: currentId } = useSelector((state) => state.currentChannelId);
  const currentChannel = useSelector((state) => state.channels)
    .find((chan) => chan.id === currentId);
  const messages = useSelector((state) => state.messages);
  const messagesCount = messages.length;
  

  //to do improve selectors??
  return (
    currentChannel
      ? (
        <>
          <CurrentChannelHeader channel={{name: currentChannel.name, messagesCount}} />
          <MessageBox />
          <InputMessage />
        </>
      )
      : null
  );
};
export default CurrentChannel;
