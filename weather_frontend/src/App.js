import React, {useEffect,useState} from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import WeatherCard from "./components/WeatherCard"; 
import { Button } from "baseui/button";
import { styled } from "baseui";
import HomePage from "./pages/HomePage";  
import AddWeather from "./pages/AddWeather";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* ✅ Home Page */}
        <Route path="/add-weather" element={<AddWeather />} /> {/* ✅ Add Weather Page */}
      </Routes>
    </Router>
  );
}
// // Styled container for weather cards
// const WeatherContainer = styled("div", {
//   display: "grid",
//   // gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//   gridTemplateColumns: "repeat(3, 1fr)",
//   gap: "16px",
//   padding: "20px",
//   justifyContent: "center", 
// });
// function HomePage() {
//   const [citiesWeather, setCitiesWeather] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const API_URL = "http://116.203.184.212:5000/api/weather";
//     axios
//       .get(API_URL)
//       .then((response) => {
//         if (response.data.status === "1" && response.data.weathers.length > 0) {
//           setCitiesWeather(response.data.weathers);
//         } else {
//           setCitiesWeather([]);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("❌ API Error:", error);
//         setError("Failed to fetch weather data");
//         setLoading(false);
//       });
//   }, []);
//   if (loading) return <p style={{ textAlign: "center" }}>Loading weather data...</p>;
//   if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
//   return (
//     <div>
//       <Navbar />
//       <div style={{ padding: "20px", textAlign: "center" }}>
//         <Button onClick={() => alert("Hello Base Web!")}>Click Me</Button>
//       </div>
//       <WeatherContainer>
//         {citiesWeather.map((data, index) => (
//           <WeatherCard key={index} {...data} />
//         ))}
//       </WeatherContainer>
//     </div>
//   );
// }
// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} /> {/* ✅ Define Home Page Route */}
//       </Routes>
//     </Router>
//   );
// }


