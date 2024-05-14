class Platos extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <h1>Restaurante SlipSlix</h1>
      <div id="menu">
        <h2>Primers</h2>
        <div class="plat">
          <h3>Nom del plat</h3>
          <img src="imatge.jpg" alt="Imatge del plat">
          <p>Preu: 10€</p>
          <p>Al·lèrgens: Gluten</p>
          <button class="afegir-plat">Afegir a la comanda</button>
        </div>
        <!-- Altres plats aquí -->
      </div>
    `;
    this.registrarListeners();
  }

  registrarListeners() {
    const plats = this.querySelectorAll('.plat');
    plats.forEach(plat => {
      plat.querySelector('.afegir-plat').addEventListener('click', () => {
        const nomPlat = plat.querySelector('h3').textContent;
        const imatgePlat = plat.querySelector('img').src;
        const preuPlat = plat.querySelector('p:nth-of-type(1)').textContent.split(":")[1].trim();
        const allèrgensPlat = plat.querySelector('p:nth-of-type(2)').textContent.split(":")[1].trim();

        const detallsPlat = { nom: nomPlat, imatge: imatgePlat, preu: preuPlat, allèrgens: allèrgensPlat };
        const event = new CustomEvent('plat-afegit', { detail: detallsPlat });
        this.dispatchEvent(event);
      });
    });
  }
}

window.customElements.define('platos-carta', Platos);
