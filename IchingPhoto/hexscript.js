// Global variables
let lines = [];
let changedLines = [];
let lineCount = 0;
let hexagramData = [];
let currentReading = {};
let isManualInput = false;
let hasGeneratedFullHexagram = false; // New flag to track if hexagram is generated

// Object containing the mapping of I Ching hexagrams.
const hexagrams = {
    // Your hexagram mappings...

    "closed,closed,closed,closed,closed,closed": 1,
    "open,open,open,open,open,open": 2,
    "closed,open,open,open,closed,open": 3,
    "open,closed,open,open,open,closed": 4,
    "closed,closed,closed,open,closed,open": 5,
    "open,closed,open,closed,closed,closed": 6,
    "open,closed,open,open,open,open": 7,
    "open,open,open,open,closed,open": 8,
    "closed,closed,closed,open,closed,closed": 9,
    "closed,closed,open,closed,closed,closed": 10,
    "closed,closed,closed,open,open,open": 11,
    "open,open,open,closed,closed,closed": 12,
    "closed,open,closed,closed,closed,closed": 13,
    "closed,closed,closed,closed,open,closed": 14,
    "open,open,closed,open,open,open": 15,
    "open,open,open,closed,open,open": 16,
    "closed,open,open,closed,closed,open": 17,
    "open,closed,closed,open,open,closed": 18,
    "closed,closed,open,open,open,open": 19,
    "open,open,open,open,closed,closed": 20,
    "closed,open,open,closed,open,closed": 21,
    "closed,open,closed,open,open,closed": 22,
    "open,open,open,open,open,closed": 23,
    "closed,open,open,open,open,open": 24,
    "closed,open,open,closed,closed,closed": 25,
    "closed,closed,closed,open,open,closed": 26,
    "closed,open,open,open,open,closed": 27,
    "open,closed,closed,closed,closed,open": 28,
    "open,closed,open,open,closed,open": 29,
    "closed,open,closed,closed,open,closed": 30,
    "open,open,closed,closed,closed,open": 31,
    "open,closed,closed,closed,open,open": 32,
    "open,open,closed,closed,closed,closed": 33,
    "closed,closed,closed,closed,open,open": 34,
    "open,open,open,closed,open,closed": 35,
    "closed,open,closed,open,open,open": 36,
    "closed,open,closed,open,closed,closed": 37,
    "closed,closed,open,closed,open,closed": 38,
    "open,open,closed,open,closed,open": 39,
    "open,closed,open,closed,open,open": 40,
    "closed,closed,open,open,open,closed": 41,
    "closed,open,open,open,closed,closed": 42,
    "closed,closed,closed,closed,closed,open": 43,
    "open,closed,closed,closed,closed,closed": 44,
    "open,open,open,closed,closed,open": 45,
    "open,closed,closed,open,open,open": 46,
    "open,closed,open,closed,closed,open": 47,
    "open,closed,closed,open,closed,open": 48,
    "closed,open,closed,closed,closed,open": 49,
    "open,closed,closed,closed,open,closed": 50,
    "closed,open,open,closed,open,open": 51,
    "open,open,closed,open,open,closed": 52,
    "open,open,closed,open,closed,closed": 53,
    "closed,closed,open,closed,open,open": 54,
    "closed,open,closed,closed,open,open": 55,
    "open,open,closed,closed,open,closed": 56,
    "open,closed,closed,open,closed,closed": 57,
    "closed,closed,open,closed,closed,open": 58,
    "open,closed,open,open,closed,closed": 59,
    "closed,closed,open,open,closed,open": 60,
    "closed,closed,open,open,closed,closed": 61,
    "open,open,closed,closed,open,open": 62,
    "closed,open,closed,open,closed,open": 63,
    "open,closed,open,closed,open,closed": 64,
};

