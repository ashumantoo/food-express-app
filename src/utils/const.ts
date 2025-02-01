import { IUserLogin, IUserRegistration } from "./types";

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

export const UserLoginInitialValue: IUserLogin = {
  email: "",
  password: ""
}