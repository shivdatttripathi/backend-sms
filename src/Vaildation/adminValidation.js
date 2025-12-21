// admin validate register time
import { body } from "express-validator";

export const adminRegisterValidation = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("employeeId").notEmpty().withMessage("Employee ID is required"),
  body("contactNumber").optional().isMobilePhone().withMessage("Invalid contact number"),
  body("gender").isIn(["Male", "Female", "Other"]).withMessage("Invalid gender"),
  body("profilePicture").optional().isString(),
  body("schoolId").optional().isMongoId().withMessage("Invalid school ID"),
  body("role").optional().isString(),
  body("profilePicture").optional().isString(),
 
];
// admin validate login time 
export const adminLoginValidation = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];