// Load hexagram data (JSON format)
async function loadHexagramData() {
    try {
        const response = await fetch('./hexagrams.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        // Ensure the JSON structure contains `hexagrams` key
        if (data.hexagrams) {
            hexagramData = data.hexagrams;
        } else {
            throw new Error("Invalid data structure in hexagrams.json. Expected key 'hexagrams'.");
        }
    } catch (error) {
        console.error("Error loading hexagram data:", error);
    }
}

// Wait for hexagram data to load before proceeding with the reading
function ensureDataLoaded(callback) {
    if (hexagramData.length > 0) {
        callback();
    } else {
        console.log("Waiting for hexagram data to load...");
        setTimeout(() => ensureDataLoaded(callback), 100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('savedReadingsLink').addEventListener('click', function(event) {
        event.preventDefault();

        // Load saved readings from local storage
        const readings = JSON.parse(localStorage.getItem('readings')) || [];
        const readingsContent = document.getElementById('readingsContent');

        // Populate readingsContent with saved readings
        readingsContent.innerHTML = readings.map(reading => {
            return `
                <div class="reading-entry">
                    <h3>Hexagram ${reading.primaryHexagram.number}: ${reading.primaryHexagram.name}</h3>
                    <p>${reading.primaryHexagram.description}</p>
                    ${reading.primaryHexagram.changingLines.length ? `<p>Changing Lines:</p>` : ''}
                    ${reading.primaryHexagram.changingLines.map(cl => `<p>Line ${cl.line}: ${cl.meaning}</p>`).join('')}
                    ${reading.changedHexagram ? `<h4>Changed Hexagram ${reading.changedHexagram.number}: ${reading.changedHexagram.name}</h4><p>${reading.changedHexagram.description}</p>` : ''}
                </div>
            `;
        }).join('');

        // Reveal the container
        const savedReadingsContainer = document.getElementById('savedReadingsContainer');
        savedReadingsContainer.classList.remove('hidden');

        // Scroll to the container
        savedReadingsContainer.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('closeReadings').addEventListener('click', function() {
        document.getElementById('savedReadingsContainer').classList.add('hidden');
    });
});

// Modify showAnimationIframe to accept a callback
function showAnimationIframe(callback) {
    const iframe = document.getElementById("animationIframe");
    iframe.classList.remove("hidden");

    // Reload the iframe to reset its content and ensure animation replays
    iframe.src = iframe.src;

    // Send the dark mode state after reloading the iframe
    const isDarkMode = document.body.classList.contains("dark-mode");
    setTimeout(() => {
        iframe.contentWindow.postMessage({ darkMode: isDarkMode }, "*");
    }, 100); // Give a short delay for iframe to load

    // Show the animation with a timeout to hide after animation completes
    setTimeout(() => {
        iframe.classList.add("hidden");
        if (callback) {
            callback(); // Execute the callback after the animation hides
        }
    }, 5000); // Adjust delay based on animation duration
}

// Adjust handleFullHexagramGeneration to delay the generation and display
function handleFullHexagramGeneration() {
    resetReading(); // Reset the reading without showing animation

    showAnimationIframe(() => { // Show the iframe animation, then proceed
        ensureDataLoaded(() => {
            // Generate hexagram lines
            for (let i = 0; i < 6; i++) {
                generateLine();
            }
            // Display hexagram results
            displayHexagramResults();
        });
    });
}

// Remove the animation call from resetReading
function resetReading() {
    // Clear data and UI elements
    lines = [];
    changedLines = [];
    lineCount = 0;
    currentReading = {};
    document.getElementById('lines').innerHTML = '';
    document.getElementById('hexagramText').innerHTML = '';
    document.getElementById('changedHexagramText').innerHTML = '';
    document.getElementById("tossButton").textContent = "Toss Coins"; // Reset button text
}

// Function to find hexagram by number
function findHexagramByNumber(number) {
    return hexagramData.find(h => h.number === number);
}

// Call this function initially to load hexagram data
loadHexagramData();

function generateLine() {
    let value = tossYarrowSticks();
    let line = value % 2 === 0 ? 'open' : 'closed';
    let isChanging = value === 6 || value === 9;
    let changedLine = isChanging ? (line === 'open' ? 'closed' : 'open') : line;

    // Store the line in arrays
    lines.push(line);
    changedLines.push(changedLine);
    lineCount++;

    // Create the SVG image element for the line
    const lineImage = document.createElement("img");
    lineImage.src = isChanging
        ? (line === "open" ? "images/open-changing.svg" : "images/closed-changing.svg")
        : (line === "open" ? "images/open.svg" : "images/closed.svg");
    lineImage.style.marginBottom = "3px";

    // Apply the glow effect if this is a changing line
    if (isChanging) {
        lineImage.classList.add("changing");
    }

    // Append the line image to the display (so the first line is at the bottom)
    document.getElementById("lines").appendChild(lineImage);
}

// Toss simulation for generating a line (Yarrow stick method)
function tossYarrowSticks() {
    const random = Math.random();
    if (random < 1 / 16) return 9; // Old Yang (Changing Yang)
    else if (random < 4 / 16) return 6; // Old Yin (Changing Yin)
    else if (random < 9 / 16) return 7; // Young Yang (Stable Yang)
    return 8; // Young Yin (Stable Yin)
}

// Function to simulate the tossing of three coins for I Ching divination
function tossThreeCoins() {
    let total = 0;
    for (let i = 0; i < 3; i++) {
        let coin = Math.random() < 0.5 ? 2 : 3; // Tails=2, Heads=3
        total += coin;
    }
    return total; // Total will be 6, 7, 8, or 9
}

// Function to handle tossing coins for a single line in manual input mode
function handleManualCoinToss() {
    // Reset if there's a full hexagram present (manual or auto-generated)
    if (lineCount === 6) {
        resetReading(); // Clear previous hexagram
    }

    // Reset flag since we're creating a new hexagram
    hasGeneratedFullHexagram = false;

    // Generate a line via coin toss
    let value = tossThreeCoins();
    let line = value % 2 === 0 ? 'open' : 'closed';
    let isChanging = value === 6 || value === 9;
    let changedLine = isChanging ? (line === 'open' ? 'closed' : 'open') : line;

    // Add line to lines array
    lines.push(line);
    changedLines.push(changedLine);
    lineCount++;

    // Create line image element
    let lineImage = document.createElement("img");

    // Determine the appropriate image source
    if (isChanging) {
        lineImage.src = line === "open" ? "images/open-changing.svg" : "images/closed-changing.svg"; // Replace with actual path
    } else {
        lineImage.src = line === "open" ? "images/open.svg" : "images/closed.svg"; // Replace with actual path
    }

    lineImage.style.marginBottom = "3px";

    // Append the line image to the display (so the first line is at the bottom)
    document.getElementById("lines").appendChild(lineImage);

    // If all 6 lines have been entered, trigger the animation and display results after it
    if (lineCount === 6) {
        showAnimationIframe(() => {
            displayHexagramResults(); // Show full results after animation ends
        });
        hasGeneratedFullHexagram = true; // Set flag to indicate hexagram generation completed
    }
}

// Function to handle the toss method change
function handleTossMethodChange(event) {
    isManualInput = event.target.value === 'manual';
    document.getElementById('manualInputContainer').classList.toggle('hidden', !isManualInput);
}

// Function to handle manual input
function handleManualInput() {
    // Reset if there's a full hexagram present (manual or auto-generated)
    if (lineCount === 6) {
        resetReading(); // Clear previous hexagram
    }

    // Reset flag since we're creating a new hexagram
    hasGeneratedFullHexagram = false;

    const input = document.getElementById('manualInput').value.trim().toLowerCase();
    if (input !== 'open' && input !== 'closed' && input !== 'changing open' && input !== 'changing closed') {
        alert('Invalid input. Please select a valid line type.');
        return;
    }

    let line = input.includes('open') ? 'open' : 'closed';
    let isChanging = input.includes('changing');
    let changedLine = isChanging ? (line === 'open' ? 'closed' : 'open') : line;

    // Add line to lines array
    lines.push(line);
    changedLines.push(changedLine);
    lineCount++;

    // Create line image element
    let lineImage = document.createElement("img");

    // Determine the appropriate image source
    if (isChanging) {
        lineImage.src = line === "open" ? "images/open-changing.svg" : "images/closed-changing.svg"; // Replace with actual path
    } else {
        lineImage.src = line === "open" ? "images/open.svg" : "images/closed.svg"; // Replace with actual path
    }

    lineImage.style.marginBottom = "3px";

    // Append the line image to the display (so the first line is at the bottom)
    document.getElementById("lines").appendChild(lineImage);

    // If all 6 lines have been entered, trigger the animation and display results after it
    if (lineCount === 6) {
        showAnimationIframe(() => {
            displayHexagramResults(); // Show full results after animation ends
        });
        hasGeneratedFullHexagram = true; // Set flag to indicate hexagram generation completed
    }
    document.getElementById('manualInput').value = '';
}

// Function to reset the reading
function resetReading() {
    // Clear data and UI elements
    lines = [];
    changedLines = [];
    lineCount = 0;
    currentReading = {};
    document.getElementById('lines').innerHTML = '';
    document.getElementById('hexagramText').innerHTML = '';
    document.getElementById('changedHexagramText').innerHTML = '';
    document.getElementById("tossButton").textContent = "Toss Coins"; // Reset button text
}

// Select the dark mode toggle button
const darkModeToggle = document.getElementById("darkModeToggle");

// Toggle dark mode and send message to iframe
darkModeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");

    // Save the dark mode state to localStorage
    localStorage.setItem('darkMode', isDarkMode);

    // Send the dark mode status to the iframe
    const iframe = document.getElementById("animationIframe");
    iframe.contentWindow.postMessage({ darkMode: isDarkMode }, "*");
});

// Load dark mode state on initial page load
window.addEventListener("DOMContentLoaded", () => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add("dark-mode");
    }
});

