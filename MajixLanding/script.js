document.querySelectorAll('.tarot-frame').forEach(frame => {
  frame.addEventListener('mouseover', function() {
    document.getElementById("background-iframe").src = this.getAttribute('data-bg');
  });
});
		
		// Function to reload the background iframe
function reloadBackgroundIframe() {
  let iframe = document.getElementById("background-iframe");
  let currentSrc = iframe.src;
  iframe.src = ""; // Temporarily clear the src
  setTimeout(() => {
    iframe.src = currentSrc; // Restore the original src after a short delay
  }, 200);
}

// Detect orientation change and reload the iframe
window.addEventListener("orientationchange", reloadBackgroundIframe);

// Alternative: Reload on window resize (helps with some edge cases)
window.addEventListener("resize", function () {
  if (window.innerHeight !== window.outerHeight) {
    reloadBackgroundIframe();
  }
});

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

