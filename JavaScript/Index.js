// bandera____________________________________________---




window.addEventListener('load', function () {
    posElt= document.getElementById('pos');
// funcion que intenta obtener la posicion, no devuelve solo toma los parametros
// es asincrona 
    navigator.geolocation.getCurrentPosition(conocida, desconocida);
} 
);

// funcion que envia la información de posicion

function conocida(pos){
    
    var latitud = pos.coords.latitude;
    var longitud = pos.coords.longitude;
    posElt.textContent =`${latitud}, ${longitud}`;
   const posicion = latitud + ' ' + longitud
   console.log(posicion);
   }
   

function desconocida(err){
    console.warn(err.message);
    let mensaje;
    switch (err.code) {
        case err.PERMISSION_DENIED:
            mensaje = "No tienes permiso para acceder a la ubicación";
            break;
        case err.POSITION_UNAVAILABLE:
            mensaje = "La ubicación no está disponible";
            break;
        case err.TIMEOUT:
            mensaje = "La ubicación no se ha podido acceder";
            break;
        default:
            mensaje = "Ocurrió un error desconocido";
            break;
    }
    console.log( mensaje) 
     posElt = textContent = mensaje;
}



