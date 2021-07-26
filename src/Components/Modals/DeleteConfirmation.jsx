import React from 'react';

import { Modal, Button } from 'react-bootstrap';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useApi } from '../../features/socketAPI.js';

const DeleteConfirmation = ({ channel, closeModal }) => {
  const [isButtonsDisabled, setDisabled] = useState(false);
  const socketApi = useApi();
  const dispatch = useDispatch();

  const deleteChannel = async() => {
    setDisabled(true);
    try {
      await socketApi.removeChannel({ id: channel.id });
      closeModal();
    } catch(e) {
      console.log(e);
      setDisabled(false);
    }
  };

  return (
     <>
       <Modal.Header closeButton>
          <Modal.Title>Please, confrirm delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Remove channel <b>#{channel?.name}</b></p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={deleteChannel}
            disabled={isButtonsDisabled}
          >Yes</Button>
          <Button
            variant="dark"
            onClick={closeModal}
            disabled={isButtonsDisabled}
          >No</Button>
        </Modal.Footer>
      </>

  )
};

export default DeleteConfirmation;
