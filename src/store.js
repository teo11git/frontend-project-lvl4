import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './features/channelsSlice.js';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
  },
});
