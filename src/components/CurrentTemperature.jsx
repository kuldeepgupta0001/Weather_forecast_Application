import React from "react";

const CurrentTemperature = ({ temp, unit }) => {
  return (
    <div className="text-4xl font-semibold text-blue-600">
      {temp}°{unit}
    </div>
  );
};

export default CurrentTemperature;
