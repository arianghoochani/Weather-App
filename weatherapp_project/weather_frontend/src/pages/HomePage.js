import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import WeatherCard from "../components/WeatherCard";
import { Button } from "baseui/button";
import { styled } from "baseui";
import endpoints from '../store/endpoints.json';

// Styled container for weather cards
const WeatherContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)", // Ensures 3 cards per row
  gap: "16px",
  padding: "20px",
  justifyContent: "center",
});

export default function HomePage() {
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = `${endpoints.weather_service}`;
    axios
      .get(API_URL)
      .then((response) => {
        if (response.data.status === "1" && response.data.weathers.length > 0) {
          setCitiesWeather(response.data.weathers);
        } else {
          setCitiesWeather([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ API Error:", error);
        setError("Failed to fetch weather data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading weather data...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div>
      <Navbar />
      <WeatherContainer>
        {citiesWeather.map((data, index) => (
          <WeatherCard key={index} {...data} />
        ))}
      </WeatherContainer>
    </div>
  );
}
