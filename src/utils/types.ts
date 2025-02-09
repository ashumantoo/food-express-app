import { IAdress } from "@/models/user";
import { CuisinesEnum, MenuCategoriesEnum } from "./const";

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
  cuisines: CuisinesEnum[];
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
  category: MenuCategoriesEnum;
  description: string;
  isAvailable: boolean;
  imageUrl: string;
}
