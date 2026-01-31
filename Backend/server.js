import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// 1. Import all routes
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js"; //

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 2. Connect Routes to Server
app.use("/api/auth", authRoutes);     // Supports login/register
app.use("/api/jobs", jobRoutes);      // Supports job fetching/posting
app.use("/api/apply", applicationRoutes); // Supports job applications

// Test route
app.get("/", (req, res) => {
  res.send("Job Finder Backend Running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);