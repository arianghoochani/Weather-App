import React from "react";
import { Card } from "baseui/card";

export default function WeatherCard({ city, temperature, humidity, windSpeed }) {
  return (
    <Card
      title={city} // Ensure the title is correctly passed
      overrides={{
        Root: {
          style: {
            width: "300px",
            margin: "10px auto",
            textAlign: "center",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            backgroundColor: "#fff",
          },
        },
      }}
    >
      <div>
        <p>🌡️ Temperature: {temperature}°C</p>
        <p>💧 Humidity: {humidity}%</p>
        <p>💨 Wind Speed: {windSpeed} km/h</p>
      </div>
    </Card>
  );
}
