
let cells = [];
let gCount = 15;
let d;
let margin = 40;
let gameState = 2;
let nAlive;
let player;
let isStable = 0;
let lastP;
let water;
let ice1;
let ice2;
let penguin;
let shiftCount;
let timer;
let percentOcean = 0;
let speed = 0.5;

// for swipe detection
let touchStartX = 0;
let touchStartY = 0;


function preload() {
  penguin = loadImage("./images/IMG_1206.png");
  water = loadImage(
    "./images/IMG_1207.gif"
  );
  ice1 = loadImage("./images/IMG_1208.png");
  ice2 = loadImage("./images/IMG_1209.png");
}

function setup() {
  timer = 0;
  let c = max(400, min(windowWidth, windowHeight) * 0.8);
  createCanvas(c, c);
  shiftCount = 0;
  initiateCells();
  d = (width - 2 * margin) / gCount;
  player = { i: int(random(1, gCount - 1)), j: int(random(1, gCount - 1)) };
  cells[player.i][player.j].alive = 1;
  lastP = { i: player.i, j: player.j };
  speed = 0.5;
}

function draw() {
  frameRate(60);
  timer += speed;
  if (timer > 200) {
    shiftCount++;
    timer = 0;
    speed += 0.1;
    // Make sure speed doesn't exceed 1
    speed = min(1, speed);

    // If the penguin hasn’t moved since last shift -> game over
    if (player.i === lastP.i && player.j === lastP.j) {
      gameState = 0;
    }
    runGOL();
    lastP = { i: player.i, j: player.j };
  }

  if (gameState === 2) {
    // Title screen
    timer = 0;
    background(ice1);
    background(255, 255, 255, 100);
    textAlign(CENTER);
    textSize(40);
    image(
      penguin,
      margin + player.i * d - d / 2,
      margin + player.j * d - d / 2,
      d * 1.5,
      d * 1.5
    );
    text("Bergs of Life", width / 2, height / 2 - 150);
    textSize(12);
    text(
      "A penguin plays Icebergs that play Conway's Game of Life.",
      width / 2,
      height / 2 - 100
    );
    text(
      "At the end of each countdown, the Icebergs shift, melt, or form.",
      width / 2,
      height / 2 - 75
    );
    text(
      "The penguin needs to be on a stable iceberg for each shift.",
      width / 2,
      height / 2 - 50
    );
    text("Move using WASD or swipes.", width / 2, height / 2 - 25);
    text(
      "The penguin has the magic power of making icebergs. ",
      width / 2,
      height / 2
    );
    text("Do not stay on the same square.", width / 2, height / 2 + 75);
    text(
      "Do not let the ocean take more than 60% of the area.",
      width / 2,
      height / 2 + 50
    );
    textSize(25);
    text("Tap or press space to begin.", width / 2, height / 2 + 150);
  } else if (gameState === 0) {
    // Game over screen
    background(255);
    frameRate(1);
    runGOL();
    drawCells();

    background(240, 250, 255, 150);
    push();
    fill(10, 0, 100);
    textSize(40);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
    textSize(20);
    text(
      "Shifts survived: " + str(int(shiftCount)),
      width / 2,
      height / 2 + 50
    );
    getNAlive();
    text(
      "Ocean Area: " + str(int(percentOcean)) + "%",
      width / 2,
      height / 2 + 150
    );
    text("Tap or press space to play again.", width / 2, height / 2 + 180);
    pop();
  } else if (gameState === 1) {
    // Main game loop
    background(240, 250, 255);
    getNAlive();
    fill(0);
    textAlign(CENTER);
    textSize(18);
    text("Ocean: " + str(int(percentOcean)) + "%", width / 2, margin / 2 + 9);
    text(str(10 - int((timer / 20) % 10)), width / 2, height - margin / 2);

    drawCells();
    image(
      penguin,
      margin + player.i * d - d / 2,
      margin + player.j * d - d / 2,
      d * 1.5,
      d * 1.5
    );

    // If the penguin is on water or too much ocean => game over
    if (cells[player.i][player.j].alive === 0 || percentOcean >= 60) {
      gameState = 0;
			
    }
  }
}

function initiateCells() {
  cells = [];
  for (let i = 0; i < gCount; i++) {
    cells[i] = [];
    for (let j = 0; j < gCount; j++) {
      let alive = random([0, 1]);
      cells[i][j] = {
        alive: alive,
        neighborsAlive: 2,
        nState: alive,
        img: random([ice1, ice2])
      };
    }
  }
}

