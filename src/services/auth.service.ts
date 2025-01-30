const API_URL = import.meta.env.VITE_API_URL;

export const loginWithGoogle = (): void => {
  window.location.href = `${API_URL}/auth/google`;
};

export const logout = (): void => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
