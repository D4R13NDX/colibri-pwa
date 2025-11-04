# Usa la imagen base de Nginx
FROM nginx:alpine

# Copia tu PWA (archivos HTML, JS, CSS, manifest, etc.)
COPY . /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
