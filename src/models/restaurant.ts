import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IAdress } from "./user";

//TODO: Add delivery time
export interface IRestaurantModel extends Document {
  name: string;
  email: string;
  mobile: string;
  registrationNumber: string;
  address: IAdress;
  restaurantImage: string;
  cuisines: string[];
  openingHours: string;
  closingHours: string;
  workingDays: string[];
  owner: ObjectId;
  isActive: boolean;
}

const RestaurantSchema = new Schema<IRestaurantModel>(
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
    openingHours: { type: String, default: "" },
    workingDays: { type: [String], default: [] },
    closingHours: { type: String, default: "" },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Restaurant || mongoose.model<IRestaurantModel>("Restaurant", RestaurantSchema);