import './addlevel.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdditionLevel from './AdditionLevel';
import Register from './RegisterUser';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';

function App() {
  return (  
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/addition" element={<AdditionLevel />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;

