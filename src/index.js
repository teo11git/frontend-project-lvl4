// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import ReactDom from 'react-dom';
import socketIO from 'socket.io-client';

import Rollbar from 'rollbar';
import init from './init.jsx';

const runApp = async () => {
  const rollbar = new Rollbar({
    accessToken: process.env.POST_CLIENT_ITEM_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: process.env.NODE_ENV === 'production',
    endpoint: 'https://api.rollbar.com/api/1/item/',
  });

  rollbar.log();

  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }
  const socket = socketIO();
  const virtualDom = await init(socket);
  const element = document.getElementById('chat');
  ReactDom.render(virtualDom, element);
};

runApp();
