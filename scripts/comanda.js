class Comanda extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 10px;
        }
        .card img {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        img{
          width: -webkit-fill-available;
        }
        .card-body {
          padding: 15px;
        }
        .card-title {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
        .card-text {
          font-size: 1rem;
          margin-bottom: 10px;
        }
        .acciones {
          display: flex;
          justify-content: space-between;
        }
      </style>
      <div class="container mt-4">
        <h2>Tu Pedido</h2>
        <div id="pedido" class="mt-3"></div>
        <p class="mt-3">Total: <span id="total">0.00</span>€</p>
      </div>`;
    this.total = 0;
  }

  connectedCallback() {
    document.addEventListener("addOrder", (e) => {
      this.recibirOrden(e);
    });
  }

  recibirOrden(e) {
    const { plato, imagen, precio, alergenos } = e.detail;
    const pedidos = this.shadowRoot.getElementById("pedido");
    console.log(e.detail);
    let comprobar = this.shadowRoot.querySelectorAll(".card-title");

    let existe = false;

    comprobar.forEach((element) => {
      if (element.textContent.includes(plato)) {
        existe = true;
      }
    });

    if (existe) return;

    const pedido = document.createElement("div");
    pedido.style.maxWidth = "fit-content";
    pedido.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${imagen}" alt="${plato}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${plato} <span class="cantidad">1</span></h5>
          <p class="card-text">Precio: ${precio}€</p>
          <p class="card-text">Alergenos: ${alergenos.join(", ")}</p>
          <div class="acciones">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg sumar"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg restar"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
            </svg>
          </div>
        </div>
      </div>
      <hr>
    `;
    pedidos.appendChild(pedido);

    this.total += parseFloat(precio);
    this.shadowRoot.getElementById("total").innerText = this.total.toFixed(2);

    let sumar = pedido.querySelector(".sumar");
    let restar = pedido.querySelector(".restar");

    restar.addEventListener("click", () => {
      this.calcularCantidades(precio, plato, "r");
    });

    sumar.addEventListener("click", () => {
      this.calcularCantidades(precio, plato, "s");
    });
  }

  calcularCantidades(pr, pl, accion) {
    let cantidadSpan = this.shadowRoot.querySelectorAll(".card-title");
    cantidadSpan.forEach((c) => {
      let cantidad = parseInt(c.querySelector("span").innerHTML);
      if (accion == "s" && c.innerHTML.includes(pl)) {
        c.querySelector("span").innerHTML = cantidad + 1;
        this.total += parseFloat(pr);
        this.shadowRoot.getElementById("total").innerText = this.total.toFixed(2);
      }
      if (accion == "r" && c.innerHTML.includes(pl)) {
        if (cantidad == 1) {
          if (confirm("¿Quieres borrar este pedido?")) {
            let pedidoABorrar = c.closest("div.card");
            pedidoABorrar.remove();
            this.total -= parseFloat(pr);
            this.shadowRoot.getElementById("total").innerText = this.total.toFixed(2);
            return;
          }
        } else {
          c.querySelector("span").innerHTML = cantidad - 1;
          this.total -= parseFloat(pr);
          this.shadowRoot.getElementById("total").innerText = this.total.toFixed(2);
        }
      }
    });
  }
}

window.customElements.define("comanda-restaurante", Comanda);