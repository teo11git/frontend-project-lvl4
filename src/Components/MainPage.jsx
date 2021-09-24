import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { synchronizeChannels, setCurrentChannelId } from '../slices/channelsSlice.js';
import { synchronizeMessages } from '../slices/messagesSlice';

import Modals from './Modals/index.jsx';
import MainNavbar from './MainNavbar.jsx';
import Chat from './Chat.jsx';
import { useAuth } from '../features/authorization.js';
import paths from '../routes.js';

const synchronizeWithServer = async (auth, dispatch, logOut, setLoadState) => {
  try {
    const responce = await axios.get(paths.getDataRequest(),
      {
        headers: { Authorization: auth.getHttpHeader() },
      });
    setLoadState(true);
    const { channels, messages, currentChannelId } = responce.data;
    dispatch(synchronizeChannels({ channels }));
    dispatch(synchronizeMessages({ messages }));
    dispatch(setCurrentChannelId({ id: currentChannelId }));
  } catch (err) {
    console.log(err);
    if (err.response.status === 401) {
      console.log('Auth error!');
      logOut();
    }
  }
};

const MainPage = () => {
  const [didDataLoad, setLoadState] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useAuth();
  const [t] = useTranslation();

  const makeRedirect = (to, historyList) => historyList.replace(to);

  const logOut = () => {
    auth.logout();
    makeRedirect('./', history);
  };

  useEffect(() => {
    synchronizeWithServer(auth, dispatch, logOut, setLoadState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (didDataLoad
    ? (
      <div className="d-flex flex-column h-100">
        <MainNavbar>
          <Button type="button" variant="link" className="text-light" onClick={logOut}>{t('controls.logout')}</Button>
        </MainNavbar>
        <Chat />
        <Modals />
      </div>
    )
    : (
      <div className="spinner-container">
        <Spinner animation="border" variant="success" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        <b>Loading</b>
      </div>
    ));
};

export default MainPage;
