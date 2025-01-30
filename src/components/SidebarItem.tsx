import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: ReactNode;
}

export default function SidebarItem({ href, label, icon }: SidebarItemProps) {
  const location = useLocation(); // Obtener la ruta actual
  const isActive = location.pathname === href; // Comprobar si el item está activo

  return (
    <a
      href={href}
      className={`flex items-center p-2 rounded-lg transition duration-300 ${
        isActive
          ? "bg-primary-dark light:bg-primary-light text-white"
          : "hover:bg-secondary-dark light:hover:bg-secondary-light hover:text-white"
      }`}
    >
      {/* Icono */}
      <span
        className={`w-6 text-white h-6 rounded-md bg-primary-dark ligt:bg-primary-light flex items-center justify-center text-lg mr-3`}
      >
        {icon}
      </span>
      {/* Label */}
      <span
        className={`text-base ${
          isActive
            ? "font-semibold text-white"
            : "text-textPrimary-dark light:text-textPrimary-light"
        }`}
      >
        {label}
      </span>
    </a>
  );
}
