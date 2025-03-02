import React, { useState, useEffect } from 'react';
import frogImage from './Euler.png'; // Ensure the correct path
import mothGif from './MothFlying.gif';
import './GameLevel.css';

const GameLevel = () => {
    const [problem, setProblem] = useState('');
    const [flies, setFlies] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(null);

    useEffect(() => {
        // Fetch data from /api/problems
        fetch('/api/problems')
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched problem data:", data); // Log the response data
                setProblem(`${data.num1} + ${data.num2}`);
                setFlies(data.flies);
                setCorrectAnswer(data.correct_answer);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    // Function to handle fly click
    const handleFlyClick = (flyNumber) => {
        if (flyNumber === correctAnswer) {
        } else {
            alert('Try again!');
        }
    };

    return (
        <div className="game-container">
            <div className="problem-banner">{problem}</div>
            <img src={frogImage} alt="Frog" className="frog" />
            <div className="flies-container">
                {flies.length > 0 ? (
                    flies.map((fly, index) => (
                        <div
                            key={index}
                            className={`fly ${fly === correctAnswer ? 'correct' : ''}`}
                            onClick={() => handleFlyClick(fly)}  // Handle fly click
                        >
                            <img src={mothGif} alt={`Fly ${fly}`} />
                            <span className="fly-number">{fly}</span>
                        </div>
                    ))
                ) : (
                    <div>Loading flies...</div>
                )}
            </div>
        </div>
    );
};

export default GameLevel;

