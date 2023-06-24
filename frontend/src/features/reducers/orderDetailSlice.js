import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const fetchOrderDetail = createAsyncThunk(
  'orderDetail/fetchOrderDetail',
  async (id, { getState } ) => {
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

      const { data } = await axios.get(`/api/orders/${id}/`, config);
      console.log('fetchorder', data);
      return data;
    } catch (error) {
      console.error('fetchorder error:', error);
      throw error;
    }
  }
);


const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState: {
    orderDetail: {},
    isLoading: false,
    success: false,
    orderItems:{},
    shippingAddress:{},
  },
  reducers: {
    orderReset:(state)=>{
      state.order = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Order Detail 
      .addCase(fetchOrderDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetail = action.payload;

        console.log('state.order', state.orderDetail);

        localStorage.setItem('order', JSON.stringify(state.orderDetail));
      })
      .addCase(fetchOrderDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message;
        console.log('fetchOrderDetail rejected:', action.error.message);
      });
  },
});

export const { orderReset } = orderDetailSlice.actions;
export default orderDetailSlice.reducer;