// Function to display hexagram results
function displayHexagramResults() {
    // Reverse the lines to match the traditional bottom-up reading order
    let hexagramKey = lines.slice().reverse().join(',');
    let changedHexagramKey = changedLines.slice().reverse().join(',');

    let hexagramNumber = hexagrams[hexagramKey];
    let changedHexagramNumber = hexagrams[changedHexagramKey];

    let hexagram = findHexagramByNumber(hexagramNumber);
    let changedHexagram = findHexagramByNumber(changedHexagramNumber);
    let changingLineIndices = lines.map((line, index) => line !== changedLines[index] ? index + 1 : '').filter(Boolean);

    // Construct the current reading object with changing lines
    currentReading = {
        primaryHexagram: {
            number: hexagramNumber,
            lines: lines,
            description: hexagram ? hexagram.description : 'Not found',
            name: hexagram ? hexagram.name : 'Unknown',
            changingLines: changingLineIndices.map(index => ({
                line: index,
                meaning: hexagram && hexagram.changingLines ? hexagram.changingLines[index] : 'Not found'
            }))
        },
        changedHexagram: {
            number: changedHexagramNumber,
            lines: changedLines,
            description: changedHexagram ? changedHexagram.description : 'Not found',
            name: changedHexagram ? changedHexagram.name : 'Unknown'
        }
    };

    // Display primary hexagram
    const hexagramText = document.getElementById('hexagramText');
    hexagramText.innerHTML = `
        <div class="hexagram-card">
            <h3>Hexagram ${currentReading.primaryHexagram.number}: ${currentReading.primaryHexagram.name}</h3>
            <p>${currentReading.primaryHexagram.description}</p>
            ${currentReading.primaryHexagram.changingLines.length > 0 ? `<h4>Changing Lines:</h4>` : '<p>No changing lines.</p>'}
            <ul>
                ${currentReading.primaryHexagram.changingLines.map(cl => `<li>Line ${cl.line}: ${cl.meaning}</li>`).join('')}
            </ul>
        </div>
    `;

    const changedHexagramText = document.getElementById('changedHexagramText');
    if (currentReading.changedHexagram) {
        changedHexagramText.innerHTML = `
            <div class="hexagram-card">
                <h3>Changed Hexagram ${currentReading.changedHexagram.number}: ${currentReading.changedHexagram.name}</h3>
                <p>${currentReading.changedHexagram.description}</p>
            </div>
        `;
    } else {
        changedHexagramText.innerHTML = "<p>No secondary hexagram due to stable lines.</p>";
    }

    document.getElementById("tossButton").textContent = "Start Over";
}

