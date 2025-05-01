import React, { useState, useEffect, useRef } from 'react';
import flyImage from '../Moth.png';
import frogImage from '../Euler.png';
import CountdownTimer from "../CountdownTimer";
import './placelevel.css'
import digitropolisMusic from './digitropolis.mp3';
import sickImage from '../sick.png';
import frongueSound from '../frongue.mp3';



function PlaceValueLevel() {
  const [problem, setProblem] = useState(null);  // Stores problem data
  const [flies, setFlies] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);  // Stores correct answer
  const [selectedAnswer, setSelectedAnswer] = useState(null);  // Stores player's choice
  const [feedback, setFeedback] = useState('');  // Stores feedback message
  const [tongueStart, setTongueStart] = useState({ x: 0, y: 0 });
  const [tongueEnd, setTongueEnd] = useState(null);
  const [showTongue, setShowTongue] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);  
  const [totalCount, setTotalCount] = useState(0);  
  const [backgroundAudio] = useState(new Audio(digitropolisMusic)); // Create a new audio object
  const [isSick, setIsSick] = useState(false);
  const [isFacingLeft, setIsFacingLeft] = useState(false);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const tongueRef = useRef(null);
  const [squishedFly, setSquishedFly] = useState(null);
  const [fallingFly, setFallingFly] = useState(null);
  const [canClick, setCanClick] = useState(true);

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
  }, [backgroundAudio]);

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

  useEffect(() => {
          const konamiCode = [
              'ArrowUp', 'ArrowUp',
              'ArrowDown', 'ArrowDown',
              'ArrowLeft', 'ArrowRight',
              'ArrowLeft', 'ArrowRight',
              'b', 'a'
          ];
          let konamiIndex = 0;
  
          const handleKeyDown = (e) => {
              if (e.key === konamiCode[konamiIndex]) {
                  konamiIndex++;
                  if (konamiIndex === konamiCode.length) {
                      setKonamiActivated(true);
                      console.log('💥 KONAMI CODE ACTIVATED. PREPARE TO ASCEND.');
                      konamiIndex = 0;
                  }
              } else {
                  konamiIndex = 0;
              }
          };
  
          window.addEventListener('keydown', handleKeyDown);
          return () => window.removeEventListener('keydown', handleKeyDown);
      }, []);
      useEffect(() => {
          if (!konamiActivated) return;
  
          const interval = setInterval(() => {
              const correctFlyElement = document.querySelector(`.fly[data-fly-number="${correctAnswer}"]`);
              if (correctFlyElement) {
                  correctFlyElement.click();
              }
          }, 100); // 🔥 Every 100ms
  
          return () => clearInterval(interval);
      }, [konamiActivated, flies, correctAnswer]);
  
      useEffect(() => {
      fetchProblem(); // Fetch the first problem when the page loads
    }, []);
      useEffect(() => {
          const handleMouseMove = (event) => {
              const screenMiddle = window.innerWidth / 2;
              const newFacingLeft = event.clientX < screenMiddle;
  
              setIsFacingLeft(prev => {
                  if (prev !== newFacingLeft) {
                      // ⬇️ Facing direction changed? Update tongue start point if tongue is out
                      if (showTongue) {
                          const frogRect = document.getElementById("frog").getBoundingClientRect();
                          const offset = 85;
                          const directionMultiplier = newFacingLeft ? -1 : 1;
  
                          setTongueStart({
                              x: (frogRect.left + frogRect.width / 2) + (offset * directionMultiplier),
                              y: frogRect.top + frogRect.height / 3
                          });
                      }
                  }
                  return newFacingLeft;
              });
          };
  
          window.addEventListener('mousemove', handleMouseMove);
  
          return () => {
              window.removeEventListener('mousemove', handleMouseMove);
          };
      }, [showTongue]);

  // const fetchProblem = () => {
  //   fetch('http://127.0.0.1:8000/get_random_problem/place_value/', {
  //     method: 'GET',
  //     credentials: 'include', // Ensures cookies are sent with the request
  //     headers:{
  //       'Content-Type': 'application/json',
  //       // 'X-CSRFToken': document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1] // Get CSRF token from cookies
  //     }
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('Fetched new problem:', data);

  //       // Update state with the fetched problem data
  //       setProblem({ num: data.num, place_to_check: data.place_to_check });
  //       setFlies(data.flies); // Store flies
  //       setCorrectAnswer(data.correct_answer); // Store correct answer
  //       setSelectedAnswer(null); // Reset selection
  //       setFeedback(''); // Reset feedback message
  //     })
  //     .catch((error) => console.error('Error fetching new problem:', error));
  // };

  const fetchProblem = () => {
    setFallingFly(null)
    const randomNum = Math.floor(Math.random() * 1000); // Random number between 0 and 999
    const placeToCheck = Math.floor(Math.random() * 3); // Random place to check (0, 1, or 2)
    const num = randomNum.toString().padStart(3, '0'); // Ensure it's a 3-digit number
    const correctAnswer = num[placeToCheck]; // Get the digit at the specified place
    if (placeToCheck === 0) {
        setProblem({ num: num, place_to_check: 'hundreds' });
    }
    else if (placeToCheck === 1) { 
        setProblem({ num: num, place_to_check: 'tens' });
    }
    else if (placeToCheck === 2) {
        setProblem({ num: num, place_to_check: 'ones' });
    }


    let flies = [correctAnswer];
    while (flies.length < 4) {
        let randomFly = Math.floor(Math.random() * 10);
        if (!flies.includes(randomFly)) {
            flies.push(randomFly);
        }
    }

    flies = flies.sort(() => Math.random() - 0.5);

    setProblem({ num1: randomNum1, num2: randomNum2 });
    setFlies(flies);
    setCorrectAnswer(correctAnswer);
    setSelectedAnswer(null);
    setFeedback('');
    setIsSick(false);
    setCanClick(true);
};

