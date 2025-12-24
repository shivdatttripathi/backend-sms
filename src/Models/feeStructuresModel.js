import mongoose from 'mongoose';

const feeStructuresSchema = new mongoose.Schema({
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    name: { type: String, required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    acadmicYear: { type: String, required: true },
    fwwItems: [
        {name: { type: String, required: true }},
        {amount: { type: Number, required: true }},
        {type: { type: String, enum: ["Fee", "Waiver", "Withdrawal"], required: true }}
    ],
    totalAmount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    installments: [
        {
            installmentNumber: { type: Number, required: true },
            dueDate: { type: Date, required: true },
            amount: { type: Number, required: true }
        }
    ]
})

const FeeStructures = mongoose.model("FeeStructures", feeStructuresSchema);
export default FeeStructures;