FROM node:18-alpine

# Instalar nginx y herramientas necesarias
RUN apk add --no-cache nginx curl

# Crear directorio para la aplicación
WORKDIR /usr/share/nginx/html

# Copiar archivo HTML
COPY index.html .

# Crear directorio para ROMs
RUN mkdir -p /usr/share/nginx/html/roms

# Configurar permisos
RUN chmod -R 755 /usr/share/nginx/html

# Crear directorio para el backend
WORKDIR /app

# Copiar archivos del backend
COPY package.json server.js ./

# Instalar dependencias del backend
RUN npm install

# Crear directorio para saves
RUN mkdir -p /app/saves && chmod -R 755 /app/saves

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/http.d/default.conf

# Exponer puertos
EXPOSE 80 3000

# Script de inicio
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Comando por defecto
CMD ["/start.sh"]