import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice';
import productReducer from './features/product/productSlice';
import ordersReducer from './features/orders/orderSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    products : productReducer,
    orders : ordersReducer
  },
});
