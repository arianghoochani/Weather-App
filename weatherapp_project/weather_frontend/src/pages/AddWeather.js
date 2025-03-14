import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { styled } from "baseui";
import axios from "axios";
import endpoints from '../store/endpoints.json';

// Styled form container
const FormContainer = styled("div", {
  width: "350px",
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

// Styled message box
const MessageBox = styled("div", (props) => ({
  width: "350px",
  margin: "10px auto",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
  color: "#fff",
  backgroundColor: props.$success ? "green" : "red",
}));

// Styled weather card
const WeatherBox = styled("div", {
  width: "350px",
  margin: "10px auto",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  backgroundColor: "#f9f9f9",
  fontFamily: "Arial, sans-serif",
  textAlign: "center",
});

export default function AddWeather() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windspeed, setwindspeed] = useState("");

  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [newWeather, setNewWeather] = useState(null);

  // Validation function
  const validateForm = () => {
    if (!city.match(/^[A-Za-z\s]+$/)) {
      alert("City name must be alphabetic and not empty.");
      return false;
    }
    if (isNaN(temperature) || temperature === "") {
      alert("Temperature must be a number.");
      return false;
    }
    if (isNaN(humidity) || humidity < 0 || humidity > 99 || humidity === "") {
      alert("Humidity must be a number between 0 and 99.");
      return false;
    }
    if (isNaN(windspeed) || windspeed < 0 || windspeed === "") {
      alert("Wind speed must be 0 or a positive number.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const requestBody = {
      city,
      temperature: Number(temperature),
      humidity: Number(humidity),
      windspeed: Number(windspeed),
    };

    try {
      const response = await axios.post(`${endpoints.weather_service}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.status === "1") {
        setSuccess(true);
        setMessage("✅ Weather info added successfully!");
        setNewWeather(response.data.new_weather);
      } else {
        setSuccess(false);
        setMessage("❌ Failed to add the weather.");
        setNewWeather(null);
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      setSuccess(false);
      setMessage("❌ Failed to add the weather.");
    }
  };

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Add New Weather Info</h2>

      {/* Show success/failure message */}
      {message && <MessageBox $success={success}>{message}</MessageBox>}

      {/* Weather Input Form */}
      <FormContainer>
        <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <Input
          type="number"
          placeholder="Temperature (°C)"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Humidity (%)"
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Wind Speed (km/h)"
          value={windspeed}
          onChange={(e) => setwindspeed(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </FormContainer>

      {/* Show newly added weather info */}
      {newWeather && (
        <WeatherBox>
          <h3>{newWeather.city}</h3>
          <p>🌡️ Temperature: {newWeather.temperature}°C</p>
          <p>💧 Humidity: {newWeather.humidity}%</p>
          <p>💨 Wind Speed: {newWeather.windspeed} km/h</p>
        </WeatherBox>
      )}
    </div>
  );
}


