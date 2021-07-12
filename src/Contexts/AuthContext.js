import React, { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  setLoginState: () => {},
});

export default AuthContext;
