import React from "react";
import { Card } from "baseui/card";
import { StyledBody } from "baseui/card"; // Ensure this import

export default function WeatherCard({ city, temperature, humidity, windSpeed }) {
  return (
    <Card
      overrides={{
        Root: {
          style: {
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            textAlign: "center",
            padding: "20px",
            margin: "10px",
          },
        },
      }}
    >
      <StyledBody>
        <h3>{city}</h3>
        <p>🌡️ Temperature: {temperature}°C</p>
        <p>💧 Humidity: {humidity}%</p>
        <p>💨 Wind Speed: {windSpeed} km/h</p>
      </StyledBody>
    </Card>
  );
}
