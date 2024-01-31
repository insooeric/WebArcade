import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  UpdateUserProfile,
} from "../controllers/userController.js";
import { updateUserRecord } from "../middleware/recordMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserRecord, UpdateUserProfile);

export default router;
