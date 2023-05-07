import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth/auth.js";
import Base from "../views/Base.jsx";

// eslint-disable-next-line react/prop-types
export const PrivateRoute = () => {
  return isAuthenticated() ? <Base /> : <Navigate to="/login" />;
};
