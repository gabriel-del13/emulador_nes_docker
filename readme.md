🎮 Emulador Web con JNES y Docker
Este proyecto es una aplicación web que permite ejecutar ROMs de videojuegos clásicos directamente en el navegador.
Proyecto basico que hice para probar en AWS

Para instalar:

# Construir y levantar el contenedor
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Entra a localhost:8080

# Comandos utiles:
# Detener
docker-compose down

# Detener y eliminar volúmenes (borra los saves)
docker-compose down -v

# Detener y eliminar imagen 
docker-compose down --rmi all 
