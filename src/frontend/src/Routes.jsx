import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/Login.jsx";
import Home from "./views/Home.jsx";
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route exact path="/" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
