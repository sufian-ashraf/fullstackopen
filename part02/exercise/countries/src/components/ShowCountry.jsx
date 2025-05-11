import { useState, useEffect } from "react";
import axios from "axios";

const ShowCountry = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const capital = country.capital?.[0];

  useEffect(() => {
    if (!capital) {
      return;
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
      .then((response) => setWeather(response.data))
      .catch(() => console.log(`error fetching weather for ${capital}`));
  }, [capital, apiKey]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital?.[0] || "N/A"}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {country.languages &&
          Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
      </ul>
      <img
        src={country.flags?.png}
        alt={`Flag of ${country.name.common}`}
        style={{ width: "200px" }}
      />

      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>Temperature {weather.main.temp}</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default ShowCountry;
