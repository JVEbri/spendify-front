import { loginWithGoogle } from "../services/auth.service";

export default function Login() {
  const handleLogin = () => {
    loginWithGoogle();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-background-dark light:bg-background-light">
      <div className="flex flex-col w-[80%] items-center max-h-[50%] max-w-md p-12 bg-card-dark light:bg-card-light shadow-xl rounded-lg mx-4">
        {/* Título */}
        <h1 className="text-3xl font-bold mb-6 text-textPrimary-dark light:text-textPrimary-light text-center">
          Spendify
        </h1>
        {/* Logo */}
        <img
          src="/logo.png"
          alt="Spendify Logo"
          className="w-32 h-32 mb-6 object-contain"
        />
        {/* Botón */}
        <button
          onClick={handleLogin}
          className="flex items-center justify-center w-full bg-primary-dark light:bg-primary-light text-white py-3 px-6 rounded-lg hover:bg-secondary-dark light:hover:bg-secondary-light transition duration-300"
        >
          <span className="mr-2">Google</span>
          <img
            src="google-icon.svg"
            alt="Google Icon"
            className="w-6 h-6 rounded-full border-2  bg-white"
          />
        </button>
      </div>
    </div>
  );
}
