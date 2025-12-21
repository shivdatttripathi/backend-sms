// school model
const mongoose = require("mongoose");
const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },  
    principalName: { type: String },
    establishedYear: { type: Number },
    logo: { type: String },
    website: { type: String },
    isActive: { type: Boolean, default: true },
    schoolwebsite: { type: String },
    subscriptionPlan: { type: String },
    subscriptionExpiry: { type: Date },
    
  },
  { timestamps: true }
);