import React from "react";
import { Scenario as CardDefault } from "../card.scenario"; // Import tested Base Web Card

export default function WeatherCard({ city, temperature, humidity, windSpeed }) {
  return (
    <CardDefault>
      <h3>{city}</h3>
      <p>🌡️ Temperature: {temperature}°C</p>
      <p>💧 Humidity: {humidity}%</p>
      <p>💨 Wind Speed: {windSpeed} km/h</p>
    </CardDefault>
  );
}
