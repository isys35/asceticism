import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../auth/auth.js";


// eslint-disable-next-line react/prop-types
export const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

