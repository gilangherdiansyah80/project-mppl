/* eslint-disable class-methods-use-this */
export default class Cuaca {
  constructor() {
    this.apiKey = '1fe5f03e8b679377cbc41601289edfdd'; // Masukkan API key Anda di sini
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

  async showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Ambil data cuaca dari OpenWeatherMap
    const cuacaData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`)
      .then(response => response.json());

    // Ambil data wilayah dari BMKG
    const wilayahData = await fetch('https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json')
      .then(response => response.json());

    // Temukan wilayah terdekat
    const closestWilayah = this.findClosestWilayah(lat, lon, wilayahData);

    // Tampilkan informasi wilayah dan cuaca
    this.displayLocationAndWeather(closestWilayah, cuacaData);
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

  displayLocationAndWeather(closestWilayah, cuacaData) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    
    const lokasiUser = document.querySelector('#lokasi-user');
    lokasiUser.innerHTML = `
      <div>    
        <p>
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          ${closestWilayah.kota}, ${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}
        </p>
      </div>
    `;

    const result = document.querySelector('#card-cuaca');
    result.innerHTML = `
      <h2 style="margin-bottom: 15px;">${cuacaData.name}, ${cuacaData.sys.country}</h2>
      <h5><span class="temp">${cuacaData.main.temp}°С</span> <span class="temp">${cuacaData.weather[0].description}</span></h5>
      <p style="margin-bottom: 17px;">Temperature from ${cuacaData.main.temp_min}°С to ${cuacaData.main.temp_max}°С</p>
      <h5>Wind Speed : ${cuacaData.wind.speed} m/s</h5>
      <h5 style="margin-bottom: 17px;">Clouds : ${cuacaData.clouds.all}%</h5>
      <h4 style="color: #012443;">Geo Coordinates : [${cuacaData.coord.lat}, ${cuacaData.coord.lon}]</h4>
    `;
  }
}

// Instantiate the Cuaca class when your website is ready
document.addEventListener('DOMContentLoaded', () => {
  const cuacaApp = new Cuaca();
  cuacaApp.getLocation();
});
