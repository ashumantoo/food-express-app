import { IAdress } from "@/models/user";
import { ICreateRestaurantInput, IMenu, IRestaurant, IUser, IUserLogin, IUserRegistration } from "./types";

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

export const menuCategories = [
  {
    label: "Veg",
    value: "VEG"
  },
  {
    label: "Non Veg",
    value: "NON_VEG"
  }
];

export enum MenuCategoriesEnum {
  VEG = "VEG",
  NON_VEG = "NON_VEG"
}

export const MenuCategoriesValue: {
  [key in MenuCategoriesEnum]: string
} = {
  VEG: "Veg",
  NON_VEG: "Non Veg"
}

export const menuInitialValue: IMenu = {
  _id: "",
  name: "",
  price: 0,
  discountedPrice: 0,
  category: MenuCategoriesEnum.VEG,
  description: "",
  imageUrl: "",
  isAvailable: true
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
  {
    label: "Cake",
    value: "CAKE"
  },
  {
    label: "Sweets",
    value: "SWEETS"
  },
]

export enum CuisinesEnum {
  NORTH_INDIAN = 'NORTH_INDIAN',
  SOUTH_INDIAN = 'SOUTH_INDIAN',
  BIRYANI = 'BIRYANI',
  PIZZA = 'PIZZA',
  CHAINES = 'CHAINES',
  CAKE = 'CAKE',
  SWEETS = 'SWEETS',
}

export const CuisinesEnumValue: {
  [key in CuisinesEnum]: string
} = {
  NORTH_INDIAN: 'North Indian',
  SOUTH_INDIAN: 'South Indian',
  BIRYANI: "Biryani",
  PIZZA: 'Pizza',
  CHAINES: 'Chaines',
  CAKE: 'Cake',
  SWEETS: 'Sweets'
}

export enum PaymentMethodEnum {
  COD = "COD",
  ONLINE = "ONLINE"
}

export const PaymentMethodEnumValue: {
  [key in PaymentMethodEnum]: string
} = {
  COD: "Cash",
  ONLINE: "Online"
}

export enum OrderStatusEnum {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}

export const OrderStatusEnumValue: {
  [key in OrderStatusEnum]: string
} = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  DELIVERED: 'Delivred',
  CANCELLED: 'Cancelled'
}

export enum InvoiceStatusEnum {
  UNPAID = "UNPAID",
  PAID = "PAID",
  CANCELLED = "CANCELLED"
}

export const InvoiceStatusValue: {
  [key in InvoiceStatusEnum]: string
} = {
  PAID: 'Paid',
  UNPAID: 'Unpaid',
  CANCELLED: 'Cancelled'
}

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

export enum MEDIA_FOLDER_NAME {
  MENU = 'menu',
  USERS = 'users',
  RESTAURANTS = 'restaurants'
}

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

export const mediaUploader = async (files: File[], folderName: string) => {
  const uploadedMediaUrls: string[] = [];
  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'stugahyi');
    formData.append('cloud_name', 'ashumantoo');
    formData.append('folder', `food-express-app/${folderName}`);

    try {
      const apiResponse = await fetch(`https://api.cloudinary.com/v1_1/ashumantoo/auto/upload`, {
        method: 'POST',
        body: formData
      });
      const res = await apiResponse.json();
      uploadedMediaUrls.push(res.secure_url)
    } catch (error) {
      console.log("Error while uploading media to cloudinary", error);
    }
  }
  return uploadedMediaUrls;
}