// Function to save the current reading to local storage
function saveCurrentReading() {
    if (!currentReading.primaryHexagram) {
        alert("No reading to save. Please perform a reading first.");
        return;
    }

    const readings = JSON.parse(localStorage.getItem('readings')) || [];
    readings.push(currentReading);
    localStorage.setItem('readings', JSON.stringify(readings));
    alert('Reading saved successfully!');
}

// Function to load saved readings from local storage
function loadSavedReadings() {
    const readingsContent = document.getElementById('readingsContent');
    const readings = JSON.parse(localStorage.getItem('readings')) || [];

    readingsContent.innerHTML = readings.map(reading => {
        return `
            <div class="hexagram-card">
                <h3>Hexagram ${reading.primaryHexagram.number}: ${reading.primaryHexagram.name}</h3>
                <p>${reading.primaryHexagram.description}</p>
                ${reading.primaryHexagram.changingLines.length > 0 ? `<h4>Changing Lines:</h4><ul>${reading.primaryHexagram.changingLines.map(cl => `<li>Line ${cl.line}: ${cl.meaning}</li>`).join('')}</ul>` : '<p>No changing lines.</p>'}
                ${reading.changedHexagram ? `<h3>Changed Hexagram ${reading.changedHexagram.number}: ${reading.changedHexagram.name}</h3><p>${reading.changedHexagram.description}</p>` : '<p>No secondary hexagram due to stable lines.</p>'}
            </div>
        `;
    }).join('');

    document.getElementById('savedReadingsContainer').classList.remove('hidden');
}

