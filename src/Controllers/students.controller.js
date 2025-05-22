import studentsModel from "../Models/studentsModel";
import { asyncHandler } from "../utils/async.handler";
import { validateStudentRegistration } from "../Vaildation/studentsValidation";
const studentRegistration = asyncHandler(async (req, res) => {
  validateStudentRegistration(req.body);
});
