import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)
  const { name, capital, area, languages, flags } = country

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${capital}&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }`
      )
      .then((res) => {
        console.log(res.data)
        setWeatherData(res.data)
      })
  }, [])

  return (
    <div>
      <h1>{name.common}</h1>
      <div>capital {capital}</div>
      <div>area {area}</div>

      <h3>Languages:</h3>
      <ul>
        {Object.entries(languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>

      <img src={flags.png} alt={flags.alt} />

      {weatherData && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <div>tempature: {weatherData.main.temp} &#x2103;</div>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="weather icon"
          />
          <div>wind {weatherData.wind.speed} m/s</div>
        </div>
      )}
    </div>
  )
}

export default Country
