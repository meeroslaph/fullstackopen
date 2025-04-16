import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

  useEffect(() => {
    const cityName = Array.isArray(city) ? city[0] : city;

    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: cityName,
          appid: apiKey,
          units: "metric",
        },
      })
      .then((response) => {
        setWeather(response.data);
      })
      .catch(() => {
        setWeather(null);
      });
  }, [city, apiKey]);

  if (!weather)
    return (
      <div>
        <h2>Weather in {city}</h2>
        <p>Loading...</p>
      </div>
    );

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <div>Temperature: {weather.main.temp} °C</div>
      <img src={iconUrl} />
      <div>Wind: {weather.wind.speed} m/s</div>
      <div>Condition: {weather.weather[0].description}</div>
    </div>
  );
};

export default Weather;
