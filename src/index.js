function updateWeather(response) {
  let tempreatureInput = document.querySelector("#number-temp");
  let temperature = response.data.temperature.current;
  tempreatureInput.innerHTML = Math.round(temperature);
  let theCityelement = document.querySelector("#the-city");
  let paragraphElement = document.querySelector("#paragraph");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let emojiElement = document.querySelector("#emoji");

  theCityelement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  paragraphElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  tempreatureInput.innerHTML = Math.round(temperature);
  emojiElement.innerHTML = `<img src="${response.data.condition.icon_url} "class="weather-app-icon" />`;
  getTheforecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "o8c4364da7btfb6f80cb313baf6dceea";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function searchButton(event) {
  event.preventDefault();
  let searchIn = document.querySelector("#search-input");

  searchCity(searchIn.value);
}
function getTheforecast(city) {
  let apiKey = "o8c4364da7btfb6f80cb313baf6dceea";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayFive);
}
function displayFive(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
          <div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-emoji">😊</div>
            <div class="forecast">
              <div class="weather-forecast-degress"><strong>${Math.round(
                day.temperature.maximum
              )}</strong></div>
              <div class="weather-forecast-degress">°5</div>
            </div>
          </div>`;
  });
  let forecastElement = document.querySelector("#weather-forecasts");
  forecastElement.innerHTML = forecastHtml;
}
let inputElement = document.querySelector("#search-form");
inputElement.addEventListener("submit", searchButton);
