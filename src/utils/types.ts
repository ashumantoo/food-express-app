import { IAdress } from "@/models/user";
import { CuisinesEnum, MenuCategoriesEnum, OrderStatusEnum, PaymentMethodEnum } from "./const";
import { IInvoiceItem } from "@/models/invoice";
import { IOrder } from "@/models/order";

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

export interface IRestaurantDetails {
  restaurant: IRestaurant,
  menus: IMenu[]
}

export interface IOrderItem {
  foodItem: string;
  quantity: number;
  price: number;
}

export interface ICreateOrder {
  user: string;
  restaurant: string;
  items: IOrderItem[];
  totalPrice: number;
  address: string;
  phone: string;
  paymentMethod: PaymentMethodEnum;
  status: OrderStatusEnum;
}

export interface ICreateInvoice {
  order: string;
  restaurant: string;
  user: string;
  items: IInvoiceItem[];
  subTotal: number;
  taxAmount: number;
  taxPercent: number;
  deliveryCharge: number;
  totalAmount: number;
  status: "UNPAID" | "PAID" | "CANCELLED";
  dueDate: string;
}

export interface IViewInvoice {
  _id: string;
  user: IUser;
  order: IUserOrder;
  restaurant: IRestaurant;
  items: IInvoiceItem[];
  subTotal: number;
  taxAmount: number;
  taxPercent: number;
  deliveryCharge: number;
  totalAmount: number;
  status: "UNPAID" | "PAID" | "CANCELLED";
  dueDate: string;
}

export interface IUserOrderItem {
  foodItem: IMenu;
  quantity: number;
}

export interface IUserOrder {
  _id: string;
  totalPrice: number;
  paymentMethod: PaymentMethodEnum;
  address: string;
  status: OrderStatusEnum;
  items: IUserOrderItem[];
  user?: IUser;
}
