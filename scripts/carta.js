class Carta extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
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
  
          const categorias = ["Primero", "Segundo", "Postres", "Bebidas"];
          this.shadowRoot.innerHTML = categorias.map(categoria => `
            <h2>${categoria}</h2>
            <div class="row" id="${categoria.toLowerCase()}"></div>
          `).join('');
  
          categorias.forEach(categoria => {
            const contenedor = this.shadowRoot.getElementById(categoria.toLowerCase());
            platos.filter(plato => plato.categoria === categoria).forEach(plato => {
              const platoElemento = document.createElement("restaurante-plato");
              platoElemento.setAttribute("nombre", plato.nombre);
              platoElemento.setAttribute("imagen", plato.imagen);
              platoElemento.setAttribute("precio", plato.precio);
              platoElemento.setAttribute("alergenos", plato.alergenos.join(","));
              contenedor.appendChild(platoElemento);
            });
          });
        }
      }
  
  window.customElements.define("restaurante-carta", Carta);
  