// stores/useAuthStore.ts
import { create } from "zustand";
import { getMeService } from "../services/users.service";
import { User } from "../types/user";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  fetchUser: async () => {
    set({ isLoading: true, error: null });

    try {
      const user = await getMeService();
      set({ user, isLoading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar usuario";
      set({
        error: message,
        user: null,
        isLoading: false,
      });
    }
  },

  logout: () => {
    set({ user: null });
    // puedes borrar token aquí si lo usas
  },
}));
