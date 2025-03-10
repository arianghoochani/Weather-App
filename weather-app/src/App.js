import React from "react";

import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      {/* Include Navbar at the top */}
      <NavBar />
      <h1>Welcome to the Weather Information Service</h1>
    </div>
  );
}

export default App;