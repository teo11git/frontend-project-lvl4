import { useContext, useState } from 'react';
import axios from 'axios';

import AuthContext from '../Contexts/AuthContext.js';
import paths from '../routes.js';

export const useAuth = () => useContext(AuthContext);

const setToLocalStorage = (values) => {
  window.localStorage.setItem('userData', JSON.stringify(values));
};

export const useProvideAuth = () => {
  const userAuthData = JSON.parse(
    localStorage.getItem('userData'),
  );

  const defineLoggedUser = () => userAuthData?.username;

  const [user, setUser] = useState(defineLoggedUser());

  const login = (userInfo) => (
    axios.post(paths.loginRequest(), userInfo)
      .then(({ data }) => {
        const { token, username } = data;
        console.log(username);
        setUser(username);
        setToLocalStorage({
          token, username,
        });
      })
  );

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const signup = (authInfo) => (
    axios.post(paths.signupRequest(), authInfo)
      .then(({ data }) => {
        const { token, username } = data;
        setUser(username);
        setToLocalStorage({
          token, username,
        });
      })
  );
  return {
    login, logout, signup, user,
  };
};
