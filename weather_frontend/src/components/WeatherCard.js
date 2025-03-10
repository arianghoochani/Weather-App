import React from "react";
import { Card, StyledBody } from "baseui/card";

export default function WeatherCard({ city, temperature, humidity, windSpeed }) {
  return (
    <Card
      overrides={{
        Root: {
          style: {
            width: "280px",
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
      <StyledBody>
        <h3>{city}</h3>
        <p>🌡️ Temperature: {temperature}°C</p>
        <p>💧 Humidity: {humidity}%</p>
        <p>💨 Wind Speed: {windSpeed} km/h</p>
      </StyledBody>
    </Card>
  );
}
