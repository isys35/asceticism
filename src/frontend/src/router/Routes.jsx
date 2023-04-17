import {BrowserRouter as Router, Route, Routes, useRouteError} from "react-router-dom";
import Login from "../views/Login.jsx";
import Home from "../views/Home.jsx";
import { PrivateRoute } from "./PrivateRoute.jsx";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login/>} errorElement={<ErrorBoundary />}/>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}

export default AppRoutes;


