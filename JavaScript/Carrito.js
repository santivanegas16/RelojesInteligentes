import { Relojes } from './data.js';

let carrito = JSON.parse(localStorage.getItem('carrito'));

function crearItemCarrito(objeto) {

    let div = document.createElement('div');
    div.className = "row row-cols-2 row-cols-md-4 row-cols-sm-3 row-cols-lg-6 mb-5"
    div.innerHTML = `
            <div class="col">
                <img src="${objeto.imagen}" class="imglista" alt="${objeto.nombre}">  
            </div>
            <div class="col">
                <h5 class="card-title text-start">${objeto.nombre}</h5>
                <p>Marca: ${objeto.Marca}
                <br>Tipo: ${objeto.Tipo}</p>
            </div>
            <div class="col">
                <br><p>Precio: ${objeto.precio} USD</p>
            </div>
            <div class="col">
                <br><p>Cantidad: ${objeto.cantidad} </p>
            </div>
            <div class="col">
                <br><p>Subtotal: ${objeto.subtotal} </p>
            </div>
            <div class="col">
                <br><a id="${objeto.id_reloj}" class="btn btn-outline-dark me-1" onClick="eliminarProducto(this.id)">Eliminar</a>
            </div>
          `
    return div

}

for (let i = 0; i < carrito.length; i++) {
    carrito[i].subtotal = carrito[i].cantidad * carrito[i].precio
    let div = crearItemCarrito(carrito[i])
    document.querySelector('.carrito').appendChild(div)
}


let total = carrito.reduce((total, reloj) => total + reloj.subtotal, 0);
let totalcompra = document.getElementById('total')
totalcompra.innerHTML = `TOTAL: ${total} USD`



window.eliminarProducto = function (eliminarID) {

    let infoReloj = Relojes.find(b => b.id_reloj == eliminarID);
    carrito = carrito.filter(item => item.id_reloj !== infoReloj.id_reloj);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    document.querySelector('.carrito').innerHTML = '';
    for (let i = 0; i < carrito.length; i++) {
        let div = crearItemCarrito(carrito[i])
        document.querySelector('.carrito').appendChild(div)
    }

    let total = carrito.reduce((total, reloj) => total + reloj.precio, 0);
    let totalcompra = document.getElementById('total')
    totalcompra.innerHTML = `TOTAL: ${total} USD`

    contador()
    
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