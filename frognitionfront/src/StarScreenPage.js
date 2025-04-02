import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import starScreen from './starscreen.png';
import leftLocked from './left_locked_star.png';
import leftUnlocked from './left_unlocked_star.png';
import middleLocked from './middle_locked_star.png';
import middleUnlocked from './middle_unlocked_star.png';
import rightLocked from './right_locked_star.png';
import rightUnlocked from './right_unlocked_star.png';

function StarScreenPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const problemsSolved = parseInt(searchParams.get("problemsSolved")) || 0;
    const score = 2934;

    const stars = {
        left: problemsSolved >= 10 ? leftUnlocked : leftLocked,
        middle: problemsSolved >= 20 ? middleUnlocked : middleLocked,
        right: problemsSolved >= 30 ? rightUnlocked : rightLocked,
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

            {/* Stars */}
            <img
                src={stars.left}
                alt="Left Star"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <img
                src={stars.middle}
                alt="Middle Star"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <img
                src={stars.right}
                alt="Right Star"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
            />

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
                    Score: {score}
                </div>
                <div style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                }}>
                    {problemsSolved >= 30
                        ? '⭐ Perfect Score! You solved them all!'
                        : problemsSolved >= 20
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
                    top: '73%', // ⬅️ bumped lower from 68%
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
