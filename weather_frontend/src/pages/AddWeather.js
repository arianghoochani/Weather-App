import React from "react";
import Navbar from "../components/Navbar"; 

export default function AddWeather() {
  return (
    <div>
      <Navbar />
      console.log("✅ AddWeather Loaded");

      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Add New Weather Page
      </h2>
    </div>
  );
}
