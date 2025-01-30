import { createRoot } from "react-dom/client";
import "./styles/index.css";
import AppRoutes from "./routes/routes.tsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            backgroundColor: "var(--toast-bg-dark)", // Fondo dinámico
            color: "var(--toast-text-dark)", // Texto dinámico
          },
          duration: 3000,
        }}
      />

      <AppRoutes />
    </>
  </BrowserRouter>
);
