import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/reducers/productReducers";
import productDetailSlice from "./features/reducers/productDetailSlice";
import cartReducer from "./features/reducers/cartSlice";
import userReducer from "./features/reducers/userSlice";
import registerReducer from "./features/reducers/registerSlice";
import userDetailReducer from "./features/reducers/userDetailSlice";


const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

  const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const  shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const store = configureStore({
  reducer: {
    productList: productReducer,
    productDetails: productDetailSlice,
    cart: cartReducer,
    userLogin: userReducer,
    // userRegister:registerReducer,
    userDetails:userDetailReducer,

  },
  preloadedState: {
    cart: {
      cartItems: cartItemsFromStorage,
      shippingAddress:shippingAddressFromStorage,
    },
    userLogin:{
      userInfo:userInfoFromStorage,
    }
  },
});




export default store;
