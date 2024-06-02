class Plato extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
          <div class="plato">
              <img src="" alt="Imagen del plato">
              <h3 class="nombre">Filip</h3>
              <p class="precio">20</p>
              <p class="alergenos">Lactosa</p>
              <button class="agregar">Agregar a la comanda</button>
          </div>
      `;
      // Evento para agregar el plato a la comanda
      this.shadowRoot.querySelector('.agregar').addEventListener('click', () => {
          const plato = {
              nombre: this.getAttribute('nombre'),
              imagen: this.getAttribute('imagen'),
              precio: this.getAttribute('precio')
          };
          const agregarEvento = new CustomEvent('agregarPlato', { detail: plato });
          this.dispatchEvent(agregarEvento);
      });
  }
}
customElements.define('app-plato', Plato);
