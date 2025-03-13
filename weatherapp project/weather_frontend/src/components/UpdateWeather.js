import React, { useState } from "react";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { styled } from "baseui";
import axios from "axios";

// Styled components
const FormContainer = styled("div", {
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
  backgroundColor: props.$success ? "green" : "red",
}));

export default function UpdateWeather({ city, temperature, humidity, windspeed, onUpdateSuccess }) {
  const [newTemperature, setNewTemperature] = useState(temperature);
  const [newHumidity, setNewHumidity] = useState(humidity);
  const [newWindspeed, setNewWindspeed] = useState(windspeed);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!window.confirm(`Are you sure you want to update weather info for ${city}?`)) {
      return;
    }

    setLoading(true);
    setMessage(null);

    const requestBody = {
      city,
      temperature: Number(newTemperature),
      humidity: Number(newHumidity),
      windspeed: Number(newWindspeed),
    };

    try {
      const response = await axios.put(`http://116.203.184.212:5000/api/weather/${city}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // ✅ Required for CORS
      });

      if (response.data.status === 1) {
        setSuccess(true);
        setMessage(`✅ Weather data for ${city} updated successfully!`);
        onUpdateSuccess(response.data.updated_weather); // Update UI
      } else {
        setSuccess(false);
        setMessage("❌ Failed to update the weather data.");
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      setSuccess(false);
      setMessage("❌ Failed to update the weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {message && <MessageBox $success={success}>{message}</MessageBox>}
      <FormContainer>
        <Input
          type="number"
          placeholder="Temperature (°C)"
          value={newTemperature}
          onChange={(e) => setNewTemperature(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Humidity (%)"
          value={newHumidity}
          onChange={(e) => setNewHumidity(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Wind Speed (km/h)"
          value={newWindspeed}
          onChange={(e) => setNewWindspeed(e.target.value)}
        />
        <Button onClick={handleUpdate} disabled={loading}>
          {loading ? "Updating..." : "Update Weather Info"}
        </Button>
      </FormContainer>
    </div>
  );
}
