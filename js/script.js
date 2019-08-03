const city = document.getElementById('city-name');
const weatherReport = document.getElementById('weather-report');
const temp = document.getElementById('temp');
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city');
const errorSection = document.getElementById ('error');
const widgetSection = document.getElementById ('widget');
let apiRequest = new XMLHttpRequest();


cityForm.addEventListener('submit', ($event) => {
  $event.preventDefault();
  const chosenCity = cityInput.value;
  apiRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e');
  apiRequest.send();
});


apiRequest.onreadystatechange = () => {
    if(apiRequest.readyState === 4) {
      if(apiRequest.status === 404) {
        errorSection.textContent = 'City not found';
        if (errorSection.style.display === "none") {
          errorSection.style.display = "block";
          widgetSection.style.display = "none";
        }
        else {
          errorSection.style.display = "none";
          widgetSection.style.display = "block";
        }
      }
        const response = JSON.parse(apiRequest.response)
        city.textContent = response.name + ',' + ' ' + response.sys.country;
        weatherReport.textContent = response.weather[0].description;
        temp.textContent = Math.round(parseFloat(response.main.temp-273.15)) + '°C';
    }
}