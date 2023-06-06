import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/reducers/productReducers";
import productDetailSlice from "./features/reducers/productDetailSlice";

const store = configureStore({
  reducer: {
    productList: productReducer,
    productDetails: productDetailSlice,
  },
});

export default store;
