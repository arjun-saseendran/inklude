import { Router } from "express";
import { login, logout, signup } from "../controllers/userControllers.js";

export const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
