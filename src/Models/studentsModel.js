import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    email: { type: String },
    profilePicture: { type: String },

    // Academic details

    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School" },


    enrollmentNumber: { type: String, required: true, unique: true },
    admissionDate: { type: Date, default: Date.now },
    academicYear: { type: String },
    class: { type: String, required: true },
    section: { type: String },
    rollNumber: { type: String },
status: { type: String, enum: ["Active", "Inactive", "Graduated", "Transferred"], default: "Active" },
sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },

    // Additional details

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
    address: {
      street: String,
      city: String,
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
    bloodGroup: { type: String },

    loginPhone: { type: String },
    loginDOB: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student ;