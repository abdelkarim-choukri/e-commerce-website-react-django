import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const listOrders = createAsyncThunk(
  'ordersList/listOrders',
  async (_, { getState } ) => {

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

      const { data } = await axios.get(`/api/orders/`, config);
      console.log('listOrders', data);
      return data;
    } catch (error) {
      console.error('listMyOrders error:', error);
      throw error;
    }
  }
);


export const listMyOrders = createAsyncThunk(
  'ordersList/listMyOrders',
  async (_, { getState } ) => {

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

      const { data } = await axios.get(`/api/orders/myorders/`, config);
      console.log('listMyOrders', data);
      return data;
    } catch (error) {
      console.error('listMyOrders error:', error);
      throw error;
    }
  }
);


const ordersListSlice = createSlice({
  name: 'ordersList',
  initialState: {
    ordersList: [],
    isLoading: false,
    allOrders:[],
    
  },
  reducers: {
    ordersListReset:(state)=>{
      state.ordersList = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // My Order Detail 
      .addCase(listMyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersList = action.payload;

        console.log('state.order', state.ordersList);

        localStorage.setItem('ordersList', JSON.stringify(state.ordersList));
      })
      .addCase(listMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message;
        console.log('listMyOrders rejected:', action.error.message);
      })

      // all Order Detail 
      .addCase(listOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allOrders = action.payload;

        console.log('state.order', state.allOrders);

        localStorage.setItem('ordersList', JSON.stringify(state.allOrders));
      })
      .addCase(listOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.response && action.error.response.data.detail
          ? action.error.response.data.detail
          : action.error.message;
        console.log('listOrders rejected:', action.error.message);
      });
  },
});

export const { ordersListReset } = ordersListSlice.actions;
export default ordersListSlice.reducer;
