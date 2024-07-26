/* eslint-disable class-methods-use-this */
export default class Cuaca {
  constructor() {
    this.getLocation();
  }

  getLocation() {
    try {
      if (typeof navigator !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
      }
    } catch (error) {
      console.log('Geolocation is not supported by this browser. ', error);
    }
  }

  contentCuaca(cuacaData) {
    let htmlContent = '';

    cuacaData.forEach((element) => {
      htmlContent += `
          <div class="cuaca-item card border-0 bg-transparent text-white" style="min-width: 250px;">
            <div class="card-header bg-transparent border-0  ">
              <h5>${element.jamCuaca}</h5>
            </div>
            <div class="card-body border-none color3 d-flex flex-column justify-content-around rounded-4 px-4 card-landing-page"
              style="min-height: 170px;">
              <div class="d-flex justify-content-around">
                <img class="weather-icon" src="https://ibnux.github.io/BMKG-importer/icon/${element.kodeCuaca}.png" alt="" style="max-width: 60px;">
                <p class="fs-3">${element.tempC}&deg; C</p>
              </div>
              <p>${element.cuaca}</p>
            </div>
          </div>
        `;
    });

    return htmlContent;
  }

  async showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const wilayahData = await fetch('https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json')
      .then((response) => response.json());

    // Bandingkan lokasi pengguna dengan data JSON
    const closestWilayah = this.findClosestWilayah(lat, lon, wilayahData);

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const lokasiUser = document.querySelector('#lokasi-user');
    // lokasiUser.innerText = `${closestWilayah.kota}, ${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}
    // `;
    lokasiUser.innerHTML = `
    <div>    
    <p>
    <i class="fa fa-map-marker" aria-hidden="true"></i>
    ${closestWilayah.kota}, ${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day} </p>
    </div>`;

    // Tampilkan cuaca wilayah terdekat
    const cuacaData = await fetch(`https://ibnux.github.io/BMKG-importer/cuaca/${closestWilayah.id}.json`)
      .then((response) => response.json());

    const createWeatherCard = document.querySelector('#card-cuaca');
    createWeatherCard.innerHTML = '';

    createWeatherCard.innerHTML = this.contentCuaca(cuacaData);
  }

  findClosestWilayah(userLat, userLon, wilayahData) {
    let closestWilayah = null;
    let closestDistance = Number.MAX_VALUE;

    wilayahData.forEach((wilayah) => {
      const distance = this.calculateDistance(userLat, userLon, wilayah.lat, wilayah.lon);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestWilayah = wilayah;
      }
    });

    return closestWilayah;
  }

  // mendapatkan cuaca terdekat

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2))
        * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}

// Instantiate the Cuaca class when your website is ready
document.addEventListener('DOMContentLoaded', () => {
  const cuacaApp = new Cuaca();
  cuacaApp.getLocation();
});
