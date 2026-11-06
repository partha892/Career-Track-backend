// Import dependencies
import { Router } from "express";
import {
  loginUser,
  logoutUser,
  profileUser,
  signupUser,

} from "../controllers/authController.js";
import { isLogin } from "../middleware/authMiddleware.js";

// Initialize router
const router = Router();

// Signup route
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile", isLogin, profileUser);
router.get("/logout", isLogin, logoutUser);


// Export router
export default router;