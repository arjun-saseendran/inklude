import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decoded;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message || "Something went wrong!" });
  }
};
