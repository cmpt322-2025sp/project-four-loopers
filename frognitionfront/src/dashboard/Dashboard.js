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


const StudentCard = ({ name, imgSrc }) => (
  <div style={{
    width: '256px',
    height: '317px',
    background: '#A2DD21',
    borderRadius: '23px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '10px',
    margin: '10px',
    boxSizing: 'border-box'
  }}>
    <img
      src={imgSrc}
      alt={name}
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
      {name}
    </div>
  </div>
);

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('https://django.stargazer-vega.ts.net/get_student_stats/')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  const fallbackStudents = [
    { name: 'Emily' }, { name: 'Carson' }, { name: 'Jacob' },
    { name: 'Caleb' }, { name: 'Bella' }, { name: 'Susan' },
    { name: 'Jake' }, { name: 'Ryan' },
  ];

  const randomizeStudents = (studentsArray) =>
    studentsArray.map(student => ({
      ...student,
      imgSrc: studentImages[Math.floor(Math.random() * studentImages.length)]
    }));

  const studentData = randomizeStudents(students.length ? students : fallbackStudents);

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
          WELCOME BACK MORGAN
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
              name={student.name}
              imgSrc={student.imgSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
