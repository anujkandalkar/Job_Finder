import jwt from "jsonwebtoken";

// 1. General Protect Middleware: Verifies if the user is logged in
export const protect = (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token - This uses the secret from your .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info (id and role) to the request object
      // This allows 'adminOnly' to see the role later
      req.user = decoded;

      next();
    } catch (error) {
      console.error("Auth Error:", error);
      return res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};

// 2. Role-Based Middleware: Restricts access based on the role
export const adminOnly = (req, res, next) => {
  // Ensure 'protect' was called first and req.user exists
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    // 403 Forbidden - The user is logged in but doesn't have permission
    return res.status(403).json({ 
      success: false, 
      message: "Access denied: Admin permissions required" 
    });
  }
};