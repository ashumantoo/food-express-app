import { IAdress } from "@/models/user";

export interface IUserRegistration extends IUserLogin {
  firstName: string;
  lastName: string;
  mobile: string;
  role: string;
  confirmPassword: string;
}

export interface ICreateRestaurantInput {
  name: string;
  cuisines: string[],
  email: string;
  mobile: string;
  registrationNumber: string;
  address: IAdress;
  owner: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: string;
  dob: string;
  profileImage: string
  address: IAdress;
  role: string;
  restaurant: string;
  isActive: boolean;
}

export interface IRestaurant {
  _id: string;
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
  owner: string;
  isActive: boolean;
}

export interface IMenu {
  _id: string;
  name: string;
  price: number;
  discountedPrice: number;
  category: string;
  description: string;
  isAvailable: boolean;
  imageUrl: string;
}
