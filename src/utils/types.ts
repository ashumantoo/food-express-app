import { IAdress } from "@/models/user";

export interface IUserRegistration extends IUserLogin {
  firstName: string;
  lastName: string;
  mobile: string;
  role: string;
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