const handleFlyClick = (flyNumber, event = null) => {
        if (!canClick) return;
        const frogRect = document.getElementById("frog").getBoundingClientRect();
        let flyRect;

        if (event) {
            flyRect = event.currentTarget.getBoundingClientRect();
        } else {
            // Auto-clicked mode (no real event): find the fly manually
            const flyElement = document.querySelector(`.fly[data-fly-number="${flyNumber}"]`);
            if (flyElement) {
                flyRect = flyElement.getBoundingClientRect();
            }
        }

        if (!flyRect) return; // Safety fallback if fly not found

        const offset = 85;
        const directionMultiplier = isFacingLeft ? -1 : 1;

        setTongueStart({
            x: (frogRect.left + frogRect.width / 2) + (offset * directionMultiplier),
            y: frogRect.top + frogRect.height / 3
        });

        setTongueEnd({
            x: flyRect.left + flyRect.width / 2,
            y: flyRect.top + flyRect.height / 2
        });

        new Audio(frongueSound).play();
        setShowTongue(true);
        setCanClick(false);
        setTongueEnd({
            x: flyRect.left + flyRect.width / 2,
            y: flyRect.top + flyRect.height / 2
        });

        setShowTongue(true);

// Let the tongue line be drawn outward then retract back in
        setTimeout(() => {
            const line = tongueRef.current;
            if (!line) return;

            const x1 = line.x1.baseVal.value;
            const y1 = line.y1.baseVal.value;
            const x2 = line.x2.baseVal.value;
            const y2 = line.y2.baseVal.value;

            // Calculate length of tongue
            const dx = x2 - x1;
            const dy = y2 - y1;
            const length = Math.sqrt(dx * dx + dy * dy);

            line.style.strokeDasharray = length;
            line.style.strokeDashoffset = length;
            line.style.transition = 'stroke-dashoffset 0.2s ease-out';

            // Animate draw (stretch out)
            requestAnimationFrame(() => {
                line.style.strokeDashoffset = '0';
            });

            // Retract after short delay
            setTimeout(() => {
                line.style.transition = 'stroke-dashoffset 0.2s ease-in';
                line.style.strokeDashoffset = length;
            }, 250);

            // Remove the line after full cycle
            setTimeout(() => {
                setShowTongue(false);
            }, 500);

        }, 10);


// BEGIN THE WOBBLE RIGHT HERE
        setTimeout(() => {
            const line = tongueRef.current;
            if (!line) return;

            const originalX2 = line.x2.baseVal.value;
            const originalY2 = line.y2.baseVal.value;

            // Slight overshoot
            const overshootX = originalX2 + (Math.random() * 10 - 5); // wiggle a little
            const overshootY = originalY2 + 20;

            // Step 1: overshoot
            line.x2.baseVal.value = overshootX;
            line.y2.baseVal.value = overshootY;

            // Step 2: snap back
            setTimeout(() => {
                line.x2.baseVal.value = originalX2;
                line.y2.baseVal.value = originalY2;
            }, 100); // snapback time
        }, 50); // delay slightly after tongue shows


        setTimeout(() => {
            setShowTongue(false);
            setSelectedAnswer(flyNumber);
            setFallingFly(flyNumber);
            // setTimeout(() => {
            //     setFallingFly(null);
            // }, 500);
            setSquishedFly(flyNumber);
            setTimeout(() => setSquishedFly(null), 300); // Reset after animation

            if (flyNumber === correctAnswer) {
                setFeedback('✅ Correct!');
                setCorrectCount(prev => prev + 1);
                setTotalCount(prev => prev + 1);
            } else {
                setFeedback('❌ Try again!');
                setTotalCount(prev => prev + 1);
                setIsSick(true);
            }

            setTimeout(() => {
                setFeedback('');
                setSelectedAnswer(null);
                fetchProblem();
            }, 1000);
        }, 500);
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
      <div className="digit-background-container" style={{
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
          <CountdownTimer startTime={60} problemsSolved={correctCount} totalProblems={totalProblems} isPaused={isPaused} problemType={'PV'}/>
          {/* change problemsSolved to test different numbers of stars appearing*/}
    {/* add in svg of background it will be better for purposes of storage and will make the server run faster is my prediction */}
    {/* frog first line below */}
    <img
                  id="frog"
                  src={isSick ? sickImage : frogImage}
                  alt="Frog"
                  style={{
                      width: '10vw',
                      height: 'auto',
                      position: 'absolute',
                      left: '50%',
                      bottom: '0vh',
                      transform: `translateX(-50%) ${isFacingLeft ? 'scaleX(-1)' : ''}`, // 🧠 FLIP IF NEEDED
                      transition: 'transform 0.2s ease', // 🍑 Smooth flipping
                  }}
              />
              {/* Display the flies */}
    
       <div className="flies-container" >
           {flies.length > 0 ? (
             flies.map((flyNumber, index) => (
                 <div
                     key={index}
                     className={`fly ${selectedAnswer === flyNumber ? 'selected' : ''} ${squishedFly === flyNumber ? 'squished' : ''} ${fallingFly === flyNumber ? 'falling' : ''}`}
                     data-fly-number={flyNumber}
                     onClick={(event) => handleFlyClick(flyNumber, event)}
                     style={{
                         position: 'relative',
                         width: '150px',
                         height: '150px',
                         display: 'flex',
                         justifyContent: 'center',
                         alignItems: 'center'
                     }}
                 >
                     <img
                         src={flyImage}
                         alt={`Fly ${flyNumber}`}
                         style={{
                             width: '100%',
                             height: '100%',
                             objectFit: 'contain',
                             position: 'absolute',
                             top: 0,
                             left: 0
                         }}
                     />
                     <p style={{
                         position: 'relative',
                         zIndex: 1,
                         color: 'white',
                         fontSize: '32px',
                         fontWeight: 'bold',
                         textShadow: '2px 2px 5px black',
                         margin: 0,
                         userSelect: 'none',
                         pointerEvents: 'none'
                     }}>
                         {flyNumber}
                     </p>
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
  <div><h1>Place Value Problems</h1></div>
  <div><p>What is in the {problem.place_to_check} place of {problem.num}?</p></div>
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
          {/* PROBLEMS SOLVED DISPLAY */}
          <div style={{
              position: 'fixed',
              bottom: '20px',
              right: '30px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '12px',
              fontSize: '24px',
              fontFamily: 'Arial, sans-serif',
              zIndex: 9999,
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.8)',
              userSelect: 'none',
              pointerEvents: 'none'
          }}>
              Problems Solved: {correctCount}
          </div>


      </div>

  );
}
export default PlaceValueLevel;