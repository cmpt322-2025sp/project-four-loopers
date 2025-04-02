// App.js
import './addlevel.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdditionLevel from './AdditionLevel';
import StarScreenPage from './StarScreenPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdditionLevel />} />
                <Route path="/star-screen" element={<StarScreenPage />} />
            </Routes>
        </Router>
    );
}

export default App;
