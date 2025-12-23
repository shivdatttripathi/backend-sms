import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
// name string and A B C D etc
name: { type: String, required: true },
classTeacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
capacity: { type: Number },
roomNumber: { type: String },
isActive: { type: Boolean, default: true },

}, { timestamps: true });

const Section = mongoose.model("Section", sectionSchema);
export default Section;