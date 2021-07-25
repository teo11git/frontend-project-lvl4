import React from 'react';

import * as yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { Modal, Form, Button } from 'react-bootstrap';
import { setModalShow } from '../../slices/uiSlice.js';
import { useApi } from '../../features/socketAPI.js';

const ChannelRename = () => {
  const socketApi = useApi();
	const dispatch = useDispatch();

  const channels = useSelector(({ channels }) => channels);
  console.log(channels);
  const neededId = useSelector((state) => state.ui.editChannelId);
  console.log('needed id is', neededId);
  const oldName = channels.find((ch) => ch.id === neededId).name;
  console.log(`old name is ${oldName}`);
	const existedNames = channels.map((ch) => ch.name);
  console.log(existedNames);
  const show = useSelector((state) => state.ui.modalShow);
	const schema = yup.object().shape({
		name:
			yup
				.string()
				.required()
				.trim()
				.lowercase()
				.max(30)
				.notOneOf(existedNames)
	});

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
 
	const sendName = async (values, formik) => {
		const channel = { name: values.name, removable: true }
    setFormikState('submitting', formik);
    try {
      await socketApi.renameChannel(channel);
      await setFormikState('success', formik);
      dispatch(setModalShow({ show: false }));
    } catch(e) {
      console.log(e);
      setFormikState('failed', formik);
    }
	};

	const handleClose = () => {
		dispatch(setModalShow({ show: false}));
	};

	const formik = useFormik({
		initialValues: {
			name: oldName,
    },
		onSubmit: sendName,
		validationSchema: schema,
		validateOnChange: false,
		validateOnBlur: false,
	});

	const { handleSubmit, handleChange, values, touched, errors } = formik;

  console.log('values is', values);
	return (
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Set channel name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      		<Form
        		onSubmit={handleSubmit}
        		noValidate
					>
						<Form.Group className="row mx-1">
        			<Form.Control
								className="col-10"
          			type="text"
          			name="name"
          			placeholder="Channel name"
          			onChange={handleChange}
          			value={values.name}
          			isValid={touched.name && !errors.name}
          			isInvalid={!!errors.name}
        			/>
        			<Button type="submit" variant="dark" className="ml-auto">
                Update
              </Button>
							<Form.Control.Feedback type="invalid" className="col-9">{errors.name}</Form.Control.Feedback>
						</Form.Group>
					</ Form>
        </Modal.Body>
      </Modal>
  );

}

export default ChannelRename;


