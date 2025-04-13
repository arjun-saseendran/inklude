import { Router } from "express";
import {
  addToCart,
  getCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  scheduleWhatsApp,
} from "../controllers/cartControllers.js";
import { userAuth } from "../middlewares/userAuth.js";

export const cartRouter = Router();

cartRouter.post("/add/product", userAuth, addToCart);
cartRouter.get("/cart", userAuth, getCart);
cartRouter.post("/add/product/quantity", userAuth, increaseProductQuantity);
cartRouter.post("/remove/product/quantity", userAuth, decreaseProductQuantity);
cartRouter.post("/schedule/whatsapp", scheduleWhatsApp);
