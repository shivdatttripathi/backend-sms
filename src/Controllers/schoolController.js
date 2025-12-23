import asyncHandler from "../utils/async.handler.js";
import School from "../Models/schoolModel.js";
import { validationResult } from "express-validator";

const registerSchool = asyncHandler(async (req, res) => {
    // Validation errors check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if school already exists
    const existingSchool = await School.findOne({ 
        $or: [
            { schoolCode: req.body.schoolCode },
            { email: req.body.email }
        ]
    });
    
    if (existingSchool) {
        return res.status(400).json({ 
            message: existingSchool.schoolCode === req.body.schoolCode 
                ? "School code already exists" 
                : "Email already registered" 
        });
    }

    // Direct req.body use karo - Mongoose khud filter kar lega
    const school = new School(req.body);
    await school.save();
    
    res.status(201).json({ 
        message: "School registered successfully", 
        school 
    });
});

// school update controller
const updateSchool = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const school = await School.findByIdAndUpdate(id, req.body, { new: true });
    if (!school) {
        return res.status(404).json({ message: "School not found" });
    }

    res.status(200).json({ message: "School updated successfully", school });
});

const deleteSchool = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // before deleting school always check if school exists


    const school = await School.findByIdAndDelete(id);


    if (!school) {
        return res.status(404).json({ message: "School not found" });
    }

    res.status(200).json({ message: "School deleted successfully", school });
});

// future enhancements: get school details, list all schools with pagination and filtering


export { registerSchool, updateSchool, deleteSchool };