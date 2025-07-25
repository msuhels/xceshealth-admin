import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../../utils/axiosClient';
import { GET_USERS ,GET_TUTORS , USER_INFO , GET_PATHOLOGIST } from '../../../api/apiUrl';

export const getUsersAsync = createAsyncThunk('user/getUsers', async () => {
  const response = await axiosClient.get(GET_USERS);
  return response.data;
});

export const getUserInfoAsync = createAsyncThunk('user/getUserInfo', async () => {
  const response = await axiosClient.get(USER_INFO);
  console.log("response.data",response.data)
  return response.data;
});

export const getTutorsAsync = createAsyncThunk('user/getTutors', async () => {
  const response = await axiosClient.get(GET_TUTORS);
  return response.data;
});

export const getPathologistAsync = createAsyncThunk('user/getPathologists', async () => {
  const response = await axiosClient.get(GET_PATHOLOGIST);
  return response.data;
});
