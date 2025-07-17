import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["expenses", "income"],
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    tDate: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transaction", transactionSchema); // transactions
