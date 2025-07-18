import { getProductsAsync } from "./productApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: false,
    error : null
}

const productsSlice = createSlice({
    name :'products',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getProductsAsync.pending , ()=>{
            return {loading : true , error : null }
        })
        .addCase(getProductsAsync.fulfilled , (state , action)=>{
            state.products = action.payload;
            state.loading = false ;
            state.error = null ;
        })
        .addCase(getProductsAsync.rejected , (state , action)=>{
            state.loading = false ;
            state.error = action.error.message ;
        });
    }
})

export default productsSlice.reducer ; 