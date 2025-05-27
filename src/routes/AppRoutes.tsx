import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Layout from "../components/Layout";
import AcceptInvitation from "../pages/AcceptInvitation";
import Groups from "../pages/groups/Groups";
import CreateGroup from "../pages/groups/CreateGroup";
import EditGroup from "../pages/groups/EditGroup";
import AuthGate from "../components/AuthGate";
import GoogleRedirectHandler from "../pages/GoogleRedirectHandler";
export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas con Layout */}
      <Route element={<AuthGate />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="groups" element={<Groups />} />
          <Route path="groups/create" element={<CreateGroup />} />
          <Route path="groups/edit" element={<EditGroup />} />
        </Route>
      </Route>

      {/* Rutas sin Layout */}
      <Route path="/redirect" element={<GoogleRedirectHandler />} />

      <Route path="/login" element={<Login />} />
      <Route path="/accept-invitation/:token" element={<AcceptInvitation />} />
    </Routes>
  );
}
