// register admin and login admin routes
import express from "express";
import {authMiddleware , superAdminMiddleware} from "../middleware/authMiddlware.js"
const adminRouter = express.Router();
import {
    registerFirstAdmin,
    loginAdmin,
    getAdminDetails
} from "../Controllers/adminController.js";
import { adminRegisterValidation, adminLoginValidation } from "../Vaildation/adminValidation.js";
import { validate } from "../middleware/validate.js";

// Route to register the first admin check its super admin 

adminRouter.post("/register", adminRegisterValidation, validate,authMiddleware,superAdminMiddleware,registerFirstAdmin);

// Route to login admin
adminRouter.post("/login", adminLoginValidation, validate, loginAdmin);
// Route to update admin details
adminRouter.use(authMiddleware, superAdminMiddleware);
adminRouter.post("/register", adminRegisterValidation, validate,registerFirstAdmin);

adminRouter.put("/update/:id",  getAdminDetails);

export default adminRouter;