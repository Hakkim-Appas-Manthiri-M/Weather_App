import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import WeatherChart from "./components/WeatherChart";

const API_KEY = "e685d910cf3c5bc8813d8c9e2208b242";

function App() {
  const [city, setCity] = useState("Chennai");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);

      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      setWeather(weatherRes.data);
      setForecast(forecastRes.data.list);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Auto location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      setCity(res.data.name);
      fetchWeather(res.data.name);
    });
  }, []);

  return (
    <div className="app">
      <h1>🌦 Weather Dashboard</h1>

      <SearchBar setCity={setCity} fetchWeather={fetchWeather} />

      {loading && <p>Loading...</p>}

      {weather && (
        <>
          <WeatherCard data={weather} />
          <WeatherChart data={forecast} />
          <Forecast data={forecast} />
        </>
      )}
    </div>
  );
}

export default App;