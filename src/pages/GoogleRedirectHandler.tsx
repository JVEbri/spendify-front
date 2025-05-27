import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }

    // Limpia la URL y redirige al Home (o donde quieras)
    navigate("/", { replace: true });
  }, [navigate]);

  return <p>Procesando login...</p>;
}
