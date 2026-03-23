function WeatherCard({ data }) {
  return (
    <div className="weather-card text-center">
      <h2>{data.name}</h2>

      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather"
      />

      <h3>{data.main.temp}°C</h3>
      <p>{data.weather[0].description}</p>

      <div className="d-flex justify-content-around mt-3">
        <div>💧 {data.main.humidity}%</div>
        <div>🌬 {data.wind.speed} m/s</div>
      </div>
    </div>
  );
}

export default WeatherCard;