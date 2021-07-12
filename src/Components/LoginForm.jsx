import React, { useContext } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import {
  Card, Form, Button, Alert,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import paths from '../routes.js';
import AuthContext from '../Contexts/AuthContext.js';

const schema = yup.object().shape({
  username: yup.string().required('No name provided'),
  password: yup.string().required('No password provided'),
});

const LoginForm = () => {
  const { isLoggedIn, setLoginState } = useContext(AuthContext);

  const location = useLocation();

  const history = useHistory();

  const makeRedirect = (to, history) => {
    history.replace(to);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const setToLocalStorage = (values) => {
    Object.entries(values).forEach(([key, value]) => window.localStorage.setItem(key, value));
  };

  const sendForm = async ({ username, password }, formik) => {
    console.log(`Start submit ${username} / ${password}`);
    try {
      const { data } = await axios.post('api/v1/login', {
        username, password,
      });

      await setToLocalStorage({
        token: data.token,
        username: data.username,
      });

      await formik.setStatus('Authentification success');
      await setLoginState(true);
      await makeRedirect(paths.mainPagePath(), history);
    } catch (e) {
      console.log(e);
      formik.setStatus('Authentification error');
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: submitHandler,
    onSubmit: sendForm,
    validationSchema: schema,
    myAuthError: null,
  });
  const {
    handleSubmit, handleChange, values, touched, errors,
  } = formik;
  return (
    <Card className="mx-auto" style={{ width: '20rem' }}>
      <Card.Body>
        <Form
          onSubmit={handleSubmit}
          noValidate
        >
          <Form.Group controlId="formBasicName">
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={handleChange}
              values={values.username}
              isValid={touched.username && !errors.username}
              isInvalid={!!errors.username}
              placeholder="Enter name"
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              values={values.password}
              onChange={handleChange}
              isValid={touched.password && !errors.password}
              isInvalid={!!errors.password}
              placeholder="Password"
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
      {formik.status === 'Authentification error'
        ? (
          <Card.Footer>
            <Alert variant="danger" className="text-center">Cannot found username or password!</Alert>
          </Card.Footer>
        )
        : null}
    </Card>
  );
};

export default LoginForm;
