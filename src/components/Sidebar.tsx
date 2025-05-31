import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Importa useLocation
import SidebarItem from "./SidebarItem";
import { User, Gear, List, UsersThree, CurrencyDollar } from "phosphor-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Obtén la ubicación actual
  // Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Cierra el menú cuando cambia de ruta (pero deja el botón hamburguesa)
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Botón de menú hamburguesa SIEMPRE VISIBLE en móviles */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 bg-primary-dark text-white p-2 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        <List size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`pt-8 fixed top-0 left-0 h-full w-64 bg-background-light dark:bg-background-dark text-textPrimary-light dark:text-textPrimary-dark p-4 transform z-40 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen`}
      >
        {/* Título */}
        <h1 className="text-2xl font-bold mb-6 border-b border-gray-300 dark:border-gray-700 pb-2 pl-2">
          Spendify
        </h1>
        {/* Navegación */}
        <nav className="flex flex-col space-y-2">
          <SidebarItem href="/profile" label="Perfil" icon={<User />} />
          <SidebarItem href="/settings" label="Configuración" icon={<Gear />} />
          <SidebarItem href="/groups" label="Grupos" icon={<UsersThree />} />
        </nav>
        <div className="border-t border-gray-300 dark:border-gray-700 my-4" />

        {/* 🔹 Nuevo ítem: Expenses */}
        <SidebarItem
          href="/expenses"
          label="Gastos"
          icon={<CurrencyDollar />}
        />
      </aside>

      {/* Overlay oscuro cuando el Sidebar está abierto en móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
