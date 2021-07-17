// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

// import React from 'react';
// import ReactDOM from 'react-dom';

// import { Provider } from 'react-redux';
// import App from './Components/App.jsx';
// import { store } from './store.js';

import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
init();
