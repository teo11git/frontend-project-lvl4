import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useApi } from '../features/socketApi.js';
import { useAuth } from '../features/authorization.js';
import { sendNewMessage } from '../slices/messagesSlice.js';

const schema = yup.object().shape({
  message:
    yup
      .string()
      .required()
      .trim()
      .max(280)    
});

const InputMessage = () => {
  const socketApi = useApi();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.currentChannelId);
  const user = useSelector((state) => state.authentification.user);
  
  const setFormikState = (state, formik) => {
    switch(state) {
      case 'submitting':
        formik.setSubmitting(true);
        break;
      case 'success':
        formik.resetForm();
        formik.setSubmitting(false);
        break;
      case 'failed':
        formik.setSubmitting(false);
        break;
      default:
        // do nothing
    }
  };

  const sendMessage = async (data, formik) => {
    const { message: text } = data;
    const message = { text, autor: user, channelId: id };
    setFormikState('submitting', formik);
    formik.setSubmitting(true);
    try {
      await socketApi.sendNewMessage(message);
      await setFormikState('success', formik);
    } catch(error) {
      console.log(error);
      setFormikState('failed', formik);
    }
  };
  
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: sendMessage,
    validationSchema: schema
  });

  const {
    handleSubmit, handleChange, values, touched, errors, isSubmitting
  } = formik;

  console.log(values);
  return (
    <div className="mt-auto">
      <Form
        onSubmit={handleSubmit}
        noValidate
        className="d-flex ml-1 row"
        autoComplete="off">
        <Form.Control
          type="text"
          name="message"
          placeholder="Your message"
          onChange={handleChange}
          value={"" || values.message}
          isValid={touched.username && !errors.message}
          isInvalid={!!errors.message}
          readOnly={isSubmitting}
          className="col-10"
        />
        <Button type="submit" variant="dark" disabled={isSubmitting} className="ml-1">Send</Button>
        <Form.Control.Feedback
          className="col-9"
          type="invalid">
          {errors.message}
        </Form.Control.Feedback>
      </Form>
    </div>
  );
};

export default InputMessage;
