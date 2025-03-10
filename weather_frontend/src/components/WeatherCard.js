import React from "react";
import { Card, StyledBody } from "baseui/card";
import { styled } from "baseui";

const WeatherContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "16px",
  padding: "20px",
});

export default function WeatherCard({ city, temperature, humidity, windSpeed }) {
  return (
    <Card
      overrides={{
        Root: {
          style: {
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            textAlign: "center",
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
