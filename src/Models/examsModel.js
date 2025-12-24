import mongoose from "mongoose";
const examsSchema = new mongoose.Schema({
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    // name is enum like "Midterm", "Finals", "Quarterly"
    name: { type: String, enum: ["Midterm", "Finals", "Quarterly", "Monthly", "Weekly"], required: true },
    academicYear: { type: String, required: true },
    term :{type:String,required:true},
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    gradeschemeId: { type: mongoose.Schema.Types.ObjectId, ref: "GradeScheme", required: true },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
        {maxMarks: {type: Number, required: true}},
        {date: {type: Date, required: true}}
    ],
    status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
}, { timestamps: true });

const Exams = mongoose.model("Exams", examsSchema);
export default Exams;