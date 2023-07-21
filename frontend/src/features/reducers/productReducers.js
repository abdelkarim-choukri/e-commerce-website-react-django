import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductList = createAsyncThunk(
  'productList/fetchProductList',
  async (keyword) => {
    
    const response = await axios.get(`/api/products${keyword}`);
    return response.data;
  }
);

export const  listTopProducts = createAsyncThunk(
  'productList/ listTopProducts',
  async () => {
    const { data } = await axios.get(`/api/products/top/`);
    
    return data;
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
    top:{
      topProducts:[],
      loading:false,
      error:'',
    }

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
          })
          //top product
      .addCase(listTopProducts.pending, (state) => {
        state.top.loading = true;
      })
      .addCase(listTopProducts.fulfilled, (state, action) => {
        state.top.loading = false;
        state.top.topProducts = action.payload;
      })
      .addCase(listTopProducts.rejected, (state, action) => {
        state.top.loading = false;
        state.top.error= action.error.response && action.error.response.data.detail
            ? action.error.response.data.detail
            : action.error.message;
        
          })
        },
      });
      




export default productReducer.reducer;