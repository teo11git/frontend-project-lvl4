import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  Navbar,
  Container,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { addChannel } from '../features/channelsSlice.js';
import { addMessage } from '../features/messagesSlice';
import MainNavbar from './MainNavbar.jsx';
import Chat from './Chat';
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

const MainPage = () => {
  console.log('Run chat');
  const [fetchingDataStatus, setStatus] = useState('noActivity');
  const channels = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  console.log(`Token is ${token}`);
  useEffect(() => {
    console.log('UseEffect!');
    makeRequest(token, dispatch, setStatus);
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <MainNavbar />
      <Chat />
    </div>
  );
};

export default MainPage;
