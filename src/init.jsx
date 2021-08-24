import React from 'react';

import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';

import resources from './locals';
import App from './Components/App.jsx';
import store from './store.js';
import { addMessage } from './slices/messagesSlice.js';
import {
  addChannel,
  renameChannel,
  deleteChannel,
  setCurrentChannelId,
} from './slices/channelsSlice.js';

import APIContext from './Contexts/APIContext.js';
import { implementApi } from './features/socketAPI.js';

export default async (socket) => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: false,
      resources,
    });

  const currentUser = JSON.parse(
    localStorage.getItem('userData'),
  )?.username;

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
  });

  const api = implementApi(socket);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <APIContext.Provider value={api}>
          <App />
        </APIContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};
