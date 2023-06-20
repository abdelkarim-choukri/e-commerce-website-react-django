
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartItems  = createAsyncThunk(
  'productList/fetchCart',
  async ({id,qty}) => {
    console.log('fetch:',id,qty)
    const response = await axios.get(`/api/products/${id}`);
    console.log('response',response);
    const data={
      product: response.data._id,
      name: response.data.name,
      image: response.data.image,
      price: response.data.price,
      countInStock: response.data.countInStock,
      qty,
    };
    
    console.log("fetchdata",data);
    return data;
  }
);


const initialState={
  cartItems:[],//JSON.parse(localStorage.getItem('cartItems')) || [],
  // newCart:{},
  // isLoading: false,
  shippingAddress:{},
  paymentMethod:'',
};
const cartSlice=createSlice({
name:'cart',
initialState,
reducers:{
addToCart: (state, action) => {
  console.log(action.payload);
  if (action.payload.id) {
    state.cartItems.forEach(item => {
      if (item.product === action.payload.id) {
        item.qty = action.payload.newQty;
      }
    });
  }
localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

},
removeFromCart:(state,action)=>{
    const productId = action.payload;
    state.cartItems = state.cartItems.filter((x) => x.product !== productId);
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
},
saveShippingAddress:(state,action)=>{
  state.shippingAddress = action.payload;
  console.log(state.shippingAddress)
  localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
},
savePaymentMethod:(state,action)=>{
  state.paymentMethod = action.payload;
  console.log(state.paymentMethod)
  localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod));
},
},
extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        // // console.log(action);
        state.isLoading = false;
        // state.cartItems.push(action.payload);
        // console.log("cartItems",state.cartItems);
        // state.isLoading = false;

        const id = action.payload.product;
        console.log('id', id);

        // Check if the item with the given id already exists in cartItems
        const itemExists = state.cartItems.some((item) => item.product === id);
        console.log('itemExists', itemExists);

        if (!itemExists) {
          // If the item does not exist, add it to the cartItems array
          state.cartItems.push(action.payload);
          localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }

        // state.newCart=action.payload;
        // state.cartItems.push(state.newCart);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;

      });
  },


})



export const { addToCart, removeFromCart ,saveShippingAddress,savePaymentMethod} = cartSlice.actions;

export default cartSlice.reducer;


