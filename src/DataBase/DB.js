import mongoose from "mongoose";
console.log(process.env.MONGO_URI);
// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const connectDB = async () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

export default connectDB;
