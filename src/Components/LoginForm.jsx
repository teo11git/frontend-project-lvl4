import React from 'react';

import { useTranslation } from 'react-i18next';

import {
  useHistory, Link,
} from 'react-router-dom';
import {
  Card, Form, Button, Alert,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import paths from '../routes.js';
import { useAuth } from '../features/authorization.js';

const schema = yup.object().shape({
  username: yup.string().required('required'),
  password: yup.string().required('required'),
});

const LoginForm = () => {
  const auth = useAuth();
  const history = useHistory();
  const [t, i18n] = useTranslation();

  /* eslint-disable no-unused-expressions */
  const changeLanguage = () => {
    i18n.language === 'ru'
      ? i18n.changeLanguage('en')
      : i18n.changeLanguage('ru');
  };
  /* eslint-enable no-unused-expressions */

  const makeRedirect = (to, historyList) => historyList.replace(to);

  const sendForm = (values, formik) => {
    const onSuccess = () => {
      formik.setStatus('Auth success');
      makeRedirect(paths.mainPagePath(), history);
    };
    const onError = () => {
      formik.setStatus('Auth error');
    };
    auth.login(values, onSuccess, onError);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: (e) => e.preventDefault(),
    onSubmit: sendForm,
    validationSchema: schema,
  });
  const {
    handleSubmit, handleChange, values, touched, errors, status,
  } = formik;
  return (
    <>
      <Button variant="link" className="float-right mr-2 my-0" onClick={changeLanguage}>{t('changeLang')}</Button>
      <Card className="mx-auto mt-3" style={{ width: '20rem' }}>
        <Card.Header><h4>{t('auth.login')}</h4></Card.Header>
        <Card.Body>
          <Form
            onSubmit={handleSubmit}
            noValidate
          >
            <Form.Group controlId="formBasicName">
              <Form.Label>{t('auth.userName')}</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={handleChange}
                values={values.username}
                isValid={touched.username && !errors.username}
                isInvalid={!!errors.username}
                placeholder={t('auth.enterName')}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">{t(`validationErrors.${errors.username}`)}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>{t('auth.password')}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                values={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
                placeholder={t('auth.enterPassword')}
              />
              <Form.Control.Feedback type="invalid">
                {t(`validationErrors.${errors.password}`)}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                {t('auth.submit')}
              </Button>
              <Link to="/signup">{t('auth.orSignup')}</Link>
            </div>
          </Form>
        </Card.Body>
        {status === 'Auth error'
          ? (
            <Card.Footer>
              <Alert variant="danger" className="text-center">
                Incorrect name or(and) password
              </Alert>
            </Card.Footer>
          )
          : null}
      </Card>
    </>
  );
};

export default LoginForm;
