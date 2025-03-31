// CountdownTimer.js
import React, { useState, useEffect } from 'react';
import starScreen from './starscreen.png';
import leftLocked from './left_locked_star.png';
import leftUnlocked from './left_unlocked_star.png';
import middleLocked from './middle_locked_star.png';
import middleUnlocked from './middle_unlocked_star.png';
import rightLocked from './right_locked_star.png';
import rightUnlocked from './right_unlocked_star.png';

function CountdownTimer({ startTime, problemsSolved }) {
    const [remainingTime, setRemainingTime] = useState(startTime * 1000);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const endTimestamp = Date.now() + startTime * 1000;
        const interval = setInterval(() => {
            const newRemaining = endTimestamp - Date.now();
            if (newRemaining <= 0) {
                setRemainingTime(0);
                setIsFinished(true);
                clearInterval(interval);
            } else {
                setRemainingTime(newRemaining);
            }
        }, 10);
        return () => clearInterval(interval);
    }, [startTime]);

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

    const getStarImages = () => {
        const stars = {
            left: problemsSolved >= 10 ? leftUnlocked : leftLocked,
            middle: problemsSolved >= 20 ? middleUnlocked : middleLocked,
            right: problemsSolved >= 30 ? rightUnlocked : rightLocked,
        };
        return stars;
    };

    if (isFinished) {
        const stars = getStarImages();
        return (
            <div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '1920',
                height: '1080',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
            }}>
                <img
                    src={starScreen}
                    alt="Star Screen"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '1920px',
                        height: '1080px',
                        objectFit: 'none',
                        zIndex: -1,
                    }}
                />
                <img
                    src={stars.left}
                    alt="Left Star"
                    style={{
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        width: '1080px',
                        height: '1920px',
                    }}
                />
                <img
                    src={stars.middle}
                    alt="Middle Star"
                    style={{
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        width: '1080px',
                        height: '1920px',
                    }}
                />
                <img
                    src={stars.right}
                    alt="Right Star"
                    style={{
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        width: '1080px',
                        height: '1920px',
                    }}
                />
            </div>
        );
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
