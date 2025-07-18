import { createSlice } from '@reduxjs/toolkit';
import { getUsersAsync , getTutorsAsync , getPathologistAsync , getUserInfoAsync } from './userApi';

const initialState = {
  users: [],
  tutors : [],
  pathologists : [],
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
      })
      //for tutors
      .addCase(getTutorsAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getTutorsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tutors = action.payload.users;
      })
      .addCase(getTutorsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //for pathologists
      .addCase(getPathologistAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getPathologistAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pathologists = action.payload.users;
      })
      .addCase(getPathologistAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // for logged in user info
      .addCase(getUserInfoAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getUserInfoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

  },
});

export default usersSlice.reducer;
