import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../../utils/axiosClient";
import { GET_PRODUCT } from "../../../api/apiUrl";

export const getProductsAsync = createAsyncThunk('products/getProducts',async ()=>{
    const response = await axiosClient.get(GET_PRODUCT);
    return response.data;
});