// Function to close the saved readings container
function closeSavedReadings() {
    document.getElementById('savedReadingsContainer').classList.add('hidden');
}

// Function to clear saved readings from local storage
function clearSavedReadings() {
    if (confirm("Are you sure you want to clear all saved readings? This action cannot be undone.")) {
        localStorage.removeItem('readings'); // Remove readings from local storage
        document.getElementById('readingsContent').innerHTML = ''; // Clear the displayed readings
        alert('All saved readings have been cleared.');
    }
}

// Scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling effect
    });
}

// Scroll to the bottom of the page
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight, // Scroll to the full height of the page
        behavior: 'smooth' // Smooth scrolling effect
    });
}

// Function to reset the viewport zoom
function resetZoom() {
    const viewportMetaTag = document.querySelector("meta[name=viewport]");
    if (viewportMetaTag) {
        viewportMetaTag.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no");
    }
}

// Event listener to trigger reset on orientation change
window.addEventListener("orientationchange", resetZoom);

// Initial call to ensure the zoom is set correctly on load
resetZoom();



// Event listeners
document.getElementById('tossButton').addEventListener('click', handleFullHexagramGeneration);
document.getElementById('manualTossButton').addEventListener('click', handleManualCoinToss); // New event listener
document.querySelectorAll('input[name="tossMethod"]').forEach(radio => radio.addEventListener('change', handleTossMethodChange));
document.getElementById('manualInputSubmit').addEventListener('click', handleManualInput);
document.getElementById('saveReading').addEventListener('click', saveCurrentReading);
document.getElementById('loadReadings').addEventListener('click', loadSavedReadings);
document.getElementById('closeReadings').addEventListener('click', closeSavedReadings);
document.getElementById('clearReadings').addEventListener('click', clearSavedReadings);