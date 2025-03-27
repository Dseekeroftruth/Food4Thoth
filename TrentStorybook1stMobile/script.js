document.addEventListener('DOMContentLoaded', () => {


  // ----------------------------------------------------
  // PANEL / GALLERY LOGIC
  // ----------------------------------------------------
  const container = document.querySelector('.gallery-container');
  const panels = Array.from(document.querySelectorAll('.story-panel'));

  // We'll store the index of the panel currently in view:
  let currentPanelIndex = 0;

  // Utility to safely get the current panel from the index
  function getCurrentPanel() {
    return panels[currentPanelIndex] || null;
  }

  // Utility to update currentPanelIndex manually
  function setCurrentPanelIndex(newIndex) {
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= panels.length) newIndex = panels.length - 1;
    currentPanelIndex = newIndex;
  }

  // IntersectionObserver callback: track which panel is visible
  const observerOptions = {
    root: container,
    threshold: 0.85 // >85% visible to count as "in view"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Update current panel index whenever a panel is >85% in the viewport
        const newIndex = panels.indexOf(entry.target);
        setCurrentPanelIndex(newIndex);

        // Also reset the panel to its first sentence
        resetPanelToFirstSentence(entry.target);
      }
    });
  }, observerOptions);

  panels.forEach(panel => observer.observe(panel));

  // This resets a panel's text to the first sentence
  function resetPanelToFirstSentence(panel) {
    const textContainer = panel.querySelector('.story-text-container');
    if (!textContainer) return;
    const sentences = Array.from(textContainer.querySelectorAll('.sentence'));
    if (sentences.length === 0) return;

    // Immediately scroll to top, hide all sentences
    textContainer.scrollTo({ top: 0, behavior: 'auto' });
    gsap.set(sentences, { opacity: 0, y: 20 });
    // Reveal only the first sentence
    gsap.to(sentences[0], { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  }

  // Called when we explicitly want to "reset" (e.g. scrolling to next/prev)
  function resetPanel(panel) {
    // If you prefer not to reset sentences each time user hits next/prev, you could remove this call
    resetPanelToFirstSentence(panel);
  }

  // ----------------------------------------------------
  // NAVIGATION: PREV / NEXT PANEL
  // ----------------------------------------------------
  function scrollToPrevPanel() {
    // Use currentPanelIndex to go to the previous
    if (currentPanelIndex > 0) {
      resetPanel(getCurrentPanel());
      setCurrentPanelIndex(currentPanelIndex - 1);
      panels[currentPanelIndex].scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
  }

  function scrollToNextPanel() {
    if (currentPanelIndex < panels.length - 1) {
      resetPanel(getCurrentPanel());
      setCurrentPanelIndex(currentPanelIndex + 1);
      panels[currentPanelIndex].scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
  }

  // Hook up main "Prev" / "Next" story buttons
  document.querySelector('.prev-story').addEventListener('click', scrollToPrevPanel);
  document.querySelector('.next-story').addEventListener('click', scrollToNextPanel);

  // Hook up inline next/prev for each panel
  document.querySelectorAll('.prev-story1').forEach(btn => btn.addEventListener('click', scrollToPrevPanel));
  document.querySelectorAll('.next-story1').forEach(btn => btn.addEventListener('click', 
      scrollToNextPanel));
	  
	  
	  

  // ----------------------------------------------------
  // SENTENCE FADE-IN LOGIC
  // ----------------------------------------------------
  document.querySelectorAll('.story-text-container').forEach(textContainer => {
    const sentences = Array.from(textContainer.querySelectorAll('.sentence'));
    if (sentences.length > 0) {
      gsap.set(sentences, { opacity: 0, y: 20 });
      gsap.set(sentences[0], { opacity: 1, y: 0 });
    }

    textContainer.addEventListener('scroll', () => {
      if (sentences.length === 0) return;
      const containerCenter = textContainer.scrollTop + (textContainer.clientHeight / 2);
      let closestIndex = 0;
      let closestDistance = Infinity;

      sentences.forEach((sentence, i) => {
        const sentenceCenter = sentence.offsetTop + (sentence.offsetHeight / 2);
        const distance = Math.abs(sentenceCenter - containerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      // Hide all, show only the closest one
      gsap.set(sentences, { opacity: 0, y: 20 });
      gsap.to(sentences[closestIndex], { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' });
    });
  });

  // ----------------------------------------------------
  // SENTENCE NAVIGATION (↑ / ↓)
  // ----------------------------------------------------
  function getCenteredSentenceIndex(container, sentences) {
    const containerCenter = container.scrollTop + (container.clientHeight / 2);
    let closestIndex = 0;
    let closestDistance = Infinity;
    sentences.forEach((sentence, i) => {
      const sentenceCenter = sentence.offsetTop + (sentence.offsetHeight / 2);
      const distance = Math.abs(sentenceCenter - containerCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });
    return closestIndex;
  }

  function centerSentence(container, sentence) {
    const targetScroll = sentence.offsetTop + (sentence.offsetHeight / 2)
                        - (container.clientHeight / 2);
    container.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }

  document.querySelector('.prev-sentence').addEventListener('click', () => {
    const visiblePanel = getCurrentPanel();
    if (!visiblePanel) return;
    const textContainer = visiblePanel.querySelector('.story-text-container');
    if (!textContainer) return;
    const sentences = Array.from(textContainer.querySelectorAll('.sentence'));
    if (sentences.length === 0) return;
    const currentIndex = getCenteredSentenceIndex(textContainer, sentences);
    const newIndex = Math.max(0, currentIndex - 1);
    centerSentence(textContainer, sentences[newIndex]);
  });

  document.querySelector('.next-sentence').addEventListener('click', () => {
    const visiblePanel = getCurrentPanel();
    if (!visiblePanel) return;
    const textContainer = visiblePanel.querySelector('.story-text-container');
    if (!textContainer) return;
    const sentences = Array.from(textContainer.querySelectorAll('.sentence'));
    if (sentences.length === 0) return;
    const currentIndex = getCenteredSentenceIndex(textContainer, sentences);
    const newIndex = Math.min(sentences.length - 1, currentIndex + 1);
    centerSentence(textContainer, sentences[newIndex]);
  });

  // ----------------------------------------------------
  // PREVENT DOUBLE-TAP ZOOM ON iOS
  // ----------------------------------------------------
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // ----------------------------------------------------
  // ORIENTATION & RESIZE: DISABLE SNAP, SCROLL BACK
  // ----------------------------------------------------
  let resizeTimeout;

  function handleOrientationOrResize() {
    // Save the current panel index
    const lockedPanelIndex = currentPanelIndex;

    // Show the loading overlay
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.remove('hidden');

    // Temporarily disable observer
    observer.disconnect();

    // Temporarily disable snap
    container.style.scrollSnapType = 'none';

    // Wait for the layout to stabilize
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Scroll explicitly to the saved panel index
      const targetPanel = panels[lockedPanelIndex];
      if (targetPanel) {
        targetPanel.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'start',
        });
      }

      // Re-enable snap and resume observer
      setTimeout(() => {
        container.style.scrollSnapType = 'x mandatory';
        panels.forEach(panel => observer.observe(panel));

        // Hide the loading overlay once adjustments are done
        overlay.classList.add('hidden');
      }, 300);
    }, 300);
  }

  window.addEventListener('orientationchange', handleOrientationOrResize);
  window.addEventListener('resize', handleOrientationOrResize);
});



