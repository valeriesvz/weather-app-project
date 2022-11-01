let time = document.querySelector(".date");
let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentTime.getDay()];

time.innerHTML = `${day}, ${hours}:${minutes}`;

function toCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  temp.innerHTML = 21 + "°";
}
let c = document.querySelector("#celsius");
c.addEventListener("click", toCelsius);

function toFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  temp.innerHTML = Math.round((21 * 9) / 5 + 32) + "°";
}
let f = document.querySelector("#fahrenheit");
f.addEventListener("click", toFahrenheit);

function displayWeatherCondition(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(city) {
  let apiKey = "01c5d92bf0571e2225681c60258e03c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "01c5d92bf0571e2225681c60258e03c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentLocation);
