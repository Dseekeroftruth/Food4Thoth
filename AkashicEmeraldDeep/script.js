
document.addEventListener('DOMContentLoaded', () => {
  const panels = document.querySelectorAll('.story-panel');
  const container = document.querySelector('.gallery-container');
	


  // Shared functions for navigation
  function getVisiblePanel() {
    const midpoint = container.scrollLeft + (container.clientWidth / 2);
    for (let panel of panels) {
      const containerRect = container.getBoundingClientRect();
      const panelStart = panel.offsetLeft - containerRect.left;
      const panelEnd = panelStart + panel.clientWidth;
      if (midpoint >= panelStart && midpoint <= panelEnd) {
        return panel;
      }
    }
    return null;
  }

  function resetPanel(panel) {
  const sentences = panel.querySelectorAll('.sentence');

  // Hide all sentences
  gsap.set(sentences, { opacity: 0, y: 20 });

  // Reveal only the first sentence
  if (sentences.length > 0) {
    gsap.set(sentences[0], { opacity: 1, y: 0 });
  }

  // Reset scroll position of the text container
  const textContainer = panel.querySelector('.story-text-container');
  if (textContainer) {
    textContainer.scrollTop = 0; // Scroll back to the top
  }
}



  function scrollToPrevPanel() {
    const visiblePanel = getVisiblePanel();
    if (!visiblePanel) return;
    const prevPanel = visiblePanel.previousElementSibling;
    if (prevPanel && prevPanel.classList.contains('story-panel')) {
      resetPanel(visiblePanel);
      prevPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function scrollToNextPanel() {
    const visiblePanel = getVisiblePanel();
    if (!visiblePanel) return;
    const nextPanel = visiblePanel.nextElementSibling;
    if (nextPanel && nextPanel.classList.contains('story-panel')) {
      resetPanel(visiblePanel);
      nextPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Add event listeners for main controls
  document.querySelector('.prev-story').addEventListener('click', scrollToPrevPanel);
  document.querySelector('.next-story').addEventListener('click', scrollToNextPanel);

  // Add event listeners for inline (end-of-sentence) controls
  document.querySelectorAll('.prev-story1').forEach(btn => btn.addEventListener('click', scrollToPrevPanel));
  document.querySelectorAll('.next-story1').forEach(btn => btn.addEventListener('click', scrollToNextPanel));

  // Intersection Observer to reset panel to first sentence on visibility
  const observerOptions = {
    root: container,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const panel = entry.target;
      if (entry.isIntersecting) {
        resetPanelToFirstSentence(panel);
      }
    });
  }, observerOptions);

  panels.forEach((panel) => {
    observer.observe(panel);
  });

  function resetPanelToFirstSentence(panel) {
    const textContainer = panel.querySelector('.story-text-container');
    const sentences = textContainer ? Array.from(textContainer.querySelectorAll('.sentence')) : [];

    if (textContainer && sentences.length > 0) {
      textContainer.scrollTo({ top: 0, behavior: 'auto' });
      gsap.set(sentences, { opacity: 0, y: 20 });
      gsap.to(sentences[0], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    }
  }

  document.querySelectorAll('.story-text-container').forEach(textContainer => {
    const sentences = Array.from(textContainer.querySelectorAll('.sentence'));
    let currentIndex = 0;

    if (sentences.length > 0) {
      gsap.set(sentences, {opacity:0, y:20});
      gsap.set(sentences[0], {opacity:1, y:0});
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

      if (closestIndex !== currentIndex) {
        if (sentences[currentIndex]) {
          gsap.to(sentences[currentIndex], {opacity:0, y:20, duration:0.3, ease:"power2.in"});
        }
        gsap.to(sentences[closestIndex], {opacity:1, y:0, duration:0.5, ease:"power2.out"});
        currentIndex = closestIndex;
      }
    });
  });

  // Sentence navigation
  document.querySelector('.prev-sentence').addEventListener('click', () => {
    const visiblePanel = getVisiblePanel();
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
    const visiblePanel = getVisiblePanel();
    if (!visiblePanel) return;
    const textContainer = visiblePanel.querySelector('.story-text-container');
    if (!textContainer) return;
    const sentences = Array.from(textContainer.querySelectorAll('.sentence'));
    if (sentences.length === 0) return;
    const currentIndex = getCenteredSentenceIndex(textContainer, sentences);
    const newIndex = Math.min(sentences.length - 1, currentIndex + 1);
    centerSentence(textContainer, sentences[newIndex]);
  });

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
    const targetScroll = sentence.offsetTop + (sentence.offsetHeight / 2) - (container.clientHeight / 2);
    container.scrollTo({top: targetScroll, behavior: 'smooth'});
  }

});

window.addEventListener("pageshow", function(event) {
  if (event.persisted) {
    // Force a top reset or re-initialization
    window.scrollTo(0, 0); 
  }
});

