import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Please Login!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "User not authorized" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Internal server Error!" });
  }
};
