import { User } from "../models/userModel.js";

export const validateSignUpData = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!name || !email || !mobile || !password)
    return res.status(400).json({ message: "All fields required" });
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res
      .status(400)
      .json({ message: "User already exist" })
      .select("-password");
  }

  const mobileNumberExist = await User.findOne({ mobile });
  if (mobileNumberExist) {
    return res
      .status(400)
      .json({ message: "Mobile number already exist!" })
      .select("-password");
  }
};
