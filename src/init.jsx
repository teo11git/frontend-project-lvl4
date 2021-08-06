import React from 'react';

import { Provider } from 'react-redux';
import * as Rollbar from '@rollbar/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';

import resources from './locals';
import App from './Components/App.jsx';
import store from './store.js';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, renameChannel, deleteChannel } from './slices/channelsSlice.js';
import { setCurrentUser } from './slices/authentificationSlice.js';
import { setCurrentChannelId } from './slices/currentChannelIdSlice.js';

import APIContext from './Contexts/APIContext.js';
import { implementApi } from './features/socketAPI.js';

export default (socket) => {
  // const socket = io();
  // console.log('Socket is');
  // console.log(socket);
  const rollbarConfig = {
    accessToken: '32f20a07361646a5a260bea7c1d43761',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  const i18n = i18next.createInstance();

  i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: false,
      resources,
    });

  const currentUser = localStorage.getItem('username');
  const isUserExists = () => currentUser !== undefined;
  if (isUserExists) {
    store.dispatch(setCurrentUser({ user: currentUser }));
  }

  // socket.onAny((e) => console.log(`SOCKET IO RECIEVED ${e}`));

  socket.on('newMessage', (messageWithId) => {
    store.dispatch(addMessage(messageWithId));
  });

  socket.on('newChannel', (channelWithId) => {
    store.dispatch(addChannel(channelWithId));
    if (currentUser === channelWithId.autor) {
      store.dispatch(setCurrentChannelId({ id: channelWithId.id }));
    }
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(renameChannel(channel));
  });

  socket.on('removeChannel', (dataWithId) => {
    store.dispatch(deleteChannel(dataWithId));
    const currentChannelId = store.getState().currentChannelId.id;
    if (currentChannelId === dataWithId.id) {
      store.dispatch(setCurrentChannelId({ id: 1 }));
    }
  });

  const api = implementApi(socket);

  return (
    <Rollbar.Provider config={rollbarConfig}>
      <Rollbar.ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <APIContext.Provider value={api}>
              <App />
            </APIContext.Provider>
          </I18nextProvider>
        </Provider>
      </Rollbar.ErrorBoundary>
    </Rollbar.Provider>
  );
};
