import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import App from './Components/App.jsx';
import { store } from './store';

const container = document.getElementById('chat');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container,
);
