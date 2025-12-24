import mongoose from 'mongoose';
const feeInvoicesSchema = new mongoose.Schema({
    invoiceNumber: { type: String, required: true, unique: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    feeStuctureId: { type: mongoose.Schema.Types.ObjectId, ref: "FeeStructures", required: true },
    item: [
        {description: { type: String, required: true }},
        {amount: { type: Number, required: true }}
    ],
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    balanceAmount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["Paid", "Unpaid", "Partially Paid", "Overdue"], default: "Unpaid" },
}, { timestamps: true });
const FeeInvoices = mongoose.model("FeeInvoices", feeInvoicesSchema);
export default FeeInvoices;