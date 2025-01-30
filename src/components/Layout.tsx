import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Breadcrumbs from "./Breadcrumbs"; // Importa el componente Breadcrumbs

export default function Layout() {
  return (
    <div className="flex min-h-screen h-screen">
      <Sidebar />

      {/* Contenido principal */}
      <div className="bg-background-dark light:bg-background-light text-textPrimary-dark light:text-textPrimary-light flex-grow flex flex-col lg:ml-64">
        {/* Barra de navegación superior */}
        <header className="p-4f fixed">
          <Breadcrumbs /> 
        </header>

        {/* Contenido dinámico */}
        <main className="flex-grow bg-gray-100 dark:bg-gray-900 mt-10">
          <Outlet /> {/* Renderiza las rutas hijas aquí */}
        </main>

        {/* Pie de página */}
        <footer className="w-full bg-gray-800 dark:bg-gray-700 text-white text-center p-4">
          © {new Date().getFullYear()} Spendify
        </footer>
      </div>
    </div>
  );
}