// components/AuthGate.tsx
import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate, Outlet } from "react-router-dom";

export default function AuthGate() {
  const { fetchUser, user, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/login");
      } else if (user.groups.length === 0) {
        navigate("/groups/create");
      }
    }
  }, [user, isLoading]);

  if (isLoading) return <div>Cargando...</div>;

  return <Outlet />;
}
