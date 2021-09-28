import React, { useRef, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { Modal, Form, Button } from 'react-bootstrap';
import { setModalShow } from '../../slices/uiSlice.js';
import { useApi } from '../../features/socketAPI.js';

const ChannelRename = () => {
  const existedNames = useSelector((state) => state.channels.channels)
    .map((ch) => ch.name);
  const editChannelId = useSelector(({ ui }) => ui.editChannelId);
  const currentChannel = useSelector((state) => state.channels.channels)
    .find((ch) => ch.id === editChannelId);
  const socketApi = useApi();
  const dispatch = useDispatch();
  const input = useRef();
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
        .notOneOf(existedNames.map((name) => name.toLowerCase()),
          'already_in_use'),
  });

  const sendName = async (values, formik) => {
    const newChannel = { ...currentChannel, name: values.name };
    formik.setSubmitting(true);
    try {
      await socketApi.renameChannel(newChannel);
      formik.resetForm();
      formik.setSubmitting(false);
      dispatch(setModalShow({ show: false }));
    } catch (err) {
      formik.setFieldError('name', { key: err });
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
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
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
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
              placeholder={t('modals.newName')}
              onChange={handleChange}
              value={values.name}
              isValid={touched.name && !errors.name}
              isInvalid={!!errors.name}
              readOnly={isSubmitting}
              data-testid="rename-channel"
              ref={input}
            />
            <Button type="submit" disabled={isSubmitting} variant="dark" className="ml-auto">
              {t('modals.update')}
            </Button>
            <Form.Control.Feedback type="invalid" className="col-9">
              {t(`validationErrors.${errors.name}`)}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ChannelRename;
