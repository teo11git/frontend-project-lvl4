import { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Contexts/AuthContext.js';
import { setCurrentUser } from '../slices/authentificationSlice.js';
import { store } from '../store.js';

export const useAuth = () => useContext(AuthContext);

const setToLocalStorage = (values) => {
  Object.entries(values)
    .forEach(([key, value]) => window.localStorage.setItem(key, value));
};

const makeAuth = {
  isAuthenticated: false,
  login: (userInfo, cb, errCb) => {
    axios.post('api/v1/login', userInfo)
      .then(({ data }) => {
        const { token, username } = data;
        setToLocalStorage({
          token, username,
        });
        cb(username);
        makeAuth.isAuthenticated = true;
      }).catch((err) => {
        console.log('Error');
        console.log(err);
        errCb(err);
      });
  },

  logout: (cb) => {
    localStorage.clear();
    cb();
    makeAuth.isAuthenticated = false;
  },

  signup: (authInfo, cb, errCb) => {
    axios.post('api/v1/signup', authInfo)
      .then(({ data }) => {
        const { token, username } = data;
        setToLocalStorage({
          token, username,
        });
        cb(username);
        makeAuth.isAuthenticated = true;
      }).catch((err) => {
        if (err.message.includes('409')) {
          errCb('Conflict');
        }
      });
  },
};

export const useProvideAuth = () => {
  // const [user, setUser] = useState(null);

  const login = (data, cb, errCb) => makeAuth.login(data, (username) => {
    store.dispatch(setCurrentUser({ user: username }));
    cb();
  }, errCb);

  const logout = async (cb) => makeAuth.logout(() => {
    store.dispatch(setCurrentUser({ user: null }));
    cb();
  });

  const signup = (data, cb, errCb) => makeAuth.signup(data, (username) => {
    store.dispatch(setCurrentUser({ user: username }));
    cb();
  }, errCb);

  return {
    login, logout, signup,
  };
};
