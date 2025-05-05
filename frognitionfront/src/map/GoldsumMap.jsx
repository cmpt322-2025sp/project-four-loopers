import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Normalized positions relative to 1920x1080 base resolution
const LEVEL_POSITIONS = [
    { x: 182 / 1920,  y: 831 / 1080 },
    { x: 467 / 1920,  y: 672 / 1080 },
    { x: 740 / 1920,  y: 498 / 1080 },
    { x: 1015 / 1920, y: 603 / 1080 },
    { x: 1348 / 1920, y: 488 / 1080 },
    { x: 1697 / 1920, y: 617 / 1080 },
];
const RADIUS_PX_AT_1920 = 62; // Half of 124

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
            const lastUnlockedNormX = LEVEL_POSITIONS[furthestUnlocked - 1]?.x || 0;
            const furthestX = lastUnlockedNormX * canvas.width + ((60 / 1920) * canvas.width);

            if (furthestUnlocked > 0) {
                const lastUnlockedX = (LEVEL_POSITIONS[furthestUnlocked - 1]?.x || 0) * canvas.width;
                ctx.drawImage(
                    images.pathUnlocked,
                    0, 0, lastUnlockedX, canvas.height,
                    0, 0, lastUnlockedX, canvas.height
                );
            }

            if (furthestUnlocked < LEVEL_POSITIONS.length || (furthestUnlocked === LEVEL_POSITIONS.length && !finalLevelBeaten)) {
                const startNormX = furthestUnlocked < LEVEL_POSITIONS.length
                    ? LEVEL_POSITIONS[furthestUnlocked - 1]?.x || 0
                    : LEVEL_POSITIONS[LEVEL_POSITIONS.length - 1].x;
                const startX = startNormX * canvas.width;

                ctx.drawImage(
                    images.pathLocked,
                    startX, 0, canvas.width - startX, canvas.height,
                    startX, 0, canvas.width - startX, canvas.height
                );
            }

            if (furthestUnlocked > 0) {
                const furthestX = (LEVEL_POSITIONS[furthestUnlocked - 1]?.x || 0) * canvas.width + ((60 / 1920) * canvas.width);

                ctx.drawImage(
                    images.levelsUnlocked,
                    0, 0, furthestX, canvas.height,
                    0, 0, furthestX, canvas.height
                );

                ctx.drawImage(
                    images.levelsLocked,
                    furthestX, 0, canvas.width - furthestX, canvas.height,
                    furthestX, 0, canvas.width - furthestX, canvas.height
                );
            }

            if (furthestUnlocked < LEVEL_POSITIONS.length) {
                const furthestX = (LEVEL_POSITIONS[furthestUnlocked - 1]?.x || 0) * canvas.width + ((60 / 1920) * canvas.width);

                ctx.drawImage(
                    images.levelsUnlocked,
                    0, 0, furthestX, canvas.height,
                    0, 0, furthestX, canvas.height
                );

                ctx.drawImage(
                    images.levelsLocked,
                    furthestX, 0, canvas.width - furthestX, canvas.height,
                    furthestX, 0, canvas.width - furthestX, canvas.height
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
        const scaleX = 1920 / rect.width;
        const scaleY = 1080 / rect.height;

        const clickX = (event.clientX - rect.left) * scaleX;
        const clickY = (event.clientY - rect.top) * scaleY;

        for (let i = 0; i < LEVEL_POSITIONS.length; i++) {
            const { x: normX, y: normY } = LEVEL_POSITIONS[i];
            const actualX = normX * canvas.width;
            const actualY = normY * canvas.height;
            const radius = (RADIUS_PX_AT_1920 / 1920) * canvas.width; // Scaled radius

            const distance = Math.sqrt(
                Math.pow(clickX - actualX, 2) + Math.pow(clickY - actualY, 2)
            );
            if (distance <= radius && levelStatus[i]) {
                console.log(`Clicked inside circle ${i + 1}, navigating...`);
                navigate('/addition');
                return;
            }
        }
    };

    const handleMouseMove = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        // Calculate scale ratios to map to 1920x1080
        const scaleX = 1920 / rect.width;
        const scaleY = 1080 / rect.height;

        const moveX = (event.clientX - rect.left) * scaleX;
        const moveY = (event.clientY - rect.top) * scaleY;

        let hovering = false;
        for (let i = 0; i < LEVEL_POSITIONS.length; i++) {
            const { x: normX, y: normY } = LEVEL_POSITIONS[i];
            const actualX = normX * 1920;
            const actualY = normY * 1080;
            const radius = (RADIUS_PX_AT_1920); // Already based on 1920, so no scaling

            const distance = Math.sqrt(
                Math.pow(moveX - actualX, 2) + Math.pow(moveY - actualY, 2)
            );
            if (distance <= radius && levelStatus[i]) {
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
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                height: '100vh',
                aspectRatio: '16 / 9',
                backgroundColor: 'black',
                cursor: isHoveringCircle ? 'pointer' : 'default',
            }}
        />
    );
}

export default GoldsumMap;
