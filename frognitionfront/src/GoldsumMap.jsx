import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LEVEL_POSITIONS = [
    { x: 183,  y: 775 },
    { x: 468,  y: 650 },
    { x: 739,  y: 487 },
    { x: 1016, y: 591 },
    { x: 1347, y: 478 },
    { x: 1697, y: 610 },
];
const CIRCLE_RADIUS = 30;

const levelStatus = [true, true, true, true, true, true];
const finalLevelBeaten = false;

const imagePaths = {
    background: '/goldsum_background.png',
    pathLocked: '/goldsum_path_locked.png',
    pathUnlocked: '/goldsum_path_unlocked.png',
    levelsLocked: '/goldsum_levels_locked.png',
    levelsUnlocked: '/goldsum_levels_unlocked.png',
    border: '/goldsum_border.png',
};

function GoldsumMap() {
    const canvasRef = useRef(null);
    const [images, setImages] = useState({});
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [isHoveringCircle, setIsHoveringCircle] = useState(false);
    const navigate = useNavigate();

    const WINDOW_WIDTH = 1920;
    const WINDOW_HEIGHT = 1080;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT;

        const loadedImages = {};
        let loadCount = 0;
        const totalImages = Object.keys(imagePaths).length;

        for (const [key, src] of Object.entries(imagePaths)) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedImages[key] = img;
                loadCount++;
                if (loadCount === totalImages) {
                    setImages(loadedImages);
                    setImagesLoaded(true);
                }
            };
            img.onerror = (err) => {
                console.error(`Error loading image ${src}`, err);
            };
        }
    }, []);

    useEffect(() => {
        if (!imagesLoaded) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        function renderMap() {
            ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

            ctx.drawImage(images.background, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

            let furthestUnlocked = levelStatus.filter(Boolean).length;
            let furthestX = furthestUnlocked > 0
                ? LEVEL_POSITIONS[furthestUnlocked - 1].x + 60
                : 0;

            if (furthestUnlocked > 0) {
                ctx.drawImage(
                    images.pathUnlocked,
                    0, 0, LEVEL_POSITIONS[furthestUnlocked - 1].x, WINDOW_HEIGHT,
                    0, 0, LEVEL_POSITIONS[furthestUnlocked - 1].x, WINDOW_HEIGHT
                );
            }

            if (furthestUnlocked < LEVEL_POSITIONS.length || (furthestUnlocked === LEVEL_POSITIONS.length && !finalLevelBeaten)) {
                const startX = furthestUnlocked < LEVEL_POSITIONS.length
                    ? LEVEL_POSITIONS[furthestUnlocked - 1].x
                    : LEVEL_POSITIONS[LEVEL_POSITIONS.length - 1].x;

                ctx.drawImage(
                    images.pathLocked,
                    startX, 0, WINDOW_WIDTH - startX, WINDOW_HEIGHT,
                    startX, 0, WINDOW_WIDTH - startX, WINDOW_HEIGHT
                );
            }

            if (furthestUnlocked > 0) {
                ctx.drawImage(
                    images.levelsUnlocked,
                    0, 0, furthestX, WINDOW_HEIGHT,
                    0, 0, furthestX, WINDOW_HEIGHT
                );
            }

            if (furthestUnlocked < LEVEL_POSITIONS.length) {
                ctx.drawImage(
                    images.levelsLocked,
                    furthestX, 0, WINDOW_WIDTH - furthestX, WINDOW_HEIGHT,
                    furthestX, 0, WINDOW_WIDTH - furthestX, WINDOW_HEIGHT
                );
            }

            ctx.drawImage(images.border, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        }

        renderMap();
        const interval = setInterval(renderMap, 1000 / 30);

        return () => clearInterval(interval);
    }, [imagesLoaded, images]);

    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        for (let i = 0; i < LEVEL_POSITIONS.length; i++) {
            const { x, y } = LEVEL_POSITIONS[i];

            const distance = Math.sqrt(
                Math.pow(clickX - x, 2) + Math.pow(clickY - y, 2)
            );

            if (distance <= CIRCLE_RADIUS && levelStatus[i]) {
                console.log(`Clicked inside circle ${i + 1}, navigating...`);
                navigate('/addition');
                return;
            }
        }
    };

    const handleMouseMove = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const moveX = event.clientX - rect.left;
        const moveY = event.clientY - rect.top;

        let hovering = false;
        for (let i = 0; i < LEVEL_POSITIONS.length; i++) {
            const { x, y } = LEVEL_POSITIONS[i];
            const distance = Math.sqrt(
                Math.pow(moveX - x, 2) + Math.pow(moveY - y, 2)
            );
            if (distance <= CIRCLE_RADIUS && levelStatus[i]) {
                hovering = true;
                break;
            }
        }
        setIsHoveringCircle(hovering);
    };

    return (
        <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            style={{
                width: '100vw',
                height: '100vh',
                display: 'block',
                backgroundColor: '#000',
                cursor: isHoveringCircle ? 'pointer' : 'default',
            }}
        />
    );
}

export default GoldsumMap;
