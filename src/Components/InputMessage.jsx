import React from 'react';

import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useApi } from '../features/socketAPI.js';

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
  const { id } = useSelector((state) => state.currentChannelId);
  const user = useSelector((state) => state.authentification.user);

  const setFormikState = (state, formik) => {
    switch (state) {
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
      await socketApi.sendNewMessag(message); //e
      await setFormikState('success', formik);
    } catch (error) {
      console.log(error);
      formik.setFieldError('message', { key: error });
      setFormikState('failed', formik);
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
