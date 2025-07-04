import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: String,
  category: { type: String, default: "Other" },
}, {
  timestamps: true,
});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
