import mongoose from "mongoose";

const periodSchema = new mongoose.Schema({
  periodNumber: { type: Number }, // e.g., 1, 2, 3 (Helps in ordering)
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }, // Optional for "Break"
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }, // Optional for "Break"
  roomId: { type: String }, // e.g., "Room 101" or "Physics Lab"
  
  // Storing time as 24-hour string is best for Timetables (e.g., "09:00", "14:30")
  startTime: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: props => `${props.value} is not a valid time format! Use HH:mm (e.g. 09:30)`
    }
  },
  endTime: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: props => `${props.value} is not a valid time format! Use HH:mm`
    }
  },
  type: { 
    type: String, 
    enum: ["Lecture", "Lab", "Assembly", "Break", "Sports"], 
    default: "Lecture" 
  }
});

const timetableSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
    
    academicYear: { type: String, required: true }, // e.g., "2024-2025"
    term: { type: String, default: "Term 1" },
    
    // We group by Day of Week
    schedule: [
      {
        day: { 
            type: String, 
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], 
            required: true 
        },
        periods: [periodSchema]
      }
    ]
  },
  { timestamps: true }
);

// Compound Index: Ensure one timetable per Section per Term
timetableSchema.index({ schoolId: 1, sectionId: 1, academicYear: 1, term: 1 }, { unique: true });

const Timetable = mongoose.model("Timetable", timetableSchema);
export default Timetable;