function drawCells() {
  for (let i = 0; i < gCount; i++) {
    for (let j = 0; j < gCount; j++) {
      if (cells[i][j].alive === 1) {
        image(cells[i][j].img, margin + i * d, margin + j * d, d, d);
      } else {
        image(water, margin + i * d, margin + j * d, d, d);
      }
    }
  }
}

function getNAlive() {
  nAlive = 0;
  for (let i = 0; i < gCount; i++) {
    for (let j = 0; j < gCount; j++) {
      nAlive += cells[i][j].alive;
    }
  }
  percentOcean = 100 - (nAlive / (gCount * gCount)) * 100;
}

// KEYBOARD SUPPORT (optional)
function keyPressed() {
  // W or up arrow
  if ((keyCode === 87 || keyCode === UP_ARROW) && player.j > 0) {
    player.j--;
    cells[player.i][player.j].alive = 1;
  }
  // S or down arrow
  if ((keyCode === 83 || keyCode === DOWN_ARROW) && player.j < gCount - 1) {
    player.j++;
    cells[player.i][player.j].alive = 1;
  }
  // D or right arrow
  if ((keyCode === 68 || keyCode === RIGHT_ARROW) && player.i < gCount - 1) {
    player.i++;
    cells[player.i][player.j].alive = 1;
  }
  // A or left arrow
  if ((keyCode === 65 || keyCode === LEFT_ARROW) && player.i > 0) {
    player.i--;
    cells[player.i][player.j].alive = 1;
  }

  // Space = start or restart
  if (keyCode === 32 && gameState != 1) {
    restartGame();
  }
}

function touchStarted(e) {
  // If the user tapped on an element with ID "toggle-nav" or "navigation",
  // do NOT hijack the event.
  // We'll skip the game logic in that case.
  if (e.target.id === 'toggle-nav' || e.target.closest('#navigation')) {
    // Let the menu handle this event; don't prevent default or stop propagation
    return;
  }

  // Otherwise, proceed with the game logic
  touchStartX = mouseX;
  touchStartY = mouseY;
}

function touchEnded(e) {
  // 🔥 If the user is tapping the footer, allow it to function normally
  if (e.target.closest('.footer')) {
    return true; // Allows taps on footer links to work
  }

  // If the user is tapping the navigation menu, don't interfere
  if (e.target.id === 'toggle-nav' || e.target.closest('#navigation')) {
    return;
  }

  let dx = mouseX - touchStartX;
  let dy = mouseY - touchStartY;
  let absDX = abs(dx);
  let absDY = abs(dy);

  // If the swipe is very small, treat it like a "tap"
  if (absDX < 5 && absDY < 5) {
    if (gameState !== 1) {
      restartGame();
    }
    return false; // This was blocking normal link behavior
  }

  // Otherwise, determine the main direction of swipe
  if (absDX > absDY) {
    if (dx > 0 && player.i < gCount - 1) {
      player.i++;
      cells[player.i][player.j].alive = 1;
    } else if (dx < 0 && player.i > 0) {
      player.i--;
      cells[player.i][player.j].alive = 1;
    }
  } else {
    if (dy > 0 && player.j < gCount - 1) {
      player.j++;
      cells[player.i][player.j].alive = 1;
    } else if (dy < 0 && player.j > 0) {
      player.j--;
      cells[player.i][player.j].alive = 1;
    }
  }

  return false;
}

// Start/restart the game
function restartGame() {
  gameState = 1;
  // Reinitialize everything
  setup(); 
  loop();
  draw();
}

function runGOL() {
  checkNeighbors();
  for (let i = 0; i < gCount; i++) {
    for (let j = 0; j < gCount; j++) {
      if (
        (cells[i][j].neighborsAlive < 2 || cells[i][j].neighborsAlive > 3) &&
        cells[i][j].alive === 1
      ) {
        cells[i][j].alive = 0;
      } else if (
        cells[i][j].neighborsAlive === 3 ||
        (cells[i][j].neighborsAlive === 2 && cells[i][j].alive === 1)
      ) {
        cells[i][j].alive = 1;
      }
    }
  }
}

function checkNeighbors() {
  // Count neighbors in the 4-adjacency sense (up, down, left, right)
  // If you prefer 8 neighbors in standard Conway’s, adjust accordingly
  for (let i = 0; i < gCount; i++) {
    for (let j = 0; j < gCount; j++) {
      let count = 0;

      // up
      if (j > 0) count += cells[i][j - 1].alive;
      // down
      if (j < gCount - 1) count += cells[i][j + 1].alive;
      // left
      if (i > 0) count += cells[i - 1][j].alive;
      // right
      if (i < gCount - 1) count += cells[i + 1][j].alive;

      cells[i][j].neighborsAlive = count;
    }
  }
}