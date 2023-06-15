import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/reducers/productReducers";
import productDetailSlice from "./features/reducers/productDetailSlice";
import cartReducer from "./features/reducers/cartSlice";
import userReducer from "./features/reducers/userSlice";
import registerReducer from "./features/reducers/registerSlice";


const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

  const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const store = configureStore({
  reducer: {
    productList: productReducer,
    productDetails: productDetailSlice,
    cart: cartReducer,
    userLogin: userReducer,
    // userRegister:registerReducer,

  },
  preloadedState: {
    cart: {
      cartItems: cartItemsFromStorage,
    },
    userLogin:{
      userInfo:userInfoFromStorage,
    }
  },
});




export default store;
