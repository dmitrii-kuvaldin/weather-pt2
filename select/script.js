const navLinks = document.querySelectorAll('.nav-link')

navLinks.forEach(link => {
  let linkUrl = link.getAttribute('href')
  console.log(linkUrl)
  if (window.location.pathname === linkUrl) {
    link.classList.add('active')
  }
})

async function getWeatherNew() {
  setTimeout(async () => {
    const cities = [
      {
        city: 'London',
        latitude: 51.5074,
        longitude: -0.1278,
        description:
          "London is the capital and largest city of England and the United Kingdom. It is one of the world's leading financial centers and has a diverse range of people and cultures."
      },
      {
        city: 'Paris',
        latitude: 48.8566,
        longitude: 2.3522,
        description:
          'Paris is the capital and most populous city of France. It is known for its fashion, art, cuisine, and landmarks such as the Eiffel Tower and the Louvre.'
      },
      {
        city: 'Berlin',
        latitude: 52.52,
        longitude: 13.405,
        description:
          'Berlin is the capital and largest city of Germany. It is known for its historical significance, cultural attractions, and vibrant nightlife.'
      },
      {
        city: 'Madrid',
        latitude: 40.4168,
        longitude: -3.7038,
        description:
          'Madrid is the capital and largest city of Spain. It is known for its rich cultural heritage, stunning architecture, and lively atmosphere.'
      },
      {
        city: 'Rome',
        latitude: 41.9028,
        longitude: 12.4964,
        description:
          'Rome is the capital and largest city of Italy. It is famous for its ancient history, art, architecture, and landmarks such as the Colosseum and Vatican City.'
      },
      {
        city: 'Athens',
        latitude: 37.9838,
        longitude: 23.7275,
        description:
          'Athens is the capital and largest city of Greece. It is often referred to as the cradle of Western civilization and is known for its historical significance and ancient monuments.'
      },
      {
        city: 'Amsterdam',
        latitude: 52.3676,
        longitude: 4.9041,
        description:
          'Amsterdam is the capital and largest city of the Netherlands. It is known for its picturesque canals, historic buildings, and vibrant cultural scene.'
      },
      {
        city: 'Vienna',
        latitude: 48.2082,
        longitude: 16.3738,
        description:
          'Vienna is the capital and largest city of Austria. It is known for its imperial palaces, cultural events, classical music, and coffee house culture.'
      }
    ]

    // Loop through each city
    for (const cityData of cities) {
      const { city, latitude, longitude } = cityData

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      )
      const weatherData = await weatherRes.json()
      const { current_weather } = weatherData
      const { temperature, windspeed, weathercode } = current_weather
      const weatherDescription = getWeatherCode(weathercode)

      // Create a card for each city
      const card = document.createElement('div')
      card.classList.add('weather-card')
      card.innerHTML = `
        <h2>${city}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Wind Speed: ${windspeed} m/s</p>
        <p>${weatherDescription}</p>
      `

      // Append card to grid layout
      document.getElementById('weatherGrid').appendChild(card)
    }

    // Remove loader when weather information is retrieved
    document.querySelector('.loader_current').style.display = 'none'
  }, 1000)
}

// getWeatherNew()

document
  .getElementById('cityForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault()
    const citySelect = document.getElementById('citySelect')
    const selectedValue = citySelect.value
    const weatherInfo = document.getElementById('weatherInfo')
    const loader = document.querySelector('.loader')

    weatherInfo.innerText = ''
    if (selectedValue) {
      loader.style.display = 'block'
      setTimeout(async () => {
        const [latitude, longitude, city] = selectedValue.split(',')
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        )
        const data = await response.json()
        const { current_weather } = data
        const { temperature, windspeed, weathercode } = current_weather
        console.log('weathercode', weathercode)
        const weatherDescription = getWeatherCode(weathercode)
        weatherInfo.innerText = `City: ${city}\nTemperature: ${temperature}°C\nWind Speed: ${windspeed} m/s\nWeather: ${weatherDescription} 🌈`

        loader.style.display = 'none'
      }, 1000)
    } else {
      alert('Please select a city.')
    }
  })

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
