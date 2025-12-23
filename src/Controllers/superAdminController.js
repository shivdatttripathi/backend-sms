// Super Admin Controller
import asyncHandler from "../utils/async.handler.js";
import SuperAdmin from "../Models/superAdminModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateTokens.js";
// Register the Super Admin (only one allowed)

const registerSuperAdmin = asyncHandler(async (req, res) => {
  const existingSuperAdmin = await SuperAdmin.findOne({});  
    if (existingSuperAdmin) {
      return res.status(400).json({ message: "Super Admin already exists" });
    }
    const { firstName, lastName, email, password, contactNumber, role } = req.body;
    const superAdmin = new SuperAdmin({
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      role
    
    });
    await superAdmin.save();
    res.status(201).json({ message: "Super Admin registered successfully", superAdmin });
});

// login super admin
const loginSuperAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const superAdmin = await SuperAdmin.findOne({ email });
  if (!superAdmin) {
    return res.status(404).json({ message: "Super Admin not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });

  }

  const token = generateToken(superAdmin);

  // Send token in HTTP-only cookie 5 days

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days
    });


  res.status(200).json({ message: "Login successful", superAdmin });
});

export {
    registerSuperAdmin,
    loginSuperAdmin
};

