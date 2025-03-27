// 1) Detect iframe early in your script:
const inIframe = (window.self !== window.top);
if (inIframe) {
  document.body.classList.add("iframe-mode");
}
// 2) We’ll keep a global scaleFactor:
let scaleFactor1 = inIframe ? 0.6 : 1;
			
        // Get references to HTML elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const tryAgainBtn = document.getElementById('tryAgain');

// Audio elements
const backgroundMusic = document.getElementById('backgroundMusic');
const gemSound = document.getElementById('gemSound');
const gameOverSound = document.getElementById('gameOverSound');

let player, dots, enemies, powerUps, score, gameOver, level;
let highScores = [];
let lastTime = 0;
let animationFrameId = null;
let gameOverTime = 0;
const fps = 60;
const initialEnemyCount = 25;

// Ratios for sizes and speeds (relative to canvas width)
const PLAYER_SIZE_RATIO = 0.04;
const DOT_SIZE_RATIO = 0.03;
const ENEMY_SIZE_RATIO = 0.04;
const POWERUP_SIZE_RATIO = 0.015;
const PLAYER_SPEED_RATIO = 0.007;
const ENEMY_SPEED_RATIO = 0.002;

// Item densities (per unit area)
const DOT_DENSITY = 0.00005;
const ENEMY_DENSITY = 0.0000005;

// Start the game
function startGame() {
    startScreen.style.display = 'none';
    canvas.style.display = 'block';

    // Start background music
    if (backgroundMusic) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play().catch(error => console.error("Background music failed to play: ", error));
    }

    // Initialize and start the game
    init();
}

// Retry the game
tryAgainBtn.onclick = () => {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        backgroundMusic.play().catch(error => console.error("Background music failed to play: ", error));
    }
    if (gameOverSound) {
        gameOverSound.pause();
        gameOverSound.currentTime = 0;
    }
    init();
};

// Initialize the game
function init() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    resizeCanvas();

    // Calculate sizes and speeds based on canvas size
    const playerSize = canvas.width * PLAYER_SIZE_RATIO;
    const playerSpeed = canvas.width * PLAYER_SPEED_RATIO;

    player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: playerSize,
        moveX: 0,
        moveY: 0,
        speed: playerSpeed,
        invincible: false,
        invincibleTime: 0
    };

    dots = [];
    enemies = [];
    powerUps = [];
    score = 0;
    gameOver = false;
    level = 1;
    gameOverTime = 0;
    lastTime = 0;

    // Adjust the number of dots and enemies based on screen area
    const screenArea = canvas.width * canvas.height;
    const numDots = Math.floor(screenArea * DOT_DENSITY);
    const numEnemies = Math.floor(screenArea * ENEMY_DENSITY) + initialEnemyCount;

    // Create initial dots and enemies
    for (let i = 0; i < numDots; i++) {
        dots.push(createRandomDot());
    }
    for (let i = 0; i < numEnemies; i++) {
        enemies.push(createRandomEnemy());
    }

    // Remove old event listeners to prevent duplicates
    canvas.removeEventListener('touchstart', movePlayerToTouch);
    canvas.removeEventListener('mousedown', movePlayerToClick);
    window.removeEventListener('keydown', handleKeyDown);

    // Add new event listeners for this session
    canvas.addEventListener('touchstart', movePlayerToTouch);
    canvas.addEventListener('mousedown', movePlayerToClick);
    window.addEventListener('keydown', handleKeyDown);

    tryAgainBtn.style.display = 'none';

    // Start the main game loop
    gameLoop();
}

// Resize the canvas to the current window size and re-initialize the game items
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function getRandomPositionX(size) {
    return Math.floor(Math.random() * (canvas.width - size));
}

function getRandomPositionY(size) {
    return Math.floor(Math.random() * (canvas.height - size));
}

// Update your create functions to use both X and Y versions:
function createRandomDot() {
    const dotSize = canvas.width * DOT_SIZE_RATIO;
    return {
        x: getRandomPositionX(dotSize),
        y: getRandomPositionY(dotSize),
        size: dotSize,
    };
}

