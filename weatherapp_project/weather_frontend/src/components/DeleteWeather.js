import React, { useState } from "react";
import { Button } from "baseui/button";
import { styled } from "baseui";
import axios from "axios";
import endpoints from '../store/endpoints.json';

// Styled message box
const MessageBox = styled("div", (props) => ({
  width: "400px",
  margin: "10px auto",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
  color: "#fff",
  backgroundColor: props.$success ? "green" : "red",
}));

export default function DeleteWeather({ city, onDeleteSuccess }) {  
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete weather info for ${city}?`)) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
        const response = await axios.delete(`${endpoints.weather_service_with_slash}${city}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
      if (response.data.status === "1") {
        setSuccess(true);
        setMessage(`✅ Weather data for ${city} deleted successfully!`);
        onDeleteSuccess();  
      } else {
        setSuccess(false);
        setMessage("❌ Failed to delete the weather data.");
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      setSuccess(false);
      setMessage("❌ Failed to delete the weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {message && <MessageBox $success={success}>{message}</MessageBox>}
      <Button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete Weather Info"}
      </Button>
    </div>
  );
}
