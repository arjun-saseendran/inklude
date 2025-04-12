import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { validateSignUpData } from "../utils/userValidator.js";

export const signup = async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req, res);

    const { name, email, mobile, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    //  Creating a new instance of the User model
    const user = new User({
      name,
      email,
      mobile,
      password: passwordHash,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

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
        expires: new Date(Date.now() + 8 * 3600000),
      });
      // Exclude password
      const { password: _, ...userWithoutPassword } = user.toObject();

      // Send response to frontend
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

export const logout = async (_, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({ message: "Logout successful!" });
};
