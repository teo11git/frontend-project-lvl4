// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  mainPage: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
  getDataRequest: () => [host, prefix, 'data'].join('/'),
  loginRequest: () => [host, prefix, 'login'].join('/'),
  signupRequest: () => [host, prefix, 'signup'].join('/'),
};
