import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud,faTemperatureHalf, faWind} from '@fortawesome/free-solid-svg-icons';
// import {fatemperaturehalf} from '@fortawesome/free-solid-svg-icons'; 

const zipCode = 330414;
const apiKey = 'lJc9fU8CinZpVZUtjcGtN3UkSKQqs6HP';
const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${zipCode}?apikey=${apiKey}`;

async function getweather() {
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) {
      console.log("error");
    }
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log(error);
  }
}

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getweather()
      .then(data => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!weatherData) {
    return <div>No weather data available</div>;
  }

  return (
    <div>
      <h1>Weather Information <FontAwesomeIcon icon={faCloud} /></h1>
      <p>Temperature: {weatherData[0].Temperature.Metric.Value} °C <FontAwesomeIcon icon={faTemperatureHalf}></FontAwesomeIcon></p>
      <p>Weather: {weatherData[0].WeatherText}<FontAwesomeIcon icon={faWind}></FontAwesomeIcon></p>
      <p>Day/Night: {weatherData[0].IsDayTime ? 'Daytime' : 'Nighttime'}</p>
      
      <p>Has Precipitation: {weatherData[0].HasPrecipitation ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default WeatherComponent;
