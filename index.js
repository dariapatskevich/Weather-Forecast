const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const description = document.querySelector(".description");
const wind = document.querySelector(".wind");
const button = document.querySelector(".button")
const input = document.querySelector(".search")
const icon = document.querySelector('.weather__icon')
const preloader = document.querySelector('.preloader')
document.addEventListener("DOMContentLoaded", app)

setTimeout(() => {
  preloader.style.display = "none";
}, 3000);

function app() {
  showWeather()
  getInputListeners()
}

function showWeather() {
  navigator.geolocation.getCurrentPosition(position => {
      let latitude = position.coords.latitude
      let longitude = position.coords.longitude
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b5a03b378e49085452cb14ec5350c1e9`)
          .then(response => response.json())
          .then(result => renderWeather(result))
  })
}

function getInputListeners() {
  button.addEventListener('click', event => {
    console.log(input, input.value);
    getCityApi(input.value)
      input.value = ''
  })
}
async function getCityApi(cityName) {
  try {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b5a03b378e49085452cb14ec5350c1e9`)
      let weatherDB = await response.json()
      console.log(weatherDB)
      renderWeather(weatherDB)
  } catch { 
      alert('I can not find this city !')
  }
}

function renderWeather(DB) {
  let { name, main: {temp, feels_like}, weather: [weather], wind: {speed} } = DB
  cityName.innerText = name
  temperature.innerText = convertToCelsius(temp)
  description.innerText = `Feels like: ${convertToCelsius(feels_like)}`
  icon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
  wind.innerText = `${speed} m/s`
}

function convertToCelsius(temp) {
  return `${Math.round(temp - 273.15)}°`
}