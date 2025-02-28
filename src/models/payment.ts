import mongoose, { Schema, Document, model } from "mongoose";

export interface IPayment extends Document {
  invoice: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  restaurant: mongoose.Types.ObjectId,
  amount: number;
  method: "credit_card" | "debit_card" | "paypal" | "cash_on_delivery";
  status: "pending" | "completed" | "failed";
  transactionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    invoice: { type: Schema.Types.ObjectId, ref: "Invoice", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["credit_card", "debit_card", "paypal", "cash_on_delivery"], required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    transactionId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export default mongoose.models.Payment || model<IPayment>("Payment", PaymentSchema);
