import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: String,
}, {
  timestamps: true,
});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
