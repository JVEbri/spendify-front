import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { User, Gear, List, UsersThree } from "phosphor-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón de menú hamburguesa (visible solo en móviles) */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 bg-primary-dark text-white p-2 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        <List size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-background-dark light:bg-background-light text-textPrimary-dark light:text-textPrimary-light p-4 transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0`}
      >
        {/* Título */}
        <h1 className="text-2xl font-bold mb-6 border-b border-gray-700 light:border-gray-300 pb-2">
          Spendify
        </h1>
        {/* Navegación */}
        <nav className="flex flex-col space-y-2">
          <SidebarItem href="/profile" label="Perfil" icon={<User />} />
          <SidebarItem href="/settings" label="Configuración" icon={<Gear />} />
          <SidebarItem href="/groups" label="Grupos" icon={<UsersThree />} /> {/* ⬅️ Nuevo */}
          </nav>
      </aside>

      {/* Overlay oscuro cuando el Sidebar está abierto (solo en móviles) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}