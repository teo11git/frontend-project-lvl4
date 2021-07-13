import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      state = state.push(action.payload);
    },
    renameChannel: () => {},
    deleteChannel: () => {},
  },
});

export const { addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
