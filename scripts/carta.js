class Carta extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilos del componente */
                /* ... */
            </style>
            <div class="carta">
                <h2>Carta del Restaurante</h2>
                <div class="platos"></div>
            </div>
        `;
    }

    connectedCallback() {
        this.agregarPlato("Plato 1", "imagen1.jpg", "10");
        this.agregarPlato("Plato 2", "imagen2.jpg", "15");
    }

    agregarPlato(nombre, imagen, precio) {
        const platoElement = document.createElement('app-plato');
        platoElement.setAttribute('nombre', nombre);
        platoElement.setAttribute('imagen', imagen);
        platoElement.setAttribute('precio', precio);
        this.shadowRoot.querySelector('.platos').appendChild(platoElement);
    }
}
customElements.define('app-carta', Carta);
