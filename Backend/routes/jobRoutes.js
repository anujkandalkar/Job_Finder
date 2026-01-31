import express from "express";
import {
  getJobs,
  getJobById,
  createJob
} from "../controllers/jobController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);

// 🔐 ADMIN ONLY
router.post("/", protect, adminOnly, createJob);

export default router;
