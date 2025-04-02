import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CountdownTimer({ startTime, problemsSolved }) {
    const [remainingTime, setRemainingTime] = useState(startTime * 1000);
    const navigate = useNavigate();

    useEffect(() => {
        const endTimestamp = Date.now() + startTime * 1000;
        const interval = setInterval(() => {
            const newRemaining = endTimestamp - Date.now();
            if (newRemaining <= 0) {
                setRemainingTime(0);
                clearInterval(interval);
                // Redirect to star screen with problemsSolved
                navigate(`/star-screen?problemsSolved=${problemsSolved}`);
            } else {
                setRemainingTime(newRemaining);
            }
        }, 10);
        return () => clearInterval(interval);
    }, [startTime, navigate, problemsSolved]);

    let display;
    if (remainingTime >= 10000) {
        const totalSec = Math.ceil(remainingTime / 1000);
        const minutes = Math.floor(totalSec / 60);
        const seconds = totalSec % 60;
        display = `${(seconds + minutes * 60).toString().padStart(2, '0')}`;
    } else if (remainingTime > 0) {
        const totalSec = Math.floor(remainingTime / 1000);
        const minutes = Math.floor(totalSec / 60);
        const seconds = totalSec % 60;
        const ms = remainingTime % 1000;
        display = `${(seconds + minutes * 60).toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    } else {
        display = '0';
    }

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '80px',
            fontFamily: 'Arial, sans-serif',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: remainingTime >= 10000 ? '80px' : '64px',
        }}>
            {display}
        </div>
    );
}

export default CountdownTimer;
