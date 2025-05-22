import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
const app = express();

// Middleware to parse JSON
app.use(express.json());

export default app;
