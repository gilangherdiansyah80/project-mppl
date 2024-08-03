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
      htmlContent += `<h2 style="margin-bottom: 15px;">${element.name}, ${element.sys.country}</h2>
                                <h5><span class="temp">${element.main.temp}°С</span> <span class="temp">${element.weather[0].description}</span></h5>
                                <p style="margin-bottom: 17px;">Temperature from ${element.main.temp_min}°С to ${element.main.temp_max}°С</p>
                                <h5>Wind Speed : ${element.wind.speed} m/s</h5>
                                <h5 style="margin-bottom: 17px;">Clouds : ${element.clouds.all}%</h5>
                                <h4 style="color: #012443;">Geo Coordinates : [${element.coord.lat}, ${element.coord.lon}]</h4>`
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
    const cuacaData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${closestWilayah.kota}&appid=1fe5f03e8b679377cbc41601289edfdd&units=metric`)
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
