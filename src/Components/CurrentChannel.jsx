import React, { useEffect, useRef } from 'react';
import {
  Container,
} from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import InputMessage from './InputMessage.jsx';

const Message = ({ message }) => (
  <div className="text-break mb-2 mr-auto">
    <b>
      {message.autor}
      :
      {' '}
    </b>
    {message.text}
  </div>
);

const MessageBox = (props) => {
  const { messages } = props;
  const messagesEnd = useRef(null);
  const scrollToBottom = (el) => {
    // Функция scrollIntoView не представлена в jsdom
    // Чтобы проходили тесты, делаю проверку
    // В браузере все работает))
    if (typeof el.current.scrollIntoView === 'function') {
    el.current.scrollIntoView();
    }
  };
  useEffect(() => {
    scrollToBottom(messagesEnd);
  });
  return (
    <div id="message-box" className="p-3 d-flex flex-column scroll-enabled">
      {messages.map((message) => (
        <Message key={message.id} message={message} />))}
      <div ref={messagesEnd} />
    </div>
  );
};

const CurrentChannelHeader = ({ channel }) => {
  const [t] = useTranslation();

  return (
    <Container className="py-3 border-bottom">
      <h4>{channel.name}</h4>
      <span className="text-mytted">{t('headers.message', { count: channel.messagesCount })}</span>
    </Container>
  );
};

const CurrentChannel = () => {
  const currentId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useSelector((state) => state.channels.channels)
    .find((ch) => ch.id === currentId);
  const messages = useSelector((state) => state.messages)
    .filter((message) => message.channelId === currentId);
  const messagesCount = messages.length;

  return (
    currentChannel
      ? (
        <>
          <CurrentChannelHeader channel={{ name: currentChannel.name, messagesCount }} />
          <MessageBox messages={messages} />
          <InputMessage />
        </>
      )
      : null
  );
};
export default CurrentChannel;
