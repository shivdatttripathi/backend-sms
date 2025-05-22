const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const teacherSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    profilePicture: { type: String },

    employeeId: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    subjectSpecialization: String,
    classesAssigned: [String],
    joiningDate: Date,
    salary: Number,

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Password hash middleware
teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Teacher", teacherSchema);
