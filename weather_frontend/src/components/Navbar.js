import React , { useState } from "react";
import { AppNavBar } from "baseui/app-nav-bar";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Home");
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
      onMainItemSelect={(item) => setActiveItem(item.label)}
    />
  );
}