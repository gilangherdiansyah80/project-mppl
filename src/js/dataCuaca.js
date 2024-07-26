/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
// weather.js

const weatherModule = {
  locData: [],

  async getLocWeather() {
    const weatherLocation = 'https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json';
    try {
      const response = await fetch(weatherLocation);
      const data = await response.json();
      console.log(data);

      this.locData = data
        .filter((loc) => loc.id !== '0')
        .map((loc) => ({
          id: `${loc.id}`,
          Wilayah: `${loc.kecamatan}, ${loc.kota}, ${loc.propinsi}`
        }));

      console.log(this.locData);
    } catch (error) {
      console.error('Error:', error);
    }
  },

  displaySuggestions(locationsData, searchResultsElement) {
    const locationsDataHTML = locationsData.map((locSpecificData) => `<div class="result-item" onclick="weatherModule.getWeather(${locSpecificData.id}, '${locSpecificData.Wilayah}')">${locSpecificData.Wilayah}</div>`).join('');
    searchResultsElement.innerHTML = locationsDataHTML;
    searchResultsElement.style.display = locationsData.length > 0 ? 'block' : 'none';
  },

  async getWeather(idWilayah, wilayah, cuacaElement, kodeCuacaElement, tempCElement, jamCuacaElement) {
    const spesficLocation = `https://ibnux.github.io/BMKG-importer/cuaca/${idWilayah}.json`;
    searchResults.style.display = 'none';
    inputElement.value = wilayah;

    try {
      const response = await fetch(spesficLocation);
      const data = await response.json();
      console.log(data);

      const [element] = data;
      if (element) {
        const {
          cuaca, kodeCuaca, tempC, jamCuaca
        } = element;

        cuacaElement.innerText = `Cuaca: ${cuaca}`;
        kodeCuacaElement.innerText = `Kode Cuaca: ${kodeCuaca}`;
        tempCElement.innerText = `Temperature Celcius: ${tempC}`;
        jamCuacaElement.innerText = `Jam Cuaca: ${jamCuaca}`;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
};

export default weatherModule;
