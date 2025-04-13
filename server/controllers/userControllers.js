import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { validateSignUpData } from "../utils/userValidator.js";

export const signup = async (req, res) => {
  try {
    validateSignUpData(req, res);

    const { name, email, mobile, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      mobile,
      password: passwordHash,
    });

    const savedUser = await user.save();

    res.json({ message: "User registered  successfully!", data: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not exist" });
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "None",                              
        expires: new Date(Date.now() + 8 * 3600000),   
      });

      const { password: _, ...userWithoutPassword } = user.toObject();

      res
        .status(200)
        .json({ message: "Login successful", data: userWithoutPassword });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong!" });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({ message: "Logout successful!" });
};

export const checkUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findOne({ _id });

    res.status(200).json({ message: "Authorized user", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong!" });
  }
};