function createRandomEnemy() {
    const enemySize = canvas.width * ENEMY_SIZE_RATIO;
    let speedMultiplier = 1 + (level - 1) * 0.3;
    let baseSpeed = canvas.width * ENEMY_SPEED_RATIO * speedMultiplier;
    let enemy = {
        x: getRandomPositionX(enemySize),
        y: getRandomPositionY(enemySize),
        size: enemySize,
        speedX: (Math.random() < 0.5 ? 2 : -2) * speedMultiplier,
                speedY: (Math.random() < 0.5 ? 2 : -2) * speedMultiplier,
                angle: 0
    };

    while (isColliding(enemy, player)) {
        enemy.x = getRandomPositionX(enemySize);
        enemy.y = getRandomPositionY(enemySize);
    }

    return enemy;
}

function createRandomPowerUp() {
    const powerUpSize = canvas.width * POWERUP_SIZE_RATIO;
    return {
        x: getRandomPositionX(powerUpSize),
        y: getRandomPositionY(powerUpSize),
        size: powerUpSize,
        type: getRandomPowerUpType(),
        duration: 5000,
    };
}

// Get a random power-up type
function getRandomPowerUpType() {
    const types = ['speedBoost', 'invincibility', 'scoreMultiplier'];
    return types[Math.floor(Math.random() * types.length)];
}

// Handle player movement based on touch
function movePlayerToTouch(e) {
    if (gameOver) return;
    const touch = e.touches[0];
    movePlayerTowards(touch.clientX, touch.clientY);
}

// Handle player movement based on mouse click
function movePlayerToClick(e) {
    if (gameOver) return;
    movePlayerTowards(e.clientX, e.clientY);
}

