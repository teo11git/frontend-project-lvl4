/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalShow: false,
  modalType: 'channelNameInput',
  editChannelId: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModalShow: (state, { payload }) => {
      state.modalShow = payload.show;
    },
    setModalType: (state, { payload }) => {
      state.modalType = payload.type;
    },
    setEditChannel: (state, { payload }) => {
      state.editChannelId = payload.id;
    },
  },
});

export const { setModalShow, setModalType, setEditChannel } = uiSlice.actions;

export default uiSlice.reducer;
