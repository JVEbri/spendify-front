import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Enviar cookies automáticamente
});

// Interceptor de request para agregar el token de autorización
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response para manejar el refresh del token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // Intentar refrescar el token
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`, // No se necesita enviar el refreshToken explícitamente
          {},
          { withCredentials: true } // Enviar la cookie automáticamente
        );

        // Guardar el nuevo token y reintentar la solicitud original
        localStorage.setItem("token", data.accessToken);
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(error.config); // Reintenta la solicitud original
      } catch (refreshError) {
        // Si falla el refresh, redirigir al login
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
