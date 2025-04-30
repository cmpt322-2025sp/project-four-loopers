// TeacherDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student data from your backend
    axios.get('http://localhost:8000/get_user_data/')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
      <div className="dashboard">
        <h1 className="dashboard-header">Teacher Dashboard</h1>
        </div>
  );
};

export default TeacherDashboard;
