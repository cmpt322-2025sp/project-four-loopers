import React from "react";

function StartScreen({ onStart }) {
    return (
        <div className="start-screen">
            <h1>Frognition</h1>
            <button onClick={onStart}>Start</button>
        </div>
    )
} 

export default StartScreen;