// Static Crop Data
const crops = {
  summer: ["Maize", "Millets", "Cotton"],
  winter: ["Wheat", "Barley", "Mustard"],
  monsoon: ["Rice", "Sugarcane", "Soybean"]
};

// Static Soil Info
const soilInfo = {
  clay: "Clay soil is good for rice and paddy.",
  sandy: "Sandy soil is suitable for peanuts and watermelon.",
  loamy: "Loamy soil is ideal for most crops like wheat and pulses."
};

// Weather API (Replace YOUR_API_KEY)
async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "YOUR_API_KEY"; // e.g., OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === 200) {
    document.getElementById("weather-output").innerHTML = `
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Condition: ${data.weather[0].description}</p>
    `;
  } else {
    document.getElementById("weather-output").innerText = "City not found.";
  }
}

// Show Crops
function showCrops() {
  const season = document.getElementById("season").value;
  const cropList = crops[season].join(", ");
  document.getElementById("crop-output").innerText = `Best crops for ${season}: ${cropList}`;
}

// Show Soil Info
function showSoil() {
  const soil = document.getElementById("soil-type").value;
  document.getElementById("soil-output").innerText = soilInfo[soil];
}

