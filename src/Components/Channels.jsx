import React from 'react';
import {
  Container,
  Button,
  Nav,
  Dropdown,
} from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { setModalShow, setModalType, setEditChannel } from '../slices/uiSlice.js';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice.js';

const Channel = ({ channel }) => {
  const { id, name, removable } = channel;
  const isRemovable = removable === true;
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const switchChannel = (currentId) => () => {
    dispatch(setCurrentChannelId({ id: currentId }));
  };

  const openRenameModal = () => {
    dispatch(setEditChannel({ id }));
    dispatch(setModalType({ type: 'renameChannel' }));
    dispatch(setModalShow({ show: true }));
  };

  const openDeleteConfirmModal = () => {
    dispatch(setEditChannel({ id }));
    dispatch(setModalType({ type: 'deleteConfirmation' }));
    dispatch(setModalShow({ show: true }));
  };

  return (
    <Nav.Item className="d-flex justify-content-between">
      <Button variant="pills" className="w-100 rounded-0 text-left" onClick={switchChannel(id)}>
        <span className="me-1">#</span>
        {name}
      </Button>
      { isRemovable
        ? (
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" className="border-0" id="dropdown-basic">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={openRenameModal}>{t('controls.changeChannel')}</Dropdown.Item>
              <Dropdown.Item href="#" onClick={openDeleteConfirmModal}>{t('controls.deleteChannel')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : null}
    </Nav.Item>
  );
};

const ChannelBox = () => {
  const channels = useSelector((state) => state.channels);
  return (
    <Nav variant="tabs" className="flex-column flex-nowrap mt-1 pt-1 px-2 scroll-enabled">
      {channels.map((channel) => <Channel key={channel.id} channel={channel} />)}
    </Nav>
  );
};

const ChannelsHeader = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(setModalType({ type: 'channelNameInput' }));
    dispatch(setModalShow({ show: true }));
  };

  return (
    <Container className="d-flex flex-row justify-content-between py-3 border-bottom">
      <h4>{t('headers.channels')}</h4>
      <Button variant="outline-success" type="button" onClick={openModal}>{t('controls.addChannel')}</Button>
    </Container>
  );
};

const Channels = () => (
  <>
    <ChannelsHeader />
    <ChannelBox />
  </>
);

export default Channels;
