import React from 'react';

import { useHistory } from 'react-router-dom';
import {
  Card, Form, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import paths from '../routes.js';
import { useAuth } from '../features/authorization.js';
import MainNavbar from './MainNavbar.jsx';

const schema = yup.object().shape({
  username:
    yup
      .string()
      .required('required')
      .min(3, 'nameLength')
      .max(20, 'nameLength'),
  password: yup.string().required('required').min(6, 'passLength'),
  passwordConfirm: yup.string().required('required')
    .oneOf([yup.ref('password'), null], 'must_match'),
});

const SignupForm = () => {
  const auth = useAuth();
  const history = useHistory();
  const [t] = useTranslation();

  const makeRedirect = (to, historyList) => historyList.replace(to);

  const sendForm = async (values, formik) => {
    try {
      await auth.signup(values);
      formik.setStatus('Auth success');
      makeRedirect(paths.mainPage(), history);
    } catch (err) {
      if (err.response.status === 409) {
        formik.setFieldError('username', 'already_in_use');
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: (e) => e.preventDefault(),
    onSubmit: sendForm,
    validationSchema: schema,
  });
  const {
    handleSubmit, handleChange, values, touched, errors,
  } = formik;
  return (
    <>
      <MainNavbar />
      <Card className="mx-auto mt-3" style={{ width: '20rem' }}>
        <Card.Header><h4>{t('auth.signup')}</h4></Card.Header>
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
              <Form.Control.Feedback type="invalid">
                {t(`validationErrors.${errors.username}`)}
              </Form.Control.Feedback>
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
            <Form.Group controlId="formBasicPasswordConf">
              <Form.Label>{t('auth.passwordConfirm')}</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirm"
                values={values.passwordConfirm}
                onChange={handleChange}
                isValid={touched.passwordConfirm && !errors.passwordConfirm}
                isInvalid={!!errors.passwordConfirm}
                placeholder={t('auth.repeatPassword')}
              />
              <Form.Control.Feedback type="invalid">
                {t(`validationErrors.${errors.passwordConfirm}`)}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              {t('auth.make_registration')}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default SignupForm;
