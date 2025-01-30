import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useInvitationStore } from "../stores/invitationStore";

export default function AcceptInvitation() {
  const { token: paramToken } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    invitationToken,
    setInvitationToken,
    acceptInvitation,
    fetchInvitation,
    isLoading,
    error,
    invitation,
  } = useInvitationStore();

  useEffect(() => {
    const handleAuthentication = async () => {
      const accessToken = searchParams.get("token");
      if (accessToken) {
        localStorage.setItem("token", accessToken);
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }

      if (!localStorage.getItem("token")) {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google?invitationToken=${paramToken}`;
        return;
      }

      if (paramToken) {
        setInvitationToken(paramToken);
        await fetchInvitation(paramToken); // 🚀 Obtener la invitación después de autenticarse
      }
    };

    handleAuthentication();
  }, [paramToken, setInvitationToken, fetchInvitation, searchParams]);

  const handleAccept = async () => {
    if (invitationToken) {
      await acceptInvitation(invitationToken);
    }
  };

  const handleReject = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-background-dark light:bg-background-light">
      <div className="flex flex-col w-[80%] items-center max-w-md p-8 bg-card-dark light:bg-card-light shadow-xl rounded-lg mx-4">
        <h1 className="text-2xl font-bold mb-4 text-textPrimary-dark light:text-textPrimary-light text-center">
          Invitación a un Grupo
        </h1>

        {isLoading ? (
          <p className="text-center">Procesando invitación...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <p className="text-textSecondary-dark light:text-textSecondary-light text-center mb-6">
              Se te ha invitado a unirte al grupo:{" "}
              <b> {invitation && invitation.group.name}</b>
            </p>

            <div className="flex space-x-4">
              <button
                onClick={handleAccept}
                className="bg-primary-dark light:bg-primary-light text-white py-2 px-4 rounded-lg hover:bg-secondary-dark light:hover:bg-secondary-light transition duration-300"
              >
                Aceptar
              </button>
              <button
                onClick={handleReject}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                Rechazar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
