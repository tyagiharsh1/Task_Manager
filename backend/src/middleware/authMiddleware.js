import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/auth/UserModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  try {
    let token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Support both

    if (!token) {
      return res.status(401).json({ message: "Not authorized, please login!" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user and exclude password
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found!" });
    }

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired, please log in again." });
    }

    return res.status(401).json({ message: "Not authorized, invalid token!" });
  }
});

// Admin Middleware
export const adminMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user?.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Only admins can do this!" });
});

// Creator Middleware
export const creatorMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user?.role === "creator" || req.user?.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Only creators can do this!" });
});

// Verified User Middleware
export const verifiedMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user?.isVerified) {
    return next();
  }
  return res.status(403).json({ message: "Please verify your email address!" });
});
