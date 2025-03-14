import React, { useState } from "react";
import Navbar from "../components/Navbar";
import WeatherCard from "../components/WeatherCard";
import DeleteWeather from "../components/DeleteWeather"; 
import UpdateWeather from "../components/UpdateWeather";

import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { styled } from "baseui";
import axios from "axios";
import endpoints from '../store/endpoints.json';

// Styled components
const Container = styled("div", {
  width: "400px",
  margin: "20px auto",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

const MessageBox = styled("div", (props) => ({
  width: "400px",
  margin: "10px auto",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
  color: "#fff",
  backgroundColor: props.$error ? "red" : "green",
}));

export default function SearchWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setMessage("❌ Please enter a city name.");
      setError(true);
      setWeather(null);
      return;
    }

    if (!city.match(/^[A-Za-z\s]+$/)) {
      setMessage("❌ City name must contain only letters.");
      setError(true);
      setWeather(null);
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(false);

    try {
      const response = await axios.get(`${endpoints.weather_service}${city.trim()}`);
      
      if (response.data.status === 1) {
        setWeather(response.data.weather);
        setMessage(null);
      } else {
        setWeather(null);
        setMessage("❌ City not found.");
        setError(true);
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      setWeather(null);
      setMessage("❌ City not found.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSuccess = () => {
    setWeather(null);
    setMessage("✅ Weather info deleted successfully!");
    setError(false);
  };
  const handleUpdateSuccess = (updatedWeather) => {
    setWeather(updatedWeather);
    setMessage("✅ Weather info updated successfully!");
    setError(false);
  };

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Search Weather</h2>

   
      {message && <MessageBox $error={error}>{message}</MessageBox>}

      {/* Search Form */}
      <Container>
        <Input
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </Container>

      {weather && (
        <div style={{ textAlign: "center" }}>
          <WeatherCard
            city={weather.city}
            temperature={weather.temperature}
            humidity={weather.humidity}
            windspeed={weather.windspeed}
          />
          <DeleteWeather city={weather.city} onDeleteSuccess={handleDeleteSuccess} />
          <UpdateWeather 
            city={weather.city} 
            temperature={weather.temperature} 
            humidity={weather.humidity} 
            windspeed={weather.windspeed} 
            onUpdateSuccess={handleUpdateSuccess} 
          />
        </div>
      )}
    </div>
  );
}



