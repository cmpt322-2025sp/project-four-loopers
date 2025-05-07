import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import starScreen from './starscreen.png';
import leftLocked from './left_locked_star.png';
import leftUnlocked from './left_unlocked_star.png';
import middleLocked from './middle_locked_star.png';
import middleUnlocked from './middle_unlocked_star.png';
import rightLocked from './right_locked_star.png';
import rightUnlocked from './right_unlocked_star.png';
import './StarScreenPage.css';
import starOneSound from './star_one.mp3';
import starTwoSound from './star_two.mp3';
import starThreeSound from './star_three.mp3';
import axios from 'axios';

function StarScreenPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const problemsSolved = parseInt(searchParams.get("problemsSolved")) || 0;
    const totalProblems = parseInt(searchParams.get("totalProblems")) || 0;
    const [showLeftStar, setShowLeftStar] = useState(false);
    const [showMiddleStar, setShowMiddleStar] = useState(false);
    const [showRightStar, setShowRightStar] = useState(false);

    useEffect(() => {
        if (problemsSolved >= 10) {
            setTimeout(() => {
                new Audio(starOneSound).play(); // play FIRST
                setShowLeftStar(true); // THEN show the star
            }, 300);
        }
        if (problemsSolved >= 15) {
            setTimeout(() => {
                new Audio(starTwoSound).play();
                setShowMiddleStar(true);
            }, 600);
        }
        if (problemsSolved >= 20) {
            setTimeout(() => {
                new Audio(starThreeSound).play();
                setShowRightStar(true);
            }, 900);
        }
        // axios.post("http://127.0.0.1:8000/submit_results/", {
        //     correct: problemsSolved,
        //     total: totalProblems,
        //     problem_type: searchParams.get("problemType"),
        // })
    }, [problemsSolved, totalProblems, searchParams]);



    const stars = {
        left: problemsSolved >= 10 ? leftUnlocked : leftLocked,
        middle: problemsSolved >= 15 ? middleUnlocked : middleLocked,
        right: problemsSolved >= 25 ? rightUnlocked : rightLocked,
    };

    const handleReplay = () => {
        navigate(-1);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            overflow: 'hidden',
        }}>
            {/* Background */}
            <img
                src={starScreen}
                alt="Star Screen"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1,
                }}
            />

            {/* LOCKED STARS — Always rendered */}
            <img
                src={leftLocked}
                alt="Left Star Locked"
                style={{
                    position: 'absolute',
                    top: '0%',
                    left: '0%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none'
                }}
            />
            <img
                src={middleLocked}
                alt="Middle Star Locked"
                style={{
                    position: 'absolute',
                    top: '0%',
                    left: '0%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none'
                }}
            />
            <img
                src={rightLocked}
                alt="Right Star Locked"
                style={{
                    position: 'absolute',
                    top: '0%',
                    left: '0%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none'
                }}
            />

            {/* UNLOCKED STARS — Pop in delayed, replace locked visually */}
            {showLeftStar && (
                <img
                    src={leftUnlocked}
                    alt="Left Star Unlocked"
                    className="star-pop"
                    style={{
                        position: 'absolute',
                        top: '0%',
                        left: '0%',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        pointerEvents: 'none'
                    }}
                />
            )}
            {showMiddleStar && (
                <img
                    src={middleUnlocked}
                    alt="Middle Star Unlocked"
                    className="star-pop"
                    style={{
                        position: 'absolute',
                        top: '0%',
                        left: '0%',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        pointerEvents: 'none'
                    }}
                />
            )}
            {showRightStar && (
                <img
                    src={rightUnlocked}
                    alt="Right Star Unlocked"
                    className="star-pop"
                    style={{
                        position: 'absolute',
                        top: '0%',
                        left: '0%',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        pointerEvents: 'none'
                    }}
                />
            )}



            {/* TEXT BLOCK */}
            <div style={{
                position: 'absolute',
                top: '60%', // <--- moved up
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 5,
                color: '#ffeaa7',
                fontFamily: 'Arial, sans-serif',
                textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
                pointerEvents: 'none',
            }}>
                <div style={{
                    fontSize: '42px',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                }}>
                    Problems Solved: {problemsSolved}
                </div>
                <div style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                }}>
                    {problemsSolved >= 25
                        ? '⭐ Perfect Score! You solved them all!'
                        : problemsSolved >= 15
                            ? '✨ Great job! You earned 2 stars!'
                            : problemsSolved >= 10
                                ? '👍 Nice! You got a star!'
                                : 'Keep going! You’ll get those stars next time!'}
                </div>
            </div>

            {/* BUTTON */}
            <button
                onClick={handleReplay}
                style={{
                    position: 'absolute',
                    top: '78%', 
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '16px 40px',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    backgroundColor: '#ff7675',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                    zIndex: 6,
                    transition: 'background-color 0.2s ease-in-out',
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#d63031'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#ff7675'}
            >
                🔁 Play Again
            </button>
        </div>
    );
}

export default StarScreenPage;
