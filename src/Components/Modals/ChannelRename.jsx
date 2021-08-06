import React from 'react';

import { useTranslation } from 'react-i18next';

import * as yup from 'yup';

import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { Modal, Form, Button } from 'react-bootstrap';
import { setModalShow } from '../../slices/uiSlice.js';
import { useApi } from '../../features/socketAPI.js';

const ChannelRename = ({ channel, existedNames }) => {
  const socketApi = useApi();
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const schema = yup.object().shape({
    name:
      yup
        .string()
        .required()
        .trim()
        .lowercase()
        .max(30)
        .notOneOf(existedNames),
  });

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

  const sendName = async (values, formik) => {
    const newChannel = { ...channel, name: values.name };
    setFormikState('submitting', formik);
    try {
      await socketApi.renameChannel(newChannel);
      await setFormikState('success', formik);
      dispatch(setModalShow({ show: false }));
    } catch (err) {
      console.log(err);
      formik.setFieldError('name', { key: err });
      setFormikState('failed', formik);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: channel.name,
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
            />
            <Button type="submit" disabled={isSubmitting} variant="dark" className="ml-auto">
              {t('modals.update')}
            </Button>
            <Form.Control.Feedback type="invalid" className="col-9">
              {t(`validationErrors.${errors?.name?.key}`, { n: errors?.name?.value })}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ChannelRename;
