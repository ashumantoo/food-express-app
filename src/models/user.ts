import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  gender: string;
  dob: string;
  profileImage: string
  address: IAdress;
  role: string;
  restaurantIds: string[]
}

export interface IAdress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, minlength: 10, maxlength: 10 },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'] },
    dob: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
      zipcode: { type: String, default: "" }
    },
    role: {
      type: String, required: true, enum: {
        values: ['USER', 'RESTAURANT_OWNER'],
        message: "Invalid role"
      }
    },
    restaurantIds: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }]
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
