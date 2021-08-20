import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';
import authentificationReducer from './slices/authentificationSlice.js';
import uiSliceReducer from './slices/uiSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    authentification: authentificationReducer,
    ui: uiSliceReducer,
  },
});
