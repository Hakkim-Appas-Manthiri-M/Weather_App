import React from "react";

const COMPASS = ["N","NE","E","SE","S","SW","W","NW"];
const windDir = (deg) => COMPASS[Math.round(deg / 45) % 8];

function WeatherCard({ data }) {
  const icon    = data.weather[0].icon;
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const sunset  = new Date(data.sys.sunset  * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="wc-root">

      {/* City */}
      <div className="wc-location">
        <h2 className="wc-city">{data.name}</h2>
        <span className="wc-country-badge">{data.sys.country}</span>
      </div>

      {/* Hero */}
      <div className="wc-hero">
        <img
          className="wc-icon"
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={data.weather[0].description}
        />
        <div className="wc-temp">
          {Math.round(data.main.temp)}<sup>°C</sup>
        </div>
        <div className="wc-feels">Feels like {Math.round(data.main.feels_like)}°C</div>
        <div className="wc-condition">{data.weather[0].description}</div>
      </div>

      {/* Stats */}
      <div className="wc-stats">
        <div className="wc-stat">
          <span className="wc-stat-icon">💧</span>
          <span className="wc-stat-value">{data.main.humidity}<small>%</small></span>
          <span className="wc-stat-label">Humidity</span>
        </div>
        <div className="wc-stat">
          <span className="wc-stat-icon">🌬</span>
          <span className="wc-stat-value">{data.wind.speed}<small> m/s</small></span>
          <span className="wc-stat-label">{windDir(data.wind.deg)} Wind</span>
        </div>
        <div className="wc-stat">
          <span className="wc-stat-icon">👁</span>
          <span className="wc-stat-value">{(data.visibility / 1000).toFixed(1)}<small>km</small></span>
          <span className="wc-stat-label">Visibility</span>
        </div>
      </div>

      {/* Extra stats */}
      <div className="wc-stats">
        <div className="wc-stat">
          <span className="wc-stat-icon">🌡</span>
          <span className="wc-stat-value">{data.main.temp_max !== undefined ? Math.round(data.main.temp_max) : "—"}<small>°</small></span>
          <span className="wc-stat-label">High</span>
        </div>
        <div className="wc-stat">
          <span className="wc-stat-icon">❄️</span>
          <span className="wc-stat-value">{data.main.temp_min !== undefined ? Math.round(data.main.temp_min) : "—"}<small>°</small></span>
          <span className="wc-stat-label">Low</span>
        </div>
        <div className="wc-stat">
          <span className="wc-stat-icon">📊</span>
          <span className="wc-stat-value">{data.main.pressure}<small>hPa</small></span>
          <span className="wc-stat-label">Pressure</span>
        </div>
      </div>

      {/* Sunrise / Sunset */}
      <div className="wc-sun-row">
        <div className="wc-sun-box">
          <span className="wc-sun-emoji">🌅</span>
          <div>
            <div className="wc-sun-label">Sunrise</div>
            <div className="wc-sun-time">{sunrise}</div>
          </div>
        </div>
        <div className="wc-sun-box">
          <span className="wc-sun-emoji">🌇</span>
          <div>
            <div className="wc-sun-label">Sunset</div>
            <div className="wc-sun-time">{sunset}</div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default WeatherCard;