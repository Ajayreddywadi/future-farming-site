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

// On page load, auto-detect weather
window.onload = getWeatherByLocation;

async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) return alert("Please enter a city name");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === 200) {
    displayWeather(data);
  } else {
    document.getElementById("weather-output").innerText = "City not found.";
  }
}

function getWeatherByLocation() {
  navigator.geolocation.getCurrentPosition(async position => {
    const { latitude, longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === 200) {
      displayWeather(data);
    }
  });
}

function displayWeather(data) {
  const temp = data.main.temp;
  const condition = data.weather[0].description;
  const icon = data.weather[0].icon;
  const city = data.name;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  document.getElementById("weather-output").innerHTML = `
    <h3>${city}</h3>
    <img src="${iconUrl}" alt="Weather Icon">
    <p><strong>Temperature:</strong> ${temp}°C</p>
    <p><strong>Condition:</strong> ${condition}</p>
    <p><strong>Recommended Crop:</strong> ${recommendCrop(temp, condition)}</p>
  `;
}

function recommendCrop(temp, condition) {
  if (condition.includes("rain")) return "Rice or Sugarcane";
  if (temp < 15) return "Wheat or Barley";
  else if (temp < 30) return "Maize or Pulses";
  else return "Cotton or Millet";
}

function showCrops() {
  const season = document.getElementById("season").value;
  const cropList = crops[season].join(", ");
  document.getElementById("crop-output").innerText = `Best crops for ${season}: ${cropList}`;
}

function showSoil() {
  const soil = document.getElementById("soil-type").value;
  document.getElementById("soil-output").innerText = soilInfo[soil];
}

function showPrice() {
  const crop = document.getElementById("crop").value;
  document.getElementById("price-output").innerText = `${crop} average market price: ${cropPrices[crop] || "Data not available"}`;
}

