import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import _ from 'lodash';

import { myApi } from '../features/socketAPI.js';

const initialState = [];

// createNewChannel
// renameChannel
// removeChannel

export const createNewChannel = createAsyncThunk(
  'channels/createNewChannel',
  async (channel, socketApi) => {
    const responce = await myApi.createNewChannel(channel);
    console.log(responce);
    return responce;
  },
);

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    synchronizeChannels: (state, { payload }) => {
      return payload.channels;
    },
    addChannel: (state, action) => {
      console.log('add channel!');
      state = state.push(action.payload);
    },
    renameChannel: (state, { payload: channel }) => {
      console.log('rename channel!');
      const { id } = channel;
      const index = state.findIndex((ch) => ch.id === id);
      state[index] = channel;
    },
    deleteChannel: (state, { payload }) => {
      console.log('delete channel');
      const index = payload.id
      _.remove(state, (ch) => ch.id === index);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewChannel.fulfilled, (state, action) => {
      console.log(action);
      state.push(action.payload);
    })
  },
});

console.log(channelsSlice.actions);

export const { addChannel, renameChannel, deleteChannel, synchronizeChannels
} = channelsSlice.actions;

export default channelsSlice.reducer;
