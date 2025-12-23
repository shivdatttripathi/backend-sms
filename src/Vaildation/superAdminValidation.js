//super admin validation code
import { body } from "express-validator";

export const superAdminRegisterValidation = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 }).isLength({max : 20})
    .withMessage("Password must be at least 6 characters long"),
  body("contactNumber")
    .optional()
    .isLength({ min: 10, max: 15 })
    .withMessage("Contact number must be between 10 and 15 digits"),
];

export const superAdminLoginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 }).isLength({max : 20})
    .withMessage("Password must be at least 6 characters long"),
];