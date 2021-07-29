import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useRedirect, useHistory } from 'react-router-dom';

import { useAuth } from '../features/authorization.js';
import { useTranslation } from 'react-i18next';

const MainNavbar = () => {
  const history = useHistory();
  const auth = useAuth();
  const [t, i18n] = useTranslation();

  const changeLang = () => {
    i18n.language === 'ru'
      ? i18n.changeLanguage('en')
      : i18n.changeLanguage('ru');
  };

  const makeRedirect = (to, history) => history.replace(to);

  const redirectToMain = () => {
    makeRedirect('./', history);
  };

  const logOut = () => {
   const logOutHandler = () => {
      makeRedirect('./', history);
   };
    
    auth.logout(logOutHandler);
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <h1><a className="text-light" href="#" onClick={redirectToMain}>Hexlet Chat</a></h1>
    <div>
        <Button type="button" variant="link" onClick={logOut}>{t('controls.logout')}</Button>
        <Button type="button" variant="link" onClick={null}>{t('controls.colorTheme')}</Button>
        <Button type="button" variant="link" onClick={changeLang}>{t('controls.lang')}</Button>
    </div>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
