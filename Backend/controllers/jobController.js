import Job from "../models/Job.js";

// GET all jobs + filters
export const getJobs = async (req, res) => {
  try {
    const { category, location, type } = req.query;

    let query = {};

    if (category) query.category = category;
    if (location) query.location = location;
    if (type) query.type = type;

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single job (future use)
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE job (admin only – later)
export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
