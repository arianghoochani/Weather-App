import React, { useState } from "react";
import { AppNavBar, setItemActive } from "baseui/app-nav-bar";

export default function NavBar() {
  // State for active menu items
  const [mainItems, setMainItems] = useState([
    { label: "Weather Dashboard", active: true },
    { label: "Search by City", active: false },
    { label: "Add Weather Info", active: false },
    { label: "Edit Weather Info", active: false },
    { label: "Remove Weather Info", active: false },
  ]);

  // Function to set active item
  const handleMainItemSelect = (item) => {
    setMainItems((prev) => setItemActive(prev, item));
  };

  return (
    <AppNavBar
      title="Weather Information Service"
      mainItems={mainItems}
      onMainItemSelect={handleMainItemSelect}
      overrides={{
        Root: { style: { borderBottom: "1px solid #E2E2E2", backgroundColor: "#fff" } },
      }}
    />
  );
}
