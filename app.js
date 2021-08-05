function showWeather(response) {
  let cityName = document.querySelector("h1");
  let weatherDescription = document.querySelector("#weatherDescrip");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#hum");
  console.log(response.data);

  let tempRound = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${tempRound}°C`;
  cityName.innerHTML = `${response.data.name}`;
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
}
function getCurrentWeather() {
  event.preventDefault();
  console.log("loquesea");

  navigator.geolocation.getCurrentPosition(getLocation);
}

function getCityWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showWeather);
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showWeather);
}

function showTime(event) {
  let currentTime = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[currentTime.getDay()];
  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  let localTime = `${currentDay} ${currentHour}:${currentMinute}`;
  dateTime.innerHTML = `${localTime}`;
}

let apiKey = "e1a327cd6c4e5777b76bc49ff27947fe";
let currentTemp = document.querySelector("#temp");

let cityForm = document.querySelector("#city-search");
cityForm.addEventListener("submit", getCityWeather);

let dateTime = document.querySelector("#dateTime");
showTime(dateTime);

let currentWeatherButton = document.querySelector("#current-city");
currentWeatherButton.addEventListener("click", getCurrentWeather);
