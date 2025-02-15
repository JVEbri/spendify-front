import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGroupsStore } from "../../stores/groupStore";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const { createGroup, isLoading, error } = useGroupsStore();
  const navigate = useNavigate();

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;
    await createGroup(groupName);
    navigate("/groups"); // Redirigir después de la creación
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background dark:bg-background-dark">
      <div className="bg-card dark:bg-card-dark p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-textPrimary dark:text-textPrimary-dark">
          Crear un nuevo grupo
        </h1>

        <input
          type="text"
          className="w-full mt-4 p-2 border border-gray-400 dark:border-gray-600 rounded-lg bg-background dark:bg-background-dark text-textPrimary dark:text-textPrimary-dark"
          placeholder="Nombre del grupo"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <button
          className="w-full mt-4 bg-primary dark:bg-primary-dark text-white py-2 rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark transition duration-300"
          onClick={handleCreateGroup}
          disabled={isLoading}
        >
          {isLoading ? "Creando..." : "Crear Grupo"}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
