import { body } from "express-validator";

export const schoolRegistrationValidator = [
    body("name")
        .trim()
        .notEmpty().withMessage("School name is required")
        .isLength({ min: 3 }).withMessage("School name must be at least 3 characters"),
    
    body("schoolCode")
        .trim()
        .notEmpty().withMessage("School code is required")
        .isAlphanumeric().withMessage("School code must be alphanumeric"),
    
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email"),
    
    body("contactNumber")
        .trim()
        .notEmpty().withMessage("Contact number is required")
        .matches(/^[0-9]{10}$/).withMessage("Contact number must be 10 digits"),
    
    body("address.street").optional().trim(),
    body("address.city").optional().trim(),
    body("address.state").optional().trim(),
    body("address.pincode")
        .optional()
        .matches(/^[0-9]{6}$/).withMessage("Pincode must be 6 digits"),
    
    body("principalName").optional().trim(),
    
    body("establishedYear")
        .optional()
        .isInt({ min: 1800, max: new Date().getFullYear() })
        .withMessage("Please provide a valid year"),
    
    body("schoolwebsite")
        .optional()
        .isURL().withMessage("Please provide a valid URL"),
    
    body("logo").optional().trim(),
    
    body("subscriptionPlan")
        .optional()
        .isIn(["basic", "premium", "enterprise"])
        .withMessage("Invalid subscription plan"),
];