import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Modal, Button } from 'react-bootstrap';

import { useApi } from '../../features/socketAPI.js';

const DeleteConfirmation = ({ closeModal }) => {
  const editChannelId = useSelector(({ ui }) => ui.editChannelId);
  const currentChannel = useSelector((state) => state.channels.channels)
    .find((ch) => ch.id === editChannelId);
  const [isSubmitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);
  const [t] = useTranslation();
  const socketApi = useApi();

  const deleteChannel = async () => {
    setSubmitting(true);
    try {
      await socketApi.removeChannel({ id: currentChannel.id });
      setSubmitting(false);
      closeModal();
    } catch (err) {
      setErrors(err);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.confirmDelete')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {`${t('modals.removeChannel')} `}
          <b>
            #
            {currentChannel?.name}
          </b>
          ?
        </p>
        {
            (errors
              ? (<p className="text-danger">{t(`validationErrors.${errors}`)}</p>)
              : null)
          }
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={deleteChannel}
          disabled={isSubmitting}
        >
          {t('modals.yes')}
        </Button>
        <Button
          variant="dark"
          onClick={closeModal}
          disabled={isSubmitting}
        >
          {t('modals.no')}
        </Button>
      </Modal.Footer>
    </>

  );
};

export default DeleteConfirmation;
