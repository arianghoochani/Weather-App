import React from "react";
import { Card } from "baseui/card";
import { styled } from "baseui";

// Styled wrapper for consistent card size
const CardContainer = styled("div", {
  width: "280px",
  margin: "10px",
  textAlign: "center",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  backgroundColor: "#fff",
});

export default function WeatherCard({ city, temperature, humidity, windSpeed }) {
  return (
    <Card>
      <CardContainer>
        <h3>{city}</h3>
        <p>🌡️ Temperature: {temperature}°C</p>
        <p>💧 Humidity: {humidity}%</p>
        <p>💨 Wind Speed: {windSpeed} km/h</p>
      </CardContainer>
    </Card>
  );
}
