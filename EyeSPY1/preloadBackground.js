// Function to preload the background image before anything else runs
function preloadBackgroundImage(url, callback) {
    const img = new Image();
    img.src = url;

    img.onload = function () {
        // Once the image is fully loaded, set it as the background
        const landscape = document.getElementById('landscape');
        if (landscape) {
            landscape.style.backgroundImage = `url('${url}')`;
            console.log("Background image preloaded successfully.");
        } else {
            console.error("Element with ID 'landscape' not found.");
        }

        if (callback) callback(); // Proceed with the rest of the game logic
    };

    img.onerror = function () {
        console.error("Failed to load background image:", url);
        if (callback) callback(); // Proceed anyway in case of an error
    };
}

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    const backgroundURL = './images/landscape1.jpg';

    preloadBackgroundImage(backgroundURL, () => {
        console.log("Now running the main game script...");
        initGame(); // Call the main game logic here
    });
});

// Example placeholder for the main game logic (modify as needed)
function initGame() {
    console.log("Game logic initialized after background image loaded.");
}