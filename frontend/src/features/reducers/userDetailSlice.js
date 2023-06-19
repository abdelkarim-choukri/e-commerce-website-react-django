import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchUser } from './userSlice';



// Define the initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
  success:false,
};
// const dispatch = useDispatch(); 
// Create the async thunk
export const fetchUserDetail = createAsyncThunk(
  'user/fetchUserDetail',
  async ({ id }, { getState }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.get(`/api/users/${id}/`, config);
      const data = response.data;
      console.log('insade the fetch');
      return data;
    } catch (error) {
      console.error('fetchUserDetail error:', error);
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
);

export const updatUserDetail= createAsyncThunk(
  'user/UpdateUserDetail',
  async ({ name,email,password }, { getState }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const body = JSON.stringify({ name:name,email:email, password:password });

      const response = await axios.put(`/api/users/profile/update/`,body, config);
      const data = response.data;
      console.log("from update ")
      
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      // dispatch(fetchUser({ email:data.email , password:data.password }));

      return data;
    } catch (error) {
      console.error('fetchUserDetail error:', error);
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
);


// Create the user slice
const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //fetch User Detail
      .addCase(fetchUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // update user detail
      .addCase(updatUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.success= true,
        state.user = action.payload;
        console.log('addCase of update',action.payload);
       
        
      })
      .addCase(updatUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});



// Export the userSlice reducer
export default userSlice.reducer;

