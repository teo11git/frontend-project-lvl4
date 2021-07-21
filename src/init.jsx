import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, useDispatch } from 'react-redux';
import App from './Components/App.jsx';
import { store } from './store.js';
import { addMessage } from './slices/messagesSlice.js';
import { setCurrentUser } from './slices/authentificationSlice.js';

import IOsocket from 'socket.io-client';
import APIContext from './Contexts/APIContext.js';
import { implementApi, useApi } from './features/socketApi.js';

export default () => {

  const container = document.getElementById('chat');
  
  const io = IOsocket();

  io.on('newMessage', (messageWithId) => {
    store.dispatch(addMessage(messageWithId))
  });
  

  console.log('Start create Api');
  console.log(implementApi);
  
  const api = implementApi(io);
  
  const currentUser = localStorage.getItem('username');
  const isUserExists = () => currentUser !== undefined;
  if (isUserExists) {
    store.dispatch(setCurrentUser({ user: currentUser}));
  }
  //

  ReactDOM.render(
    <Provider store={store}>
      <APIContext.Provider value={api}>
        <App />
      </APIContext.Provider>
    </Provider>,
    container,
  );
};
