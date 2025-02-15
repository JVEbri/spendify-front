import { useForm } from "react-hook-form";
import { useGroupsStore } from "../stores/groupStore";
import { useEffect } from "react";
import Select from "../components/Select";

export default function GroupSelector() {
  const { groups, selectedGroup, fetchGroups, selectGroup } = useGroupsStore();

  const {
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      groupId: selectedGroup?.id || "",
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  useEffect(() => {
    if (selectedGroup?.id) {
      setValue("groupId", selectedGroup.id);
    }
  }, [selectedGroup?.id, setValue]);

  return (
    <div className="p-3">
      <Select
        name="groupId"
        control={control}
        placeholder="Elige un grupo..."
        options={groups.map((group) => ({
          value: group.id,
          label: group.name,
        }))}
        rules={{ required: "Por favor, selecciona un grupo" }}
        onChange={(value) => {
          const group = groups.find((g) => g.id === value);
          if (group) selectGroup(group); // ⬅️ Ahora `onChange` actualiza el store
        }}
      />
    </div>
  );
}
