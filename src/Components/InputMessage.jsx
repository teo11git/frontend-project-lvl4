import React, { useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useApi } from '../features/socketAPI.js';
import { useAuth } from '../features/authorization.js';

yup.setLocale({
  mixed: {
    required: () => ({ key: 'required' }),
  },
  string: {
    max: ({ max }) => ({ key: 'charMax', value: max }),
  },
});

const schema = yup.object().shape({
  message:
    yup
      .string()
      .required()
      .trim()
      .max(280),
});

const InputMessage = () => {
  const [t] = useTranslation();
  const socketApi = useApi();
  const { user } = useAuth();
  const input = useRef(null);
  const id = useSelector((state) => state.channels.currentChannelId);
  console.log(`Render input message component id:${id}`);

  useEffect(() => {
    console.log('Effect!!!');
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
      console.log(error);
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
          {t(`validationErrors.${errors?.message?.key}`, { n: errors?.message?.value })}
        </Form.Control.Feedback>
      </Form>
    </div>
  );
};

export default InputMessage;
