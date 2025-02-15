import { create } from "zustand";
import {
  acceptInvitationService,
  getInvitationService,
  Invitation,
} from "../services/invitation.service";
import toast from "react-hot-toast";

interface InvitationStore {
  invitationToken: string | null;
  invitation: Invitation | null;
  isLoading: boolean;
  error: string | null;
  acceptInvitation: (token: string) => Promise<void>;
  fetchInvitation: (token: string) => Promise<void>;
  setInvitationToken: (token: string | null) => void;
}

export const useInvitationStore = create<InvitationStore>((set) => ({
  invitationToken: null,
  invitation: null,
  isLoading: false,
  error: null,

  setInvitationToken: (token) => set({ invitationToken: token }),

  /**
   * Obtiene la información de la invitación y valida si el usuario autenticado tiene acceso.
   */
  fetchInvitation: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const invitation = await getInvitationService(token);
      set({ invitation, isLoading: false });
    } catch (error) {
      toast.error(`No tienes acceso a esta invitación ❌${error}`);
      set({
        error: "No tienes acceso a esta invitación",
        isLoading: false,
      });
    }
  },

  /**
   * Acepta una invitación con el token proporcionado.
   */
  acceptInvitation: async (token) => {
    set({ isLoading: true, error: null });

    try {
      await acceptInvitationService(token);
      toast.success("¡Te has unido al grupo con éxito! 🎉");
      set({ isLoading: false, invitationToken: null, invitation: null });
    } catch (error) {
      toast.error("No se pudo aceptar la invitación ❌");

      set({
        error: `No se pudo aceptar la invitación ${error}`,
        isLoading: false,
      });
    }
  },
}));
