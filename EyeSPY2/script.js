document.addEventListener('DOMContentLoaded', () => {
    const objects = document.querySelectorAll('.object');
    const foundList = document.getElementById('found-list');
    const tally = document.getElementById('tally');
    const landscape = document.getElementById('landscape');

    let foundCount = 0;
    let totalObjects = objects.length;
    let challengeMode = false;
    let startTime = null;
    let timerInterval;
    let originalPositions = [];

    // Determine High Score Key Based on Number of Items
    const highScoreKey = `highScores_${totalObjects}`;
    let highScores = JSON.parse(localStorage.getItem(highScoreKey)) || [];

    // Store Original Positions of Objects
    objects.forEach(object => {
        originalPositions.push({
            element: object,
            top: object.style.top,
            left: object.style.left
        });
    });

    // Create Challenge Mode Button
    const challengeButton = document.createElement('button');
    challengeButton.textContent = "Challenge Mode";
    challengeButton.id = "challenge-button";
    Object.assign(challengeButton.style, {
        position: "fixed",
        top: "10px",
        right: "10px",
        padding: "5px",
        backgroundColor: "black",
        color: "white",
        cursor: "pointer",
        fontSize: "6px",
        zIndex: "1000"
    });
    document.body.appendChild(challengeButton);

    // Create Re-Randomization Button
    const randomizeButton = document.createElement('button');
    randomizeButton.textContent = "Re-Randomize Objects";
    randomizeButton.id = "randomize-button";
    Object.assign(randomizeButton.style, {
        position: "fixed",
        top: "35px",
        right: "10px",
        padding: "5px",
        backgroundColor: "blue",
        color: "white",
        cursor: "pointer",
        fontSize: "6px",
        zIndex: "1000"
    });
    document.body.appendChild(randomizeButton);

    // Create Timer Display
    const timerDisplay = document.createElement('div');
    timerDisplay.id = "timer";
    Object.assign(timerDisplay.style, {
        position: "fixed",
        top: "10px",
        right: "150px",
        color: "red",
        fontSize: "24px",
        fontWeight: "bold",
        textShadow: "2px 2px 4px black, -2px -2px 4px black, 2px -2px 4px black, -2px 2px 4px black", // Outline effect
        zIndex: "1000"
    });
    document.body.appendChild(timerDisplay);

    // Challenge Mode Toggle
    challengeButton.addEventListener('click', () => {
        challengeMode = !challengeMode;
        challengeButton.style.backgroundColor = challengeMode ? "red" : "black";

        resetGame();
        if (!challengeMode) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "";
        }
    });

    // Re-Randomization Button Action
    randomizeButton.addEventListener('click', () => {
        reRandomizeObjects();
    });

    // Object Click Handling
    objects.forEach(object => {
        object.addEventListener('click', () => {
            if (challengeMode && !startTime) startTimer();

            const listItem = foundList.querySelector(`[data-id="${object.id}"]`);
            object.style.display = 'none';
            listItem.classList.add('found');

            foundCount++;
            tally.textContent = ` ${foundCount}/${totalObjects}`;

            if (foundCount === totalObjects) {
                stopTimer();
                triggerCelebration();
            }
        });
    });

    // Start Timer (only in Challenge Mode)
    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
            timerDisplay.textContent = `Time: ${elapsedTime}s`;
        }, 100);
    }

    // Stop Timer and Save Score
    function stopTimer() {
        if (!challengeMode) return;

        clearInterval(timerInterval);
        const finalTime = ((Date.now() - startTime) / 1000).toFixed(2);
        updateHighScores(finalTime);
    }

    // Store and Update High Scores
    function updateHighScores(newTime) {
        highScores.push(parseFloat(newTime));
        highScores.sort((a, b) => a - b);
        highScores = highScores.slice(0, 3);
        localStorage.setItem(highScoreKey, JSON.stringify(highScores));
    }

    // Celebration Effects (Rainbow Glitter, Confetti, and Melt Effect)
    function triggerCelebration() {
        // Add Rainbow Glitter
        const glitter = document.createElement('div');
        glitter.className = 'rainbow-glitter';
        document.body.appendChild(glitter);

        // Add Confetti
        for (let i = 0; i < 200; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.left = `${Math.random() * window.innerWidth}px`;
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }

        // Melt the Background
        landscape.classList.add('melt');

        // Show Celebration Screen with High Scores
        // Show Celebration Screen with High Scores
const celebrationText = document.createElement('div');
celebrationText.id = "celebration";
Object.assign(celebrationText.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "30px",
    textAlign: "center",
    padding: "20px",
    background: "rgba(0, 0, 0, 0.8)",
    borderRadius: "10px",
    zIndex: "1000"
});

