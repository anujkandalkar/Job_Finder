import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
