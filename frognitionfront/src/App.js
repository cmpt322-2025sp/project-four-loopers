import './addlevel.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdditionLevel from './AdditionLevel';
import Register from './RegisterUser';
import Dashboard from './Dashboard';

function App() {
  return (  
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/addition" element={<AdditionLevel />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    
  );
}

export default App;

