import mongoose from "mongoose";
const timetableSchema = new mongoose.Schema({
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
    academicYear: { type: String, required: true },
    term: { type: String, enum: ["Term 1", "Term 2", "Term 3"], required: true },
    effectiveFrom: { type: Date, required: true },
    effectiveTo: { type: Date },
    schedule: [
        {
            day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], required: true },
            periods: [
                {
                    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
                    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
                    startTime: { type: Date, required: true },
                    endTime: { type: Date, required: true }
                }
            ]
        }
    ]
})
const Timetable = mongoose.model("Timetable", timetableSchema);
export default Timetable;