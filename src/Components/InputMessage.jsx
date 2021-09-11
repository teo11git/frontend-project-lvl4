import React, { useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useApi } from '../features/socketAPI.js';
import { useAuth } from '../features/authorization.js';

const schema = yup.object().shape({
  message:
    yup
      .string()
      .required('required')
      .trim()
      .max(280, 'charMax'),
});

const InputMessage = () => {
  const [t] = useTranslation();
  const socketApi = useApi();
  const { user } = useAuth();
  const input = useRef(null);
  const id = useSelector((state) => state.channels.currentChannelId);

  useEffect(() => {
    input.current.focus();
  });

  const sendMessage = async (data, formik) => {
    const { message: text } = data;
    const message = { text, autor: user, channelId: id };
    formik.setSubmitting(true);
    try {
      await socketApi.sendNewMessage(message);
      formik.resetForm();
      formik.setSubmitting(false);
    } catch (error) {
      formik.setFieldError('message', { key: error });
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: sendMessage,
    validationSchema: schema,
  });

  const {
    handleSubmit, handleChange, values, touched, errors, isSubmitting,
  } = formik;

  return (
    <div className="mt-auto">
      <Form
        onSubmit={handleSubmit}
        noValidate
        className="d-flex ml-1 row"
        autoComplete="off"
      >
        <Form.Control
          type="text"
          name="message"
          placeholder={t('controls.enterMessage')}
          onChange={handleChange}
          value={'' || values.message}
          isValid={touched.username && !errors.message}
          isInvalid={!!errors.message}
          readOnly={isSubmitting}
          className="col-10"
          data-testid="new-message"
          ref={input}
        />
        <Button type="submit" variant="outline-success" disabled={isSubmitting} className="ml-1">{t('controls.sendMessage')}</Button>
        <Form.Control.Feedback
          className="col-9"
          type="invalid"
        >
          {t(`validationErrors.${errors.message}`)}
        </Form.Control.Feedback>
      </Form>
    </div>
  );
};

export default InputMessage;
