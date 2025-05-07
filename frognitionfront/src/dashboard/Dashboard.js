import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import teacher from '../teacher.png';
import student0 from '../student.png';
import student1 from '../student(1).png';
import student2 from '../student(2).png';
import student3 from '../student(3).png';
import student4 from '../student(4).png';
import student5 from '../student(5).png';

const studentImages = [student0, student1, student2, student3, student4, student5];


const StudentCard = ({ student, imgSrc }) => {
  const {
    first_name,
    last_name,
    addition_avg_accuracy,
    subtraction_avg_accuracy,
    place_value_avg_accuracy,
    random_avg_accuracy,
    level_progress,
  } = student;

  return (
    <div style={{
      width: '256px',
      height: 'auto',
      background: '#A2DD21',
      borderRadius: '23px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px',
      margin: '10px',
      boxSizing: 'border-box'
    }}>
      <img
        src={imgSrc}
        alt={`${first_name} ${last_name}`}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '10px'
        }}
      />
      <div style={{
        marginTop: '10px',
        fontSize: '20px',
        fontFamily: '"Baloo 2", cursive',
        color: 'black',
        textAlign: 'center'
      }}>
        {first_name} {last_name}
      </div>

      <div style={{ marginTop: '10px', fontSize: '16px', color: 'black', textAlign: 'left' }}>
        <div><strong>Level:</strong> {level_progress}</div>
        <div><strong>Add:</strong> {addition_avg_accuracy * 100}%</div>
        <div><strong>Sub:</strong> {subtraction_avg_accuracy * 100}%</div>
        <div><strong>Place:</strong> {place_value_avg_accuracy * 100}%</div>
        <div><strong>Random:</strong> {random_avg_accuracy * 100}%</div>
      </div>
    </div>
  );
};



const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/get_student_stats/')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);


  const fallbackStudents = [

  ];

  const randomizeStudents = (studentsArray) =>
    studentsArray.map(student => ({
      ...student,
      imgSrc: studentImages[Math.floor(Math.random() * studentImages.length)]
    }));

  const studentData = randomizeStudents(students.length ? students : fallbackStudents);
  const ProgressBar = ({ label, value }) => {
    const getColor = (val) => {
      if (val >= 90) return '#4CAF50'; // Green
      if (val >= 70) return '#FFC107'; // Yellow
      return '#F44336'; // Red
    };
  
    return (
      <div style={{ marginBottom: '8px', width: '100%' }}>
        <div style={{
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: '4px'
        }}>{label}: {value}%</div>
        <div style={{
          background: '#e0e0e0',
          borderRadius: '8px',
          height: '10px',
          width: '100%'
        }}>
          <div style={{
            width: `${value}%`,
            background: getColor(value),
            height: '100%',
            borderRadius: '8px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    );
  };
  
  
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        height: '120px',
        background: '#A2DD21',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '30px',
          fontFamily: '"Baloo 2", cursive',
        }}>
          WELCOME BACK TEACHER!
        </div>
        <img
          src={teacher}
          alt="Teacher"
          style={{
            width: '105px',
            height: '100px',
            borderRadius: '50%',
            boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.25)'
          }}
        />
      </div>

      {/* Scrollable Content Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        background: 'white',
      }}>
        {/* Class Average Banner */}
        <div style={{
          background: '#FCC459',
          borderRadius: '23px',
          padding: '20px',
          marginBottom: '20px',
          fontSize: '24px',
          fontFamily: '"Baloo 2", cursive',
          color: 'black'
        }}>
          CLASS AVERAGE:
        </div>

        {/* Student Cards in Responsive Grid */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {studentData.map((student, index) => (
          <StudentCard
            key={index}
            student={student}
          imgSrc={student.imgSrc}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
