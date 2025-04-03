import { useEffect } from 'react';
import gsap from 'gsap';
import teacher from './teacher.png';
import './Dashboard.css'

const MyComponent = () => {
  useEffect(() => {
    gsap.to('form-container', { rotation: 360, duration: 2 });
  }, []);

  return (
    <header> 
        <h1>WELCOME BACK PLACEHOLDER</h1>

    </header>
//    <div className="register-container">
//        <div className="student-container">
//        <img src={teacher} alt="Teacher Icon" style={{ width: 150, height: 150 }} />
//          <h2 className="student-name">Caleb</h2>
//         </div>
//     < div className="student-container">
//     <img src={teacher} alt="Teacher Icon" style={{ width: 150, height: 150 }} />
//       <h2 className="student-name">Ellie</h2>
//      </div>

//  </div>
  );
};

export default MyComponent;