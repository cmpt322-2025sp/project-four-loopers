import React, { useState, useEffect } from 'react';
import flyImage from './Moth.png'; 
import frogImage from './Euler.png';
import backgroundImage from './additionLevel.svg';
import './addlevel.css'


function AdditionLevel() {
  const [problem, setProblem] = useState(null);  // Stores problem data
  const [flies, setFlies] = useState([]);  // Stores flies
  const [correctAnswer, setCorrectAnswer] = useState(null);  // Stores correct answer
  const [selectedAnswer, setSelectedAnswer] = useState(null);  // Stores player's choice
  const [feedback, setFeedback] = useState('');  // Stores feedback message
  const [tongueStart, setTongueStart] = useState({ x: 0, y: 0 });
  const [tongueEnd, setTongueEnd] = useState(null);
  const [showTongue, setShowTongue] = useState(false);


  useEffect(() => {
    fetchProblem(); // Fetch the first problem when the page loads
  }, []);

  const fetchProblem = () => {
    fetch('http://127.0.0.1:8000/get_random_problem/addition/') // Fetch from Django backend
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched new problem:', data);

        // Update state with the fetched problem data
        setProblem({ num1: data.num1, num2: data.num2 });  // Store problem
        setFlies(data.flies);  // Store flies
        setCorrectAnswer(data.correct_answer);  // Store correct answer
        setSelectedAnswer(null);  // Reset selection
        setFeedback('');  // Reset feedback message
      })
      .catch((error) => console.error('Error fetching new problem:', error));
  };

  const handleFlyClick = (flyNumber, event) => {
    const flyRect = event.target.getBoundingClientRect();
    const frogRect = document.getElementById("frog").getBoundingClientRect();
  
    setTongueStart({ x: frogRect.left + frogRect.width / 2, y: frogRect.top + frogRect.height / 3 });
    setTongueEnd({ x: flyRect.left + flyRect.width / 2, y: flyRect.top });
    setShowTongue(true);
  
    setTimeout(() => {
      setShowTongue(false);
      setSelectedAnswer(flyNumber);
      if (flyNumber === correctAnswer) {
        setFeedback('✅ Correct!');
        setTimeout(() => {
          setFeedback('');
          setSelectedAnswer(null);
          fetchProblem();
        }, 1000);
      } else {
        setFeedback('❌ Try again!');
      }
    }, 500); // Tongue disappears after 0.5s
  };
  

  if (!problem) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="background-container">
    {/* add in svg of background it will be better for purposes of storage and will make the server run faster is my prediction */}
    {/* frog first line below */}
    <img 
  id="frog"
  src={frogImage} 
  alt="Frog"
  style={{
    width: '10vw',
    height: 'auto',
    position: 'absolute',
    left: '50%',
    bottom: '0vh',
    transform: 'translateX(-50%)'
  }} 
/>
   {/* Display the flies */}
   <div className="flies-container" >
        {flies.length > 0 ? (
          flies.map((flyNumber, index) => (
            <div 
            key={index} 
            className={`fly ${selectedAnswer === flyNumber ? 'selected' : ''}`}
            onClick={(event) => handleFlyClick(flyNumber, event)}
            >
            <img src={flyImage} alt={`Fly ${flyNumber}`} style={{ width: 150, height: 150 }} />
            <p>{flyNumber}</p>
            </div>
          ))
        ) : (
          <p>No flies available</p>
        )}
      </div>
      {/* banner */}
<div className="banner">
      <div data-svg-wrapper style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    height: '20vh', 
    padding: '20px' 
}}>
  <svg 
    width="80%"  // Adjust width percentage as needed
    height="auto" 
    viewBox="0 0 1008 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ maxWidth: '900px' }}  // Prevents it from getting too large on big screens
  >
    <g filter="url(#filter0_d_20_36)">
      <path d="M763.439 115.383L879.58 138.06L755.315 184.08L763.439 115.383Z" fill="#9C8369"/>
      <path d="M755.315 184.08L1003.17 191.417L933.904 136.726L1003.17 98.0424L852.418 82.7023V143.396L755.315 184.08Z" fill="#C4A484"/>
    </g>
    <path d="M246.534 115.522L127.529 138.758L254.858 185.913L246.534 115.522Z" fill="#9C8369"/>
    <path d="M254.859 185.913L0.895538 193.431L71.866 137.391L0.895538 97.7537L155.361 82.0353V144.225L254.859 185.913Z" fill="#C4A484"/>
    <g filter="url(#filter1_d_20_36)">
      <path d="M148.927 35.0498C422.541 -11.2163 577.122 -12.1479 855.135 35.0498V136.06C594.617 79.8688 440.236 78.9716 148.927 136.06V35.0498Z" fill="#C4A484"/>
    </g>
  </svg>
  </div>
  <div><h1>Addition Problems</h1></div>
  <div><p>{problem.num1} + {problem.num2} = ?</p></div>
</div>
    <h3>{feedback}</h3>
    <svg className="tongue-svg">
  {showTongue && tongueEnd && (
    <line 
      x1={tongueStart.x} 
      y1={tongueStart.y} 
      x2={tongueEnd.x} 
      y2={tongueEnd.y} 
      stroke="pink" 
      strokeWidth="7" 
    />
  )}
</svg>
  </div>

  );
}
export default AdditionLevel;
