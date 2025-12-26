import express from "express";
const studentRouter = express.Router();
import {
  registerStudent,
  getAllStudents,
  getStudentDetail,
  updateStudent,
  deleteStudent,
  bulkStudentRegister
  
} from "../Controllers/students.controller.js";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddlware.js";

// Route to register a single student
studentRouter.use(authMiddleware,adminMiddleware);
studentRouter.post("/register", registerStudent);

// multiple students registration json
studentRouter.post("/register-multiple", bulkStudentRegister);

//export student router
export default studentRouter;

