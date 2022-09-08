let identificadorIntervaloDeTiempo;
var x = document.getElementById("demo");
var y = document.getElementById("info");


class posicion{
  constructor(lat, long, alt, vel, tiempo){
    this.lat=lat;
    this.long=long;
    this.alt=alt;
    this.vel=vel;
    this.tiempo=tiempo;
  }
}

const listaPosiciones = [];

function getLocation() {
  identificadorIntervaloDeTiempo = setInterval(localizacion, 7000);
}


function localizacion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
    x.innerHTML = "Tu navegador adimte la geolocalizaci&oacute;n";
  }
  else { x.innerHTML = "Tu navegador no soporta la geolocalizaci&oacute;n."; 
  }
}


function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  var latlon = lat + "," + lon;
  y.innerHTML = "Latitud: " + lat;
  y.innerHTML += "<br/>Longitud: " + lon;
  y.innerHTML += "<br/>Precisi&oacute;n: " + position.coords.accuracy;
  y.innerHTML += "<br/>Altidud: " + position.coords.altitude;
  y.innerHTML += "<br>Precisi&oacute;n de Altidud: " + position.coords.altitudeAccuracy;
  y.innerHTML += "<br>Heading: " + position.coords.heading;
  y.innerHTML += "<br>Velocidad: " + position.coords.speed;
  y.innerHTML += "<br>Fecha (en tiempo Unix): " + position.timestamp;

  listaPosiciones.push(new position(position.coords.latitude, position.coords.longitude, position.coords.altitude, position.coords.speed, position.timestamp));
}


function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "El usuario ha denegado el permiso a la localizaci&oacute;n."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "La informaci&oacute;n de la localizaci&oacute;n no est&aacute; disponible."
      break;
    case error.TIMEOUT:
      x.innerHTML = "El tiempo de espera para buscar la localizaci&oacute;n ha expirado."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "Ha ocurrido un error desconocido."
      break;
  }
}

function stopLocation() {
  clearInterval(identificadorIntervaloDeTiempo);
  identificadorIntervaloDeTiempo = null;
  
  console.log(listaPosiciones);
}
document.getElementById("start").addEventListener("click", getLocation);
document.getElementById("stop").addEventListener("click", stopLocation);
