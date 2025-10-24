FROM nginx:alpine

# Instalar herramientas necesarias
RUN apk add --no-cache curl

# Crear directorio para la aplicación
WORKDIR /usr/share/nginx/html

# Copiar archivo HTML
COPY index.html .

# Crear directorio para ROMs y saves
RUN mkdir -p /usr/share/nginx/html/roms /usr/share/nginx/html/saves

# Configurar permisos
RUN chmod -R 755 /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]