// TeacherDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student data from your backend
    axios.get('http://localhost:8000/get_student_stats/')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
      <div className="dashboard">
        <h1>Teacher Dashboard</h1>
        <div className="student-list">
          {students.map(student => (
            <div key={student.id} className="student-card">
              <h2>{student.name}</h2>
              <p>Score: {student.score}</p>
              <p>Progress: {student.progress}</p>
              <p>Last Active: {student.last_active}</p>
            </div>
          ))}
        </div>
      </div>


  );
};

export default TeacherDashboard;
