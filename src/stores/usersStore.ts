import { create } from "zustand";
import { getUsersService, User } from "../services/users.service";

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
      const users = await getUsersService(); // Llama al servicio correctamente tipado
      set({ users, isLoading: false }); // No debería haber errores de tipo aquí
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Ha ocurrido un error inesperado.";
      set({ error: message, isLoading: false });
    }
  },
}));
