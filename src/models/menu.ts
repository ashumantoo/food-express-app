import mongoose, { Schema, Document, models } from "mongoose";

export interface IMenu extends Document {
  restaurantId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
}

const MenuSchema = new Schema<IMenu>(
  {
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, default: 0 },
    category: { type: String, required: true },
    imageUrl: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.Menu || mongoose.model<IMenu>("Menu", MenuSchema);
