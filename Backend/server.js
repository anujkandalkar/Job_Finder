import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// 1. Import your routes (Ensure the .js extension is there!)
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// 2. Connect Routes to Server
app.use("/api/auth", authRoutes); //
app.use("/api/jobs", jobRoutes); //

// test route
app.get("/", (req, res) => {
  res.send("Job Finder Backend Running 🚀");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);