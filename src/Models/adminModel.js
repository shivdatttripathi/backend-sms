// Admin model admin is a school principal or owner 
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    profilePicture: { type: String },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    role: { type: String, default: "admin" },
    

    employeeId: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    isActive : {type : Boolean , default : true}
  },
  { timestamps : true }
);

// Password hash middleware
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Admin", adminSchema);