// Super Admin Routes
import express from "express";
const superAdminRoutes = express.Router();
import {
  registerSuperAdmin,
  loginSuperAdmin} from "../Controllers/superAdminController.js";
import { superAdminRegisterValidation, superAdminLoginValidation } from "../Vaildation/superAdminValidation.js";
import { validate } from "../middleware/validate.js";   
// Route to register the Super Admin
superAdminRoutes.post("/register", superAdminRegisterValidation, validate, registerSuperAdmin);
// Route to login the Super Admin
superAdminRoutes.post("/login", superAdminLoginValidation, validate, loginSuperAdmin);
export default superAdminRoutes;