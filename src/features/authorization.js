import { useContext, useState } from 'react';
import axios from 'axios';

import AuthContext from '../Contexts/AuthContext.js';
import store from '../store.js';
import paths from '../routes.js';

export const useAuth = () => useContext(AuthContext);

const setToLocalStorage = (values) => {
  window.localStorage.setItem('userData', JSON.stringify(values));
};

export const useProvideAuth = () => {

  const userAuthData = JSON.parse(
    localStorage.getItem('userData')
  );
  
  const [user, setUser] = useState(userAuthData);
  // сделать запрос
  // изменить стэйт
  // записать в локал сторадж
  // вернуть промис
  const login = (userInfo) => {
    const some = axios.post(paths.loginRequest(), userInfo)
      .then(({ data }) => {
        const { token, username } = data;
        console.log(username);
        setUser(username);
        setToLocalStorage({
          token, username,
        });
      })
    return some;
  }
  const logout = () => {};
  const signup = () => {};
  return {
    login, logout, signup, user
  }
};
