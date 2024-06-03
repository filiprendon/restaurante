class Plato extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const nombre = this.getAttribute("nombre");
    const imagen = this.getAttribute("imagen");
    const precio = this.getAttribute("precio");
    const alergenos = this.getAttribute("alergenos").split(",");

    this.innerHTML = `
    <div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card" style="width: 18rem;">
    <img src="${imagen}" class="card-img-top" alt="${nombre}">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Alergenos: ${alergenos}</p>
      <p class="card-text">Precio: ${precio}€</p>
      <div class="addRemoveButtons" style="display: flex; justify-content: space-between;">
      <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
</svg></button>
      <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
</svg></button>

      


      </div>
      <button class="btn btn-primary addComando" style="width: -webkit-fill-available;" onclick="order(event)">Pedir</button>
    </div>
  </div>
  </div>
  </div>
    `;
  }
}

// let btnsAR = document.querySelector('.addRemoveButtons');

// btnsAR.style.display = 'flex';
// btnsAR.style.justifyContent = 'space-between';

window.customElements.define("restaurante-plato", Plato);

const platos = [
  {
    categoria: "Primero",
    nombre: "Ezme",
    imagen: "img/ezme.jpg",
    precio: "5",
    alergenos: ["Ninguno"],
  },
  {
    categoria: "Primero",
    nombre: "Meze",
    imagen: "img/meze.jpg",
    precio: "7",
    alergenos: ["Gluten, Frutos secos"],
  },
  {
    categoria: "Primero",
    nombre: "Sarmi",
    imagen: "img/sarmi.jpg",
    precio: "6",
    alergenos: ["Ninguno"],
  },
  {
    categoria: "Segundo",
    nombre: "Lahmacun",
    imagen: "img/lahmacun.jpg",
    precio: "7",
    alergenos: ["Gluten"],
  },
  {
    categoria: "Segundo",
    nombre: "Kebap",
    imagen: "img/kebap.jpg",
    precio: "12",
    alergenos: ["Frutos secos"],
  },
  {
    categoria: "Segundo",
    nombre: "Manti",
    imagen: "img/manti.jpg",
    precio: "9",
    alergenos: ["Gluten, Lactosa"],
  },
  {
    categoria: "Postres",
    nombre: "Künefe",
    imagen: "img/kunefe.jpg",
    precio: "6.5",
    alergenos: ["Lactosa, Frutos secos"],
  },
  {
    categoria: "Postres",
    nombre: "Baklava",
    imagen: "img/baklava.png",
    precio: "4",
    alergenos: ["Frutos secos, Gluten"],
  },
  {
    categoria: "Bebidas",
    nombre: "Ayran",
    imagen: "img/ayran.jpg",
    precio: "2.5",
    alergenos: ["Lactosa"],
  },
  {
    categoria: "Bebidas",
    nombre: "Agua",
    imagen: "img/voss.jpg",
    precio: "1",
    alergenos: ["Ninguno"],
  },
  {
    categoria: "Bebidas",
    nombre: "Çai",
    imagen: "img/cai.jpg",
    precio: "1.5",
    alergenos: ["Ninguno"],
  },
  {
    categoria: "Bebidas",
    nombre: "Raki",
    imagen: "img/raki.jpg",
    precio: "3.5",
    alergenos: ["Ninguno"],
  },
];

platos.forEach((plato) => {
  const platoElemento = document.createElement("restaurante-plato");
  platoElemento.setAttribute("nombre", plato.nombre);
  platoElemento.setAttribute("imagen", plato.imagen);
  platoElemento.setAttribute("precio", plato.precio);
  platoElemento.setAttribute("alergenos", plato.alergenos.join(","));

  document.body.appendChild(platoElemento);
});

let addComando = document.querySelector(".addComando");

addComando.addEventListener("addOrder", function (e) {
  console.log(e.detail.plato);
  console.log(e.detail.imagen);
  console.log(e.detail.precio);
  console.log(e.detail.alergenos);
});

function order(e) {
  let platoActual = e.target.closest("restaurante-plato");

  let nombre = platoActual.getAttribute("nombre");
  let img = platoActual.getAttribute("imagen");
  let precio = platoActual.getAttribute("precio");
  let alergenos = platoActual.getAttribute("alergenos");

  const event = new CustomEvent("addOrder", {
    detail: {
      plato: nombre,
      imagen: img,
      precio: precio,
      alergenos: alergenos,
    },
  });
  addComando.dispatchEvent(event);
}
