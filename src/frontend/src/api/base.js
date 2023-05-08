import axios from "axios";
import { logout } from "../auth/auth.js";

export const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
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
