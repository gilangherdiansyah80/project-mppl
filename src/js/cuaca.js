/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
class WeatherApp {
  constructor() {
    this.formElement = document.querySelector('form');
    this.inputElement = document.getElementById('search-loc');
    this.searchResults = document.getElementById('search-results');
    this.weatherRelated = document.getElementById('weather-related');
    this.cuacaHourly = document.getElementById('cuaca-hourly');
    this.locData = [];

    this.getLocWeather();
    this.setupEventListeners();
    this.getWeather(501212, 'Bandung, Kota Bandung, Indonesia');
  }

  async getLocWeather() {
    const weatherLocation = 'https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json';
    try {
      const response = await fetch(weatherLocation);
      const data = await response.json();

      for (let i = 0; i < data.length; i++) {
        let loc = data[i];
        const locSpecific = { id: `${loc.id}`, Wilayah: `${loc.kecamatan}, ${loc.kota}, ${loc.propinsi}` };
        if (loc.id !== '0') {
          this.locData.push(locSpecific);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  setupEventListeners() {
    this.inputElement.addEventListener('input', () => this.handleInput());
    document.addEventListener('click', (event) => this.handleClickOutsideResults(event));
  }

  handleInput() {
    const searchTerm = this.inputElement.value.toLowerCase();
    const matchingSuggestions = this.locData.filter((locSpecificData) => locSpecificData.Wilayah.toLowerCase().includes(searchTerm));
    this.displaySuggestions(matchingSuggestions.slice(0, 5));
  }

  handleClickOutsideResults(event) {
    const isClickedInsideResults = this.searchResults.contains(event.target);
    if (!isClickedInsideResults) {
      this.searchResults.style.display = 'none';
    }
  }

  displaySuggestions(locationsData) {
    if (locationsData.length > 0) {
      const locationsDataHTML = locationsData.map((locSpecificData) => `<div class="result-item" data-id="${locSpecificData.id}">${locSpecificData.Wilayah}</div>`).join('');
      this.searchResults.innerHTML = locationsDataHTML;
      this.searchResults.style.display = 'block';

      // Menambahkan event listener ke setiap elemen hasil pencarian
      const resultItems = this.searchResults.querySelectorAll('.result-item');
      resultItems.forEach((item) => {
        item.addEventListener('click', () => this.handleResultItemClick(item));
      });
    }
  }

  handleResultItemClick(item) {
    const selectedId = item.dataset.id;
    const selectedValue = item.innerText;
    this.selectSuggestion(selectedId, selectedValue);
  }

  selectSuggestion(selectedId, selectedValue) {
    this.inputElement.value = selectedValue;
    this.searchResults.style.display = 'none';

    // Memanggil fungsi getWeather dengan id dan nilai terpilih
    this.getWeather(selectedId, selectedValue);
  }

  async getWeather(idWilayah, wilayah) {
    const spesficLocation = `https://ibnux.github.io/BMKG-importer/cuaca/${idWilayah}.json`;
    this.searchResults.style.display = 'none';
    this.inputElement.value = wilayah;

    try {
      const response = await fetch(spesficLocation);
      const data = await response.json();

      this.weatherRelated.innerHTML = '';
      this.cuacaHourly.innerHTML = '';

      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (i === 1) {
          this.weatherRelated.innerHTML = `
            <h5 class="card-title text-black">${wilayah}</h5>
            <p class="card-text">${this.formatTanggal(element.jamCuaca)} <br> Jam ${this.formatJam(element.jamCuaca)}</p>
            <div class="row">
              <div class="col-md-4">
                <img src="https://ibnux.github.io/BMKG-importer/icon/${element.kodeCuaca}.png" alt="..." class="w-75" style="max-width: 100px;">
                <p class="mt-4 ms-2">${element.cuaca}</p>
              </div>
              <div class="col-md-7 p-0">
                <h1>${element.tempC}&deg;C</h1>
                <p class="ms-4 mt-4 fs-5">60/80</p>
              </div>
            </div>
          `;
        }

        this.cuacaHourly.innerHTML += `
          <div class="col-md-2 item-hourly">
            <p>${this.formatHari(element.jamCuaca)} ${this.formatJam(element.jamCuaca)}</p>
            <img src="https://ibnux.github.io/BMKG-importer/icon/${element.kodeCuaca}.png" alt="" class="w-100">
            <p class="mt-2">${element.tempC}&deg;C</p>
          </div>
        `;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  formatTanggal(tanggal) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const formattedDate = new Date(tanggal).toLocaleDateString('id-ID', options);
    return formattedDate;
  }

  formatHari(tanggal) {
    const options = { weekday: 'long' };
    const formattedDate = new Date(tanggal).toLocaleDateString('id-ID', options);
    return formattedDate;
  }

  formatJam(tanggal) {
    const formattedTime = new Date(tanggal).toLocaleTimeString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    return formattedTime;
  }
}

export default WeatherApp;
