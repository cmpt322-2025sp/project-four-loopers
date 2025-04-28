import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LEVEL_POSITIONS = [183, 468, 739, 1016, 1347, 1697];
const LEVEL_CROP_OFFSET = 60;
const levelStatus = [true, true, true, false, false, false];
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
                ? LEVEL_POSITIONS[furthestUnlocked - 1] + LEVEL_CROP_OFFSET
                : 0;

            if (furthestUnlocked > 0) {
                ctx.drawImage(
                    images.pathUnlocked,
                    0, 0, LEVEL_POSITIONS[furthestUnlocked - 1], WINDOW_HEIGHT,
                    0, 0, LEVEL_POSITIONS[furthestUnlocked - 1], WINDOW_HEIGHT
                );
            }

            if (furthestUnlocked < LEVEL_POSITIONS.length || (furthestUnlocked === LEVEL_POSITIONS.length && !finalLevelBeaten)) {
                const startX = furthestUnlocked < LEVEL_POSITIONS.length
                    ? LEVEL_POSITIONS[furthestUnlocked - 1]
                    : LEVEL_POSITIONS[LEVEL_POSITIONS.length - 1];

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
        const interval = setInterval(renderMap, 1000 / 30); // optional re-render every 30 FPS

        return () => clearInterval(interval);
    }, [imagesLoaded, images]);

    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;

        for (let i = 0; i < LEVEL_POSITIONS.length; i++) {
            const levelX = LEVEL_POSITIONS[i];
            if (Math.abs(clickX - levelX) <= 60 && levelStatus[i]) {
                navigate('/addition');
                return;
            }
        }
    };

    return (
        <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            style={{ width: '100vw', height: '100vh', display: 'block', backgroundColor: '#000' }}
        />
    );
}

export default GoldsumMap;
