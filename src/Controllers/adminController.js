// Admin controller
import asyncHandler from "../utils/async.handler.js";
import { generateToken } from "../utils/generateTokens.js";
import Admin from "../Models/adminModel.js"
// 1st admin register 
// import module js syntax


// Register the first admin (school principal or owner)
const registerFirstAdmin = asyncHandler(async (req, res) => {
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
    }
    const { firstName, lastName, email, password, employeeId, contactNumber, gender } = req.body;
    const admin = new Admin({
      firstName,
      lastName,
      email,
      password,
      employeeId,
      contactNumber,
      gender
    });
    await admin.save();
    res.status(201).json({ message: "Admin registered successfully", admin });
});

// Login admin
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(404).json({ message: "invalid or not found" });
    }
    const isPasswordValid = await require("bcryptjs").compare(password, admin.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "invalid or not found" });
    }
    // Generate JWT token using token function in utils generateToken.js
    const token = generateToken(admin);

    // Send token in HTTP-only cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).json({ message: "Login successful", admin, token });
});

export {
    registerFirstAdmin,
    loginAdmin
};
