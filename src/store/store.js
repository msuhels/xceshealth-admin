import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice';
import productReducer from './features/product/productSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    products : productReducer
  },
});
