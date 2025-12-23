import express from "express";
const studentRouter = express.Router();
import {
  studentRegistrationOneBy,
  studentRegistrationMultiple,
  updateSingleStudent,
} from "../Controllers/students.controller.js";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddlware.js";

// Route to register a single student
studentRouter.use(authMiddleware,adminMiddleware);
studentRouter.post("/register", studentRegistrationOneBy);

// multiple students registration json
studentRouter.post("/register-multiple", studentRegistrationMultiple);

//export student router
export default studentRouter;

