import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const app = express();
import cookieParser from "cookie-parser";
// Import Routes
import adminRoutes from "./Routers/adminRoutes.js";
import superAdminRoutes from "./Routers/superAdminRoutes.js";
import schoolRouter from "./Routers/schoolRoutes.js"
import studentRouter from "./Routers/studentRoutes.js";
// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON
app.use(express.json());

// Use super admin routes v1
app.use("/api/v1/superadmin", superAdminRoutes);
// Use admin routes v1 
app.use("/api/v1/admin", adminRoutes);
// Use school routes v1
app.use("/api/v1/school", schoolRouter);

// Use student routes v1
 app.use("/api/v1/student", studentRouter);


export default app;
