const navLinks = document.querySelectorAll('.nav-link')

console.log(navLinks);

navLinks.forEach(link => {
  let linkUrl = link.getAttribute('href')
  console.log(linkUrl);
  if (window.location.pathname === linkUrl) {
    link.classList.add('active')
  }
})
async function getWeather() {
  setTimeout(async () => {
    const response = await fetch('https://get.geojs.io/v1/ip/geo.json')
    const data = await response.json()
    const { latitude, longitude, city } = data
    console.log(latitude, longitude)
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    )
    const weatherData = await weatherRes.json()
    const { current_weather } = weatherData
    const { temperature, windspeed, weathercode } = current_weather
    const weatherDescription = getWeatherCode(weathercode)
    document.getElementById(
      'currentWeatherInfo'
    ).innerText = `City: ${city} 🌈\nTemperature: ${temperature}°C\nWind Speed: ${windspeed} m/s\n${weatherDescription}`
    // Remove loader when weather information is retrieved
    document.querySelector('.loader_current').style.display = 'none'
  }, 1000)
}

getWeather()

function getWeatherCode(code) {
  switch (code) {
    case 0:
      return 'Clear sky'
    case 1:
    case 2:
    case 3:
      return 'Mainly clear, partly cloudy, and overcast'
    case 45:
    case 48:
      return 'Fog and depositing rime fog'
    case 51:
    case 53:
    case 55:
      return 'Drizzle: Light, moderate, and dense intensity'
    case 56:
    case 57:
      return 'Freezing Drizzle: Light and dense intensity'
    case 61:
    case 63:
    case 65:
      return 'Rain: Slight, moderate, and heavy intensity'
    case 66:
    case 67:
      return 'Freezing Rain: Light and heavy intensity'
    case 71:
    case 73:
    case 75:
      return 'Snow fall: Slight, moderate, and heavy intensity'
    case 77:
      return 'Snow grains'
    case 80:
    case 81:
    case 82:
      return 'Rain showers: Slight, moderate, and violent'
    case 85:
    case 86:
      return 'Snow showers slight and heavy'
    case 95:
      return 'Thunderstorm: Slight or moderate'
    case 96:
    case 99:
      return 'Thunderstorm with slight and heavy hail'
    default:
      return 'Unknown'
  }
}
