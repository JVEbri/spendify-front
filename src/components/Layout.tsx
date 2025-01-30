import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-grow flex flex-col">
        {/* Barra de navegación superior */}
        <header className=" text-white p-4">
          <nav className="flex space-x-4">
            <a href="/" className="hover:underline">
              Inicio
            </a>
            <a href="/profile" className="hover:underline">
              Perfil
            </a>
            <a href="/settings" className="hover:underline">
              Configuración
            </a>
          </nav>
        </header>

        {/* Contenido dinámico */}
        <main className="flex-grow bg-gray-100">
          <Outlet /> {/* Renderiza las rutas hijas aquí */}
        </main>

        {/* Pie de página */}
        <footer className="bg-gray-800 text-white text-center p-4">
          © {new Date().getFullYear()} Spendify
        </footer>
      </div>
    </div>
  );
}
