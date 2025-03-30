import './addlevel.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdditionLevel from './AdditionLevel';
import Register from './RegisterUser';

function App() {
  return (  
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/addition" element={<AdditionLevel />} />
      </Routes>
    </Router>
    
  );
}

export default App;

