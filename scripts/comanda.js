class Comanda extends HTMLElement {
    constructor() {
      super();
      this.platos = [];
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
        <div>
          <h2>Comanda</h2>
          <ul id="lista-comanda"></ul>
          <p>Total: <span id="total">0</span>€</p>
        </div>
      `;
    }
  
    
    agregarPlato(plato) {
      this.platos.push(plato);
      this.actualizar();
    }
  
    actualizar() {
      const listaComanda = this.querySelector("#lista-comanda");
      listaComanda.innerHTML = "";
      this.platos.forEach(plato => {
        const platoComanda = document.createElement("plato-comanda");
        platoComanda.setAttribute("nombre", plato.nombre);
        platoComanda.setAttribute("imagen", plato.imagen);
        platoComanda.setAttribute("precio", plato.precio);
        listaComanda.appendChild(platoComanda);
      });
  
      const total = this.platos.reduce((acc, plato) => acc + parseFloat(plato.precio), 0);
      this.querySelector("#total").textContent = total.toFixed(2);
    }
  }
  
  window.customElements.define("comanda-restaurante", Comanda);
  document.addEventListener("addOrder", function (e) {
    console.log(e.detail.plato);
    console.log(e.detail.imagen);
    console.log(e.detail.precio);
    console.log(e.detail.alergenos);
  });