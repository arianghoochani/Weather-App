import React from "react";
import { styled } from "baseui";

const WeatherBox = styled("div", {
  width: "300px",
  margin: "10px auto",
  textAlign: "center",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
});

export default function WeatherCard({ city, temperature, humidity, windSpeed }) {
  return (
    <WeatherBox>
      <h3>{city}</h3>
      <p>🌡️ Temperature: {temperature}°C</p>
      <p>💧 Humidity: {humidity}%</p>
      <p>💨 Wind Speed: {windspeed} km/h</p>
    </WeatherBox>
  );
}
