import pygame
import os

# Force Pygame window to be centered
os.environ['SDL_VIDEO_CENTERED'] = '1'

# Initialize Pygame
pygame.init()

# Set window size to always be 1920x1080
WINDOW_WIDTH, WINDOW_HEIGHT = 1920, 1080
screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Goldsum Palace Map - Centered at 1920x1080")

# Fixed level positions as provided
LEVEL_POSITIONS = [183, 468, 739, 1016, 1347, 1697]  # X-coordinates of levels

# Offset so that unlocked levels extend 60px to the right
LEVEL_CROP_OFFSET = 60

# Level progression: True = unlocked, False = locked
level_status = [True, True, True, False, False, False]  # Modify for testing
final_level_beaten = False  # Change to True if the final level is fully completed

# Find the furthest unlocked level
furthest_unlocked = sum(level_status)

# Load images
images = {
    "background": pygame.image.load("goldsum_background.png"),
    "path_locked": pygame.image.load("goldsum_path_locked.png"),
    "path_unlocked": pygame.image.load("goldsum_path_unlocked.png"),
    "levels_locked": pygame.image.load("goldsum_levels_locked.png"),
    "levels_unlocked": pygame.image.load("goldsum_levels_unlocked.png"),
    "border": pygame.image.load("goldsum_border.png")
}

# Resize images to match the fixed 1920x1080 window size
for key in images:
    images[key] = pygame.transform.scale(images[key], (WINDOW_WIDTH, WINDOW_HEIGHT))

def render_map():
    """Draws the game map dynamically based on unlocked levels and final level status."""
    screen.fill((0, 0, 0))  # Clear screen

    # Draw background
    screen.blit(images["background"], (0, 0))

    # Determine the X position of the furthest unlocked level
    furthest_x = LEVEL_POSITIONS[furthest_unlocked - 1] + LEVEL_CROP_OFFSET if furthest_unlocked > 0 else 0

    # 🔹 UNLOCKED PATH (Left Side) - Extend only up to the furthest unlocked level
    if furthest_unlocked > 0:
        unlocked_path_rect = pygame.Rect(0, 0, LEVEL_POSITIONS[furthest_unlocked - 1], WINDOW_HEIGHT)
        screen.blit(images["path_unlocked"], (0, 0), unlocked_path_rect)

    # 🔹 LOCKED PATH (Right Side) - Always follows the last unlocked level
    if furthest_unlocked < len(LEVEL_POSITIONS) or (furthest_unlocked == len(LEVEL_POSITIONS) and not final_level_beaten):
        locked_path_start_x = LEVEL_POSITIONS[furthest_unlocked - 1] if furthest_unlocked < len(LEVEL_POSITIONS) else LEVEL_POSITIONS[-1]
        locked_path_rect = pygame.Rect(locked_path_start_x, 0, WINDOW_WIDTH - locked_path_start_x, WINDOW_HEIGHT)
        screen.blit(images["path_locked"], (locked_path_start_x, 0), locked_path_rect)

    # 🔹 UNLOCKED LEVELS (Left Side) - Extend 60px to the right past each level
    if furthest_unlocked > 0:
        unlocked_levels_rect = pygame.Rect(0, 0, furthest_x, WINDOW_HEIGHT)
        screen.blit(images["levels_unlocked"], (0, 0), unlocked_levels_rect)

    # 🔹 LOCKED LEVELS (Right Side) - Starts where unlocked levels end
    if furthest_unlocked < len(LEVEL_POSITIONS):
        locked_levels_rect = pygame.Rect(furthest_x, 0, WINDOW_WIDTH - furthest_x, WINDOW_HEIGHT)
        screen.blit(images["levels_locked"], (furthest_x, 0), locked_levels_rect)

    # 🔹 NEW: Draw Border on Top
    screen.blit(images["border"], (0, 0))


# Game loop
running = True
while running:
    screen.fill((255, 255, 255))  # White background
    render_map()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    pygame.display.flip()  # Refresh screen

# Quit Pygame
pygame.quit()