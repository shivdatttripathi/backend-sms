import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    // date is INDEXED for faster queries
    date: { type: Date, required: true, index: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required:
    true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    status: { type: String, enum: ["Present", "Absent", "Leave"], required: true },
    remarks: { type: String },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    source: { type: String, enum: ["manual", "biometric", "app"], default: "manual" },
    syncedAt: { type: Date },
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;