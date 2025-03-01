const baseUrl = `https://food-express-kappa.vercel.app/api`;

export const API_ENDPOINTS = {
  register: `${baseUrl}/auth/register`,
  login: `${baseUrl}/auth/login`,
  logout: `${baseUrl}/auth/logout`,
  user: `${baseUrl}/users`,
  restaurants: `${baseUrl}/restaurants`,
  meals: `${baseUrl}/meals`,
  cart: `${baseUrl}/cart`,
  orders: `${baseUrl}/orders`,
  invoices: `${baseUrl}/invoices`,
  restaurant_owner: {
    menu: `${baseUrl}/restaurant-owner/menu`,
    order: `${baseUrl}/restaurant-owner/orders`,
    invoices: `${baseUrl}/restaurant-owner/invoices`
  }
}