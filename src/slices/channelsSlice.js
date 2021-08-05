/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import _ from 'lodash';

const initialState = [];

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
    synchronizeChannels: (state, { payload }) => payload.channels,
    addChannel: (state, action) => {
      state.push(action.payload);
    },
    renameChannel: (state, { payload: channel }) => {
      const { id } = channel;
      const index = state.findIndex((ch) => ch.id === id);
      state[index] = channel;
    },
    deleteChannel: (state, { payload }) => {
      const index = payload.id;
      _.remove(state, (ch) => ch.id === index);
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
  addChannel, renameChannel, deleteChannel, synchronizeChannels,
} = channelsSlice.actions;

export default channelsSlice.reducer;
