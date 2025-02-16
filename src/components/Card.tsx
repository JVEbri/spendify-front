import { ReactNode } from "react";
import MenuDropdown from "./MenuDropdown";

interface CardDetail {
  label: string;
  value: string | number;
}

export interface MenuItem {
  label: string;
  onClick: () => void;
}

interface CardProps {
  id: string; // ✅ Necesitamos el ID para navegar a la edición
  title: string;
  details?: CardDetail[];
  children?: ReactNode;
  menuItems?: MenuItem[];
  width?: string;
  height?: string;
}

export default function Card({
  title,
  details,
  children,
  width = "w-80",
  height = "h-40",
  menuItems,
}: CardProps) {
  return (
    <div
      className={`${width} ${height} bg-card-light dark:bg-card-dark p-4 rounded-lg shadow-md flex flex-col justify-between relative`}
    >
      {/* Encabezado con título y menú */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-textPrimary-light dark:text-textPrimary-dark">
            {title}
          </h2>

          {details && (
            <div className="mt-1 space-y-1">
              {details.map((detail, index) => (
                <p
                  key={index}
                  className="text-sm text-textSecondary-light dark:text-textSecondary-dark"
                >
                  <strong>{detail.label}:</strong> {detail.value}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Botón de menú si hay elementos */}
        {menuItems && menuItems.length > 0 && (
          <MenuDropdown items={menuItems} />
        )}
      </div>

      {/* Contenido dinámico */}
      <div className="flex-grow flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
