/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: null };

export const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState,
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.id = payload.id;
    },
  },
});

export const { setCurrentChannelId } = currentChannelIdSlice.actions;

export default currentChannelIdSlice.reducer;
