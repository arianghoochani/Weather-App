import React from "react";
import { AppNavBar } from "baseui/app-nav-bar";

export default function Navbar() {
  const mainItems = [
    { label: "Home" },
    { label: "About" },
    { label: "Contact" },
  ];

  return (
    <AppNavBar
      title="MyApp"
      mainItems={mainItems}
      onMainItemSelect={(item) => alert(`Navigating to: ${item.label}`)}
    />
  );
}