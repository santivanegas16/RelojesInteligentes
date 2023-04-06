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

const tiposRelojesUnicos = [...new Set(Relojes.map(r => r.Tipo))];
tiposRelojesUnicos.forEach(r => {
  const selectTipos = document.getElementById("selectTipos");
  const option = document.createElement("option");
  option.text = r;
  option.value = r;
  selectTipos.appendChild(option);
});

const MarcasRelojesUnicos = [...new Set(Relojes.map(r => r.Marca))];
MarcasRelojesUnicos.forEach(m => {
  const selectMarcas = document.getElementById("selectMarcas");
  const option = document.createElement("option");
  option.text = m;
  option.value = m;
  selectMarcas.appendChild(option);
});

window.FiltrarCatalogo = function () {
  const selectPrecio = document.getElementById("selectPrecio").value
  const selectTipos = document.getElementById("selectTipos").value
  const selectMarcas = document.getElementById("selectMarcas").value

  // Caso no selecciona filtro
  if (selectPrecio == 0 && selectTipos == 0 && selectMarcas == 0) {
    location.reload()
  }

  // Caso selecciona solo filtro precio
  else if (selectPrecio != 0 && selectTipos == 0 && selectMarcas == 0) {
    document.getElementById("cardsRelojes").innerHTML = "";
    document.getElementById("mensaje").innerHTML = "";
    let filtroPrecio = RelojesPrecio(selectPrecio)
    if (filtroPrecio.length != 0) {
      for (let i = 0; i < filtroPrecio.length; i++) {
        let div = crearTarjeta(filtroPrecio[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    } else {
      let mensaje = document.getElementById("mensaje")
      const texto = document.createElement("text")
      texto.textContent = "No se encontraron resultados "
      mensaje.appendChild(texto)
    }

    window.OrdenarAscendente = function () {
      let ord1 = OrdenarAscendente1(filtroPrecio)
      document.getElementById("cardsRelojes").innerHTML = "";
      document.getElementById("mensaje").innerHTML = "";
      for (let i = 0; i < ord1.length; i++) {
        let div = crearTarjeta(ord1[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    }

    window.OrdenarDescendente = function () {
  
      let ord2 = OrdenarDescendente1(filtroPrecio)
      document.getElementById("cardsRelojes").innerHTML = "";
      document.getElementById("mensaje").innerHTML = "";
      for (let i = 0; i < ord2.length; i++) {
        let div = crearTarjeta(ord2[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    }
  }

  // Caso selecciona solo filtro tipos
  else if (selectTipos != 0 && selectPrecio == 0 && selectMarcas == 0) {
    document.getElementById("cardsRelojes").innerHTML = "";
    document.getElementById("mensaje").innerHTML = "";
    let filtroTipo = RelojesTipo(selectTipos)
    if (filtroTipo.length != 0) {
      for (let i = 0; i < filtroTipo.length; i++) {
        let div = crearTarjeta(filtroTipo[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    } else {
      let mensaje = document.getElementById("mensaje")
      const texto = document.createElement("text")
      texto.textContent = "No se encontraron resultados "
      mensaje.appendChild(texto)
    }

    window.OrdenarAscendente = function () {
      let ord1 = OrdenarAscendente1(filtroTipo)
      document.getElementById("cardsRelojes").innerHTML = "";
      document.getElementById("mensaje").innerHTML = "";
      for (let i = 0; i < ord1.length; i++) {
        let div = crearTarjeta(ord1[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    }

    window.OrdenarDescendente = function () {
  
      let ord2 = OrdenarDescendente1(filtroTipo)
      document.getElementById("cardsRelojes").innerHTML = "";
      document.getElementById("mensaje").innerHTML = "";
      for (let i = 0; i < ord2.length; i++) {
        let div = crearTarjeta(ord2[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    }
  }

  // Caso selecciona solo filtro marcas
  else if (selectMarcas != 0 && selectPrecio == 0 && selectTipos == 0) {
    document.getElementById("cardsRelojes").innerHTML = "";
    document.getElementById("mensaje").innerHTML = "";
    let filtroMarcas = RelojesMarca(selectMarcas)
    if (filtroMarcas.length != 0) {
      for (let i = 0; i < filtroMarcas.length; i++) {
        let div = crearTarjeta(filtroMarcas[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    } else {
      let mensaje = document.getElementById("mensaje")
      const texto = document.createElement("text")
      texto.textContent = "No se encontraron resultados "
      mensaje.appendChild(texto)
    }
    window.OrdenarAscendente = function () {
      let ord1 = OrdenarAscendente1(filtroMarcas)
      document.getElementById("cardsRelojes").innerHTML = "";
      document.getElementById("mensaje").innerHTML = "";
      for (let i = 0; i < ord1.length; i++) {
        let div = crearTarjeta(ord1[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    }

    window.OrdenarDescendente = function () {
  
      let ord2 = OrdenarDescendente1(filtroMarcas)
      document.getElementById("cardsRelojes").innerHTML = "";
      document.getElementById("mensaje").innerHTML = "";
      for (let i = 0; i < ord2.length; i++) {
        let div = crearTarjeta(ord2[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    }
  }

  // Caso selecciona todos los filtros
  else if (selectPrecio != 0 && selectTipos != 0 && selectMarcas != 0) {
    document.getElementById("cardsRelojes").innerHTML = "";
    document.getElementById("mensaje").innerHTML = "";
    let filtroVarios = RelojesVarios(selectPrecio, selectTipos, selectMarcas)
    if (filtroVarios.length != 0) {
      for (let i = 0; i < filtroVarios.length; i++) {
        let div = crearTarjeta(filtroVarios[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    } else {
      let mensaje = document.getElementById("mensaje")
      const texto = document.createElement("text")
      texto.textContent = "No se encontraron resultados "
      mensaje.appendChild(texto)
    }
    window.OrdenarAscendente = function () {
      let ord1 = OrdenarAscendente1(filtroVarios)
      document.getElementById("cardsRelojes").innerHTML = "";
      document.getElementById("mensaje").innerHTML = "";
      for (let i = 0; i < ord1.length; i++) {
        let div = crearTarjeta(ord1[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    }

    window.OrdenarDescendente = function () {
  
      let ord2 = OrdenarDescendente1(filtroVarios)
      document.getElementById("cardsRelojes").innerHTML = "";
      document.getElementById("mensaje").innerHTML = "";
      for (let i = 0; i < ord2.length; i++) {
        let div = crearTarjeta(ord2[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    }
  }

  // Caso selecciona filtro marca y tipos
  else if (selectMarcas != 0 && selectTipos != 0 && selectPrecio == 0) {
    document.getElementById("cardsRelojes").innerHTML = "";
    document.getElementById("mensaje").innerHTML = "";
    let filtroMarcaTipo = RelojesMarcaTipo(selectMarcas, selectTipos)
    if (filtroMarcaTipo.length != 0) {
      for (let i = 0; i < filtroMarcaTipo.length; i++) {
        let div = crearTarjeta(filtroMarcaTipo[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    } else {
      let mensaje = document.getElementById("mensaje")
      const texto = document.createElement("text")
      texto.textContent = "No se encontraron resultados "
      mensaje.appendChild(texto)
    }
    window.OrdenarAscendente = function () {
      let ord1 = OrdenarAscendente1(filtroMarcaTipo)
      document.getElementById("cardsRelojes").innerHTML = "";
      document.getElementById("mensaje").innerHTML = "";
      for (let i = 0; i < ord1.length; i++) {
        let div = crearTarjeta(ord1[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    }

    window.OrdenarDescendente = function () {
  
      let ord2 = OrdenarDescendente1(filtroMarcaTipo)
      document.getElementById("cardsRelojes").innerHTML = "";
      document.getElementById("mensaje").innerHTML = "";
      for (let i = 0; i < ord2.length; i++) {
        let div = crearTarjeta(ord2[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    }
  }

  // Caso selecciona filtro precio y marca
  else if (selectMarcas != 0 && selectTipos == 0 && selectPrecio != 0) {
    document.getElementById("cardsRelojes").innerHTML = "";
    document.getElementById("mensaje").innerHTML = "";
    let filtroMarcaPrecio = RelojesMarcaPrecio(selectPrecio, selectMarcas)
    if (filtroMarcaPrecio.length != 0) {
      for (let i = 0; i < filtroMarcaPrecio.length; i++) {
        let div = crearTarjeta(filtroMarcaPrecio[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    } else {
      let mensaje = document.getElementById("mensaje")
      const texto = document.createElement("text")
      texto.textContent = "No se encontraron resultados "
      mensaje.appendChild(texto)
    }
    window.OrdenarAscendente = function () {
      let ord1 = OrdenarAscendente1(filtroMarcaPrecio)
      document.getElementById("cardsRelojes").innerHTML = "";
      document.getElementById("mensaje").innerHTML = "";
      for (let i = 0; i < ord1.length; i++) {
        let div = crearTarjeta(ord1[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    }

    window.OrdenarDescendente = function () {
  
      let ord2 = OrdenarDescendente1(filtroMarcaPrecio)
      document.getElementById("cardsRelojes").innerHTML = "";
      document.getElementById("mensaje").innerHTML = "";
      for (let i = 0; i < ord2.length; i++) {
        let div = crearTarjeta(ord2[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    }
  }

  // Caso selecciona filtro precio y tipo
  else if (selectMarcas == 0 && selectTipos != 0 && selectPrecio != 0) {
    document.getElementById("cardsRelojes").innerHTML = "";
    document.getElementById("mensaje").innerHTML = "";
    let filtroTipoPrecio = RelojesTipoPrecio(selectPrecio, selectTipos)
    if (filtroTipoPrecio.length != 0) {
      for (let i = 0; i < filtroTipoPrecio.length; i++) {
        let div = crearTarjeta(filtroTipoPrecio[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    } else {
      let mensaje = document.getElementById("mensaje")
      const texto = document.createElement("text")
      texto.textContent = "No se encontraron resultados "
      mensaje.appendChild(texto)
    }
    window.OrdenarAscendente = function () {
      let ord1 = OrdenarAscendente1(filtroTipoPrecio)
      document.getElementById("cardsRelojes").innerHTML = "";
      document.getElementById("mensaje").innerHTML = "";
      for (let i = 0; i < ord1.length; i++) {
        let div = crearTarjeta(ord1[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    }

    window.OrdenarDescendente = function () {
  
      let ord2 = OrdenarDescendente1(filtroTipoPrecio)
      document.getElementById("cardsRelojes").innerHTML = "";
      document.getElementById("mensaje").innerHTML = "";
      for (let i = 0; i < ord2.length; i++) {
        let div = crearTarjeta(ord2[i])
        document.querySelector('#cardsRelojes').appendChild(div)
      }
    }
  }
}
// Filtro solo por precio
function RelojesPrecio(precio) {
  if (precio == 1) {
    return Relojes.filter(b => b.precio <= 200);
  } else if (precio == 2) {
    return Relojes.filter(b => b.precio >= 200 && b.precio <= 400);
  } else if (precio == 3) {
    return Relojes.filter(b => b.precio >= 400);
  }
}

// Filtro solo por tipo
function RelojesTipo(tipo) {
  return Relojes.filter(b => b.Tipo == tipo);
}

// Filtro solo por marca
function RelojesMarca(marca) {
  return Relojes.filter(b => b.Marca == marca);
}

// Filtro solo por precio, tipo y marca
function RelojesVarios(precio, tipo, marca) {
  if (precio == 1) {
    return Relojes.filter(b => b.precio <= 200 && b.Tipo == tipo && b.Marca == marca);
  } else if (precio == 2) {
    return Relojes.filter(b => b.precio >= 200 && b.precio <= 400 && b.Tipo == tipo && b.Marca == marca);
  } else if (precio == 3) {
    return Relojes.filter(b => b.precio >= 400 && b.Tipo == tipo && b.Marca == marca);
  }
}

// Filtro solo por marca y tipo
function RelojesMarcaTipo(Marca, tipo) {
  return Relojes.filter(b => b.Marca == Marca && b.Tipo == tipo);
}

// Filtro solo por precio y marca
function RelojesMarcaPrecio(precio, marca) {
  if (precio == 1) {
    return Relojes.filter(b => b.precio <= 200 && b.Marca == marca);
  } else if (precio == 2) {
    return Relojes.filter(b => b.precio >= 200 && b.precio <= 400 && b.Marca == marca);
  } else if (precio == 3) {
    return Relojes.filter(b => b.precio >= 400 && b.Marca == marca);
  }
}

// Filtro solo por precio y tipo
function RelojesTipoPrecio(precio, tipo) {
  if (precio == 1) {
    return Relojes.filter(b => b.precio <= 200 && b.Tipo == tipo);
  } else if (precio == 2) {
    return Relojes.filter(b => b.precio >= 200 && b.precio <= 400 && b.Tipo == tipo);
  } else if (precio == 3) {
    return Relojes.filter(b => b.precio >= 400 && b.Tipo == tipo);
  }
}

//--------------------------------------
window.OrdenarAscendente = function () {
  
  let ord1 = OrdenarAscendente1(Relojes)
  document.getElementById("cardsRelojes").innerHTML = "";
  document.getElementById("mensaje").innerHTML = "";
  for (let i = 0; i < ord1.length; i++) {
    let div = crearTarjeta(ord1[i])
    document.querySelector('#cardsRelojes').appendChild(div)
  }
}

window.OrdenarAscendente1 = function (objeto) {
  return objeto.sort((a, b) => a.precio - b.precio)
}


//---------------------------------------
window.OrdenarDescendente = function () {
  
  let ord2 = OrdenarDescendente1(Relojes)
  document.getElementById("cardsRelojes").innerHTML = "";
  document.getElementById("mensaje").innerHTML = "";
  for (let i = 0; i < ord2.length; i++) {
    let div = crearTarjeta(ord2[i])
    document.querySelector('#cardsRelojes').appendChild(div)
  }
}

window.OrdenarDescendente1 = function (objeto) {
  return objeto.sort((a,b) =>b.precio-a.precio)
}
