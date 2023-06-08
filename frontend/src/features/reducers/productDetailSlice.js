import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductDetails  = createAsyncThunk(
  'productList/fetchProduct',
  async (id) => {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  }
);


export const productDetailSlice = createSlice({
  name: 'productDetails',
  initialState: { product: { reviews: [] }, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        localStorage.setItem('product', JSON.stringify(action.payload));
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productDetailSlice.reducer;