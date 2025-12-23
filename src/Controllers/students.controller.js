import Student from "../Models/studentsModel.js";
import  asyncHandler  from "../utils/async.handler.js";
// Student Registration Controller
//Register a one student
const studentRegistrationOneBy = asyncHandler(async (req, res) => {
 
  const student = new Student(req.body);

  await student.save();
  res.status(201).json({ message: "Student registered successfully", student });
});

// register multiple students
const studentRegistrationMultiple = asyncHandler(async (req, res) => {

  
  const students = req.body.students; // Expecting an array of student objects

  if (!Array.isArray(students) || students.length === 0) {

    return res.status(400).json({ message: "Invalid or empty students array" });
  }
// v1
  const createdStudents = await Promise.all(
    students.map(async (studentData) => {
      const student = new Student(studentData);
      return await student.save();
    })
  );

  res.status(201).json({ message: "Students registered successfully", students: createdStudents });
});

//update multiple students
const updateMultipleStudents = asyncHandler(async (req, res) => {
  const { students } = req.body;
  if (!Array.isArray(students) || students.length === 0) {
    return res.status(400).json({ message: "Invalid or empty students array" });
  }

  const updatedStudents = await Promise.all(
    students.map(async (studentData) => {
      const student = await Student.findByIdAndUpdate(studentData._id, studentData, { new: true });
      return student;
    })
  );


  res.status(200).json({ message: "Students updated successfully", students: updatedStudents });
});

//update single student by using form data
const updateSingleStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.status(200).json({ message: "Student updated successfully", student });
});

// delete single student
const deleteSingleStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.status(200).json({ message: "Student deleted successfully", student });
});



// Exporting the controllers
export  {
  studentRegistrationOneBy,
  studentRegistrationMultiple,
  updateMultipleStudents,
  updateSingleStudent,
  deleteSingleStudent
};