// Move player towards a specific point
function movePlayerTowards(x, y) {
    const moveX = x - player.x;
    const moveY = y - player.y;
    const distance = Math.sqrt(moveX * moveX + moveY * moveY);
    const moveStep = player.speed;
    if (distance > 0) {
        player.moveX = (moveX / distance) * moveStep;
        player.moveY = (moveY / distance) * moveStep;
    }
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Store the state of keys
const keysPressed = {};

// Track the last direction pressed
let lastDirection = { moveX: 0, moveY: 0 };

// Handle key down events
function handleKeyDown(e) {
    if (gameOver) return;

    keysPressed[e.key] = true;
    updatePlayerMovement();
}

// Handle key up events
function handleKeyUp(e) {
    keysPressed[e.key] = false;
    // Do not stop movement on key release
}

// Update player movement based on keys pressed
function updatePlayerMovement() {
    const speed = player.speed;
    let moveX = 0;
    let moveY = 0;

    // Determine direction based on active keys
    if (keysPressed['ArrowUp'] || keysPressed['w']) {
        moveY = -speed;
    }
    if (keysPressed['ArrowDown'] || keysPressed['s']) {
        moveY = speed;
    }
    if (keysPressed['ArrowLeft'] || keysPressed['a']) {
        moveX = -speed;
    }
    if (keysPressed['ArrowRight'] || keysPressed['d']) {
        moveX = speed;
    }

    // If there's any movement, update lastDirection
    if (moveX !== 0 || moveY !== 0) {
        lastDirection = { moveX, moveY };
    }

    // Always apply the last known direction
    player.moveX = lastDirection.moveX;
    player.moveY = lastDirection.moveY;
}

function movePlayer(deltaTime) {
    if (!gameOver) {
        player.x += player.moveX;
        player.y += player.moveY;

        // Ensure player stays within bounds
        player.x = Math.max(0, Math.min(player.x, canvas.width - player.size));
        player.y = Math.max(0, Math.min(player.y, canvas.height - player.size));

        // Reduce invincibility time
        if (player.invincible) {
            player.invincibleTime -= deltaTime;
            if (player.invincibleTime <= 0) {
                player.invincible = false;
            }
        }

        checkCollisions();
    }
}

function moveEnemies(deltaTime) {
    enemies.forEach(enemy => {
        switch (level % 3) {
            case 1: // Straight movement
                enemy.x += enemy.speedX;
                enemy.y += enemy.speedY;
                break;
            case 2: // Zig-zag movement
                enemy.x += enemy.speedX;
                enemy.y += Math.sin(enemy.x / 20) * 5;
                break;
            case 0: // Spiral movement
                enemy.angle += 0.05;
                enemy.x += Math.cos(enemy.angle) * enemy.speedX;
                enemy.y += Math.sin(enemy.angle) * enemy.speedY;
                break;
        }

        // Ensure enemies stay within bounds
        if (enemy.x <= 0 || enemy.x >= canvas.width - enemy.size) enemy.speedX *= -1;
        if (enemy.y <= 0 || enemy.y >= canvas.height - enemy.size) enemy.speedY *= -1;
    });
}

function checkCollisions() {
    // Check for collisions with dots
    dots.forEach((dot, index) => {
        if (isColliding(player, dot)) {
            score++;
            if (gemSound) {
                gemSound.play().catch(error => console.error("Gem sound failed to play: ", error));
            }
            dots.splice(index, 1);
            dots.push(createRandomDot());
						
						enemies.push(createRandomEnemy());

            // Level up every 10 points
            if (score % 10 === 0) {
                levelUp();
            }

            // Spawn a power-up occasionally
            if (Math.random() < 0.3) {
                powerUps.push(createRandomPowerUp());
            }
        }
    });

    // Check for collisions with power-ups
    powerUps.forEach((powerUp, index) => {
        if (isColliding(player, powerUp)) {
            applyPowerUp(powerUp);
            powerUps.splice(index, 1);
        }
    });

    // Check for collisions with enemies
    if (!player.invincible) {
        enemies.forEach(enemy => {
            if (isColliding(player, enemy)) {
                gameOver = true;
                endGame();
            }
        });
    }
}

// Collision detection function
function isColliding(a, b) {
    return (
        a.x < b.x + b.size &&
        a.x + a.size > b.x &&
        a.y < b.y + b.size &&
        a.y + a.size > b.y
    );
}

// Level up function
function levelUp() {
    level++;

    // Recreate enemies with increased speed for the new level
    enemies = [];
    for (let i = 0; i < initialEnemyCount; i++) {
        enemies.push(createRandomEnemy());
    }
}

// Apply power-up effects
function applyPowerUp(powerUp) {
    switch (powerUp.type) {
        case 'speedBoost':
            player.speed *= 1.5;
            setTimeout(() => {
                player.speed /= 1.5;
            }, powerUp.duration);
            break;
        case 'invincibility':
            player.invincible = true;
            player.invincibleTime = powerUp.duration;
            break;
        case 'scoreMultiplier':
            score *= 2;
            break;
    }
}

// End game function
function endGame() {
    if (gameOver && gameOverSound) {
        gameOverSound.pause();
        gameOverSound.currentTime = 0;
        gameOverSound.play().catch(error => console.error("Game over sound failed to play: ", error));
    }

    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }

    // Update high scores
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 3);

    tryAgainBtn.style.display = 'block';
    draw();
}

