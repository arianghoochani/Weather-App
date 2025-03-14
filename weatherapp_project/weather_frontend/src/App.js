import React, {useEffect,useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";  
import AddWeather from "./pages/AddWeather";
import SearchWeather from "./pages/SearchWeather"; 


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/add-weather" element={<AddWeather />} /> 
        <Route path="/search-weather" element={<SearchWeather />} /> 
      </Routes>
    </Router>
  );
}

