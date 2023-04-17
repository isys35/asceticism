import React from "react";
import ReactDOM from "react-dom/client";

//theme
import "primereact/resources/themes/viva-dark/theme.css";

//core
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

//icons
import "primeicons/primeicons.css";
import AppRoutes from "./router/Routes.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
