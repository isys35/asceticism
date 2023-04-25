import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../views/Login.jsx";
import Home from "../views/Home.jsx";
import { PrivateRoute } from "./PrivateRoute.jsx";
import CreateAscesis from "../views/ascesis/CreateAscesis.jsx";
import React, { useRef } from "react";
import { Toast } from "primereact/toast";

function AppRoutes() {
  const toast = useRef(null);
  return (
    <Router>
      <Toast ref={ toast } />
      <Routes>
        <Route path="login" element={<Login toast={toast}/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="create-ascesis" element={<CreateAscesis toast={toast}/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;


