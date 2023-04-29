import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from "../views/Login.jsx";
import Home from "../views/Home.jsx";
import { PrivateRoute } from "./PrivateRoute.jsx";
import CreateAscesis from "../views/ascesis/CreateAscesis.jsx";
import React from "react";
import ListAscesis, {ascesLoader} from "../views/ascesis/ListAscesis.jsx";

const Error = () => {
  return (
    <div>Ошибка</div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="login" element={<Login />}/>
      <Route element={<PrivateRoute/> } errorElement={<Error />}>
        <Route path="/" element={<Home/>} />
        <Route path="asces" loader={ascesLoader} element={<ListAscesis/>} />
        <Route path="create-ascesa" element={<CreateAscesis />}/>
      </Route>
    </Route>
  )
);

export default router;
