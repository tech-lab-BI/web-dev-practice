const apiKey = "11415bfa3ae2cceeb9c5465f70a59804"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("API Response:", data);

    if (response.status !== 200) {
      document.getElementById("weather-result").innerHTML = `Error: ${data.message || "Internal Error"}`;
      return;
    }

    document.getElementById("weather-result").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡 Temperature: ${data.main.temp} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
      <p>☁ Condition: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("weather-result").innerHTML = "Error fetching data!";
  }
}