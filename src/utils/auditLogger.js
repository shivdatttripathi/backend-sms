import AuditLogs  from "../Models/auditLogsModel.js";


export const createAuditLog = async (req, action, module, entityId, entityType, changes = {}) => {
  try {
    // Agar user login nahi hai ya req.user nahi hai toh log mat banao (Safety)
    if (!req.user) return;

    await AuditLogs.create({
      schoolId: req.user.schoolId, // User ke token/session se schoolId lo
      userId: req.user._id,
      userModel: req.user.role, // 'Admin', 'Teacher' etc. (Jo aapke Auth middleware me set ho)
      action: action, // e.g., 'UPDATE'
      module: module, // e.g., 'Student'
      entityId: entityId,
      entityType: entityType,
      changes: changes, // Old vs New Data
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    console.log(`Audit Log Created: ${action} on ${module}`);
  } catch (error) {
    // Agar Log fail ho jaye, to main process rukna nahi chahiye, bas error print kardo
    console.error("Audit Log Error:", error); 
  }
};