celebrationText.innerHTML = `
    <p>🎉 You found all objects! 🎉</p>
    ${challengeMode ? `<p>Final Time: ${timerDisplay.textContent.split(":")[1].trim()}</p>` : ""}
    <p>🏆 Top 3 Scores:</p>
    <p>${highScores.map(time => `${time}s`).join("<br>") || "No scores yet"}</p>
    <button id="restart-button">Play Again</button>
`;

document.body.appendChild(celebrationText);

// Style the "Play Again" Button
const restartButton = document.getElementById("restart-button");
Object.assign(restartButton.style, {
    fontSize: "20px",
    fontWeight: "bold",
    padding: "12px 24px",
    marginTop: "15px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(45deg, #ff6600, #ffcc00)",
    color: "white",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "4px 4px 8px rgba(255, 165, 0, 0.5), -4px -4px 8px rgba(255, 255, 255, 0.3)"
});

// Add Hover Effect
restartButton.addEventListener("mouseover", () => {
    restartButton.style.transform = "scale(1.1)";
    restartButton.style.boxShadow = "6px 6px 12px rgba(255, 165, 0, 0.6), -6px -6px 12px rgba(255, 255, 255, 0.4)";
});

restartButton.addEventListener("mouseout", () => {
    restartButton.style.transform = "scale(1)";
    restartButton.style.boxShadow = "4px 4px 8px rgba(255, 165, 0, 0.5), -4px -4px 8px rgba(255, 255, 255, 0.3)";
});

// Restart Game on Click
restartButton.addEventListener('click', () => {
    celebrationText.remove();
    resetGame();
});
    }

    // Reset Game and Restore Object Positions
    function resetGame() {
        // Restore Original Object Positions
        originalPositions.forEach(item => {
            item.element.style.display = 'block';
            item.element.style.top = item.top;
            item.element.style.left = item.left;
        });

        // Remove Celebration Effects
        document.querySelectorAll('.rainbow-glitter, .sparkle, .confetti').forEach(el => el.remove());
        landscape.classList.remove('melt');

        // Reset Game Variables
        foundList.querySelectorAll('li').forEach(li => li.classList.remove('found'));
        foundCount = 0;
        tally.textContent = ` ${foundCount}/${totalObjects}`;
        startTime = null;
        clearInterval(timerInterval);
        timerDisplay.textContent = "";
    }

    // Re-Randomize Object Positions (only when button is clicked)
    function reRandomizeObjects() {
        objects.forEach(object => {
            const randomTop = Math.random() * 80 + 10;
            const randomLeft = Math.random() * 80 + 10;
            object.style.top = `${randomTop}%`;
            object.style.left = `${randomLeft}%`;
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-nav');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.neumorphic-tab');

    // Toggle main navigation visibility
    toggleButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click from triggering the document click listener
        const isHidden = navigation.classList.toggle('hidden');
        toggleButton.textContent = isHidden ? '☰ Nav' : '✖ Close';
    });

    // Handle submenu expansion
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const submenuId = link.getAttribute('data-expand');
            if (submenuId) {
                event.preventDefault(); // Prevent link navigation
                const submenu = document.getElementById(submenuId);
                submenu.classList.toggle('hidden'); // Toggle submenu visibility
            } else {
                navigation.classList.add('hidden'); // Hide navigation if it's a regular link
                toggleButton.textContent = '☰ Nav';
            }
        });
    });

    // Close navigation when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!navigation.contains(event.target) && !toggleButton.contains(event.target)) {
            if (!navigation.classList.contains('hidden')) {
                navigation.classList.add('hidden');
                toggleButton.textContent = '☰ Nav';
            }
        }
    });
});
