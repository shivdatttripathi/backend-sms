import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const app = express();

// Middleware to parse JSON
app.use(express.json());
// config cookie parser
import cookieParser from "cookie-parser";
app.use(cookieParser());


export default app;
