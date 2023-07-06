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

export const getProdectCreated=createAsyncThunk('adminProductManagement/getProdectCreated',
async({product},{getState})=>{
    try {
        const {
            userLogin:{userInfo}
        }=getState();

        const config={
            headers:{
                'Content-Type':"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}=await axios.post('/api/products/create/',product,config);
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

);


export const getProdectUpdated=createAsyncThunk('adminProductManagement/getProdectUpdated',
async({_id,...Updatedproduct},{getState})=>{
    try {
        const {
            userLogin:{userInfo}
        }=getState();

        const config={
            headers:{
                'Content-Type':"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        console.log({_id},Updatedproduct)
        const {data}=await axios.put(`/api/products/update/${_id}/`,Updatedproduct,config);
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

);


const adminEditProductSlice=createSlice({
    name:'adminEditProduct',
    initialState:{
        deleteProduct:{
            success:false,
            Loading:false,
        },
        createProduct:{
            success:false,
            Loading:false,
            product:{}
        },
        updatedproduct:{
            success:false,
            Loading:false,
        },
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
        //delete
        .addCase(getProductDeleted.pending,(state)=>{
            state.deleteProduct.Loading=true;
            state.deleteProduct.success=false;
        })
        .addCase(getProductDeleted.fulfilled,(state)=>{
            state.deleteProduct.Loading=false;
            state.deleteProduct.success=true;
        })
        .addCase(getProductDeleted.rejected,(state,action)=>{
            state.deleteProduct.Loading=false;
            state.deleteProduct.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message; 
        })
        //create
        .addCase(getProdectCreated.pending,(state)=>{
            state.createProduct.Loading=true;
        })
        .addCase(getProdectCreated.fulfilled,(state,action)=>{
            state.createProduct.Loading=false;
            state.createProduct.success=true;
            state.createProduct.product=action.payload;
        })
        .addCase(getProdectCreated.rejected,(state,action)=>{
            state.createProduct.Loading=false;
            state.createProduct.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message; 
        })
        //Update
        .addCase(getProdectUpdated.pending,(state)=>{
            state.updatedproduct.Loading=true;
        })
        .addCase(getProdectUpdated.fulfilled,(state,action)=>{
            state.updatedproduct.Loading=false;
            state.updatedproduct.success=true;
        })
        .addCase(getProdectUpdated.rejected,(state,action)=>{
            state.updatedproduct.Loading=false;
            state.updatedproduct.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message; 
        })
    }
}
)


export default adminEditProductSlice.reducer;