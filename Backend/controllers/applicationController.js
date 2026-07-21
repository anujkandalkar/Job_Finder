import Application from "../models/Application.js";

// @desc    Apply for a job
export const applyJob = async (req, res) => {
  try {
    const exists = await Application.findOne({
      userId: req.user.id,
      jobId: req.params.jobId
    });

    if (exists) {
      return res.status(400).json({ message: "Already applied" });
    }

    await Application.create({
      userId: req.user.id,
      jobId: req.params.jobId
    });

    res.json({ message: "Applied successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get applications for the logged-in user
export const myApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id })
      .populate("jobId"); // This pulls in the full job details

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};