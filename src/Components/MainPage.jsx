import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { addChannel } from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice.js';
import { setModalShow } from '../slices/uiSlice.js';

import MainNavbar from './MainNavbar.jsx';
import Chat from './Chat.jsx';
import allModals from './Modals/index.js';

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
    console.log('Data is...');
    console.log(channels, messages, currentChannelId);
    channels.forEach((channel) => dispatch(addChannel(channel)));
    dispatch(setCurrentChannelId({ id: currentChannelId }));
    messages.forEach((message) => dispatch(addMessage(message)));
  } catch (e) {
    setStatus('failed');
  }
};
const Modals = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.ui.modalType);
  const modalShow = useSelector((state) => state.ui.modalShow);
  const existedNames = useSelector(({ channels }) => channels)
    .map((ch) => ch.name);
  const editChannelId = useSelector(({ ui }) => ui.editChannelId);

  console.log(editChannelId);

  const neededChannel = useSelector(({ channels }) => channels)
    .find((ch) => ch.id === editChannelId);

  console.log(neededChannel);

  const handleClose = () => {
    dispatch(setModalShow({ show: false}));
  };

  const CurrentModal = allModals[modalType];
  console.log('drow modal!');
  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
    > 
      {
        <CurrentModal
          channel={neededChannel}
          existedNames={existedNames}
          closeModal={handleClose}
        />
      } 
    </ Modal>
  );
};

const MainPage = () => {
  console.log('Run chat');
  const [fetchingDataStatus, setStatus] = useState('noActivity');
  const channels = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    makeRequest(token, dispatch, setStatus);
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <MainNavbar />
      <Chat />
      <Modals />
    </div>
  );
};

export default MainPage;
