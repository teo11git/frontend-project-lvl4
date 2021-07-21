import { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../Contexts/AuthContext.js';
import paths from '../routes.js';
import { store } from '../store.js';

export const useAuth = () => useContext(AuthContext);

const setToLocalStorage = (values) => {
  Object.entries(values)
    .forEach(([key, value]) => window.localStorage.setItem(key, value));
};

const makeAuth = {
  isAuthenticated: false,
  signin: (data, cb, errCb) => {
    axios.post('api/v1/login', data)
      .then(({ data }) => {
        const { token, username } = data;
        setToLocalStorage({
          token, username,
        });
        cb();
        makeAuth.isAuthenticated = true;
      }).catch((err) => {
        console.log('Error');
        console.log(err);
        errCb();
      });
  },
  signout: (cb) => {
    // some logic
    makeAuth.isAuthenticated = false;
  },
  
  login: () => {}
};

export const useProvideAuth = () => {
  // const [user, setUser] = useState(null);

  const signin = (data, cb, errCb) => makeAuth.signin(data, () => {
    store.dispatch(setCurrentUser({ user: data.username }));
    cb();
  }, errCb);

  const signout = async (cb) => makeAuth.signout(() => {
    store.dispatch(setCurrentUser({ user: null }));
    cb();
  });

  return {
    signin, signout,
  };
};
