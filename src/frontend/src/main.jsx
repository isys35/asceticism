import React from "react";
import ReactDOM from "react-dom/client";
import { locale, addLocale } from "primereact/api";

//theme
import "primereact/resources/themes/viva-dark/theme.css";

//core
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

//icons
import "primeicons/primeicons.css";

import { LOCALE } from "./config.js";
import { RouterProvider } from "react-router";
import router from "./router/Routes.jsx";

// locale
addLocale("ru", LOCALE);

locale("ru");


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
