import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Layout from "../components/Layout";
import AcceptInvitation from "../pages/AcceptInvitation";
import Groups from "../pages/Groups";
export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas con Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="groups" element={<Groups />} /> 
      </Route>

      {/* Rutas sin Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/accept-invitation/:token" element={<AcceptInvitation />} />
    </Routes>
  );
}
