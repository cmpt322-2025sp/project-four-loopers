import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function CountdownTimer({ startTime, problemsSolved, isPaused }) {
    const [remainingTime, setRemainingTime] = useState(startTime * 1000);
    const [isFinished, setIsFinished] = useState(false);
    const navigate = useNavigate();
    const endTimestampRef = useRef(null);
    const intervalRef = useRef(null);
    useEffect(() => {
        if (isFinished) {
            navigate(`/star-screen?problemsSolved=${problemsSolved}`);
        }
    }, [isFinished, navigate, problemsSolved]);

    useEffect(() => {
        if (!isPaused && !isFinished) {
            endTimestampRef.current = Date.now() + remainingTime;
        }
    }, [isPaused]);
    useEffect(() => {
        const initialRemaining = startTime * 1000;
        setRemainingTime(initialRemaining);
        setIsFinished(false);
        endTimestampRef.current = Date.now() + initialRemaining;
    }, [startTime]);
    useEffect(() => {
        if (isPaused || isFinished) {
            clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            const now = Date.now();
            const remaining = endTimestampRef.current - now;

            if (remaining <= 0) {
                setRemainingTime(0);
                setIsFinished(true);
                clearInterval(intervalRef.current);
            } else {
                setRemainingTime(remaining);
            }
        }, 10);

        return () => clearInterval(intervalRef.current);
    }, [isPaused, isFinished]);

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
