import express from "express";
const studentRouter = express.Router();
import uploadExcel from "../middleware/multerMiddleware.js";
import {
  registerStudent,
  getAllStudents,
  getStudentDetail,
  updateStudent,
  deleteStudent,
  bulkStudentRegister
  
} from "../Controllers/students.controller.js";
import {  authMiddleware,adminMiddleware } from "../middleware/authMiddlware.js";

// Route to register a single student
studentRouter.use(authMiddleware,adminMiddleware);
studentRouter.post("/register", registerStudent);

// multiple students registration via excel
studentRouter.post("/bulk-register",uploadExcel.single("file"), bulkStudentRegister);

//export student router
export default studentRouter;

