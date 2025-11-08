#!/bin/sh

# Iniciar nginx en segundo plano
nginx -g "daemon off;" &
NGINX_PID=$!

# Esperar un momento para que nginx inicie
sleep 2

# Verificar que nginx está corriendo
if ! kill -0 $NGINX_PID 2>/dev/null; then
    echo "Error: nginx no pudo iniciar"
    exit 1
fi

# Iniciar el servidor backend en primer plano
node /app/server.js

