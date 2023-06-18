import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

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
      });
  },
});



// Export the userSlice reducer
export default userSlice.reducer;

