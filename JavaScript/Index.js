// ------------------ Usando ipapi ---------------------

// Obtener la dirección IP del usuario
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        const ip = data.ip;
        // Enviar la dirección IP a la API de geolocalización
        fetch(`https://ipapi.co/${ip}/json/`)
            .then(response => response.json())
            .then(data => {
                const ubicacion = `${data.city}, ${data.region}, ${data.country}`;
                // Mostrar la bandera del país
                const banderaUrl = `https://flagsapi.com/${data.country}/flat/64.png`;
                document.getElementById('bandera').src = banderaUrl;
            });
    });


// ------------ Usando ipstack con accesKey --------------

// Obtener la dirección IP del usuario
// fetch('https://api.ipify.org?format=json')
//     .then(response => response.json())
//     .then(data => {
//         const ip = data.ip;
//         // Enviar la dirección IP a la API de geolocalización
//         const accessKey = 'bb0cef1e19abdc9a06c43dc9e5fe6d5c';
//         fetch(`http://api.ipstack.com/${ip}?access_key=${accessKey}`)
//             .then(response => response.json())
//             .then(data => {
//                 const ubicacion = `${data.city}, ${data.region_name}, ${data.country_name}`;
//                 // Mostrar la bandera del país
//                 const banderaUrl = `https://flagsapi.com/${data.country_code}/flat/64.png`;
//                 document.getElementById('bandera').src = banderaUrl;
//             });
//     });


