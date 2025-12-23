// import 
import express from "express";
const schoolRouter = express.Router();
import {
   registerSchool, updateSchool, deleteSchool
} from "../Controllers/schoolController.js";
import { schoolRegistrationValidator,  } from "../Vaildation/schoolValidate.js";
import { validate } from "../middleware/validate.js";
import {authMiddleware , superAdminMiddleware} from "../middleware/authMiddlware.js"
// Route to register school
// middleware check super admin
schoolRouter.use(authMiddleware, superAdminMiddleware);
schoolRouter.post("/register", schoolRegistrationValidator, validate, registerSchool);
// Route to update school
schoolRouter.put("/update/:id", updateSchool);
// Route to delete school its future use
//schoolRouter.delete("/delete/:id", deleteSchool);
export default schoolRouter;