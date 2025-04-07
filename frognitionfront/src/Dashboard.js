// TeacherDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student data from your backend
    axios.get('http://localhost:8000/api/students/')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Teacher Dashboard</h2>

      <table className="students-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Current Level</th>
            <th>Score</th>
            <th>Last Played</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.username}</td>
              <td>{student.current_level}</td>
              <td>{student.score}</td>
              <td>{student.last_played}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherDashboard;
