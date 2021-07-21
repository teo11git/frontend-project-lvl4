import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: null};

export const authSlice = createSlice({
  name: 'authentification',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.user = payload.user;
    },
  }
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
