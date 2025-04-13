import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/products/productSlice'
import userReducer from '../features/user/userSlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
  },
})

