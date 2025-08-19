


// JavaScript to preload images
function preloadImages(urls) {
    urls.forEach((url) => {
        const img = new Image();
        img.src = url;
    });
}

// Preload background and dynamic images
preloadImages([
    'images/C0210CAF-A670-49C5-9897-F6ECB14633BE.WEBP', // Background and dynamic image
]);

// Existing variables (declare only once)
const reviewContainer = document.getElementById('review-container');
const reviewTextElement = document.getElementById('review-text');
const reviewText = reviewTextElement.innerText;

// Auto-scroll variables
let autoScroll;
const scrollSpeedControl = document.getElementById('scroll-speed');

// Define the maximum interval (slower scrolling on higher values)
const maxSpeed = 82; // Adjust this based on desired max scroll delay (in ms)

// Start Auto-Scroll
document.getElementById('scroll-on').addEventListener('click', function() {
    startAutoScroll();
});

// Stop Auto-Scroll
document.getElementById('scroll-off').addEventListener('click', function() {
    clearInterval(autoScroll);
});

// Adjust Scroll Speed Dynamically
scrollSpeedControl.addEventListener('input', function() {
    if (autoScroll) {
        startAutoScroll();
    }
});

// Allow native mouse scrolling while auto-scroll is active
reviewContainer.addEventListener('wheel', () => {
    clearInterval(autoScroll); // Stop auto-scroll on user interaction
});

// Helper function to start/restart auto-scroll with the adjusted speed
function startAutoScroll() {
    clearInterval(autoScroll); // Clear any existing interval

    // Calculate speed: lower value -> faster scroll, higher value -> slower scroll
    const speed = maxSpeed - scrollSpeedControl.value;

    autoScroll = setInterval(function() {
        reviewContainer.scrollTop += 1;
    }, Math.max(speed, 10)); // Ensure a minimum interval of 10ms to prevent freezing
}

// Text-to-Speech (TTS) variables
let synth = window.speechSynthesis;
let voices = [];
let selectedVoice = null;
let utterance;
let isSpeaking = false;
let currentCharIndex = 0;
let currentWordIndex = 0; // Track the current word index accurately
let volumeLevel = document.getElementById('volume').value / 10;

// Select the elements to hide/show
const scrollControls = document.querySelectorAll('.scroll-controls');
const volumeControl = document.querySelector('.volume-control');

// Function to toggle visibility of controls
function toggleControlsVisibility(isVisible) {
    const display = isVisible ? 'block' : 'none';
    scrollControls.forEach(control => (control.style.display = display));
    volumeControl.style.display = display;
}

