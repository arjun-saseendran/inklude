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
    res.status(400).json({ message: error.message || "Something went wrong!" });
  }
};
