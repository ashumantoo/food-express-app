import mongoose, { Schema, Document } from "mongoose";

export interface ICartItemModel {
  foodItem: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

export interface ICartModel extends Document {
  user: mongoose.Schema.Types.ObjectId;
  restaurant: mongoose.Schema.Types.ObjectId;
  items: ICartItemModel[];
  totalPrice: number;
}

const CartSchema = new Schema<ICartModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    items: [
      {
        foodItem: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model<ICartModel>("Cart", CartSchema);
