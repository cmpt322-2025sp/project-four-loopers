const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const WINDOW_WIDTH = 1920;
const WINDOW_HEIGHT = 1080;

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;

const LEVEL_POSITIONS = [183, 468, 739, 1016, 1347, 1697];
const LEVEL_CROP_OFFSET = 60;
const levelStatus = [true, true, true, false, false, false]; // Example: First 3 levels unlocked
const finalLevelBeaten = false;

const furthestUnlocked = levelStatus.filter(Boolean).length;

const imagePaths = {
    background: 'goldsum_background.png',
    pathLocked: 'goldsum_path_locked.png',
    pathUnlocked: 'goldsum_path_unlocked.png',
    levelsLocked: 'goldsum_levels_locked.png',
    levelsUnlocked: 'goldsum_levels_unlocked.png',
    border: 'goldsum_border.png',
};

const images = {};
let imagesLoaded = 0;
const totalImages = Object.keys(imagePaths).length;

// Load all images
for (const [key, src] of Object.entries(imagePaths)) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            requestAnimationFrame(renderLoop);
        }
    };
    images[key] = img;
}

function renderMap() {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    // Draw background
    ctx.drawImage(images.background, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    let furthestX = furthestUnlocked > 0
        ? LEVEL_POSITIONS[furthestUnlocked - 1] + LEVEL_CROP_OFFSET
        : 0;

    // UNLOCKED PATH
    if (furthestUnlocked > 0) {
        ctx.drawImage(
            images.pathUnlocked,
            0, 0, LEVEL_POSITIONS[furthestUnlocked - 1], WINDOW_HEIGHT,
            0, 0, LEVEL_POSITIONS[furthestUnlocked - 1], WINDOW_HEIGHT
        );
    }

    // LOCKED PATH
    if (
        furthestUnlocked < LEVEL_POSITIONS.length ||
        (furthestUnlocked === LEVEL_POSITIONS.length && !finalLevelBeaten)
    ) {
        const startX = furthestUnlocked < LEVEL_POSITIONS.length
            ? LEVEL_POSITIONS[furthestUnlocked - 1]
            : LEVEL_POSITIONS[LEVEL_POSITIONS.length - 1];

        ctx.drawImage(
            images.pathLocked,
            startX, 0, WINDOW_WIDTH - startX, WINDOW_HEIGHT,
            startX, 0, WINDOW_WIDTH - startX, WINDOW_HEIGHT
        );
    }

    // UNLOCKED LEVELS
    if (furthestUnlocked > 0) {
        ctx.drawImage(
            images.levelsUnlocked,
            0, 0, furthestX, WINDOW_HEIGHT,
            0, 0, furthestX, WINDOW_HEIGHT
        );
    }

    // LOCKED LEVELS
    if (furthestUnlocked < LEVEL_POSITIONS.length) {
        ctx.drawImage(
            images.levelsLocked,
            furthestX, 0, WINDOW_WIDTH - furthestX, WINDOW_HEIGHT,
            furthestX, 0, WINDOW_WIDTH - furthestX, WINDOW_HEIGHT
        );
    }

    // BORDER on top
    ctx.drawImage(images.border, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
}

function renderLoop() {
    renderMap();
    requestAnimationFrame(renderLoop);
}
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;

    // Check if click is within 60 pixels of any LEVEL_POSITION
    for (let i = 0; i < LEVEL_POSITIONS.length; i++) {
        const levelX = LEVEL_POSITIONS[i];
        if (Math.abs(clickX - levelX) <= 60 && levelStatus[i]) {
            // Navigate to AdditionLevel (in React, this is a bit hacky)
            window.location.href = "/addition";
            return;
        }
    }
});
