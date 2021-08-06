import React from 'react';

import { useHistory } from 'react-router-dom';
import {
  Card, Form, Button, Alert,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import paths from '../routes.js';
import { useAuth } from '../features/authorization.js';

yup.setLocale({
  mixed: {
    required: () => ({ key: 'required' }),
    oneOf: () => ({ key: 'must_match' }),
  },
  string: {
    min: ({ min }) => ({ key: 'charMin', value: min }),
    max: ({ max }) => ({ key: 'charMax', value: max }),
  },
});

const schema = yup.object().shape({
  username:
    yup
      .string()
      .required()
      .min(3)
      .max(20),
  password: yup.string().required().min(6),
  passwordConfirm: yup.string().required()
    .oneOf([yup.ref('password'), null]),
});

const SignupForm = () => {
  const auth = useAuth();
  const history = useHistory();
  const [t, i18n] = useTranslation();

  /* eslint-disable no-unused-expressions */
  const changeLanguage = () => {
    i18n.language === 'ru'
      ? i18n.changeLanguage('en')
      : i18n.changeLanguage('ru');
  };
  /* eslint-disable no-unused-expressions */

  const makeRedirect = (to, historyList) => historyList.replace(to);

  const sendForm = (values, formik) => {
    const onSuccess = () => {
      formik.setStatus('Auth success');
      makeRedirect(paths.mainPagePath(), history);
    };
    const onError = (err) => {
      if (err === 'Conflict') {
        formik.setFieldError('username', { key: 'already_in_use' });
      }
      console.log(err);
    };
    auth.signup(values, onSuccess, onError);
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
      <Button variant="link" className="float-right mr-2 my-0" onClick={changeLanguage}>{t('changeLang')}</Button>
      <Card className="mx-auto" style={{ width: '20rem' }}>
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
                {t(`validationErrors.${errors?.username?.key}`, { n: errors?.username?.value })}
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
                {t(`validationErrors.${errors?.password?.key}`, { n: errors?.password?.value })}
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
                {t(`validationErrors.${errors?.passwordConfirm?.key}`, { n: errors?.passwordConfirm?.value })}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              {t('auth.make_registration')}
            </Button>
          </Form>
        </Card.Body>
        {formik.status === 'Auth error'
          ? (
            <Card.Footer>
              <Alert variant="danger" className="text-center">
                Cannot found username or password!
              </Alert>
            </Card.Footer>
          )
          : null}
      </Card>
    </>
  );
};

export default SignupForm;
