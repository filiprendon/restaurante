class Comanda extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.platosEnComanda = [];
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilos del componente */
                /* ... */
            </style>
            <div class="comanda">
                <h2>Comanda</h2>
                <ul class="platos"></ul>
                <p class="total">Total: $0</p>
            </div>
        `;
    }

    agregarPlato(plato) {
        this.platosEnComanda.push(plato);
        this.actualizarComanda();
    }

    actualizarComanda() {
        const platosElement = this.shadowRoot.querySelector('.platos');
        platosElement.innerHTML = '';
        let total = 0;
        this.platosEnComanda.forEach(plato => {
            const platoElement = document.createElement('li');
            platoElement.textContent = `${plato.nombre} - ${plato.precio}`;
            platosElement.appendChild(platoElement);
            total += parseFloat(plato.precio);
        });
        this.shadowRoot.querySelector('.total').textContent = `Total: $${total.toFixed(2)}`;
    }
}
customElements.define('app-comanda', Comanda);
