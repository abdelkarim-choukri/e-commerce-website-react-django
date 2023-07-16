import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const fetchpayOrder = createAsyncThunk(
  'orderPay/fetchpayOrder',
  async ({id},{ getState } ) => {
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
      console.log(`Bearer ${userInfo.token}`)
      console.log('config',config)
      console.log('url',`/api/orders/${id}/pay/`)
      // console.log('paymentResult',paymentResult)
      const { data } = await axios.put(`/api/orders/${id}/pay/`, null,config);
      console.log('fetchorderpay', data);
      return data;
    } catch (error) {
      console.error('fetchorderpay error:', error);
      throw error;
    }
  }
);

export const fetchDeleverOrder = createAsyncThunk(
  'orderPay/fetchDeleverOrder',
  async ({id},{ getState } ) => {
    // console.log('id', id);
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
      const { data } = await axios.put(`/api/orders/${id}/deliver/`, null,config);
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
    success:false,
    successDelever:false,
    loadingDelever:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //pay Order 
      .addCase(fetchpayOrder.pending, (state) => {
        state.Loading = true;
      })
      .addCase(fetchpayOrder.fulfilled, (state, action) => {
        state.Loading = false;
        state.success = true;
        console.log('fetchpayOrder',state.success);
      })
      .addCase(fetchpayOrder.rejected, (state, action) => {
        state.Loading = false;
        state.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message;
        console.log('fetchpayOrder rejected:', action.error.message);
      })

      // delever Order 
      .addCase(fetchDeleverOrder.pending, (state) => {
        state.loadingDelever = true;
      })
      .addCase(fetchDeleverOrder.fulfilled, (state, action) => {
        state.loadingDelever = false;
        state.successDelever = true;
        console.log('fetchDeleverOrder',state.successDelever);
      })
      .addCase(fetchDeleverOrder.rejected, (state, action) => {
        state.loadingDelever = false;
        state.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message;
        console.log('fetchDeleverOrder rejected:', action.error.message);
      });
  },
});

export default orderPaySlice.reducer;
