// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import ReactDom from 'react-dom';
import socketIO from 'socket.io-client';

import init from './init.jsx';

const runApp = async () => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }
  const socket = socketIO();
  const virtualDom = await init(socket);
  const element = document.getElementById('chat');
  ReactDom.render(virtualDom, element);
};

runApp();
