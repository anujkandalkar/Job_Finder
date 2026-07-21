import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6 // Professional security standard
    },
    role: {
      type: String,
      // Restrict roles to only these two to match your Register page logic
      enum: ["user", "admin"], 
      default: "user",
      required: true // Now role is strictly required at registration
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);