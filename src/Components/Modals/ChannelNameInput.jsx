import React, { useRef, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { Modal, Form, Button } from 'react-bootstrap';
import { setModalShow } from '../../slices/uiSlice.js';
import { setCurrentChannelId } from '../../slices/channelsSlice.js';
import { useApi } from '../../features/socketAPI.js';
import { useAuth } from '../../features/authorization.js';

const ChannelNameInputModal = () => {
  const existedNames = useSelector((state) => state.channels.channels)
    .map((ch) => ch.name);
  const socketApi = useApi();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const input = useRef(null);
  const [t] = useTranslation();

  useEffect(() => {
    input.current.focus();
  });

  const schema = yup.object().shape({
    name:
      yup
        .string()
        .required('required')
        .trim()
        .lowercase()
        .max(30, 'channelNameLength')
        .notOneOf(
          existedNames.map((name) => name.toLowerCase()),
          'already_in_use',
        ),
  });

  const sendName = async (values, formik) => {
    const channel = { name: values.name, removable: true, autor: user };
    formik.setSubmitting(true);
    try {
      const newChannel = await socketApi.createNewChannel(channel);
      formik.resetForm();
      formik.setSubmitting(false);
      dispatch(setCurrentChannelId({ id: newChannel.id }));
      dispatch(setModalShow({ show: false }));
    } catch (err) {
      formik.setFieldError('name', err);
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    handleSubmit: (e) => e.preventDefault(),
    onSubmit: sendName,
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const {
    handleSubmit, handleChange, values, touched, errors, isSubmitting,
  } = formik;

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.createChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Form.Group className="row mx-1">
            <Form.Control
              className="col-9"
              type="text"
              name="name"
              placeholder={t('modals.channelName')}
              onChange={handleChange}
              value={values.name}
              isValid={touched.name && !errors.name}
              isInvalid={!!errors.name}
              readOnly={isSubmitting}
              data-testid="add-channel"
              ref={input}
            />
            <Button type="submit" variant="dark" disabled={isSubmitting} className="ml-auto">
              {t('modals.create')}
            </Button>
            <Form.Control.Feedback
              type="invalid"
              className="col-9"
            >
              {t(`validationErrors.${errors.name}`)}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ChannelNameInputModal;
