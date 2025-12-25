import mongoose from 'mongoose';

const auditLogsSchema = new mongoose.Schema({
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    
    // Yahan hum Dynamic Reference use karenge
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        refPath: 'userModel' // Ye Mongoose ko bolega ki 'userModel' field check karo
    },
    
    // Ye field bataega ki userId kis collection mein dhundni hai
    userModel: { 
        type: String, 
        required: true, 
        enum: ['Admin', 'Teacher', 'Student', 'Staff', 'SuperAdmin'] // Yahan aapke user models ke names hone chahiye
    },

    action: { type: String, required: true }, // e.g., 'UPDATE', 'DELETE'
    module: { type: String, required: true }, // e.g., 'Fees', 'Exam'
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
    entityType: { type: String, required: true },

    

    changes: { type: Object },
    ipAddress: { type: String },
    userAgent: { type: String },
    

}, { timestamps: true });

export default mongoose.model("AuditLog", auditLogsSchema);