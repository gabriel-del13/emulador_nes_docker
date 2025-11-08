🎮 Emulador Web NES con JSNES y Docker
Este proyecto es una aplicación web que permite ejecutar ROMs de videojuegos clásicos de NES directamente en el navegador.
Proyecto básico que hice para probar en AWS

## Características

- ✅ Emulación completa de NES en el navegador
- ✅ Inicio automático de juegos al cargar una ROM
- ✅ Pausar/Reanudar con un solo botón
- ✅ **Estados de guardado persistentes** - Guarda tu progreso en cualquier momento
- ✅ Almacenamiento persistente en volumen Docker
- ✅ Controles de teclado configurables
- ✅ Control de volumen y mute
- ✅ Modo pantalla completa

## Instalación

### Construir y levantar el contenedor
```bash
docker-compose up -d --build
```

### Ver logs
```bash
docker-compose logs -f
```

### Acceder a la aplicación
Abre tu navegador y ve a: **http://localhost:8080**

## Uso

1. **Cargar un juego**: Haz clic en "📁 Seleccionar ROM de NES (.nes)" y elige un archivo ROM
2. **Jugar**: El juego se inicia automáticamente al cargar
3. **Pausar/Reanudar**: Usa el botón "⏸ Pausar" / "▶ Reanudar"
4. **Guardar estado**: Haz clic en "💾 Guardar Estado" para guardar tu progreso
5. **Cargar estado**: Haz clic en "📂 Cargar Estado" para continuar desde donde guardaste

### Controles del teclado

- **↑ ↓ ← →**: Direcciones
- **Z o A**: Botón A (Saltar)
- **X o S**: Botón B (Agarrar/Lanzar)
- **Enter**: Start (Pausa)
- **Shift**: Select
- **F11**: Pantalla completa

## Estados de Guardado

Los estados de guardado se almacenan de forma persistente en el volumen Docker `nes_saves`. Esto significa que:
- ✅ Tus guardados persisten aunque reinicies el contenedor
- ✅ Cada juego tiene su propio estado guardado
- ✅ Los guardados se almacenan en el volumen Docker, no en el navegador

## Comandos útiles

### Detener el contenedor
```bash
docker-compose down
```

### Detener y eliminar volúmenes (⚠️ borra los saves)
```bash
docker-compose down -v
```

### Detener y eliminar imagen
```bash
docker-compose down --rmi all
```

### Reconstruir después de cambios
```bash
docker-compose down
docker-compose build
docker-compose up -d
```

## Estructura del Proyecto

```
NESEmu/
├── index.html          # Interfaz web del emulador
├── server.js           # Servidor backend Node.js para guardar/cargar estados
├── package.json        # Dependencias del backend
├── Dockerfile          # Configuración de la imagen Docker
├── docker-compose.yml  # Configuración de Docker Compose
├── nginx.conf          # Configuración de nginx
├── start.sh            # Script de inicio
└── roms/              # Directorio para ROMs (opcional)
```

## Tecnologías

- **Frontend**: HTML5, JavaScript, JSNES (emulador NES)
- **Backend**: Node.js, Express
- **Servidor Web**: Nginx
- **Contenedor**: Docker, Docker Compose 