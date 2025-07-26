import { getOrdersAsync } from "./orderApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    loading: false,
    error : null
}

const orderSlice = createSlice({
    name :'orders',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getOrdersAsync.pending , ()=>{
            return {loading : true , error : null }
        })
        .addCase(getOrdersAsync.fulfilled , (state , action)=>{
            state.orders = action.payload;
            state.loading = false ;
            state.error = null ;
        })
        .addCase(getOrdersAsync.rejected , (state , action)=>{
            state.loading = false ;
            state.error = action.error.message ;
        });
    }
})

export default orderSlice.reducer ; 