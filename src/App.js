import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import WeatherChart from "./components/WeatherChart";
import "./App.css";

const API_KEY = "e685d910cf3c5bc8813d8c9e2208b242";

function App() {
  const [city, setCity]         = useState("Chennai");
  const [weather, setWeather]   = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [time, setTime]         = useState(new Date());

  // Live clock tick
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const [wRes, fRes] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`),
      ]);
      setWeather(wRes.data);
      setForecast(fRes.data.list);
    } catch {
      setError("City not found — please check the spelling and try again.");
      setWeather(null);
      setForecast([]);
    }
    setLoading(false);
  };

  // Auto-detect location on mount
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          setCity(res.data.name);
          fetchWeather(res.data.name);
        } catch {
          fetchWeather("Chennai");
        }
      },
      () => fetchWeather("Chennai")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dateStr = `${DAYS[time.getDay()]}, ${time.getDate()} ${MONTHS[time.getMonth()]} ${time.getFullYear()}`;
  const timeStr = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div className="app-root">
      <div className="container">

        {/* ── Header ── */}
        <header className="app-header">
          <div className="brand">
            <div className="brand-icon">🌤</div>
            Skywatcher
          </div>
          <div className="live-clock">
            <div className="clock-time">{timeStr}</div>
            <div className="clock-date">{dateStr}</div>
          </div>
        </header>

        {/* ── Search ── */}
        <SearchBar setCity={setCity} fetchWeather={fetchWeather} />

        {/* ── Error ── */}
        {error && (
          <div className="error-banner">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <span>Fetching weather data…</span>
          </div>
        )}

        {/* ── Dashboard ── */}
        {!loading && weather && (
          <div className="dashboard-grid">

            {/* Left: main weather — spans 2 rows */}
            <div className="card main-weather-panel">
              <WeatherCard data={weather} />
            </div>

            {/* Right-top: temperature chart */}
            <div className="card">
              <WeatherChart data={forecast} />
            </div>

            {/* Right-bottom: 5-day forecast */}
            <div className="card">
              <Forecast data={forecast} />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;