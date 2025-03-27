function toggleTranscript(button) {
    const transcriptContainer = button.closest('.transcript-container'); // Get the specific container
    const transcriptContent = transcriptContainer.querySelector('#transcript-content');

    if (transcriptContent.classList.contains('hidden')) {
        transcriptContent.classList.remove('hidden');
        button.textContent = 'Hide Transcript';
    } else {
        transcriptContent.classList.add('hidden');
        button.textContent = 'Show Transcript';
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
	
	document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('signatureVideo');
    const playButton = document.getElementById('playButton');
    let videoPlayed = false;

    function playVideo() {
        if (!videoPlayed) {
            videoPlayed = true;
            video.style.display = 'block'; // Show the video
            video.play().then(() => {
                console.log('Video started successfully.');
                playButton.classList.add('hidden'); // Hide play button if video plays
            }).catch(err => {
                console.error('Video play failed:', err);
                playButton.classList.remove('hidden'); // Show button on failure
            });
        }
    }
		
		// Function to start animations when the element enters the viewport
function startAnimation(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const container = entry.target;
            // Play all animations inside this container
            container.querySelectorAll('.path, .splatter').forEach(el => {
                el.style.animationPlayState = 'running'; // Start animation
            });
        }
    });
}

// Set up the Intersection Observer
const observer = new IntersectionObserver(startAnimation, {
    threshold: 0.5 // Trigger when 50% of the element is visible
});

// Observe the animation container
document.querySelectorAll('.animation-container').forEach(container => {
    observer.observe(container);
});

    // Try to trigger video play on scroll or mouse movement
    window.addEventListener('scroll', playVideo, { once: true });
    window.addEventListener('mousemove', playVideo, { once: true });

    // Fallback: Add play button listener if needed
    playButton.addEventListener('click', () => {
        video.play().then(() => {
            console.log('Video started from button click.');
            playButton.classList.add('hidden');
        }).catch(err => console.error('Failed to play video on button click:', err));
    });
});