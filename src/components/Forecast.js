import React from "react";

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function Forecast({ data }) {
  const daily = data.filter((_, i) => i % 8 === 0).slice(0, 5);

  return (
    <div className="fc-root">
      <p className="section-label">5-Day Forecast</p>
      <div className="fc-grid">
        {daily.map((item, i) => {
          const d = new Date(item.dt_txt);
          const label = i === 0 ? "Today" : DAYS[d.getDay()];
          return (
            <div className={`fc-chip${i === 0 ? " today" : ""}`} key={i}>
              <span className="fc-day">{label}</span>
              <img
                className="fc-icon"
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />
              <span className="fc-temp">{Math.round(item.main.temp)}°</span>
              <div className="fc-hi-lo">
                <span className="fc-hi">↑{Math.round(item.main.temp_max)}°</span>
              </div>
              <span className="fc-desc">{item.weather[0].description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;