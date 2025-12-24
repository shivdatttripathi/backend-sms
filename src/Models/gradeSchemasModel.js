import mongoose from "mongoose";
const gradeSchemasSchema = new mongoose.Schema({
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    name: { type: String, required: true },
    grades: [
        { grade: { type: String, required: true }},
        { minPercentage: { type: Number, required: true }},
        { maxPercentage: { type: Number, required: true }},
        { remarks: { type: String }},
        { gpa: { type: Number, required: true }}
    ],
    isDefault: { type: Boolean, default: false },
}, { timestamps: true })

const GradeSchemas = mongoose.model("GradeSchemas", gradeSchemasSchema);
export default GradeSchemas;