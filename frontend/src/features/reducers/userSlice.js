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


export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ email, password }) => {
    console.log('email',email,password);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({ username: email, password });

      const { data } = await axios.post('/api/users/login/', body, config);
      console.log('fetchUser', data);
      return data;
    } catch (error) {
      console.error('fetchUser error:', error);
      throw error;
    }
  }
);

const UserSlice=createSlice({
    name:'userLogin',
    initialState:{
        userInfo:localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
        isLoading: false,
    },
    reducers:{
      logout:(state)=>{
        state.userInfo=null;
      }
    },
    // extraReducers: (builder) => {
    //     builder
    //       .addCase(fetchUser.pending, (state) => {
    //         state.isLoading = true;
    //       })
    //       .addCase(fetchUser.fulfilled, (state, action) => {
    //         // // console.log(action);
    //         state.isLoading = false;
    //         // state.userInfo.push(action.payload);
    //         state.userInfo=action.payload;
            
    //         localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    //       })
    //       .addCase(fetchUser.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.error = action.error.message; // Store the error message in state if needed
    //         console.log('fetchUser rejected:', action.error.message);
      
    
    //       });
    //   },
    
    
    // })
    extraReducers: (builder) => {
      builder
        .addCase(fetchUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.userInfo = action.payload;
          localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
          console.log('fetchUser rejected:', action.error.message);
        })
        .addCase(fetchRegister.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchRegister.fulfilled, (state, action) => {
          state.isLoading = false;
          state.userInfo = action.payload;
          localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        })
        .addCase(fetchRegister.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
          console.log('fetchRegister rejected:', action.error.message);
        });
    },
  });

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;
