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
    this.locData = [];

    this.getLocWeather();
    this.setupEventListeners();
    this.getWeather('Bandung, Kota Bandung, Indonesia');
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
    this.formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.getWeather(this.inputElement.value);
    });
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

      const resultItems = this.searchResults.querySelectorAll('.result-item');
      resultItems.forEach((item) => {
        item.addEventListener('click', () => this.handleResultItemClick(item));
      });
    }
  }

  handleResultItemClick(item) {
    const selectedValue = item.innerText;
    this.selectSuggestion(selectedValue);
  }

  selectSuggestion(selectedValue) {
    this.inputElement.value = selectedValue;
    this.searchResults.style.display = 'none';

    this.getWeather(selectedValue);
  }

  async getWeather(location) {
    const apiKey = '1fe5f03e8b679377cbc41601289edfdd';
    const spesficLocation = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(spesficLocation);
      const data = await response.json();

      this.weatherRelated.innerHTML = `
        <h2 style="margin-bottom: 15px;">${data.name}, ${data.sys.country}</h2>
        <h5><span class="temp">${data.main.temp}°С</span> <span class="temp">${data.weather[0].description}</span></h5>
        <p style="margin-bottom: 17px;">Temperature from ${data.main.temp_min}°С to ${data.main.temp_max}°С</p>
        <h5>Wind Speed : ${data.wind.speed} m/s</h5>
        <h5 style="margin-bottom: 17px;">Clouds : ${data.clouds.all}%</h5>
        <h4 style="color: #ffff;">Geo Coordinates : [${data.coord.lat}, ${data.coord.lon}]</h4>
      `;

      this.inputElement.value = null;
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

export default WeatherApp;
