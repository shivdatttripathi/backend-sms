import mongoose from "mongoose";

const periodsSchema = new mongoose.Schema({
    timetableId: { type: mongoose.Schema.Types.ObjectId, ref: "Timetable", required: true },
    day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], required: true },
    periodNumber: { type: Number, required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    roomNumber: { type: String },
}, { timestamps: true });


const Periods = mongoose.model("Periods", periodsSchema);
export default Periods;