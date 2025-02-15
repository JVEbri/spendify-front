import { useLocation, Link } from "react-router-dom";
import React from "react";
import { routeNames } from "../routes/routeNames";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="flex space-x-2 text-textPrimary-dark light:text-textPrimary-light p-5 bg-background-dark light:bg-background-light">
      {/* Siempre muestra "Inicio" */}
      <Link
        to="/"
        className="hover:underline text-textPrimary-dark light:text-textPrimary-light"
      >
        Inicio
      </Link>

      {/* Genera los breadcrumbs dinámicamente */}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={name}>
            {/* Separador */}
            <span className="mx-2">/</span>

            {/* Enlace o texto estático */}
            {isLast ? (
              <span className="font-bold text-textPrimary-dark light:text-textPrimary-light">
                {routeNames[name] || name}{" "}
                {/* Usa el nombre mapeado o el nombre original */}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:underline text-textPrimary-dark light:text-textPrimary-light"
              >
                {routeNames[name] || name}{" "}
                {/* Usa el nombre mapeado o el nombre original */}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
