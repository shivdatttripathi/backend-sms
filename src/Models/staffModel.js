import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { schema } from "./teachersModel";
const staffSchema = new mongoose.Schema({
    emplyoyeeId: { type: String, required: true, unique: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String },
    joiningDate: { type: Date, default: Date.now },
    department: { type: String },
    role: { type: String, default: "staff" },
    password: { type: String, required: true },
    qualification: { type: String },
    exrperience: { type: String },
    salary: { type: Number },
    documents: [String],

    isActive: { type: Boolean, default: true },
}, { timestamps: true });

//password hash middleware
staffSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
