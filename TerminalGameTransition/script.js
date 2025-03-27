const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tryAgainBtn = document.getElementById('tryAgain');
const highScoresDiv = document.getElementById('highScores');

// Audio elements
const backgroundMusic = document.getElementById('backgroundMusic');
const gemSound = document.getElementById('gemSound');
const gameOverSound = document.getElementById('gameOverSound');

   

let player, dots, enemies, score, gameOver;
let highScores = [];

// Reference the start button
const startButton = document.getElementById('startButton');

// Wait for the user to click the Start Game button
startButton.addEventListener('click', () => {
    // Hide the start button
    startButton.style.display = 'none';

    // Initialize the game
    init();
});

function init() {
    player = { x: 250, y: 250, size: 10, moveX: 0, moveY: 0, speed: 5 };
    dots = [];
    enemies = [];
    score = 0;
    gameOver = false;

    // Create random dots and enemies
    for (let i = 0; i < 10; i++) {
        dots.push(createRandomDot());
    }
    for (let i = 0; i < 3; i++) {
        enemies.push(createRandomEnemy());
    }

    // Add touch and keyboard event listeners
    canvas.addEventListener('touchstart', movePlayerToTouch);

    // Hide unnecessary UI elements
    tryAgainBtn.style.display = 'none';
    highScoresDiv.style.display = 'none';

    // Start background music
    backgroundMusic.play().catch(error => {
        console.log('Background music could not play automatically:', error);
    });

    // Start the game loop
    gameLoop();

}

function createRandomDot() {
    return {
        x: Math.floor(Math.random() * (canvas.width - 10)),
        y: Math.floor(Math.random() * (canvas.height - 10)),
        size: 5,
    };
}

function createRandomEnemy() {
    return {
        x: Math.floor(Math.random() * (canvas.width - 10)),
        y: Math.floor(Math.random() * (canvas.height - 10)),
        size: 10,
        speedX: Math.random() < 0.5 ? 1 : -1,
        speedY: Math.random() < 0.5 ? 1 : -1,
    };
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

function movePlayerToTouch(e) {
    if (gameOver) return;

    const touch = e.touches[0];
    const touchX = touch.clientX - canvas.getBoundingClientRect().left;
    const touchY = touch.clientY - canvas.getBoundingClientRect().top;

    // Calculate direction towards the touch point
    const moveX = touchX - player.x;
    const moveY = touchY - player.y;

    // Normalizing movement to ensure consistent speed
    const distance = Math.sqrt(moveX * moveX + moveY * moveY);
    const moveStep = 2;
    player.moveX = (moveX / distance) * moveStep;
    player.moveY = (moveY / distance) * moveStep;
}

function movePlayer() {
    if (!gameOver) {
        player.x += player.moveX;
        player.y += player.moveY;

        // Ensure player stays within bounds
        player.x = Math.max(0, Math.min(player.x, canvas.width - player.size));
        player.y = Math.max(0, Math.min(player.y, canvas.height - player.size));

        checkCollisions();
    }
}

function moveEnemies() {
    enemies.forEach(enemy => {
        enemy.x += enemy.speedX;
        enemy.y += enemy.speedY;

        if (enemy.x <= 0 || enemy.x >= canvas.width - enemy.size) enemy.speedX *= -1;
        if (enemy.y <= 0 || enemy.y >= canvas.height - enemy.size) enemy.speedY *= -1;
    });
}

function checkCollisions() {
    dots.forEach((dot, index) => {
        if (player.x < dot.x + dot.size &&
            player.x + player.size > dot.x &&
            player.y < dot.y + dot.size &&
            player.y + player.size > dot.y) {
            score++;
            gemSound.play();  // Play gem sound effect
            dots.splice(index, 1);
            dots.push(createRandomDot());
            enemies.push(createRandomEnemy());
        }
    });

    enemies.forEach(enemy => {
        if (player.x < enemy.x + enemy.size &&
            player.x + player.size > enemy.x &&
            player.y < enemy.y + enemy.size &&
            player.y + player.size > enemy.y) {
            gameOver = true;
            endGame();
        }
    });
}

function endGame() {
    backgroundMusic.pause(); // Stop the background music
    backgroundMusic.currentTime = 0; // Reset the music for next play
    gameOverSound.play(); // Play game over sound effect

    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 3); // Keep only the top 3 scores

    // Display the "Try Again" button and high scores
    tryAgainBtn.style.display = 'block';
    highScoresDiv.style.display = 'block';

    highScoresDiv.innerHTML = '<h3>High Scores:</h3>' +
        highScores.map((score, index) => `<p>${index + 1}. ${score}</p>`).join('');

    tryAgainBtn.onclick = () => {
        init();
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    dots.forEach(dot => {
        ctx.fillStyle = 'green';
        ctx.fillRect(dot.x, dot.y, dot.size, dot.size);
    });

    enemies.forEach(enemy => {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    });

    ctx.fillStyle = 'yellow';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);

    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 75, canvas.height / 2);
    }
}

function gameLoop() {
    if (!gameOver) {
        movePlayer();
        moveEnemies();
        draw();
        requestAnimationFrame(gameLoop);
    } else {
        draw();
    }
}

window.addEventListener("pageshow", function(event) {
  if (event.persisted) {
    // Force a top reset or re-initialization
    window.scrollTo(0, 0); 
  }
});

window.addEventListener("orientationchange", function() {
    if (window.orientation === 90 || window.orientation === -90) {
      document.body.innerHTML = "<div  style='text-align: center; font-style: Futura; margin-top: 5%; font-size: 2rem;'><strong>Please rotate your device to portrait mode.</strong></div>";
    } else {
      location.reload(); // Reload the page when back in portrait
    }
  });