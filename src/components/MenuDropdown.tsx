import { useState, useRef } from "react";
import { DotsThreeVertical } from "phosphor-react";

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface MenuDropdownProps {
  items: MenuItem[];
  icon?: React.ReactNode;
  position?: "top" | "bottom";
  className?: string;
  width?: string;
}

export default function MenuDropdown({
  items,
  icon = <DotsThreeVertical size={20} weight="bold" />,
  position = "bottom",
  className = "",
  width = "w-40",
}: MenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cierra el menú si se hace clic fuera
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!dropdownRef.current?.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef} onBlur={handleBlur}>
      {/* Botón para abrir menú */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-md dark:bg-card-dark hover:bg-gray-300 dark:hover:text-primary-dark transition-all ${className}`}
      >
        {icon}
      </button>

      {/* Dropdown de opciones */}
      {isOpen && (
        <div
          className={`absolute ${position === "bottom" ? "top-full mt-1" : "bottom-full mb-1"} right-0 ${width} bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-700 shadow-md rounded-lg z-50`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              className="block w-full px-4 py-2 text-left text-sm text-textPrimary-light dark:text-textPrimary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-all"
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
