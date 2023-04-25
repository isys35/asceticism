import React from "react";
import ReactDOM from "react-dom/client";
import { locale, addLocale } from "primereact/api";
import { LOCALE } from "./config.js";
import { RouterProvider } from "react-router";
import router from "./router/Routes.jsx";

import "./style.scss";

// locale
addLocale("ru", LOCALE);

locale("ru");


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
