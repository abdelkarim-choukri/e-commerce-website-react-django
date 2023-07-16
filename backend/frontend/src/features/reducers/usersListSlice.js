import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsersList=createAsyncThunk('users/getUsersList',
async(_,{ getState })=>{
    try{
        const {
          userLogin: { userInfo },
        } = getState();
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };        
        const {data}=await axios.get('/api/users/',config);
        return data ;
    } catch (error){
        console.log(error) ;
        throw error
    }
});

export const getUserDeleted=createAsyncThunk('users/getUserDeleted',
async({id},{ getState })=>{
    try{
        const {
          userLogin: { userInfo },
        } = getState();
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };     
        console.log(id)   
        const {data}=await axios.delete(`/api/users/delete/${id}/`,config);
        console.log(data)
        return data ;
    } catch (error){
        console.log(error) ;
        throw error
    }
});

const usersListSlice=createSlice({
    name:'userslist',
    initialState:{  
        Loading:false,
        users:[],
        success:false
    },
    reducers:{
        deleteUser:(id)=>{
            getUserDeleted(id)
          },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getUsersList.pending,(state)=>{
            state.Loading=true;
        })
        .addCase(getUsersList.fulfilled,(state,action)=>{
            state.Loading=false;
            state.users=action.payload
        })
        .addCase(getUsersList.rejected,(state,action)=>{
            state.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message;        
        })
        //delete
        .addCase(getUserDeleted.pending,(state)=>{
            state.Loading=true;
        })
        .addCase(getUserDeleted.fulfilled,(state,action)=>{
            state.Loading=false;
            state.success=true;
        })
        .addCase(getUserDeleted.rejected,(state,action)=>{
            state.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message; 
        })
        
        
    }

}
);

export const { deleteUser} = usersListSlice.actions;
export default usersListSlice.reducer;