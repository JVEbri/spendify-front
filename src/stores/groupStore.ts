import { create } from "zustand";
import {
  createGroupService,
  getGroupsService,
  Group,
} from "../services/group.service";
import toast from "react-hot-toast";

interface GroupStore {
  groups: Group[];
  selectedGroup: Group | null;
  isLoading: boolean;
  error: string | null;
  fetchGroups: () => Promise<void>;
  selectGroup: (group: Group) => void;
  createGroup: (name: string) => Promise<void>;
}

export const useGroupsStore = create<GroupStore>((set) => ({
  groups: [],
  selectedGroup: null,
  isLoading: false,
  error: null,

  fetchGroups: async () => {
    set({ isLoading: true, error: null });

    try {
      const groups = await getGroupsService();
      const savedGroupId = localStorage.getItem("selectedGroupId");

      const selectedGroup =
        groups.find((g) => g.id === savedGroupId) || groups[0] || null;

      set({ groups, selectedGroup, isLoading: false });

      if (selectedGroup) {
        localStorage.setItem("selectedGroupId", selectedGroup.id);
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Ha ocurrido un error inesperado.";
      set({ error: message, isLoading: false });
    }
  },

  selectGroup: (group) => {
    set({ selectedGroup: group });
    localStorage.setItem("selectedGroupId", group.id);
  },

  createGroup: async (name: string) => {
    set({ isLoading: true, error: null });

    try {
      const newGroup = await createGroupService({ name });

      set((state) => {
        localStorage.setItem("selectedGroupId", newGroup.id);
        return {
          groups: [...state.groups, newGroup],
          selectedGroup: newGroup,
          isLoading: false,
        };
      });

      toast.success(`Grupo "${name}" creado con éxito 🎉`);
    } catch (error: unknown) {
      toast.error(`No se pudo crear el grupo ❌ ${error}`);
      set({ error: "Error al crear el grupo", isLoading: false });
    }
  },
}));
