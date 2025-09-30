
// Registro del Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => console.log('SW Registrado', reg));
}

document.addEventListener('DOMContentLoaded', () => {
    // Boton para obtener ubicación
    const locationBtn = document.getElementById('btn-location');
  locationBtn.addEventListener('click', getUserLocation);
    // Boton para las notificaciones
    const notificationsBtn = document.getElementById('btn-notifications');
    notificationsBtn.addEventListener('click', requestNotificationPermission);
  
  
    // Manejo de datos remotos (fetch)
  async function getRemoteDrivers() {
    try {
      // Petición a una API externa (solo es un endpoint de ejemplo)
      const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3');
      if (!response.ok) throw new Error('Error en la red');
      const drivers = await response.json();
      console.log('Conductores remotos:', drivers);
      // Aquí se renderizarían los conductores en la UI
    } catch (error) {
      console.error('Fallo al obtener datos remotos:', error);
    }
  }

  // Manejo de localStorage
  function saveUserPreferences(theme) {
    // Guarda una preferencia simple del usuario
    localStorage.setItem('userTheme', JSON.stringify({ theme: theme }));
    console.log(`Preferencia guardada: tema ${theme}`);
  }

  function loadUserPreferences() {
    const prefs = JSON.parse(localStorage.getItem('userTheme'));
    console.log('Preferencias cargadas:', prefs);
    return prefs;
  }

// Solicita permiso para notificaciones push
function requestNotificationPermission() {
  Notification.requestPermission().then(result => {
    if (result === 'granted') {
      console.log('Permiso de notificaciones concedido.');
      // En una app real, aquí se enviaría la subscripción al servidor.
    } else {
      console.log('Permiso de notificaciones denegado.');
    }
  });
}

// Obtiene la ubicación del usuario
function getUserLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Ubicación obtenida (GPS): Lat ${latitude}, Lon ${longitude}`);
        // Aquí se actualizaría la UI con la ubicación en un mapa, por ejemplo.
        document.getElementById('app-root').innerHTML += 
          `<p class="card">Ubicación GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}</p>`;
      },
      (error) => {
        // Manejo de errores comunes
        let errorMessage;
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permiso de ubicación denegado.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "La información de ubicación no está disponible.";
            break;
          case error.TIMEOUT:
            errorMessage = "La solicitud de ubicación ha caducado.";
            break;
          default:
            errorMessage = "Ocurrió un error desconocido.";
            break;
        }
        console.error('Error de geolocalización:', errorMessage);
        document.getElementById('app-root').innerHTML += `<p class="card" style="color:red;">${errorMessage}</p>`;
      }
    );
  } else {
    console.warn('Geolocalización no es compatible con este navegador.');
  }
}


  // Ejecución de ejemplo
  getRemoteDrivers();
  saveUserPreferences('dark');
  loadUserPreferences();
});