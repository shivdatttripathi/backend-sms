import { body } from "express-validator";

export const validateStudentRegistration = [
  // Basic student details
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string"),

  body("contactNumber")
    .notEmpty()
    .withMessage("Contact number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact number must be 10 digits"),

  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a valid date"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be Male, Female or Other"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format"),

  body("profilePicture")
    .optional()
    .isString(),

  // Academic details
  body("enrollmentNumber")
    .notEmpty()
    .withMessage("Enrollment number is required"),

  body("admissionDate")
    .optional()
    .isISO8601()
    .withMessage("Admission date must be a valid date"),

  body("academicYear")
    .optional()
    .isString(),

  body("class")
    .notEmpty()
    .withMessage("Class is required"),

  body("section")
    .optional()
    .isString(),

  // Guardian details
  body("guardian.fatherName").optional().isString(),
  body("guardian.fatherContact")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Father contact must be 10 digits"),

  body("guardian.motherName").optional().isString(),
  body("guardian.motherContact")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Mother contact must be 10 digits"),

  body("guardian.guardianName").optional().isString(),
  body("guardian.guardianRelation").optional().isString(),

  body("guardian.guardianContact")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Guardian contact must be 10 digits"),

  body("guardian.guardianEmail")
    .optional()
    .isEmail()
    .withMessage("Invalid guardian email"),

  // Medical records
  body("medicalRecords.allergies").optional().isString(),
  body("medicalRecords.medicalConditions").optional().isString(),

  // Transport details
  body("transport.required").optional().isBoolean(),
  body("transport.pickupLocation").optional().isString(),
  body("transport.routeNumber").optional().isString(),

  // Login details
  body("loginPhone")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Login phone must be 10 digits"),

  body("loginDOB")
    .optional()
    .isISO8601()
    .withMessage("Login DOB must be a valid date"),

  body("isActive")
    .optional()
    .isBoolean(),
];

import { body } from "express-validator";

/**
 * BULK STUDENT REGISTER
 * Expects: { students: [ { ...studentFields } ] }
 */
export const validateBulkStudentRegister = [
  body("students")
    .isArray({ min: 1 })
    .withMessage("Students must be a non-empty array"),

  // Required fields
  body("students.*.firstName")
    .notEmpty()
    .withMessage("First name is required"),

  body("students.*.lastName")
    .notEmpty()
    .withMessage("Last name is required"),

  body("students.*.contactNumber")
    .notEmpty()
    .withMessage("Contact number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact number must be 10 digits"),

  body("students.*.dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Invalid date of birth"),

  body("students.*.gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be Male, Female or Other"),

  body("students.*.enrollmentNumber")
    .notEmpty()
    .withMessage("Enrollment number is required"),

  body("students.*.class")
    .notEmpty()
    .withMessage("Class is required"),

  // Optional fields
  body("students.*.email").optional().isEmail(),
  body("students.*.section").optional().isString(),
  body("students.*.academicYear").optional().isString(),

  // Nested objects
  body("students.*.guardian.fatherContact")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Father contact must be 10 digits"),

  body("students.*.transport.required")
    .optional()
    .isBoolean(),
];


/**
 * BULK STUDENT UPDATE
 * Expects:
 * {
 *   students: [
 *     { studentId: "...", firstName: "...", class: "..." }
 *   ]
 * }
 */
export const validateBulkStudentUpdate = [
  body("students")
    .isArray({ min: 1 })
    .withMessage("Students must be a non-empty array"),

  body("students.*.studentId")
    .notEmpty()
    .withMessage("studentId is required")
    .isMongoId()
    .withMessage("Invalid studentId"),

  // Optional update fields
  body("students.*.firstName").optional().isString(),
  body("students.*.lastName").optional().isString(),

  body("students.*.contactNumber")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact number must be 10 digits"),

  body("students.*.dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Invalid date of birth"),

  body("students.*.gender")
    .optional()
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender"),

  body("students.*.email")
    .optional()
    .isEmail()
    .withMessage("Invalid email"),

  body("students.*.class").optional().isString(),
  body("students.*.section").optional().isString(),
  body("students.*.academicYear").optional().isString(),

  // Nested updates
  body("students.*.guardian.fatherContact")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Father contact must be 10 digits"),

  body("students.*.transport.required")
    .optional()
    .isBoolean(),

  body("students.*.isActive")
    .optional()
    .isBoolean(),
];
