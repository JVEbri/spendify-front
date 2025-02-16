import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGroupsStore } from "../../stores/groupStore";
import { updateGroupService } from "../../services/group.service";
import toast from "react-hot-toast";
import InviteMemberModal from "../../components/InviteMemberModal"; // ⬅️ Importamos el modal

export default function EditGroup() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const { groups, fetchGroups } = useGroupsStore();
  const [isInviteOpen, setIsInviteOpen] = useState(false); // ✅ Estado para el modal

  const group = groups.find((g) => g.id === id);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: group?.name || "" },
  });

  useEffect(() => {
    if (!group) {
      fetchGroups();
    } else {
      reset({ name: group.name });
    }
  }, [group, fetchGroups, reset]);

  const onSubmit = async (data: { name: string }) => {
    if (!id) {
      toast.error("Error: No se encontró el grupo.");
      return;
    }
    try {
      await updateGroupService(id, data.name);
      toast.success("Grupo actualizado con éxito 🎉");
      navigate("/groups");
    } catch {
      toast.error("Error al actualizar el grupo ❌");
    }
  };

  if (!group) return <p>Cargando grupo...</p>;

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-textPrimary-light dark:text-textPrimary-dark mb-4">
          Editar Grupo
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", { required: "El nombre es obligatorio" })}
            className="w-full p-2 border border-gray-500 rounded-lg bg-background-light dark:bg-background-dark text-textPrimary-light dark:text-textPrimary-dark mb-4"
            placeholder="Nuevo nombre del grupo"
          />
          <button
            type="submit"
            className="w-full bg-primary-light dark:bg-primary-dark text-white py-2 rounded-lg hover:bg-secondary-light dark:hover:bg-secondary-dark transition duration-300"
          >
            Guardar cambios
          </button>
        </form>

        {/* 🔽 Lista de miembros */}
        <h2 className="text-lg font-semibold mt-6 text-textPrimary-light dark:text-textPrimary-dark">
          Miembros del Grupo
        </h2>
        <ul className="mt-2 space-y-2">
          {group.users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center bg-background-light dark:bg-background-dark p-2 rounded-md border border-gray-300 dark:border-gray-700"
            >
              <span className="text-textPrimary-light dark:text-textPrimary-dark">
                {user.name}
              </span>
              {user.id === group.owner.id && (
                <span className="text-xs text-primary-light dark:text-primary-dark">
                  (Propietario)
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* 🔽 Botón para abrir el modal */}
        <button
          className="mt-4 w-full bg-secondary-light dark:bg-secondary-dark text-white py-2 rounded-lg hover:bg-primary-light dark:hover:bg-primary-dark transition duration-300"
          onClick={() => setIsInviteOpen(true)}
        >
          Añadir Miembro
        </button>
      </div>

      {/* Modal para invitar miembros */}
      <InviteMemberModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        groupId={id!}
      />
    </div>
  );
}
