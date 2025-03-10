import React from "react";
import { AppNavBar, setItemActive } from "baseui/app-nav-bar";
import { useState } from "react";

export default function NavBar() {
  const [mainItems, setMainItems] = useState([
    { label: "Weather Dashboard", active: true },
    { label: "Search by City", active: false },
    { label: "Add Weather Info", active: false },
    { label: "Edit Weather Info", active: false },
    { label: "Remove Weather Info", active: false },
  ]);

  const handleMainItemSelect = (item) => {
    setMainItems((prev) => setItemActive(prev, item));
  };

  return (
    <AppNavBar
      title="Weather Information Service"
      mainItems={mainItems}
      onMainItemSelect={handleMainItemSelect} 
    />
  );
}
