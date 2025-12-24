import mongoose from 'mongoose';
const examResultsSchema = new mongoose.Schema({
    examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exams", required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
markObtained: { type: Number, required: true },
maxMarks: { type: Number, required: true },
grade:{ type: String, required: true },
remarks: { type: String },
enteredBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
isModerated: { type: Boolean, default: false },
}, { timestamps: true });

const ExamResults = mongoose.model("ExamResults", examResultsSchema);
export default ExamResults;