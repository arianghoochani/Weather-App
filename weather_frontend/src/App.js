import React from "react";
import Navbar from "./components/Navbar"; // Import Navbar
import WeatherCard from "./components/WeatherCard"; // Import WeatherCard
import { Button } from "baseui/button";
import { styled } from "baseui";

// Styled container for weather cards
const WeatherContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "16px",
  padding: "20px",
});

export default function App() {
  // Sample weather data before API integration
  const citiesWeather = [
    { city: "New York", temperature: 22, humidity: 65, windSpeed: 12 },
    { city: "London", temperature: 18, humidity: 72, windSpeed: 8 },
    { city: "Tokyo", temperature: 25, humidity: 60, windSpeed: 10 },
    { city: "Sydney", temperature: 28, humidity: 55, windSpeed: 15 },
  ];

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Button onClick={() => alert("Hello Base Web!")}>Click Me</Button>
      </div>

      {/* Weather Cards Section */}
      <WeatherContainer>
        {citiesWeather.map((data, index) => (
          <WeatherCard key={index} {...data} />
        ))}
      </WeatherContainer>
    </div>
  );
}