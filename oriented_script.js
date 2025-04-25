window.addEventListener("orientationchange", function() {
    if (window.orientation === 90 || window.orientation === -90) {
      document.body.innerHTML = "<div  style='text-align: center; font-style: Futura; margin-top: 15%; font-size: 24px;'><strong>Please rotate your device to portrait mode.</strong></div>";
    } else {
      location.reload(); // Reload the page when back in portrait
    }
  });