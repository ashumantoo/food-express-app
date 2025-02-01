export interface IUserRegistration extends IUserLogin {
  firstName: string;
  lastName: string;
  mobile: string;
  role: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}