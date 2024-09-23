import React, { useState, useEffect } from "react";
import CityName from "../components/CityName";
import CurrentTemperature from "../components/CurrentTemperature";
import WeatherCondition from "../components/WeatherCondition";
import WeatherIcon from "../components/WeatherIcon";
import ForecastCard from "../components/ForecastCard";
import { getWeatherData, getForecastData } from "../services/weatherAPI";

const WeatherApp = () => {
  const [city, setCity] = useState("Noida");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState("C");
  const [searchCity, setSearchCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      setError("");
      try {
        const weatherData = await getWeatherData(city);
        setWeather(weatherData);

        const forecastData = await getForecastData(city);

        const filteredForecast = forecastData.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        setForecast(filteredForecast.slice(0, 5));
      } catch (error) {
        setError("City not found. Please try another city.");
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeather();
  }, [city]);

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const convertTemp = (temp) => {
    return unit === "F" ? Math.round((temp * 9) / 5 + 32) : Math.round(temp);
  };

  const handleCityChange = (e) => {
    setSearchCity(e.target.value);
  };

  const handleSearch = () => {
    if (searchCity) {
      setCity(searchCity);
      setSearchCity("");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-green-100">
      <div className="flex flex-col items-center">
        <div className="my-4">
          <input
            type="text"
            value={searchCity}
            onChange={handleCityChange}
            placeholder="Enter city name"
            className="border p-2 rounded-md mr-2"
          />
          <button
            onClick={handleSearch}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        {weather && (
          <div className="text-center">
            <CityName name={weather.name} />
            <CurrentTemperature
              temp={convertTemp(weather.main.temp)}
              unit={unit}
            />
            <WeatherCondition condition={weather.weather[0].description} />
            <WeatherIcon icon={weather.weather[0].icon} />
          </div>
        )}

        <div className="my-4">
          <button
            onClick={toggleUnit}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Toggle to {unit === "C" ? "Fahrenheit" : "Celsius"}
          </button>
        </div>

        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="shadow-lg rounded-lg p-2 bg-gray-100 text-center"
              >
                <ForecastCard
                  day={new Date(day.dt_txt).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                  tempHigh={convertTemp(day.main.temp_max)}
                  tempLow={convertTemp(day.main.temp_min)}
                  unit={unit}
                  icon={day.weather[0].icon}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
