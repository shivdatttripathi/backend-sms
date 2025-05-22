const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    email: { type: String },
    profilePicture: { type: String },

    enrollmentNumber: { type: String, required: true, unique: true },
    admissionDate: { type: Date, default: Date.now },
    academicYear: { type: String },
    class: { type: String, required: true },
    section: { type: String },

    guardian: {
      fatherName: String,
      fatherContact: String,
      motherName: String,
      motherContact: String,
      guardianName: String,
      guardianRelation: String,
      guardianContact: String,
      guardianEmail: String,
    },

    medicalRecords: {
      allergies: String,
      medicalConditions: String,
    },

    transport: {
      required: Boolean,
      pickupLocation: String,
      routeNumber: String,
    },

    loginPhone: { type: String },
    loginDOB: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
