import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isLogin = async (req, res, next) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized: No token provided.",
      });
    }

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find the user by decoded id
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found.",
      });
    }

    // 4. Attach user to request
    req.user = user;

    // 5. Proceed to next middleware or route
    next();
  } catch (error) {
    console.error("Error in isLoggedin middleware:", error);
    return res.status(401).json({
      error: true,
      message: "Invalid or expired token.",
    });
  }
};