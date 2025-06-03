// script.js

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

const apiKey = "78de4c1eeb9e461929f017626c2543ff"; // Replace with real API key

async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) return alert("Please enter a city name");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === 200) {
    const temp = data.main.temp;
    document.getElementById("weather-output").innerHTML = `
      <p>Temperature: ${temp}°C</p>
      <p>Condition: ${data.weather[0].description}</p>
      <p>Recommended Crop: ${recommendCrop(temp)}</p>
    `;
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
      const temp = data.main.temp;
      document.getElementById("weather-output").innerHTML = `
        <p>Location: ${data.name}</p>
        <p>Temperature: ${temp}°C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Recommended Crop: ${recommendCrop(temp)}</p>
      `;
    }
  });
}

function recommendCrop(temp) {
  if (temp < 15) return "Wheat or Barley";
  else if (temp < 30) return "Rice or Maize";
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
  document.getElementById("price-output").innerText = `${crop} average market price: ${cropPrices[crop]}`;
}

