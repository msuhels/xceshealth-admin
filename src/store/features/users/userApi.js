import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../../utils/axiosClient';
import { GET_USERS } from '../../../api/apiUrl';

export const getUsersAsync = createAsyncThunk('user/getUsers', async () => {
  const response = await axiosClient.get(GET_USERS);
  return response.data;
});
