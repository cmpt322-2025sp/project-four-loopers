import React, { useState, useEffect } from 'react';
import flyImage from './Moth.png';
import frogImage from './Euler.png';
import CountdownTimer from "./CountdownTimer";
import './addlevel.css';
import additionMusic from './addition_level.mp3';



function AdditionLevel() {
  const [problem, setProblem] = useState(null);  // Stores problem data
  const [flies, setFlies] = useState([]);  // Stores flies
  const [correctAnswer, setCorrectAnswer] = useState(null);  // Stores correct answer
  const [selectedAnswer, setSelectedAnswer] = useState(null);  // Stores player's choice
  const [feedback, setFeedback] = useState('');  // Stores feedback message
  const [tongueStart, setTongueStart] = useState({ x: 0, y: 0 });
  const [tongueEnd, setTongueEnd] = useState(null);
  const [showTongue, setShowTongue] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);  
  const [backgroundAudio] = useState(new Audio(additionMusic));

    const handlePause = () => {
    setIsPaused(true);
  };

  const handleUnpause = () => {
    setIsPaused(false);
  };
  useEffect(() => {
    // Setup and play background music immediately
    backgroundAudio.loop = true;
    backgroundAudio.play().catch(err => console.log("Audio play blocked;", err));
    
    // Cleanup function
    return () => {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
    };
  }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key.toLowerCase() === 'p') {
                setIsPaused(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
    fetchProblem(); // Fetch the first problem when the page loads
  }, []);

  const fetchProblem = () => {
    fetch('https://django.stargazer-vega.ts.net/get_random_problem/addition/', {
      method: 'GET',
      credentials: 'include', // Ensures cookies are sent with the request
      headers:{
        'Content-Type': 'application/json',
        // 'X-CSRFToken': document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1] // Get CSRF token from cookies
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched new problem:', data);

        // Update state with the fetched problem data
        setProblem({ num1: data.num1, num2: data.num2 }); // Store problem
        setFlies(data.flies); // Store flies
        setCorrectAnswer(data.correct_answer); // Store correct answer
        setSelectedAnswer(null); // Reset selection
        setFeedback(''); // Reset feedback message
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
        setCorrectCount(prev => prev + 1); 
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
    if (showStartScreen) {
        return (
            <div style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#111',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                fontFamily: 'Arial, sans-serif',
            }}>
                <h1 style={{
                    fontSize: '64px',
                    marginBottom: '40px',
                    textShadow: '2px 2px 10px black',
                }}>🐸 Frognition</h1>
                <button
                    onClick={() => setShowStartScreen(false)}
                    style={{
                        fontSize: '32px',
                        padding: '20px 60px',
                        backgroundColor: '#00b894',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#fff',
                        cursor: 'pointer',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                        transition: 'all 0.2s ease-in-out',
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#019875'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#00b894'}
                >
                    ▶️ Play
                </button>
            </div>
        );
    }

    return (
      <div className="addition-background-container" style={{
          // backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100vh'
      }}>
          <button
              onClick={handlePause}
              style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  zIndex: 10,
                  fontSize: '24px',
                  padding: '10px 20px',
                  backgroundColor: '#333',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
              }}
          >
              ⏸ Pause
          </button>
              {/* change problems solved to number of correct anwsers */}
          <CountdownTimer startTime={60} problemsSolved={correctCount} isPaused={isPaused}/>
          {/* change problemsSolved to test different numbers of stars appearing*/}
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
          {/* Pause Overlay */}
          {isPaused && (
              <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  zIndex: 9999,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#fff',
                  fontFamily: 'Arial, sans-serif',
              }}>
                  <h1 style={{ fontSize: '80px', marginBottom: '40px' }}>⏸ Paused</h1>
                  <button
                      onClick={handleUnpause}
                      style={{
                          fontSize: '28px',
                          padding: '16px 40px',
                          backgroundColor: '#6c5ce7',
                          border: 'none',
                          borderRadius: '10px',
                          color: '#fff',
                          cursor: 'pointer',
                          boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                      }}
                  >
                      🔄 Resume
                  </button>
              </div>
          )}

      </div>

  );
}
export default AdditionLevel;