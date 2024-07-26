/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import dataBencana from '../data/dataBencana';

class BencanaHome {
  constructor() {
    this.createCardBencana = this.createCardBencana.bind(this);
  }

  createCardBencana() {
    const bencanaHome = document.querySelector('#bencana-home');
    bencanaHome.innerHTML = '';

    const content = dataBencana.map((data) => {
      if (data) {
        return `
        <a href="./detail-bencana.html" class="title-bencana-home">
        <div class="col">
        <div class="card mb-3 mx-auto hover-card">
            <img class="card-img-top"
                src=${data.imageCard}
                alt="Gambar Bencana" height="250px" style= "obejct-fit:cover;">
            <div class="card-body text-white color2">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text hidden-description">${data.description}</p>
            </div>
        </div>
    </div>
    </a>
     `;
      }
      return '';
    });
    bencanaHome.innerHTML = content.join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const bencanaHome = new BencanaHome();
  bencanaHome.createCardBencana();
});

export default BencanaHome;
