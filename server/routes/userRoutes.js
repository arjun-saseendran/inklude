import { Router } from "express";
import { checkUser, login, logout, signup } from "../controllers/userControllers.js";
import { userAuth } from "../middlewares/userAuth.js";

export const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/check/user",userAuth, checkUser);
