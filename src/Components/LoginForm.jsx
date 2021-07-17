import React, { useContext } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import {
  Card, Form, Button, Alert,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import paths from '../routes.js';

import { useAuth } from '../features/validation.js';

const schema = yup.object().shape({
  username: yup.string().required('No name provided'),
  password: yup.string().required('No password provided'),
});

const LoginForm = () => {
  const auth = useAuth();
  const location = useLocation();
  const history = useHistory();

  const makeRedirect = (to, history) => {
    history.replace(to);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const sendForm = (values, formik) => {
    const onSuccess = () => {
      formik.setStatus('Auth success');
      makeRedirect(paths.mainPagePath(), history);
    };
    const onError = () => {
      formik.setStatus('Auth error');
    };
    auth.signin(values, onSuccess, onError);
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
            <Form.Control.Feedback
              type="invalid"
            >
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
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
  );
};

export default LoginForm;
