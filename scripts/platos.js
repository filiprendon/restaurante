class Plato extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const nombre = this.getAttribute("nombre");
    const imagen = this.getAttribute("imagen");
    const precio = this.getAttribute("precio");
    const alergenos = this.getAttribute("alergenos").split(",");

    this.shadowRoot.innerHTML = `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
      <style>
        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .card img {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .card-body {
          padding: 15px;
        }
        .card-title {
          font-size: 1.25rem;
          margin-bottom: 10px;
        }
        .card-text {
          font-size: 1rem;
          margin-bottom: 10px;
        }
        .addComando {
          display: block;
          width: 100%;
          margin-top: 10px;
        }
      </style>
      <div class="col">
        <div class="card h-100">
            <img src="${imagen}" class="card-img-top" alt="${nombre}">
            <div class="card-body">
              <h5 class="card-title">${nombre}</h5>
              <p class="card-text">Alergenos: ${alergenos.join(", ")}</p>
              <p class="card-text">Precio: ${precio}€</p>
              <button class="btn btn-primary addComando">Pedir</button>
            </div>
        </div>
      </div>`;

    this.shadowRoot.querySelector(".addComando").addEventListener("click", () => {
      this.order();
    });
  }

  order() {
    const nombre = this.getAttribute("nombre");
    const imagen = this.getAttribute("imagen");
    const precio = this.getAttribute("precio");
    const alergenos = this.getAttribute("alergenos");

    const event = new CustomEvent("addOrder", {
      detail: {
        plato: nombre,
        imagen: imagen,
        precio: precio,
        alergenos: alergenos.split(","),
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

window.customElements.define("restaurante-plato", Plato);
 