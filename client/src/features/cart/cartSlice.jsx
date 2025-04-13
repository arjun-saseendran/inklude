import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartProducts: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { cartProducts } = cartSlice.actions;

export default cartSlice.reducer;
