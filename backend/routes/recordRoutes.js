import express from "express";
import {
  addUserRecord,
  getUserRecord,
  getTop10,
  getAllGameRecord,
} from "../controllers/recordController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createUserRecord,
  updateHighestRecord,
} from "../middleware/recordMiddleware.js";

const router = express.Router();

router
  .route("/createRecord")
  .post(protect, createUserRecord, updateHighestRecord, addUserRecord);
router.route("/getRecord").post(protect, getUserRecord);

router.post("/:gameId/top10", getTop10);
router.post("/:gameId/records", getAllGameRecord);
export default router;
