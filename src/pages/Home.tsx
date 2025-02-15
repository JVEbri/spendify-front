/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersStore } from "../stores/usersStore";
import { useGroupsStore } from "../stores/groupStore";

export default function Home() {
  const navigate = useNavigate();
  const {
    users,
    isLoading: isLoadingUsers,
    error,
    fetchUsers,
  } = useUsersStore();
  const {
    groups,
    isLoading: isLoadingGroups,
    error: errorGroups,
    fetchGroups,
  } = useGroupsStore();

  const [hasCheckedGroups, setHasCheckedGroups] = useState(false);

  // useEffect(() => {
  //   if (hasCheckedGroups && !isLoadingGroups && groups.length === 0) {
  //     navigate("/groups");
  //   }
  // }, [groups, isLoadingGroups, navigate, hasCheckedGroups]);

  useEffect(() => {
    fetchUsers();
    fetchGroups().then(() => {
      setHasCheckedGroups(true);
    });
  }, [fetchGroups, fetchUsers]);

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
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background-light dark:bg-background-dark text-textPrimary-light dark:text-textPrimary-dark">
      <h1 className="text-4xl font-bold mb-6">Bienvenido a Spendify</h1>
      <p className="mb-6">Lista de usuarios:</p>

      {isLoadingUsers && (
        <p className="text-secondary-light dark:text-secondary-dark">
          Cargando...
        </p>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}

      <ul className="w-full max-w-lg bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-lg">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 py-2"
          >
            <span className="text-lg">{user.name}</span>
            <span className="text-sm text-textSecondary-light dark:text-textSecondary-dark">
              {user.email}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
