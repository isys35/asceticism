import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from "../views/Login.jsx";
import Home, {ascesLoader} from "../views/Home.jsx";
import { PrivateRoute } from "./PrivateRoute.jsx";
import CreateAscesis from "../views/ascesis/CreateAscesis.jsx";
import React from "react";

const Error = () => {
  return (
    <div>Ошибка</div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="login" element={<Login />}/>
      <Route element={<PrivateRoute/> }>
        <Route path="/" loader={ascesLoader}  element={<Home/>} errorElement={<Error />}/>
        <Route path="create-ascesis" element={<CreateAscesis />}/>
      </Route>
    </Route>
  )
);

export default router;
