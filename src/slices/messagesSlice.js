import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { myApi } from '../features/socketAPI.js';

const initialState = [];

export const sendNewMessage = createAsyncThunk(
  'messages/sendNewMessage',
  async (message) => {
    const responce = await myApi.sendNewMessage(message);
    return responce;
  }
);

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state = state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendNewMessage.fulfilled, (state,action) => {
      state.push(action.payload);
    })
  }

});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
