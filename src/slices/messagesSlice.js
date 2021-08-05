import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
/*
export const sendNewMessage = createAsyncThunk(
  'messages/sendNewMessage',
  async (message) => {
    const responce = await myApi.sendNewMessage(message);
    return responce;
  },
);
*/
export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    synchronizeMessages: (state, { payload }) => payload.messages,
    addMessage: (state, action) => {
      state.push(action.payload);
    },
  },
  /*
  extraReducers: (builder) => {
    builder.addCase(sendNewMessage.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
  */
});

export const { addMessage, synchronizeMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
