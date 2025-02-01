import mongoose, { Schema, Document } from "mongoose";
import { IAdress } from "./user";

export interface IRestaurant extends Document {
  name: string;
  email: string;
  mobile: string;
  address: IAdress;
  restaurantImage: string;
}

const RestaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, minlength: 10, maxlength: 10 },
    restaurantImage: { type: String, default: "" },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
      zipcode: { type: String, default: "" }
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);