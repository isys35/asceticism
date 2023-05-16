import axios from "axios";
import { logout } from "../auth/auth.js";
import { API_URL } from "../config.js";

export const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use(config => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

API.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      logout();
    }
    throw error;
  },
);
