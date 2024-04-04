//  || TOGGLE HAMBURGER BAR
const hamburger = document.querySelector(".hamburger");
const slidebar = document.querySelector(".slidebar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  slidebar.classList.toggle("active");
});

// Navigation
let city = document.getElementById("city");
let country = document.getElementById("country");
let searchCity = document.getElementById("search");

// box-1
let cityTemp = document.getElementById("temp");
let weatherIcon = document.getElementById("weather-icon");
let weatherDescription = document.getElementById("description");
let weatherPressure = document.getElementById("pressure");
let weatherVisibilty = document.getElementById("visibility");
let weatherHumidity = document.getElementById("humidity");

// box-2
let sunriseTime = document.getElementById("sunrise-time");
let sunsetTime = document.getElementById("sunset-time");
let uviRays = document.getElementById("uvi-rays");
let uviConcernLevel = document.querySelector(".uvi-level");
let uviConcernLevel2 = document.querySelector(".uvi-level2");

// Time and dates
let currentTime = document.querySelector(".time");
let currentDate = document.querySelector(".date");
let aqi = document.querySelector(".aqi");

// || GLOBAL letIABLES
let weatherApi;
let responseData;
let monthName = [
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
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// || FUNCTION FOR GET WEATHER REPORT
async function weatherReport(searchCity) {
  weatherApi = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=da2103b2c4ce4f95af051626232503&q=${searchCity}&days=7&aqi=yes&alerts=no`
  );
  responseData = await weatherApi.json();

  todayWeatherReport();
}

// || By default city
weatherReport("New Delhi");

function todayWeatherReport() {
  city.innerHTML = responseData.location.name;
  country.innerHTML =
    ' <i class="fa-sharp fa-solid fa-location-dot"></i>' +
    responseData.location.country;

  // Box-1
  cityTemp.innerHTML = responseData.current.temp_c;
  weatherDescription.innerHTML = responseData.current.condition.text;
  weatherIcon.setAttribute("src", responseData.current.condition.icon);
  weatherPressure.innerHTML = responseData.current.pressure_mb + "mb";
  weatherVisibilty.innerHTML = responseData.current.vis_km + " km";
  weatherHumidity.innerHTML = responseData.current.humidity + "%";

  // Box-2
  sunriseTime.innerHTML = responseData.forecast.forecastday[0].astro.sunrise;
  sunsetTime.innerHTML = responseData.forecast.forecastday[0].astro.sunset;
  uviRays.innerHTML = responseData.current.uv + " UVI";
  aqi.innerHTML = Math.round(responseData.current.air_quality.pm2_5);

  checkUVraysIndex();
  time();
}
// || Functions for do some task
function checkUVraysIndex() {
  let uviLevel = Number.parseInt(uviRays.textContent);
  if (uviLevel <= 2) {
    checkUviValue("Good", "#6ae17c");
  } else if (uviLevel <= 5) {
    checkUviValue("Moderate", "#CCE16A");
  } else if (uviLevel <= 7) {
    checkUviValue("High", "#d4b814");
  } else if (uviLevel <= 10) {
    checkUviValue("Very high", "#d43114");
  } else {
    checkUviValue("Etreme high", "#dc15cf");
  }
}

function checkUviValue(level, color) {
  uviConcernLevel.innerHTML = level;
  uviConcernLevel.style.backgroundColor = color;
  uviConcernLevel2.innerHTML = level;
}

function time() {
  let timezone = responseData.location?.tz_id;
  let now = new Date().toLocaleTimeString("en-US", { timeZone: timezone });
  currentTime.innerHTML = now;

  let today = new Date(responseData.forecast.forecastday[0].date);
  currentDate.innerHTML = `${today.getDate()} ${
    monthName[today.getMonth()]
  } ${today.getFullYear()}, ${weekDays[today.getDay()]}`;
}

setInterval(() => {
  time();
}, 1000);

searchCity.addEventListener("keydown", () => {
  weatherReport(searchCity.value);
});
