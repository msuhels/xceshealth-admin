import { createSlice } from '@reduxjs/toolkit';
import { getUsersAsync } from './userApi';

const initialState = {
  users: [],
  user: null,
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.users;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
