import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { synchronizeChannels } from '../slices/channelsSlice.js';
import { synchronizeMessages } from '../slices/messagesSlice';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice.js';
import { setModalShow } from '../slices/uiSlice.js';

import MainNavbar from './MainNavbar.jsx';
import Chat from './Chat.jsx';
import allModals from './Modals/index.js';

const synchronizeWithServer = async (token, dispatch, setStatus) => {
  try {
    setStatus('gettingData');
    const responce = await axios.get('/api/v1/data',
      {
        headers: { Authorization: `Bearer ${token}` },
      });
    setStatus('success');
    const { channels, messages, currentChannelId } = responce.data;
    dispatch(synchronizeChannels({ channels }));
    dispatch(synchronizeMessages({ messages }));
    dispatch(setCurrentChannelId({ id: currentChannelId }));
  } catch (e) {
    console.log(e);
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
    dispatch(setModalShow({ show: false }));
  };

  const CurrentModal = allModals[modalType];
  console.log('drow modal!');
  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
    >
      <CurrentModal
        channel={neededChannel}
        existedNames={existedNames}
        closeModal={handleClose}
      />
    </Modal>
  );
};

const MainPage = () => {
  console.log('Run chat');
  const [, setStatus] = useState('noActivity');
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    synchronizeWithServer(token, dispatch, setStatus);
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
