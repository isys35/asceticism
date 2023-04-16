import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//theme
import "primereact/resources/themes/viva-dark/theme.css";

//core
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

//icons
import "primeicons/primeicons.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
