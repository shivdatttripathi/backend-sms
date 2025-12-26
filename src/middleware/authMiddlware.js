// check if user is authenticated using cookies jwt token
import jwt from "jsonwebtoken";
import SuperAdmin from "../Models/superAdminModel.js";
import Admin from "../Models/adminModel.js";
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }}

    // Middleware to check if user is admin
export const adminMiddleware = async (req, res, next) => {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized: Admin not found" });
    }
  if (req.user && admin.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }
};

// Middleware to check if user is teacher
export const teacherMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "teacher") {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: Teacher access required" });
  }
};
// Middleware to check if user is student
export const studentMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: Student access required" });
  }
};

// check if user is superadmin
export const superAdminMiddleware = async (req, res, next) => {
    if (!req.user || req.user.role !== "superAdmin") {
      return res.status(401).json({ message: "Unauthorized: Super Admin not found" });
    }
// double check role
console.log(req.user);
  if (req.user && req.user.role === "superAdmin") {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: Super Admin access required" });
  }
};
