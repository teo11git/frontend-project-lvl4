import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  message:
    yup
      .string()
      .required()
      .trim()
      .max(280)    
});

const sendMessage = (...args) => console.log(args);

const InputMessage = () => {
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    handleSubmit: (e) => e.prevenrDefault(),
    onSubmit: sendMessage,
    validationSchema: schema
  });
  const {
    handleSubmit, handleChange, values, touched, errors,
  } = formik;
  return (
    <div className="mt-auto">
      <Form
        onSubmit={handleSubmit}
        noValidate
        className="d-flex ml-1 row">
        <Form.Control
          type="text"
          name="message"
          placeholder="Your message"
          onChange={handleChange}
          values={values.message}
          isValid={touched.username && !errors.message}
          isInvalid={!!errors.message}
        />
        <Button type="submit" variant="dark">Send</Button>
        <Form.Control.Feedback
          className=""
          type="invalid">
          {errors.message}
        </Form.Control.Feedback>
      </Form>
    </div>
  );
};

export default InputMessage;
