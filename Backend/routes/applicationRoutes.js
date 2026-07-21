import express from "express";
import { applyJob, myApplications } from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user's applications
router.get("/my", protect, myApplications);

// Apply for a job
router.post("/:jobId", protect, applyJob);

export default router;