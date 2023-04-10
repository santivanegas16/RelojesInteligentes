import { Relojes } from './data.js';

function crearTarjeta(objeto) {
  let div = document.createElement('div');
  div.className = "col"

  div.innerHTML = `
        <div class="card h-100">
          <img src="${objeto.imagen}" class="card-img-top imgcard" alt="${objeto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${objeto.nombre}</h5>
            <p class="card-text">Disponibles: ${objeto.cantidad}</p>
          </div>
          <div class="card-footer bg-transparent d-flex justify-content-between flex-wrap text-center">
            <small class="card-text mt-2 mb-2 ms-1">Precio: ${objeto.precio} USD</small>
            <a id="${objeto.id_reloj}" class="btn btn-outline-dark me-1" onClick="click_here(this.id)">Añadir al carrito</a>
          </div>
        </div>
      </div>
        `
  return div
  
}

for (let i = 0; i < Relojes.length; i++) {
  let div = crearTarjeta(Relojes[i])
  document.querySelector('#cardsRelojes').appendChild(div)
}

const tiposRelojesUnicos = [...new Set(Relojes.map(r => r.Tipo))]
tiposRelojesUnicos.forEach(r => {
  const selectTipos = document.getElementById("selectTipos")
  const option = document.createElement("option")
  option.text = r
  option.value = r
  selectTipos.appendChild(option);
});

const MarcasRelojesUnicos = [...new Set(Relojes.map(r => r.Marca))]
MarcasRelojesUnicos.forEach(m => {
  const selectMarcas = document.getElementById("selectMarcas")
  const option = document.createElement("option")
  option.text = m
  option.value = m
  selectMarcas.appendChild(option)
});

// Filtro solo por precio
function RelojesPrecio(precio) {
  if (precio == 1) {
    return Relojes.filter(b => b.precio <= 200)
  } else if (precio == 2) {
    return Relojes.filter(b => b.precio >= 200 && b.precio <= 400)
  } else if (precio == 3) {
    return Relojes.filter(b => b.precio >= 400)
  } else {
    return Relojes
  }
}

// Filtro solo por tipo
function RelojesTipo(tipo) {
  let tipoReloj = Relojes.filter(b => b.Tipo == tipo)
  if (tipoReloj.length != 0) {
    return tipoReloj
  } else {
    return Relojes
  }
}

// Filtro solo por marca
function RelojesMarca(marca) {
  let marcaReloj = Relojes.filter(b => b.Marca == marca)
  if (marcaReloj.length != 0) {
    return marcaReloj
  } else {
    return Relojes
  }
}

window.FiltrarCatalogo = function () {
  let precioSeleccionado = document.getElementById("selectPrecio").value
  let tipoSeleccionado = document.getElementById("selectTipos").value
  let marcaSeleccionada = document.getElementById("selectMarcas").value

  let precio = RelojesPrecio(precioSeleccionado)
  let tipo = RelojesTipo(tipoSeleccionado)
  let marca = RelojesMarca(marcaSeleccionada)

  //Se crea un nuevo array con los elementos comunes de los 3 arrays de los filtros
  const arrayFiltrado = precio.filter((element) => tipo.includes(element) && marca.includes(element));
  console.log(arrayFiltrado)

  // Se crean las cards de los productos filtrados
  if (arrayFiltrado.length != 0) {
    document.getElementById("cardsRelojes").innerHTML = ""
    document.getElementById("mensaje").innerHTML = ""
    for (let i = 0; i < arrayFiltrado.length; i++) {
      let div = crearTarjeta(arrayFiltrado[i])
      document.querySelector('#cardsRelojes').appendChild(div)
    }
  } else {
    document.getElementById("cardsRelojes").innerHTML = ""
    document.getElementById("mensaje").innerHTML = ""
    let mensaje = document.getElementById("mensaje")
    const texto = document.createElement("text")
    texto.textContent = "No se encontraron resultados"
    mensaje.appendChild(texto)
  }

  //Se crean las funciones para ordenar y crear tarjetas del array filtrado
  window.OrdenarAscendente = function () {
    let ord1 = OrdenarAscendente1(arrayFiltrado)
    document.getElementById("cardsRelojes").innerHTML = ""
    document.getElementById("mensaje").innerHTML = ""
    for (let i = 0; i < ord1.length; i++) {
      let div = crearTarjeta(ord1[i])
      document.querySelector('#cardsRelojes').appendChild(div)
    }
  }

  window.OrdenarDescendente = function () {
    let ord2 = OrdenarDescendente1(arrayFiltrado)
    document.getElementById("cardsRelojes").innerHTML = ""
    document.getElementById("mensaje").innerHTML = ""
    for (let i = 0; i < ord2.length; i++) {
      let div = crearTarjeta(ord2[i])
      document.querySelector('#cardsRelojes').appendChild(div)
    }
  }

}

//Se crean funciones para ordenar ascendente y descentente
window.OrdenarAscendente1 = function (objeto) {
  return objeto.sort((a, b) => a.precio - b.precio)
}

window.OrdenarDescendente1 = function (objeto) {
  return objeto.sort((a, b) => b.precio - a.precio)
}

//Se crean funciones para ordenar y crear tarjetas estado inicial
window.OrdenarAscendente = function () {
  let ord1 = OrdenarAscendente1(Relojes)
  document.getElementById("cardsRelojes").innerHTML = "";
  document.getElementById("mensaje").innerHTML = "";
  for (let i = 0; i < ord1.length; i++) {
    let div = crearTarjeta(ord1[i])
    document.querySelector('#cardsRelojes').appendChild(div)
  }
}

window.OrdenarDescendente = function () {
  let ord2 = OrdenarDescendente1(Relojes)
  document.getElementById("cardsRelojes").innerHTML = "";
  document.getElementById("mensaje").innerHTML = "";
  for (let i = 0; i < ord2.length; i++) {
    let div = crearTarjeta(ord2[i])
    document.querySelector('#cardsRelojes').appendChild(div)
  }
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


window.click_here = function (buttonId) {

  let infoReloj = Relojes.find(b => b.id_reloj == buttonId)

  let productoExistente = carrito.find(p => p.id_reloj == infoReloj.id_reloj)

  if (productoExistente) {
    carrito.map(p => {
      if (p.id_reloj == infoReloj.id_reloj) {
        p.cantidad++
      }
    })
  } else {
    carrito.push({
      id_reloj: infoReloj.id_reloj,
      imagen: infoReloj.imagen,
      nombre: infoReloj.nombre,
      Marca: infoReloj.Marca,
      Tipo: infoReloj.Tipo,
      precio: infoReloj.precio,
      cantidad: 1    
    })

  }

  contador()
  localStorage.setItem('carrito', JSON.stringify(carrito));
  console.log(carrito)

}


const contadorCarrito = document.getElementById("contadorCarrito")

const contador = () =>{
  if (carrito.length == 0 ) {
    contadorCarrito.style.display = "none";
  } else{
    contadorCarrito.style.display = "block";
    contadorCarrito.innerText = carrito.length;
  }
    
}

window.addEventListener("load", () => {
  contador();
});