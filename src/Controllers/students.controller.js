import Student from "../models/Student.js";
import xlsx from "xlsx";
import fs from "fs";
import createAuditLog from "../utils/auditLogger.js"


// Register a new student
export const registerStudent = async (req, res) => {
  try {
    const { email, admissionNo } = req.body;

    // Check if student already exists to prevent duplicates
    const existingStudent = await Student.findOne({ 
      $or: [{ email }, { admissionNo }] 
    });
    
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists with this Email or Admission No." });
    }

    // Create new student record
    const newStudent = await Student.create(req.body);

    // Audit Log: Record the creation event
    createAuditLog(req, "CREATE", "Student Management", newStudent._id, "Student", { newValue: newStudent });

    res.status(201).json({ success: true, message: "Student registered successfully", data: newStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all students with optional filters
export const getAllStudents = async (req, res) => {
  try {
    // Apply filters if query params exist (e.g., ?classId=...)
    const query = {};
    if (req.query.classId) query.classId = req.query.classId;
    if (req.query.section) query.section = req.query.section;

    const students = await Student.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single student details
export const getStudentDetail = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update student data
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Retrieve original data for audit logging (Before Update)
    const oldStudent = await Student.findById(id);
    if (!oldStudent) return res.status(404).json({ message: "Student not found" });

    // Perform update operation
    const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    // Audit Log: Record old vs new values
    createAuditLog(req, "UPDATE", "Student Management", updatedStudent._id, "Student", {
        oldValue: oldStudent,
        newValue: updatedStudent
    });

    res.status(200).json({ success: true, message: "Student updated successfully", data: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve student data before deletion for backup in logs
    const studentToDelete = await Student.findById(id);
    if (!studentToDelete) return res.status(404).json({ message: "Student not found" });

    // Perform delete operation
    await Student.findByIdAndDelete(id);

    // Audit Log: Record deletion with backup data
    createAuditLog(req, "DELETE", "Student Management", studentToDelete._id, "Student", {
        oldValue: studentToDelete,
        newValue: null 
    });

    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bulk register students via Excel
export const bulkStudentRegister = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an Excel file" });
    }

    // Read and parse Excel file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0]; 
    const sheet = workbook.Sheets[sheetName];
    const rawData = xlsx.utils.sheet_to_json(sheet);

    // Check if sheet is empty
    if (rawData.length === 0) {
      fs.unlinkSync(req.file.path); // Cleanup empty file
      return res.status(400).json({ message: "Excel sheet is empty" });
    }

    // Map data and add system fields (like School ID)
    const studentsWithSchool = rawData.map(student => ({
        ...student,
        schoolId: req.user.schoolId, 
        password: "defaultPassword123" // Set default password
    }));

    // Bulk Insert for performance
    const studentsCreated = await Student.insertMany(studentsWithSchool);

    // Audit Log: Summary of batch operation
    createAuditLog(req, "BULK_IMPORT", "Student Management", req.user._id, "Batch", {
        fileName: req.file.originalname,
        count: studentsCreated.length,
        status: "Success"
    });

    // Cleanup: Remove temporary uploaded file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: `${studentsCreated.length} Students registered successfully via Bulk Upload`,
    });

  } catch (error) {
    // Ensure file cleanup in case of error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Handle duplicate key errors (e.g., Duplicate Email)
    if (error.code === 11000) {
        return res.status(400).json({ message: "Duplicate data found in Excel (Email or Admission No already exists)" });
    }
    res.status(500).json({ message: error.message });
  }
};

export  {
  registerStudent,
  getAllStudents,
  getStudentDetail,
  updateStudent,
  deleteStudent,
  bulkStudentRegister
  
}