function Forecast({ data }) {
  return (
    <div className="forecast-container">
      {data.slice(0, 8).map((item, index) => (
        <div key={index} className="forecast-item">
          <p>{new Date(item.dt_txt).getHours()}:00</p>

          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
            alt=""
          />

          <p>{item.main.temp}°C</p>
        </div>
      ))}
    </div>
  );
}

export default Forecast;