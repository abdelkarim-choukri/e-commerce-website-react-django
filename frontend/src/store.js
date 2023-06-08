import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/reducers/productReducers";
import productDetailSlice from "./features/reducers/productDetailSlice";
import cartReducer from "./features/reducers/cartSlice";

const store = configureStore({
  reducer: {
    productList: productReducer,
    productDetails: productDetailSlice,
    cart: cartReducer,
  },
});

export default store;
