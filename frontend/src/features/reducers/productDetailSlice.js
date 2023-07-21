import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductDetails  = createAsyncThunk(
  'productList/fetchProduct',
  async (id) => {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  }
);

export const createProductReview = createAsyncThunk(
  'productReviewCreate/create',
  async ({ productId, review }, { getState }) => {
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
      const { data } = await axios.post(
        `/api/products/${productId}/reviews/`,
        review,
        config
      );

      return data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;
      throw new Error(errorMessage);
    }
  }
);

export const productDetailSlice = createSlice({
  name: 'productDetails',
  initialState: { 
    product: { reviews: [] }, 
    loading: false, 
    error: null,
    loadingReview:false,
    successReview:false,
    errorReview:null
    
  },
  reducers: {
    resetProductReview: (state) => {
      state.success = false;
      state.error = null;
    },
  },
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
        // state.error = action.payload;
        state.error= action.error.response && action.error.response.data.detail
            ? action.error.response.data.detail
            : action.error.message;
      })
      //review
      .addCase(createProductReview.pending, (state) => {
        state.loadingReview = true;
      })
      .addCase(createProductReview.fulfilled, (state) => {
        state.loadingReview = false;
        state.successReview = true;
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.loadingReview = false;
        state.errorReview = action.error.response && action.error.response.data.detail
        ? action.error.response.data.detail
        : action.error.message;
      });
  },
});
export const { resetProductReview } = productDetailSlice.actions;
export default productDetailSlice.reducer;