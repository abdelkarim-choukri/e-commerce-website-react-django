import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductList = createAsyncThunk(
  'productList/fetchProductList',
  async (keyword) => {
    const response = await axios.get(`/api/products${keyword}`);
    console.log(response)
    return response.data;
  }
);



export const productReducer = createSlice({
  name: 'productList',
  initialState: {
    loading: false,
    products: [],
    error: '',
    page:null,
    pages:null,

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        state.error= action.error.response && action.error.response.data.detail
            ? action.error.response.data.detail
            : action.error.message;
          });
        },
      });
      




export default productReducer.reducer;