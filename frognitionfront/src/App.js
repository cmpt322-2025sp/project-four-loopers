import './addlevel.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import Provider
import store from './store';  // Import your store file

import AdditionLevel from './AdditionLevel';
import Register from './RegisterUser';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';
import SubtractionLevel from './SubtractionLevel';
import StarScreenPage from './StarScreenPage';
import PlaceValueLevel from './PlacevalueLevel';

function App() {
  return (  
    <Provider store={store}> {/* Wrap your app with Provider */}
      <Router>
        <Routes>
          <Route path="/star-screen" element={<StarScreenPage />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/addition" element={<AdditionLevel />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<LoginPage />} /> {/* Updated path to "/" */}
          <Route path="/subtraction" element={<SubtractionLevel />} />
          <Route path="/placevalue" element={<PlaceValueLevel />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
