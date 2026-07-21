import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER - Now includes role selection for Job Seekers vs Employers
export const registerUser = async (req, res) => {
  try {
    // 1. Added 'role' to the destructuring from req.body
    const { name, email, password, role } = req.body;

    // 2. Strict validation including the role
    if (!name || !email || !password || !role) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields (name, email, password, role) are required" 
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists with this email" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Storing the role in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role // 'student' or 'recruiter' (or 'admin')
    });

    res.status(201).json({ 
      success: true, 
      message: "Registration successful" 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN - Enhanced with role-based token payload
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // 4. Token payload now includes the role for frontend permission checks
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5. Returning the role so the React app knows which dashboard to show
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role 
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};