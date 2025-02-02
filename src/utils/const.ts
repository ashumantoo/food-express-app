import { ICreateRestaurantInput, IUserLogin, IUserRegistration } from "./types";

export enum RoleTypeEnum {
  USER = "USER",
  RESTAURANT_OWNER = "RESTAURANT_OWNER"
}

export const UserRegistrationInitialValue: IUserRegistration = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  password: "",
  role: RoleTypeEnum.USER
}

export const CreateRestaurantInputInitialValue: ICreateRestaurantInput = {
  name: "",
  cuisines: [],
  email: "",
  mobile: "",
  registrationNumber: "",
  address: {
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: ""
  },
  owner: ""
}

export const UserLoginInitialValue: IUserLogin = {
  email: "",
  password: ""
}

export const cuisinesOptions = [
  {
    label: "North Indian",
    value: "NORTH_INDIAN"
  },
  {
    label: "South Indian",
    value: "SOUTH_INDIAN"
  },
  {
    label: "Biryani",
    value: "BIRYANI"
  },
  {
    label: "Pizza",
    value: "PIZZA"
  },
  {
    label: "Chaines",
    value: "CHAINES"
  },
]