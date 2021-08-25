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

  const login = async (userInfo) => {
    const { data } = await axios.post(paths.loginRequest(), userInfo);
    const { token, username } = data;
    setUser(username);
    setToLocalStorage({
      token, username,
    });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const signup = async (authInfo) => {
    const { data } = await axios.post(paths.signupRequest(), authInfo);
    const { token, username } = data;
    setUser(username);
    setToLocalStorage({
      token, username,
    });
  };
  return {
    login, logout, signup, user,
  };
};
