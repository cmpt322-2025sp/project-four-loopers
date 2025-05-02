import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const StudentCard = ({ name, imgSrc, style }) => (
  <div style={{ position: 'absolute', ...style }}>
    <div style={{
      width: 256,
      height: 317,
      background: '#A2DD21',
      borderRadius: 23,
      position: 'absolute',
    }} />
    <img
      src={imgSrc}
      alt={name}
      style={{
        width: 253,
        height: 252,
        position: 'absolute',
        top: 5,
        left: 2,
      }}
    />
    <div style={{
      position: 'absolute',
      bottom: 10,
      left: 30,
      fontSize: 30,
      fontFamily: 'Krona One',
      fontWeight: 400,
      color: 'black',
    }}>
      {name}
    </div>
  </div>
);

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/get_student_stats/')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  // Example fallback data if API isn’t ready:
  const fallbackStudents = [
    { name: 'Emily', left: 134, top: 559 },
    { name: 'Carson', left: 1107, top: 557 },
    { name: 'Jacob', left: 461, top: 913 },
    { name: 'Caleb', left: 794, top: 911 },
    { name: 'Bella', left: 143, top: 913 },
    { name: 'Susan', left: 1101, top: 913 },
    { name: 'Jake', left: 471, top: 560 },
    { name: 'Ryan', left: 790, top: 558 },
  ];

  const studentData = students.length ? students : fallbackStudents;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'white', overflow: 'hidden' }}>
      <div style={{ width: '100%', height: 121, background: '#A2DD21', position: 'absolute', top: 0 }} />
      <div style={{ position: 'absolute', left: 21, top: 38, fontSize: 45, fontFamily: 'Krona One' }}>
        WELCOME BACK MORGAN
      </div>

      {/* Class Average Banner */}
      <div style={{
        width: 655,
        height: 134,
        left: 9,
        top: 133,
        position: 'absolute',
        background: '#FDE36C',
        borderRadius: 23,
        zIndex: 1
      }} />
      <div style={{
        width: 655,
        height: 134,
        left: 21,
        top: 142,
        position: 'absolute',
        background: '#FCC459',
        borderRadius: 23,
        zIndex: 2
      }} />
      <div style={{
        left: 40,
        top: 160,
        position: 'absolute',
        color: 'black',
        fontSize: 40,
        fontFamily: 'Krona One',
        fontWeight: 400,
        zIndex: 3
      }}>
        CLASS AVERAGE:
      </div>

      {/* Student Cards */}
      {studentData.map((student, index) => (
        <StudentCard
          key={index}
          name={student.name}
          imgSrc="https://placehold.co/253x252"
          style={{ left: student.left, top: student.top }}
        />
      ))}

      {/* Teacher Profile Pic */}
      <img
        src="https://placehold.co/199x199"
        alt="Teacher"
        style={{
          width: 199,
          height: 199,
          left: 1229,
          top: 10,
          position: 'absolute',
          boxShadow: '0px 4px 100px rgba(0, 0, 0, 0.25)'
        }}
      />
    </div>
  );
};

export default TeacherDashboard;
