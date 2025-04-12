import { Router } from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartControllers.js";
import { userAuth } from "../middlewares/userAuth.js";

export const cartRouter = Router();

cartRouter.post("/add/product", userAuth, addToCart);
cartRouter.post("/remove/product", userAuth, removeFromCart);
cartRouter.post("/cart", userAuth, getCart);
