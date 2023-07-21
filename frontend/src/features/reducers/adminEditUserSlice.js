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
        
        const {data}=await axios.delete(`/api/users/delete/${id}/`,config);
        
        return data ;
    } catch (error){
        
        throw error
    }
});

export const adminUpdateUser = createAsyncThunk('users/adminUpdateUser',
async({id,user},{getState})=>{
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config={
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }
    }
    
    
    
    const body = JSON.stringify({ user });
    
    

    const {data}=await axios.put(`/api/users/update/${id}/`,user,config)
    return data ;
  } catch (error) {
    
    throw error
  }

}
)

const adminEditUsertSlice=createSlice({
    name:'adminEditUser',
    initialState:{
        userslist:{
            Loading:false,
            users:[],
        },
        deleteUser:{
            success:false,
            Loading:false,
        },
        updateUser:{
          success:false,
          Loading:false,
        }

        
    },
    reducers:{
        deleteUser:(id)=>{
            getUserDeleted(id)
          },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getUsersList.pending,(state)=>{
            state.userslist.Loading=true;
        })
        .addCase(getUsersList.fulfilled,(state,action)=>{
            state.userslist.Loading=false;
            state.userslist.users=action.payload
        })
        .addCase(getUsersList.rejected,(state,action)=>{
            state.userslist.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message;        
        })
        //delete
        .addCase(getUserDeleted.pending,(state)=>{
            state.deleteUser.Loading=true;
        })
        .addCase(getUserDeleted.fulfilled,(state,action)=>{
            state.deleteUser.Loading=false;
            state.deleteUser.success=true;
        })
        .addCase(getUserDeleted.rejected,(state,action)=>{
            state.deleteUser.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message; 
        })
        //update
        .addCase(adminUpdateUser.pending,(state)=>{
          state.updateUser.Loading=true;
        })
        .addCase(adminUpdateUser.fulfilled,(state,action)=>{
            state.updateUser.Loading=false;
            state.updateUser.success=true;
        })
        .addCase(adminUpdateUser.rejected,(state,action)=>{
            state.updateUser.Loading=false;
            state.updateUser.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message; 
        })
               
    }
}
);

export const { deleteUser} = adminEditUsertSlice.actions;
export default adminEditUsertSlice.reducer;