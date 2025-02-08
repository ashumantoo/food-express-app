const baseUrl = process.env.API_BASE_URL || "http://localhost:3000/api";
export const API_ENDPOINTS = {
  register: `${baseUrl}/auth/register`,
  login: `${baseUrl}/auth/login`,
  logout: `${baseUrl}/auth/logout`,
  user: `${baseUrl}/users`,
  restaurants: `${baseUrl}/restaurants`,
  menu:`${baseUrl}/restaurant-owner/menu`
}