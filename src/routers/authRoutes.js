// Import dependencies
import { Router } from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  profileUser,
  resetPassword,
  signupUser,
  verifyEmail,
} from "../controllers/authController.js";
import { isLogin } from "../middleware/authMiddleware.js";

// Initialize router
const router = Router();

// Signup route
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile", isLogin, profileUser);
router.get("/logout", isLogin, logoutUser);
router.get("/verify/:token", verifyEmail);
router.post("/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);

// Export router
export default router;