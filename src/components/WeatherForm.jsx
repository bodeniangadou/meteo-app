import React, { useState } from "react";

function WeatherForm({ fetchWeather }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
    setCity("");
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
}

export default WeatherForm;
