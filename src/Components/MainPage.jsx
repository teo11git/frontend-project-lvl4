import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { synchronizeChannels, setCurrentChannelId } from '../slices/channelsSlice.js';
import { synchronizeMessages } from '../slices/messagesSlice';

import Modals from './Modals/index.jsx';
import MainNavbar from './MainNavbar.jsx';
import Chat from './Chat.jsx';
import { useAuth } from '../features/authorization.js';
import paths from '../routes.js';

const synchronizeWithServer = async (auth, dispatch, logOut) => {
  try {
    const responce = await axios.get(paths.getDataRequest(),
      {
        headers: { Authorization: auth.getHttpHeader() },
      });
    const { channels, messages, currentChannelId } = responce.data;
    dispatch(synchronizeChannels({ channels }));
    dispatch(synchronizeMessages({ messages }));
    dispatch(setCurrentChannelId({ id: currentChannelId }));
  } catch (err) {
    console.log(err);
    if (err.response.status === 401) {
      logOut();
    }
  }
};

const MainPage = () => {
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
    synchronizeWithServer(auth, dispatch, logOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
