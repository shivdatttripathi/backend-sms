// register admin and login admin routes
import express from "express";
const adminRouter = express.Router();
import {
    registerFirstAdmin,
    loginAdmin
} from "../Controllers/adminController.js";
import { adminRegisterValidation, adminLoginValidation } from "../Vaildation/adminValidation.js";
import { validate } from "../middleware/validate.js";

// Route to register the first admin
adminRouter.post("/register", adminRegisterValidation, validate, registerFirstAdmin);

// Route to login admin
adminRouter.post("/login", adminLoginValidation, validate, loginAdmin);

export default adminRouter;