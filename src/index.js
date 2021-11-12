let now = new Date();
function todayTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentTime = document.querySelector(".current-time");
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  currentTime.innerHTML = `${hours}:${minutes} ${day}, ${month} ${date} ${year}`;
}
todayTime();
//Search city

function displayCurrentWeather(response) {
  let currentTemp = document.querySelector(".current-temp");
  let currentTempResp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${currentTempResp}ºC`;
  let currentLocation = document.querySelector(".location");
  let currentLocationResp = response.data.name;
  currentLocation.innerHTML = `${currentLocationResp}`;
  let maxMin = document.querySelector("#max-min");
  let max = Math.round(response.data.main.temp_max);
  let min = Math.round(response.data.main.temp_min);
  maxMin.innerHTML = `Max/Min: ${max}/${min}ºC`;
  let humidity = document.querySelector("#humidity");
  let humidityNow = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${humidityNow}%`;
  let wind = document.querySelector("#wind");
  let windNow = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windNow}Km/h`;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#locationInput").value;
  let apiKey = `062e2c91ccb0878db76c1e378379244b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

let searchButton = document.querySelector("#location-form");
searchButton.addEventListener("submit", searchCity);

// Current Location

function actualLocation() {
  navigator.geolocation.getCurrentPosition(actualCoords);
}
function actualCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = `062e2c91ccb0878db76c1e378379244b`;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

  axios.get(url).then(showCurrentSituation);
}
function showCurrentSituation(response) {
  let currentTemp = document.querySelector(".current-temp");
  let currentTempResp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${currentTempResp}ºC`;
  let currentLocation = document.querySelector(".location");
  let currentLocationResp = response.data.name;
  currentLocation.innerHTML = `${currentLocationResp}`;
  let maxMin = document.querySelector("#max-min");
  let max = Math.round(response.data.main.temp_max);
  let min = Math.round(response.data.main.temp_min);
  maxMin.innerHTML = `Max/Min: ${max}/${min}ºC`;
  let humidity = document.querySelector("#humidity");
  let humidityNow = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${humidityNow}%`;
  let wind = document.querySelector("#wind");
  let windNow = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windNow}Km/h`;
}

let currentButton = document.querySelector("#currentLocation");
currentButton.addEventListener("click", actualLocation);
