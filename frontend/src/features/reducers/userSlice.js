import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRegister = createAsyncThunk(
  'user/fetchRegister',
  async ({name, email, password}) => {
    console.log('email',email,password);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({ name:name,email:email, password:password });

      const { data } = await axios.post('/api/users/register/', body, config);
      console.log('fetchUser', data);
      return data;
      }catch (error) {
        console.error('fetchUser error:', error);
        throw error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message;
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

      const body = JSON.stringify({ username:email, password:password });

      const { data } = await axios.post('/api/users/login/', body, config);
      console.log('fetchUser', data);
      return data;
    } catch (error) {
      console.error('fetchUser error:', error);
      throw error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message;
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
        error: null, 
    },
    reducers:{
      logout:(state)=>{
        state.userInfo = null;
      },
      update:(state,action)=>{
        // const user = JSON.parse(localStorage.getItem('userInfo'));
        state.userInfo=Object.assign(state.userInfo,action.payload)  ;
        console.log('update ',state.userInfo)
      }
    },

    extraReducers: (builder) => {
      builder
    // fetch user
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
          console.log(action)
          state.error=action.error.message;
        })
        // register 
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
          state.error=action.error.message;
        });
    },
  });

export const { logout ,update } = UserSlice.actions;
export default UserSlice.reducer;
