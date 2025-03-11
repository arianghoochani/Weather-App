import React , { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppNavBar } from "baseui/app-nav-bar";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Home");
  const navigate = useNavigate();
  const mainItems = [
    { label: "Home" },
    { label: "Search Weather Info" },
    { label: "Add Weather Info" },
    { label: "Update Weather Info" },
    { label: "Delete Weather Info" },
  ];

  return (
    <AppNavBar

      title="Weather Information"
      mainItems={mainItems}
      // onMainItemSelect={(item) => setActiveItem(item.label)}
      // onMainItemSelect={(item) => {
        onMainItemSelect={(item) => {
          setActiveItem(item.label);
          if (item.label === "Home") {
            navigate("/"); 
          }
          else if (item.label === "Add Weather Info") {
            navigate("/add-weather"); 
          }
        }}
    />
  );
}