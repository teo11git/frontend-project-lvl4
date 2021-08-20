/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import _ from 'lodash';

import store from '../store.js';

const initialState = {
  channels: [],
  currentChannelId: null,
};

// createNewChannel
// renameChannel
// removeChannel
/*
export const createNewChannel = createAsyncThunk(
  'channels/createNewChannel',
  async (channel, socketApi) => {
    const responce = await myApi.createNewChannel(channel);
    console.log(responce);
    return responce;
  },
);
*/
export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    synchronizeChannels: (state, { payload }) => { state.channels = payload.channels },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload.id;
    },
    renameChannel: (state, { payload: channel }) => {
      const { id } = channel;
      const index = state.findIndex((ch) => ch.id === id);
      state.channels[index] = channel;
    },
    deleteChannel: (state, { payload }) => {
      const index = payload.id;
      const currentChannelId = state.currentChannelId;
      if (currentChannelId === index) {
        store.dispatch(setCurrentChannelId({ id: 1 }));
      }

      _.remove(state.channels, (ch) => ch.id === index);
    },
  },
  /*
  extraReducers: (builder) => {
    builder.addCase(createNewChannel.fulfilled, (state, action) => {
      console.log(action);
      state.push(action.payload);
    });
  },
  */
});

export const {
  addChannel, renameChannel, deleteChannel, synchronizeChannels, setCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
