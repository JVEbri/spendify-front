import { useEffect, useState } from "react";
import { useGroupsStore } from "../../stores/groupStore";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card"; // Importamos el Card
import NewCard from "../../components/NewCard";
import { MenuItem } from "../../components/Card";
export default function Groups() {
  const {
    groups,
    isLoading: isLoadingGroups,
    error: errorGroups,
    fetchGroups,
  } = useGroupsStore();

  const navigate = useNavigate();
  const [hasCheckedGroups, setHasCheckedGroups] = useState(false);
  const getMenuItems = (groupId: string): MenuItem[] => [
    {
      label: "Editar",
      onClick: () => navigate(`/groups/edit?id=${groupId}`),
    },
    {
      label: "Eliminar",
      onClick: () => console.log("Eliminar grupo"),
    },
  ];

  useEffect(() => {
    fetchGroups().then(() => {
      setHasCheckedGroups(true);
    });
  }, [fetchGroups]);

  useEffect(() => {
    if (hasCheckedGroups && !isLoadingGroups && groups.length === 0) {
      navigate("/groups/create");
    }
  }, [groups, isLoadingGroups, navigate, hasCheckedGroups]);

  return (
    <div className="h-screen w-full bg-background-light dark:bg-background-dark p-5 pl-9 pr-8">
      <h1 className="text-2xl font-bold text-textPrimary-light dark:text-textPrimary-dark mb-4">
        Mis Grupos
      </h1>

      {isLoadingGroups ? (
        <p className="text-textSecondary-light dark:text-textSecondary-dark">
          Cargando grupos...
        </p>
      ) : errorGroups ? (
        <p className="text-red-500">
          Error al cargar los grupos: {errorGroups}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-fr">
          {groups.map((group) => (
            <Card
              id={group.id}
              key={group.id}
              title={group.name}
              width="w-full"
              height="h-48"
              details={[
                { label: "Miembros", value: group.users?.length },
                { label: "Propietario", value: group.owner.name },
                {
                  label: "Creado el",
                  value: new Date(group.created_at).toLocaleDateString(),
                },
              ]}
              menuItems={getMenuItems(group.id)}
            />
          ))}

          <NewCard width="w-full" height="h-48" />
        </div>
      )}
    </div>
  );
}
