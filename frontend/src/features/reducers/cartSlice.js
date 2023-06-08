
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartItems  = createAsyncThunk(
  'productList/fetchCart',
  async ({id,qty}) => {
    console.log('fetch:',id,qty)
    const response = await axios.get(`/api/products/${id}`);
    const updatedResponse = { ...response.data, qty };
    console.log("fetch",updatedResponse);
    return updatedResponse;
  }
);

const cartSlice=createSlice({
name:'cart',
initialState:{
    cartItems:[],
},
reducers:{
addToCart: (state, action) => {
    const item = action.payload;
    console.log("item:", item);
    
    // const existItemIndex = state.cartItems.findIndex((x) => x.product === item.product);
    // existItemIndex !== -1
    //     ? (state.cartItems[existItemIndex] = item)
    //     : state.cartItems.push(cartItems);
    
    // localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
removeFromCart:(state,action)=>{
    const productId = action.payload;
    state.cartItems = state.cartItems.filter((x) => x.product !== productId);
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
},

extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
        console.log("cartItems",state.cartItems);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;

      });
  },
}

})



export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     cartItems: localStorage.getItem('cartItems')
//       ? JSON.parse(localStorage.getItem('cartItems'))
//       : [],
//   },
//   reducers: {
//     addToCart: {
//       reducer(state, action) {
//         state.cartItems.push(action.payload);
//       },
//       prepare({ id, qty }) {
//         return {
//           payload: {
//             id,
//             qty,
//           },
//           meta: {
//             thunk: 'cart/addToCart',
//           },
//         };
//       },
//     },
//     removeFromCart: {
//       reducer(state, action) {
//         state.cartItems = state.cartItems.filter(
//           (item) => item.product !== action.payload
//         );
//       },
//       prepare(id) {
//         return {
//           payload: id,
//           meta: {
//             thunk: 'cart/removeFromCart',
//           },
//         };
//       },
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.cartItems.push(action.payload);
//       })
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         state.cartItems = state.cartItems.filter(
//           (item) => item.product !== action.payload
//         );
//       });
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;