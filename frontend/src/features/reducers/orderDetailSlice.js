import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const fetchOrderDetail = createAsyncThunk(
  'orderDetail/fetchOrderDetail',
  async (id, { getState } ) => {
    
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
      state.orderDetail = {};
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

        

        localStorage.setItem('orderDetail', JSON.stringify(state.orderDetail));
      })
      .addCase(fetchOrderDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message;
        
      });
  },
});

export const { orderReset } = orderDetailSlice.actions;
export default orderDetailSlice.reducer;



