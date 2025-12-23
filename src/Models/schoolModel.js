// school model]
import mongoose from "mongoose";
const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    schoolCode: { type: String, required: true, unique: true },
    address: { 
        street: String,
        city: String,
        state: String,
        pincode: String
     },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },  
    principalName: { type: String },
    establishedYear: { type: Number },
    logo: { type: String },
    isActive: { type: Boolean, default: true },
    schoolwebsite: { type: String },
    subscriptionPlan: { type: String },
    subscriptionExpiry: { type: Date },
    
  },
  { timestamps: true }
);
const School = mongoose.model("School", schoolSchema);
export default School;