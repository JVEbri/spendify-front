import { create } from "zustand";
import { getUsersService } from "../services/users.service";
import { User } from "../types/user";
interface UsersStore {
  users: User[]; // Arreglo de usuarios
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
}

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });

    try {
      const users = await getUsersService();
      set({ users, isLoading: false });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Ha ocurrido un error inesperado.";
      set({ error: message, isLoading: false });
    }
  },
}));
