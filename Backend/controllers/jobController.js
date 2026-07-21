import Job from "../models/Job.js";
import User from "../models/User.js";
import Application from "../models/Application.js";

// GET all jobs + advanced multi-field search and filters
export const getJobs = async (req, res) => {
  try {
    const { search, category, location, type, experience } = req.query;

    let query = {};

    // Search term matching title, company, or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (type) {
      query.type = { $regex: type, $options: "i" };
    }

    if (experience) {
      query.experience = { $regex: experience, $options: "i" };
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single job
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE job (admin only)
export const createJob = async (req, res) => {
  try {
    const { title, company, location, category, type, salary, experience, description } = req.body;

    if (!title || !company || !location || !category || !type || !description) {
      return res.status(400).json({ 
        success: false, 
        message: "Required fields missing: title, company, location, category, type, description" 
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      category,
      type,
      salary: salary || "Negotiable",
      experience: experience || "Any",
      description
    });

    res.status(201).json({ success: true, message: "Job created successfully", job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE job (admin only)
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    await Job.findByIdAndDelete(req.params.id);

    // Also clean up any applications associated with this job
    await Application.deleteMany({ jobId: req.params.id });

    res.json({ success: true, message: "Job and associated applications deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET admin dashboard stats
export const getAdminStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalApplications = await Application.countDocuments();
    const recentJobs = await Job.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      stats: {
        totalJobs,
        totalUsers,
        totalApplications
      },
      recentJobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
