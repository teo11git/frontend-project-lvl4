import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addChannel } from '../features/channelsSlice.js';
import { addMessage } from '../features/messagesSlice';

import paths from '../routes.js';

const makeRequest = async (token, dispatch, setStatus) => {
  try {
    setStatus('gettingData');
    const responce = await axios.get('/api/v1/data',
      {
        headers: { Authorization: `Bearer ${token}` },
      });
    setStatus('success');
    const { channels, messages, currentChannelId } = responce.data;
    channels.forEach((channel) => dispatch(addChannel(channel)));
    messages.forEach((message) => dispatch(addMessage(message)));
  } catch (e) {
    setStatus('failed');
  }
};

const Chat = () => {
  const [fetchingDataStatus, setStatus] = useState('noActivity');
  const channels = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    makeRequest(token, dispatch, setStatus);
  }, [dispatch]);

  return <h1>Hello, i am your chat</h1>;
};

export default Chat;
