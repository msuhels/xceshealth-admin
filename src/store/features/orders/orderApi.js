import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../../utils/axiosClient";
import { GET_ORDERS } from "../../../api/apiUrl";

export const getOrdersAsync = createAsyncThunk('orders/getOrders',async ()=>{
    const response = await axiosClient.get(GET_ORDERS);
    return response.data;
});
