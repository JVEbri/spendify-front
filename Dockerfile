# 1️⃣ Usa una imagen oficial de Node.js para construir el frontend
FROM node:22 as build

# 2️⃣ Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3️⃣ Copia los archivos de dependencias y luego el código fuente
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile
COPY . .

# 4️⃣ Construye la aplicación para producción
RUN npm run build

# 5️⃣ Usa una imagen oficial de Nginx para servir el frontend
FROM nginx:alpine

# 6️⃣ Copia los archivos generados por Vite al directorio donde Nginx los servirá
COPY --from=build /app/dist /usr/share/nginx/html

# 7️⃣ Configura Nginx (opcional, ver paso 2 para detalles)
COPY nginx.conf /etc/nginx/nginx.conf

# 8️⃣ Expone el puerto 80 (donde Nginx servirá la app)
EXPOSE 80

# 9️⃣ Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
