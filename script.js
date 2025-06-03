const crops = {
  summer: ["Maize", "Millets", "Cotton"],
  winter: ["Wheat", "Barley", "Mustard"],
  monsoon: ["Rice", "Sugarcane", "Soybean"]
};

const soilInfo = {
  clay: "Clay soil is good for rice and paddy. Fertility: High",
  sandy: "Sandy soil is suitable for peanuts and watermelon. Fertility: Low",
  loamy: "Loamy soil is ideal for most crops like wheat and pulses. Fertility: Very High"
};

const cropPrices = {
  Wheat: "₹22/kg",
  Rice: "₹28/kg",
  Cotton: "₹40/kg",
  Maize: "₹18/kg"
};

const apiKey = "78de4c1eeb9e461929f017626c2543ff"; // Your working API key

// DOM Elements
const btnCityWeather = document.getElementById("btn-city-weather");
const btnLocationWeather = document.getElementById("btn-location-weather");
const btnShowCrops = document.getElementById("btn-show-crops");
const btnShowSoil = document.getElementById("btn-show-soil");
const btnShowPrice = document.getElementById("btn-show-price");

btnCityWeather.addEventListener("click", getWeather);
btnLocationWeather.addEventListener("click", getWeatherByLocation);
btnShowCrops.addEventListener("click", showCrops);
btnShowSoil.addEventListener("click", showSoil);
btnShowPrice.addEventListener("click", showPrice);

// On page load, auto-detect weather by location
window.onload = getWeatherByLocation;

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) return alert("Please enter a city name");

  setLoading(true, "weather");
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === 200) {
      displayWeather(data);
    } else {
      document.getElementById("weather-output").innerText = "City not found.";
    }
  } catch (error) {
    document.getElementById("weather-output").innerText = "Failed to fetch weather data.";
  } finally {
    setLoading(false, "weather");
  }
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    document.getElementById("weather-output").innerText = "Geolocation is not supported by your browser.";
    return;
  }

  setLoading(true, "weather");
  navigator.geolocation.getCurrentPosition(async position => {
    const { latitude, longitude } = position.coords;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod === 200) {
        displayWeather(data);
      } else {
        document.getElementById("weather-output").innerText = "Weather data not found for your location.";
      }
    } catch (error) {
      document.getElementById("weather-output").innerText = "Failed



function showPrice() {
  const crop = document.getElementById("crop").value;
  document.getElementById("price-output").innerText = `${crop} average market price: ${cropPrices[crop] || "Data not available"}`;
}

