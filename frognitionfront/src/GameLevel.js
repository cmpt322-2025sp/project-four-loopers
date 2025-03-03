import React, { useState, useEffect } from 'react';

function GameLevel() {
  const [problem, setProblem] = useState(null);  // Stores problem data
  const [flies, setFlies] = useState([]);  // Stores flies
  const [correctAnswer, setCorrectAnswer] = useState(null);  // Stores correct answer
  const [selectedAnswer, setSelectedAnswer] = useState(null);  // Stores player's choice
  const [feedback, setFeedback] = useState('');  // Stores feedback message

  useEffect(() => {
    fetchProblem(); // Fetch the first problem when the page loads
  }, []);

  const fetchProblem = () => {
    fetch('http://127.0.0.1:8000/get_random_problem/') // Fetch from Django backend
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

  const handleFlyClick = (flyNumber) => {
    setSelectedAnswer(flyNumber);
    if (flyNumber === correctAnswer) {
      setFeedback('✅ Correct! Great job!');
    } else {
      setFeedback('❌ Incorrect. Try again!');
    }
  };

  // Show "Loading..." while data is being fetched
  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Math Game</h1>

      {/* Display the math problem */}
      <h2>{problem.num1} + {problem.num2} = ?</h2>

      {/* Display the flies */}
      <div className="flies-container">
        {flies.length > 0 ? (
          flies.map((flyNumber, index) => (
            <div 
              key={index} 
              className={`fly ${selectedAnswer === flyNumber ? 'selected' : ''}`}
              onClick={() => handleFlyClick(flyNumber)}
              style={{
                cursor: 'pointer', 
                padding: '10px', 
                margin: '5px', 
                border: '2px solid black', 
                display: 'inline-block', 
                backgroundColor: selectedAnswer === flyNumber ? '#ffcccb' : 'white' // Highlight selection
              }}
            >
              🪰 {flyNumber} {/* Fly emoji with number */}
            </div>
          ))
        ) : (
          <p>No flies available</p>
        )}
      </div>

      {/* Feedback for user's answer */}
      <h3>{feedback}</h3>

      {/* Button to fetch new problem */}
      <button onClick={fetchProblem} style={{ marginTop: '10px' }}>Get New Problem</button>
    </div>
  );
}

export default GameLevel;
