import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import ChannelNameInput from './ChannelNameInput.jsx';
import ChannelRename from './ChannelRename.jsx';
import DeleteConfirmation from './DeleteConfirmation.jsx';

import { setModalShow } from '../../slices/uiSlice.js';

const Modals = () => {
  const allModalsMap = {
    channelNameInput: ChannelNameInput,
    deleteConfirmation: DeleteConfirmation,
    renameChannel: ChannelRename,
  };

  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.ui.modalType);
  const modalShow = useSelector((state) => state.ui.modalShow);

  const handleClose = () => {
    dispatch(setModalShow({ show: false }));
  };

  const CurrentModal = allModalsMap[modalType];
  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
    >
      <CurrentModal
        closeModal={handleClose}
      />
    </Modal>
  );
};

export default Modals;
