import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import App from './Components/App.jsx';
import { store } from './store.js';

import IOsocket from 'socket.io-client';

export default () => {
  const container = document.getElementById('chat');
  
  const io = IOsocket();

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    container,
  );
};
