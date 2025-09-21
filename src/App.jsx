import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './app.css';

const BackgroundAnimation = () => {
  return (
    <div className="background-animation">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

const SearchBox = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Rechercher une ville..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit" className="search-button">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

const WeatherCard = ({ data }) => {
  return (
    <div className="weather-container">
      <h2 className="city-name">{data.name}, {data.sys.country}</h2>
      <p className="current-date">
        {new Date().toLocaleDateString('fr-FR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>
      
      <div className="weather-icon">
        <img 
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
          alt={data.weather[0].description} 
        />
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
};

const Loading = () => {
  return (
    <div className="loading">
      <i className="fas fa-spinner"></i>
      <p>Chargement des données météo...</p>
    </div>
  );
};

const ErrorMessage = ({ message }) => {
  return (
    <div className="error">
      <i className="fas fa-exclamation-triangle"></i>
      <p>{message}</p>
    </div>
  );
};

const InitialMessage = () => {
  return (
    <div className="initial-message">
      <i className="fas fa-cloud-sun"></i>
      <p>Recherchez une ville pour connaître sa météo</p>
    </div>
  );
};

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showInitial, setShowInitial] = useState(true);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setShowInitial(false);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eb37b6e0634117f1e0f0b8e24257002d&units=metric&lang=fr`
      );
      
      if (!response.ok) {
        throw new Error('Ville introuvable');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <BackgroundAnimation />
      <h1 className="app-title">Application de météo</h1>
      
      <SearchBox onSearch={fetchWeather} />
      
      {showInitial && <InitialMessage />}
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;