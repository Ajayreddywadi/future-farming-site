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

const apiKey = "78de4c1eeb9e461929f017626c2543ff"; // Your API Key

// DOM Elements
const btnCityWeather = document.getElementById("btn-city-weather");
const btnLocationWeather = document.getElementById("btn-location-weather");
const btnShowCrops = document.getElementById("btn-show-crops");
const btnShowSoil = document.getElementById("btn-show-soil");
const btnShowPrice = document.getElementById("btn-show-price");
const darkModeToggle = document.getElementById("dark-mode-toggle");

btnCityWeather.addEventListener("click", getWeather);
btnLocationWeather.addEventListener("click", getWeatherByLocation);
btnShowCrops.addEventListener("click", showCrops);
btnShowSoil.addEventListener("click", showSoil);
btnShowPrice.addEventListener("click", showPrice);
darkModeToggle.addEventListener("click", toggleDarkMode);

// On page load, auto-detect weather by location
window.onload = getWeatherByLocation;

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) return alert("Please enter a city name");

  setLoading(true, "weather");
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    displayWeather(data, false);
  } catch (error) {
    console.error(error);
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
      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      displayWeather(data, true);
    } catch (error) {
      console.error(error);
      document.getElementById("weather-output").innerText = "Failed to fetch weather data.";
    } finally {
      setLoading(false, "weather");
    }
  }, error => {
    setLoading(false, "weather");
    if (error.code === error.PERMISSION_DENIED) {
      document.getElementById("weather-output").innerText = "Permission denied. Please enter city manually.";
    } else {
      document.getElementById("weather-output").innerText = "Unable to get your location.";
    }
  });
}

function displayWeather(data, fromLocation = false) {
  const temp = data.main.temp;
  const condition = data.weather[0].main;
  const city = data.name;
  const country = data.sys.country;

  const cropRecommendation = recommendCrop(temp, condition);

  document.getElementById("weather-output").innerHTML = `
    <h3>${fromLocation ? "Your Current Location:" : "Weather in"} ${city}, ${country}:</h3>
    <p>Temperature: ${temp} °C</p>
    <p>Condition: ${condition}</p>
    <p><strong>Recommended Crop: ${cropRecommendation}</strong></p>
  `;
}

function recommendCrop(temp, condition) {
  const cond = condition.toLowerCase();
  if (cond.includes("rain") || cond.includes("drizzle") || cond.includes("thunderstorm")) return "Rice or Sugarcane";
  if (temp < 15) return "Wheat or Barley";
  if (temp <= 25) return "Maize or Pulses";
  return "Cotton or Millet";
}

function showCrops() {
  const season = document.getElementById("season").value;
  const cropsList = crops[season];

  document.getElementById("crop-output").innerText =
    cropsList && cropsList.length > 0
      ? `Recommended crops for ${season}: ${cropsList.join(", ")}`
      : "No crop data available for selected season.";
}

function showSoil() {
  const soil = document.getElementById("soil-type").value;
  document.getElementById("soil-output").innerText = soilInfo[soil] || "Soil info not available.";
}

function showPrice() {
  const crop = document.getElementById("crop").value;
  const price = cropPrices[crop];
  document.getElementById("price-output").innerText = price ? `${crop} average market price: ${price}` : "Price data not available.";
}

function setLoading(isLoading, section) {
  const outputIdMap = {
    weather: "weather-output",
    crop: "crop-output",
    soil: "soil-output",
    price: "price-output"
  };

  const outputId = outputIdMap[section];
  if (!outputId) return;

  if (isLoading) {
    document.getElementById(outputId).innerText = "Loading...";
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}


