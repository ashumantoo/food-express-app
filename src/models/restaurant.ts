import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IAdress } from "./user";

export interface IRestaurant extends Document {
  name: string;
  email: string;
  mobile: string;
  registrationNumber: string;
  address: IAdress;
  restaurantImage: string;
  cuisines: string[];
  operatingHours: string[];
  owner: ObjectId;
  isActive: boolean;
}

const RestaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, minlength: 10, maxlength: 10 },
    registrationNumber: { type: String, default: "" },
    restaurantImage: { type: String, default: "" },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipcode: { type: String, required: true }
    },
    cuisines: { type: [String], default: [] },
    operatingHours: { type: [String], default: [] },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);