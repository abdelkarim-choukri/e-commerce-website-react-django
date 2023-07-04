import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProductDeleted = createAsyncThunk('adminProductManagement/getProductDeleted',
async({id},{getState})=>{
    try {
        const {
            userLogin:{userInfo},
        }=getState();

        const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          };     
        const {data}=await axios.delete(`/api/products/delete/${id}/`,config)
        return data;
    } catch (error) {
        console.log(error) ;
        throw error
    }


}
)

const adminEditProductSlice=createSlice({
    name:'adminEditProduct',
    initialState:{
        deleteProduct:{
            success:false,
            Loading:false,
        }
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getProductDeleted.pending,(state)=>{
            state.deleteProduct.Loading=true;
        })
        .addCase(getProductDeleted.fulfilled,(state)=>{
            state.deleteProduct.Loading=false;
            state.deleteProduct.success=true;
        })
        .addCase(getProductDeleted.rejected,(state)=>{
            state.deleteProduct.Loading=false;
            state.deleteProduct.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message; 
        })
    }
}
)


export default adminEditProductSlice.reducer;