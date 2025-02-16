import { useState } from "react";
import Modal from "./Modal";
import { inviteMemberService } from "../services/invitation.service";
import toast from "react-hot-toast";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
}

export default function InviteMemberModal({
  isOpen,
  onClose,
  groupId,
}: InviteMemberModalProps) {
  const [email, setEmail] = useState("");

  const handleInvite = async () => {
    if (!email.trim()) {
      toast.error("El email no puede estar vacío ❌");
      return;
    }
    try {
      await inviteMemberService(groupId, email);
      toast.success(`Invitación enviada a ${email} 🎉`);
      setEmail("");
      onClose();
    } catch {
      toast.error("No se pudo enviar la invitación ❌");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invitar Miembro">
      <input
        type="email"
        className="w-full p-2 border border-gray-500 rounded-lg bg-background-light dark:bg-background-dark text-textPrimary-light dark:text-textPrimary-dark mb-4"
        placeholder="Introduce el email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="w-full bg-primary-light dark:bg-primary-dark text-white py-2 rounded-lg hover:bg-secondary-light dark:hover:bg-secondary-dark transition duration-300"
        onClick={handleInvite}
      >
        Enviar Invitación
      </button>
    </Modal>
  );
}