// Function to populate the voice dropdown
function populateVoiceList() {
    voices = synth.getVoices();

    // If voices are not loaded yet, try again after a short delay
    if (voices.length === 0) {
        setTimeout(populateVoiceList, 100);
        return;
    }

    const voiceSelect = document.getElementById('voiceSelect');
    voiceSelect.innerHTML = ''; // Clear existing options

    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})${voice.default ? ' [default]' : ''}`;
        option.value = index; // store the index as value
        voiceSelect.appendChild(option);
    });

    // Try to set Samantha as the default voice
    const samanthaVoiceIndex = voices.findIndex(voice => voice.name.includes('Samantha'));
    if (samanthaVoiceIndex !== -1) {
        voiceSelect.value = samanthaVoiceIndex;
        selectedVoice = voices[samanthaVoiceIndex];
    } else {
        // fallback to the first available voice
        voiceSelect.value = 0;
        selectedVoice = voices[0];
    }
}

// Ensure voices are loaded before populating the list
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
} else {
    // Fallback for browsers that don't support onvoiceschanged
    populateVoiceList();
}

// Handle voice selection change
document.getElementById('voiceSelect').addEventListener('change', function (event) {
    const selectedVoiceURI = event.target.value;
    selectedVoice = voices.find(voice => voice.voiceURI === selectedVoiceURI);

    // Restart speech with the new voice if TTS is speaking
    if (isSpeaking) {
        synth.cancel();
        speakTextFromWordIndex(currentWordIndex);
    }
});

// Average reading speed: ~200 words per minute (~3.33 words per second)
const WORDS_PER_SECOND = 3.33;
const SECONDS_INTERVAL = 15; // 15 seconds

// Function to split the text into words
const wordsArray = reviewText.split(/\s+/);

// Function to create and speak from a specific word index
function speakTextFromWordIndex(wordIndex = 0) {
    synth.cancel(); // Stop any ongoing speech
    currentWordIndex = wordIndex; // Update the word index

    // Calculate the character index from the word index
    const startIndex = wordsArray.slice(0, wordIndex).join(' ').length;
    const adjustedStartIndex = startIndex > 0 ? startIndex + 1 : startIndex;

    currentCharIndex = adjustedStartIndex; // Update the character index

    // Create a new utterance starting from the adjusted character index
    utterance = new SpeechSynthesisUtterance(reviewText.slice(adjustedStartIndex));
    utterance.voice = selectedVoice; // Set the selected voice
    utterance.volume = volumeLevel;

    // Update currentCharIndex and currentWordIndex on each word boundary
    utterance.onboundary = function (event) {
        if (event.name === 'word') {
            currentCharIndex = adjustedStartIndex + event.charIndex;

            // Update currentWordIndex based on the number of words read
            const textUpToCurrent = reviewText.slice(0, currentCharIndex);
            currentWordIndex = textUpToCurrent.trim().split(/\s+/).length - 1;

            // Scroll to the current reading position
            scrollToCurrentPosition();
        }
    };

    // Handle when the utterance finishes
    utterance.onend = function () {
        isSpeaking = false;
        document.getElementById('tts-button').innerText = "Read Review Aloud";
        toggleControlsVisibility(true); // Show controls when TTS stops
    };

    // Start speaking
    synth.speak(utterance);

    isSpeaking = true;
    document.getElementById('tts-button').innerText = "Stop Reading";

    // Scroll to current position at the start
    scrollToCurrentPosition();

    // Hide controls when TTS starts
    toggleControlsVisibility(false);
}

// Function to scroll the review container to the current reading position
function scrollToCurrentPosition() {
    // Calculate the percentage of the text that has been read
    const scrollPercentage = currentCharIndex / reviewText.length;

    // Calculate the new scrollTop position
    const maxScrollTop = reviewContainer.scrollHeight - reviewContainer.clientHeight;
    const newScrollTop = maxScrollTop * scrollPercentage;

    // Update the scrollTop position
    reviewContainer.scrollTop = newScrollTop;
}

// Function to handle play/stop functionality
function speakText() {
    if (isSpeaking) {
        // If TTS is currently speaking, cancel speech and update state
        synth.cancel();
        isSpeaking = false;
        document.getElementById('tts-button').innerText = "Read Review Aloud";
        toggleControlsVisibility(true); // Show controls when TTS stops
    } else {
        // Start speech from current position
        speakTextFromWordIndex(currentWordIndex);
    }
}

// Start or stop reading aloud on button click
document.getElementById('tts-button').addEventListener('click', function () {
    speakText();
});

// Start from the beginning
document.getElementById('start-from-beginning').addEventListener('click', function () {
    synth.cancel();
    currentWordIndex = 0;
    currentCharIndex = 0;
    speakTextFromWordIndex(0);
});

// Calculate word index movement for 15 seconds
function calculateWordOffset(seconds) {
    return Math.round(seconds * WORDS_PER_SECOND);
}

// Go back 15 seconds
document.getElementById('go-back-15').addEventListener('click', function () {
    synth.cancel();
    const wordOffset = calculateWordOffset(SECONDS_INTERVAL);
    currentWordIndex = Math.max(0, currentWordIndex - wordOffset);
    speakTextFromWordIndex(currentWordIndex);
});

// Go forward 15 seconds
document.getElementById('go-forward-15').addEventListener('click', function () {
    synth.cancel();
    const wordOffset = calculateWordOffset(SECONDS_INTERVAL);
    currentWordIndex = Math.min(wordsArray.length - 1, currentWordIndex + wordOffset);
    speakTextFromWordIndex(currentWordIndex);
});

// Handle volume adjustments dynamically
document.getElementById('volume').addEventListener('input', function () {
    volumeLevel = this.value / 10;
    if (isSpeaking) {
        synth.cancel();
        speakTextFromWordIndex(currentWordIndex);
    }
});

// Ensure speech is stopped when the user navigates away
window.addEventListener('beforeunload', function () {
    synth.cancel();
    toggleControlsVisibility(true); // Show controls on unload
});

// Function to toggle the visibility of the reviews list
document.getElementById('toggle-reviews').addEventListener('click', function() {
    toggleReviews();
});

// Function to open the reviews list if it's closed
document.getElementById('nav-reviews').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    const reviewList = document.getElementById('review-list');

    // Scroll to the all-reviews section smoothly
    document.getElementById('all-reviews').scrollIntoView({ behavior: 'smooth' });

    // Wait for the initial scroll to finish, then adjust the scroll slightly to show the expanded list
    setTimeout(function() {
        // If the review list is not open, expand it and scroll down a bit more
        if (reviewList.style.display === 'none' || reviewList.style.display === '') {
            toggleReviews();
        }

        // Adjust the scroll position slightly based on screen size to make sure the expanded list is fully visible
        const additionalScroll = window.innerWidth > 768 ? 400 : 180; // Adjust scroll distance based on screen width
        window.scrollBy(0, additionalScroll); // Scroll down a bit more to show the expanded list
    }, 600); // Adjust the delay to match the scroll speed if necessary
});

// Helper function to toggle reviews
function toggleReviews() {
    const reviewList = document.getElementById('review-list');
    const toggleButton = document.getElementById('toggle-reviews');

    if (reviewList.style.display === 'none' || reviewList.style.display === '') {
        reviewList.style.display = 'block';
        toggleButton.innerText = 'Close';  // Change button text
        setTimeout(function() {
            // Scroll to the top of the review list after expanding
            reviewList.scrollIntoView({ behavior: 'smooth' });
        }, 200); // Wait a bit to allow for the opening animation
    } else {
        reviewList.style.display = 'none';
        toggleButton.innerText = 'All Tracks Reviews';  // Change button text back
    }
}

// Event listener to handle screen resizing and adjust scrolling dynamically
window.addEventListener('resize', function() {
    const reviewList = document.getElementById('review-list');

    if (reviewList.style.display === 'block') {
        // Adjust the scroll position dynamically if the list is open and the screen is resized
        const additionalScroll = window.innerWidth > 768 ? 200 : 180;
        window.scrollBy(0, additionalScroll);
    }
});

window.onload = () => {
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
};