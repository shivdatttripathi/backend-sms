import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    schoolId:{ type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String },
    type: { type: String, enum: ["theory", "practical", "both"], default: "theory" },
    credits: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;