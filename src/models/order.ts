import mongoose, { Schema, Document, Mongoose } from "mongoose";

export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  restaurant: mongoose.Schema.Types.ObjectId;
  items: {
    foodItem: mongoose.Schema.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  address: string;
  phone: string;
  paymentMethod: "COD" | "ONLINE";
  status: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED";
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [
      {
        foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMethod: { type: String, enum: ["COD", "ONLINE"], required: true },
    status: { type: String, enum: ["PENDING", "PROCESSING", "DELIVERED", "CANCELLED"], default: "PENDING" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
