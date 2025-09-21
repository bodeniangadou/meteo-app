import React from "react";

function WeatherDisplay({ data }) {
  return (
    <div className="weather-container">
      <h2 className="city-name">{data.name}, {data.sys.country}</h2>
      <p className="current-date">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      
      <div className="weather-icon">
        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description} />
      </div>

      <p className="temperature">{Math.round(data.main.temp)}</p>
      <p className="weather-description">{data.weather[0].description}</p>

      <div className="weather-details">
        <div className="detail">
          <i className="fas fa-temperature-high"></i>
          <span className="detail-label">Ressenti</span>
          <span className="detail-value">{Math.round(data.main.feels_like)}°C</span>
        </div>
        <div className="detail">
          <i className="fas fa-tint"></i>
          <span className="detail-label">Humidité</span>
          <span className="detail-value">{data.main.humidity}%</span>
        </div>
        <div className="detail">
          <i className="fas fa-wind"></i>
          <span className="detail-label">Vent</span>
          <span className="detail-value">{data.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