// Game loop
function gameLoop(timestamp) {
    if (!lastTime) lastTime = timestamp;

    const deltaTime = timestamp - lastTime;

    if (!gameOver && deltaTime >= 1000 / fps) {
        movePlayer(deltaTime);
        moveEnemies(deltaTime);
        lastTime = timestamp;
    }

    draw();
    animationFrameId = requestAnimationFrame(gameLoop);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player
    ctx.fillStyle = player.invincible ? 'cyan' : 'white';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Draw dots (green)
    dots.forEach(dot => {
        ctx.fillStyle = 'green';
        ctx.fillRect(dot.x, dot.y, dot.size, dot.size);
    });

    // Draw enemies (red)
    enemies.forEach(enemy => {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    });

    // Draw power-ups
    powerUps.forEach(powerUp => {
        switch (powerUp.type) {
            case 'speedBoost':
                ctx.fillStyle = 'orange';
                break;
            case 'invincibility':
                ctx.fillStyle = 'blue';
                break;
            case 'scoreMultiplier':
                ctx.fillStyle = 'purple';
                break;
        }
        ctx.fillRect(powerUp.x, powerUp.y, powerUp.size, powerUp.size);
    });

    // 1) A helper function to center & draw text
function drawCenteredText(ctx, text, y, offsetX = 0) {
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    
    // (canvas.width - textWidth) / 2 gives centered X
    ctx.strokeText(text, (canvas.width - textWidth) / 2 + offsetX, y);
    ctx.fillText(text, (canvas.width - textWidth) / 2 + offsetX, y);
}

// 3) **Score & Level** text
    const baseHUDSize = 20; // Original is 40px
    const hudSize = baseHUDSize * scaleFactor1;
    ctx.fillStyle = 'yellow';
    ctx.font = `bold ${hudSize}px Arial`;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5 * scaleFactor1; // also scale line width if desired

    // Positions also might be scaled if you want them to shift proportionally
    // but if you prefer them at the top-left always, just keep them as is.
    ctx.strokeText(`Score: ${score}`, 10, 20);
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.strokeText(`Level: ${level}`, 10, 40);
    ctx.fillText(`Level: ${level}`, 10, 40);


// 2) In your draw() function for "Game Over":
if (gameOver) {
    gameOverTime += 0.05;

    const wiggleOffsetX = Math.sin(gameOverTime * 5) * 10 * scaleFactor1;
    const wiggleOffsetY = Math.sin(gameOverTime * 3) * 5 * scaleFactor1;

    // Set font
    const baseGameOverSize = 60;
    const wiggle = Math.sin(gameOverTime) * 5;
    const gameOverFontSize = (baseGameOverSize + wiggle) * scaleFactor1;

    ctx.fillStyle = 'red';
    ctx.lineWidth = 10 * scaleFactor1;
    ctx.font = `bold ${gameOverFontSize}px Arial`;
    ctx.strokeStyle = 'black';

    // Center “Game Over” around 20% down the canvas:
    const gameOverY = canvas.height * 0.2 + wiggleOffsetY;
    drawCenteredText(ctx, "Game Over", gameOverY, wiggleOffsetX);

    // Final Score
    const baseFinalScoreSize = 30;
    const finalScoreSize = baseFinalScoreSize * scaleFactor1;
    ctx.font = `bold ${finalScoreSize}px Arial`;
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5 * scaleFactor1;

    // Place final score at 50% canvas height
    const finalScoreY = canvas.height * 0.5;
    drawCenteredText(ctx, `Final Score: ${score}`, finalScoreY);

    // “High Scores:”
    const baseHighScoresSize = 30;
    const highScoresSize = baseHighScoresSize * scaleFactor1;
    ctx.font = `bold ${highScoresSize}px Arial`;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5 * scaleFactor1;

    const highScoresY = canvas.height * 0.6;
    drawCenteredText(ctx, "High Scores:", highScoresY);

    // Center each line of high scores
    highScores.forEach((highScore, index) => {
        const lineText = `${index + 1}. ${highScore}`;
        // 1 line = 80 px spacing (scaled) below the “High Scores:” text
        const lineY = highScoresY + (index + 1) * (40 * scaleFactor1);
        drawCenteredText(ctx, lineText, lineY);
    });
}         
    
}
// Function to handle keyboard events for buttons
document.addEventListener('keydown', (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); // Prevent scrolling when pressing space
        if (startButton.style.display !== 'none') {
            startButton.click(); // Simulate button click
        } else if (tryAgainBtn.style.display !== 'none') {
            tryAgainBtn.click(); // Simulate button click
        }
    }
});

// Make buttons focusable for accessibility
startButton.setAttribute("tabindex", "0");
tryAgainBtn.setAttribute("tabindex", "0");

// Add event listeners
startButton.addEventListener('click', startGame);
window.addEventListener('resize', () => {
    // Re-initialize after resizing to adjust item count, sizes, and distribution
    init();
});

// Initialize canvas size on page load
resizeCanvas();