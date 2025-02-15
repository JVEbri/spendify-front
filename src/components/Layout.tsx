import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Breadcrumbs from "./Breadcrumbs"; // Importa el componente Breadcrumbs
import GroupSelector from "./GroupSelector";

export default function Layout() {
  return (
    <div className="flex min-h-screen h-screen">
      <Sidebar />

      {/* Contenido principal */}
      <div className="bg-background-light dark:bg-background-dark text-textPrimary-light dark:text-textPrimary-dark flex-grow flex flex-col">
        {/* Barra de navegación superior */}
        <header className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center p-4 shadow-md">
          <Breadcrumbs />
          <GroupSelector /> {/* ⬅️ Aquí el selector */}
        </header>

        {/* Contenido dinámico */}
        <main className="flex-grow bg-gray-100 dark:bg-gray-900">
          <Outlet /> {/* Renderiza las rutas hijas aquí */}
        </main>

        {/* Pie de página */}
        {/* <footer className="w-full bg-gray-800 dark:bg-gray-700 text-white text-center p-4 h-100">
          © {new Date().getFullYear()} Spendify
        </footer> */}
      </div>
    </div>
  );
}
