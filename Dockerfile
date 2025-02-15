# 1️⃣ Usa una imagen oficial de Node.js
FROM node:22 AS build

# 2️⃣ Establece el directorio de trabajo
WORKDIR /app

# 3️⃣ Copia los archivos del proyecto
COPY package*.json ./
RUN npm install --frozen-lockfile

# 4️⃣ Copia el código fuente y las variables de entorno
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# 5️⃣ Construye la aplicación
RUN npm run build

# 6️⃣ Usa Nginx para servir el frontend #
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080

# 7️⃣ Copia configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# 8️⃣ Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
