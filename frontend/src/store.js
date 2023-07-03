  import { configureStore } from "@reduxjs/toolkit";
  import productReducer from "./features/reducers/productReducers";
  import productDetailSlice from "./features/reducers/productDetailSlice";
  import cartReducer from "./features/reducers/cartSlice";
  import userReducer from "./features/reducers/userSlice";
  import registerReducer from "./features/reducers/registerSlice";
  import userDetailReducer from "./features/reducers/userDetailSlice";
  import orderCreateReducer from "./features/reducers/orderCreateSlice";
  import orderDetailReducer from "./features/reducers/orderDetailSlice";
  import orderPayReducer from "./features/reducers/orderPaySlice";
  import orderslistReducer from "./features/reducers/orderslistSlice";

  import usersListReducer from "./features/reducers/usersListSlice";
import adminEditUserReducer from "./features/reducers/adminEditUserSlice";


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
      
      orderCreate: orderCreateReducer,
      orderDetail: orderDetailReducer,
      orderPay: orderPayReducer,
      ordersList: orderslistReducer,
      adminEditUser:adminEditUserReducer,
      usersList: usersListReducer,
    },
    preloadedState: {
      cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage,
        paymentMethod: localStorage.getItem('paymentMethod') || '', 
      },
      userLogin:{
        userInfo:userInfoFromStorage,
      }
    },
  });




  export default store;
