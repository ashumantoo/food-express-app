import mongoose, { Schema, Document, model } from "mongoose";

export interface IInvoice extends Document {
  order: mongoose.Types.ObjectId;
  restaurant: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  items: IInvoiceItem[];
  subTotal: number;
  totalAmount: number;
  taxAmount: number;
  taxPercent: number;
  deliveryCharge: number;
  status: "UNPAID" | "PAID" | "CANCELLED";
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IInvoiceItem {
  name: string;
  description: string;
  price: string;
  quantity: number;
  total: number;
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      total: { type: Number, required: true }
    }],
    subTotal: { type: Number, required: true },
    taxAmount: { type: Number, required: true },
    taxPercent: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["UNPAID", "PAID", "CANCELLED"], default: "UNPAID" },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Invoice || model<IInvoice>("Invoice", InvoiceSchema);
