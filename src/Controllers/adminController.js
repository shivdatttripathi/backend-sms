// Admin controller
import asyncHandler from "../utils/async.handler.js";
import { generateToken } from "../utils/generateTokens.js";
import Admin from "../Models/adminModel.js"
import bcrypt from "bcryptjs";
// 1st admin register 
// import module js syntax


// Register the first admin (school principal or owner)
const registerFirstAdmin = asyncHandler(async (req, res) => {
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
    }
    const { firstName, lastName, email, password, employeeId, contactNumber, gender } = req.body;
    const admin = new Admin(
     req.body
    );
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
    const isPasswordValid = await bcrypt.compare(password, admin.password);
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

// admin update password not implemented yet

const updateAdminDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const admin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
    if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin updated successfully", admin });
});

// admin password change via profile 1st verify old password then change to new password
const changeAdminPassword = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    const admin = await Admin.findById(id);
    if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
    }
    const isOldPasswordValid = await bcrypt.compare(oldPassword, admin.password);
    if (!isOldPasswordValid) {
        return res.status(401).json({ message: "Old password is incorrect" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedNewPassword;
    await admin.save();
    res.status(200).json({ message: "Password changed successfully" });

});

// get admin details in login 
const getAdminDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
        return res.status(404).json({ message: "somthing went wrong" });
    }
    res.status(200).json({ admin });
});

//1 future implementation logout admin by clearing cookie
// 3 forgot password via superAdmin permission its not required old password


export {
    registerFirstAdmin,
    loginAdmin,
    getAdminDetails,
    changeAdminPassword
};

