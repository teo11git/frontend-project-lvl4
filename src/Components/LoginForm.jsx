import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('No name provided'),
  password: yup.string().required('No password provided'),
});

const submitHandler = (e) => {
  e.preventDefault();
};

const submitForm = (values, formik) => {
  alert(JSON.stringify(values, null, 2));
};

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: submitHandler,
    onSubmit: submitForm,
    validationSchema: schema,
  });
  const {
    handleSubmit, handleChange, values, touched, errors,
  } = formik;
  console.log(formik);
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
              onChange={formik.handleChange}
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
              onChange={formik.handleChange}
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
    </Card>
  );
};

export default LoginForm;
