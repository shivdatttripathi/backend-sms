import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const app = express();
import cookieParser from "cookie-parser";
// Import Routes
import adminRoutes from "./Routers/adminRoutes.js";

// Middleware to parse JSON
app.use(express.json());
// config cookie parser
app.use(cookieParser());


export default app;
