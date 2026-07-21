import express from "express";
import {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
  getAdminStats
} from "../controllers/jobController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getJobs);
router.get("/stats", protect, adminOnly, getAdminStats);
router.get("/:id", getJobById);

// 🔐 ADMIN ONLY
router.post("/", protect, adminOnly, createJob);
router.delete("/:id", protect, adminOnly, deleteJob);

export default router;
