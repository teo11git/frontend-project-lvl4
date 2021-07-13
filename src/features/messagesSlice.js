import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state = state.push(action.payload);
    },
    deleteMessage: () => {},
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
