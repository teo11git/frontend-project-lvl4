import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';
import currentChannelIdReducer from './slices/currentChannelIdSlice.js';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannelId: currentChannelIdReducer,
  },
});
