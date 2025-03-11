import React from "react";
import Navbar from "./components/Navbar"; // Import the Navbar
import { Button } from "baseui/button";

export default function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Button onClick={() => alert("Hello Base Web!")}>Click Me</Button>
      </div>
    </div>
  );
}