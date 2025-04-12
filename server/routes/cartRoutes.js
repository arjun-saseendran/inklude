import { Router } from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartControllers.js";
import { userAuth } from "../middlewares/userAuth.js";

export const userRouter = Router();

userRouter.post("/add/product", userAuth, addToCart);
userRouter.post("/remove/product", userAuth, removeFromCart);
userRouter.post("/cart", userAuth, getCart);
