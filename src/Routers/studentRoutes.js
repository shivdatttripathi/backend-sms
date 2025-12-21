import express from "express";
const router = express.Router();
import {
  createStudent,
  updateSingleStudent,
  deleteSingleStudent
} from "../Controllers/students.controller.js";

// Route to register a single student
router.post("/register",authMiddleware, createStudent);