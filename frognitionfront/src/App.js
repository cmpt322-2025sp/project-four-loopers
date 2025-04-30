import './addlevel.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import Provider
import store from './store';  // Import your store file
import AdditionLevel from './AdditionLevel';
import Register from './RegisterUser';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';
import SubtractionLevel from './subtraction/SubtractionLevel';
import StarScreenPage from './star/StarScreenPage';
import PlaceValueLevel from './placevalue/PlacevalueLevel';
import GoldsumMap from "./map/GoldsumMap";

function App() {

  return (
      <Router>
        <NavListener />
        <Routes>
          <Route path="/star-screen" element={<StarScreenPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addition" element={<AdditionLevel />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subtraction" element={<SubtractionLevel />} />
          <Route path="/map" element={<LoginPage />} />
          <Route path="/placevalue" element={<PlaceValueLevel />} />
          <Route path="" element={<GoldsumMap />} />
        </Routes>
      </Router>
  );
}

function NavListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (event) => {
      const level = event.detail.levelType;
      if (level === "addition") {
        navigate("/addition");
      }
    };

    window.addEventListener("navigateToLevel", handler);
    return () => window.removeEventListener("navigateToLevel", handler);
  }, [navigate]);

  return null;
}

export default App;
