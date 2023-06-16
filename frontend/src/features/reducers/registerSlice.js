import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchRegister = createAsyncThunk(
  'user/fetchRegister',
  async ({ name,email, password }) => {
    console.log('email',email,password);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({ name:name,username: email, password });

      const { data } = await axios.post('/api/users/register/', { name:name,username: email, password }, config);
      console.log('fetchUser', data);
      return data;
    } catch (error) {
      console.error('fetchUser error:', error);
      throw error;
    }
  }
);

const RegisterSlice=createSlice({
    name:'userRegister',
    initialState:{
        userInfo:localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
        isLoading: false,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(fetchRegister.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchRegister.fulfilled, (state, action) => {
            // // console.log(action);
            state.isLoading = false;
            // state.userInfo.push(action.payload);
            state.userInfo=action.payload;
            
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
          })
          .addCase(fetchRegister.rejected, (state, action) => {
            state.isLoading = false;
            state.error= action.error.response && action.error.response.data.detail
            ? action.error.response.data.detail
            : action.error.message; // Store the error message in state if needed
            console.log('fetchRegister rejected:', action.error.message);
      
    
          });
      },
    
    
    })


export default RegisterSlice.reducer;
