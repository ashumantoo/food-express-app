import { IAdress } from "@/models/user";
import { ICreateRestaurantInput, IRestaurant, IUser, IUserLogin, IUserRegistration } from "./types";
import { boolean } from "yup";

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
  confirmPassword: "",
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

export const addressInitialValue: IAdress = {
  street: "",
  state: "",
  city: "",
  country: "",
  zipcode: ""
}

export const userInitialValue: IUser = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  dob: "",
  gender: "",
  profileImage: "",
  restaurant: "",
  address: addressInitialValue,
  isActive: true,
  role: RoleTypeEnum.USER
}

export const restaurantInitialValue: IRestaurant = {
  _id: "",
  name: "",
  email: "",
  mobile: "",
  registrationNumber: "",
  restaurantImage: "",
  cuisines: [],
  openingHours: "",
  closingHours: "",
  workingDays: [],
  owner: "",
  isActive: true,
  address: addressInitialValue
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

export const workingDaysOptions = [
  {
    label: "Monday",
    value: "MONDAY"
  },
  {
    label: "Tuesday",
    value: "TUESDAY"
  },
  {
    label: "Wednesday",
    value: "WEDNESDAY"
  },
  {
    label: "Thrusday",
    value: "THRUSDAY"
  },
  {
    label: "Friday",
    value: "FRIDAY"
  },
  {
    label: "Saturday",
    value: "SATURDAY"
  },
  {
    label: "Sunday",
    value: "SUNDAY"
  },
]

export const gender = [
  {
    label: "Male",
    value: "MALE"
  },
  {
    label: "Female",
    value: "FEMALE"
  },
  {
    label: "Other",
    value: "OTHER"
  },
]

export function formatDate(date: string) {
  const dateString = new Date(date);
  const yyyy = dateString.getFullYear();
  let mm: number | string = dateString.getMonth() + 1; // Months start at 0!
  let dd: number | string = dateString.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedDate = dd + '/' + mm + '/' + yyyy;
  return formattedDate;
}