import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { synchronizeChannels } from '../slices/channelsSlice.js';
import { synchronizeMessages } from '../slices/messagesSlice';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice.js';
import { setModalShow } from '../slices/uiSlice.js';

import MainNavbar from './MainNavbar.jsx';
import Chat from './Chat.jsx';
import allModals from './Modals/index.js';
import { useAuth } from '../features/authorization.js';

const synchronizeWithServer = async (token, dispatch, setStatus) => {
  try {
    // setStatus('gettingData');
    const responce = await axios.get('/api/v1/data',
      {
        headers: { Authorization: `Bearer ${token}` },
      });
    // setStatus('success');
    const { channels, messages, currentChannelId } = responce.data;
    dispatch(synchronizeChannels({ channels }));
    dispatch(synchronizeMessages({ messages }));
    dispatch(setCurrentChannelId({ id: currentChannelId }));
  } catch (e) {
    console.log(e);
    // setStatus('failed');
  }
};
const Modals = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.ui.modalType);
  const modalShow = useSelector((state) => state.ui.modalShow);
  const existedNames = useSelector(({ channels }) => channels)
    .map((ch) => ch.name);
  const editChannelId = useSelector(({ ui }) => ui.editChannelId);

  const neededChannel = useSelector(({ channels }) => channels)
    .find((ch) => ch.id === editChannelId);

  const handleClose = () => {
    dispatch(setModalShow({ show: false }));
  };

  const CurrentModal = allModals[modalType];
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
  const [, setStatus] = useState('noActivity');
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useAuth();
  const [t] = useTranslation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    synchronizeWithServer(token, dispatch, setStatus);
  }, []);

  const makeRedirect = (to, historyList) => historyList.replace(to);

  const logOut = () => {
    const logOutHandler = () => {
      makeRedirect('./', history);
    };

    auth.logout(logOutHandler);
  };

  return (
    <div className="d-flex flex-column h-100">
      <MainNavbar>
        <Button type="button" variant="link" className="text-light" onClick={logOut}>{t('controls.logout')}</Button>
      </MainNavbar>
      <Chat />
      <Modals />
    </div>
  );
};

export default MainPage;
