import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
// import { useAuth } from '../features/authorization.js';

const MainNavbar = ({ children }) => {
  const history = useHistory();
  // const auth = useAuth();
  const [t, i18n] = useTranslation();

  /* eslint-disable no-unused-expressions */
  const changeLang = () => {
    i18n.language === 'ru'
      ? i18n.changeLanguage('en')
      : i18n.changeLanguage('ru');
  };
  /* eslint-enable no-unused-expressions */

  const makeRedirect = (to, historyList) => historyList.replace(to);

  const redirectToMain = (e) => {
    e.preventDefault();
    makeRedirect('./', history);
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <h1><a className="text-light" href="/" onClick={redirectToMain}>Hexlet Chat</a></h1>
        <div>
          {children}
          <Button type="button" variant="link" className="text-light" onClick={changeLang}>{t('controls.lang')}</Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
