import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const fetchpayOrder = createAsyncThunk(
  'orderPay/fetchpayOrder',
  async (id,paymentResult, { getState } ) => {
    console.log('id', id);
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

      const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult,config);
      console.log('fetchorderpay', data);
      return data;
    } catch (error) {
      console.error('fetchorderpay error:', error);
      throw error;
    }
  }
);


const orderPaySlice = createSlice({
  name: 'orderPay',
  initialState: {
    Loading:false,
    success:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Order Detail 
      .addCase(fetchpayOrder.pending, (state) => {
        state.Loading = true;
      })
      .addCase(fetchpayOrder.fulfilled, (state, action) => {
        state.Loading = false;
        state.success = true;

      })
      .addCase(fetchpayOrder.rejected, (state, action) => {
        state.Loading = false;
        state.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message;
        console.log('fetchpayOrder rejected:', action.error.message);
      });
  },
});

export default orderPaySlice.reducer;
