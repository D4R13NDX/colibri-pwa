# Plataforma Colibrí - PWA

Esta es la aplicación web progresiva para el servicio de taxis "Plataforma Colibrí".

## Características Implementadas

- **Instalable (PWA):** Funciona como una aplicación nativa en dispositivos móviles y de escritorio.
- **Soporte Offline:** La interfaz principal y los datos cacheados están disponibles sin conexión a internet.
- **Diseño Responsivo:** Adaptable a diferentes tamaños de pantalla.
- **Integración de Hardware:** Utiliza el GPS del dispositivo para obtener la ubicación del usuario.
- **Notificaciones Push:** Capacidad para recibir notificaciones del sistema.

## Instalación y Uso

1.  **Requisitos:** Un servidor web local. Se recomienda la extensión **Live Server** para Visual Studio Code.
2.  **Clonar el repositorio:**
    `git clone <URL-del-repositorio>`
3.  **Iniciar el servidor:** Haz clic derecho en `index.html` y selecciona "Open with Live Server".

## Dependencias

Este proyecto utiliza únicamente APIs estándar del navegador y no tiene dependencias externas (de momento).

- Web App Manifest API
- Service Worker API
- Geolocation API
- Fetch API
- Notification API
- Web Storage API (localStorage)