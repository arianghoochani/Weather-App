import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Button } from "baseui/button";
import { Input } from "baseui/input"; // Import BaseUI Input
import { styled } from "baseui"; // Styling

// Styled container for the form
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

export default function AddWeather() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");

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
    if (isNaN(windSpeed) || windSpeed < 0 || windSpeed === "") {
      alert("Wind speed must be 0 or a positive number.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Weather info submitted!");
    }
  };

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Add New Weather Info
      </h2>
      <FormContainer>
        <Input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
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
          value={windSpeed}
          onChange={(e) => setWindSpeed(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </FormContainer>
    </div>
  );
}
