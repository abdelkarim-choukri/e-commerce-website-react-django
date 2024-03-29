import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrderCreate = createAsyncThunk(
  'orderCreate/fetchOrderCreate',
  async ({ order}, { getState } ) => {

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

      const body = JSON.stringify({ order });


      const { data } = await axios.post('/api/orders/add/', order, config);

      return data;
    } catch (error) {
      console.error('fetchUser error:', error);
      throw error;
    }
  }
);




const orderCreateSlice = createSlice({
  name: 'orderCreate',
  initialState: {
    order: {},
    isLoading: false,
    success: false,
  },
  reducers: {
    orderReset:(state)=>{
      state.order = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderCreate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderCreate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
        state.success= true,

        localStorage.setItem('order', JSON.stringify(state.order));
      })
      .addCase(fetchOrderCreate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message;

      })
      
  },
});

export const { orderReset } = orderCreateSlice.actions;
export default orderCreateSlice.reducer;


