import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersStore } from "../stores/usersStore";

export default function Home() {
  const navigate = useNavigate();
  const { users, isLoading, error, fetchUsers } = useUsersStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      const cleanUrl = window.location.origin;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background-dark light:bg-background-light text-textPrimary-dark light:text-textPrimary-light">
      <h1 className="text-4xl font-bold mb-6">Bienvenido a Spendify</h1>
      <p className="mb-6">Lista de usuarios:</p>

      {isLoading && (
        <p className="text-secondary-dark light:text-secondary-light">
          Cargando...
        </p>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}

      <ul className="w-full max-w-lg bg-card-dark light:bg-card-light p-6 rounded-lg shadow-lg">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center border-b border-gray-700 light:border-gray-300 py-2"
          >
            <span className="text-lg">{user.name}</span>
            <span className="text-sm text-textSecondary-dark light:text-textSecondary-light">
              {user.email}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
