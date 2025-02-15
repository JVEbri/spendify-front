import { ReactNode } from "react";
import { DotsThreeVertical } from "phosphor-react";

interface CardDetail {
  label: string;
  value: string | number;
}

interface CardProps {
  title: string;
  details?: CardDetail[];
  children?: ReactNode;
  onMenuClick?: () => void;
  width?: string; // ✅ Ahora puedes pasar el ancho como prop
  height?: string; // ✅ También el alto
}

export default function Card({
  title,
  details,
  children,
  onMenuClick,
  width = "w-80", // 🔹 Por defecto 80 de ancho
  height = "h-40", // 🔹 Por defecto 40 de alto
}: CardProps) {
  return (
    <div
      className={`${width} ${height} bg-card-dark light:bg-card-light p-4 rounded-lg shadow-md flex flex-col justify-between relative`}
    >
      {/* Encabezado con título y menú */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-textPrimary-dark light:text-textPrimary-light">
            {title}
          </h2>

          {details && (
            <div className="mt-1 space-y-1">
              {details.map((detail, index) => (
                <p
                  key={index}
                  className="text-sm text-textSecondary-dark light:text-textSecondary-light"
                >
                  <strong>{detail.label}:</strong> {detail.value}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Botón de menú */}
        <button
          onClick={onMenuClick}
          className="p-0 text-textSecondary-dark light:text-textSecondary-light bg-card-dark light:bg-card-light"
        >
          <DotsThreeVertical
            className="hover:text-primary-dark light:hover:text-primary-light p-0"
            size={20}
            weight="bold"
          />
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="flex-grow flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
