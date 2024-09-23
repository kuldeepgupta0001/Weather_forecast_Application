import React from "react";
import WeatherIcon from "./WeatherIcon";

const ForecastCard = ({ day, tempHigh, tempLow, icon, unit }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-center">
      <h2 className="text-lg font-medium">{day}</h2>
      <WeatherIcon icon={icon} />
      <p className="text-sm text-black">
        High: {tempHigh}°{unit}
      </p>
      <p className="text-sm text-black">
        Low: {tempLow}°{unit}
      </p>
    </div>
  );
};

export default ForecastCard;
