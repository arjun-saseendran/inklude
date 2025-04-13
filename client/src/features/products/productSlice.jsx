import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    saveProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { saveProducts } = productsSlice.actions;

export default productsSlice.reducer;
