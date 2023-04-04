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


console.log(Relojes[0])