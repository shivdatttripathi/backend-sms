// Super Admin model make only one time in the system
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const superAdminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String },
    role: { type: String, default: "superAdmin" },
    password: { type: String, required: true }
  },
  { timestamps : true }
);

// Password hash middleware
superAdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);
export default SuperAdmin;