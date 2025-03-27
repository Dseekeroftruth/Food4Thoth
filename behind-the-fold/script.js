const box = document.querySelector('.box');
const linkContainer = document.getElementById('linkContainer');
const audio = document.getElementById('door-audio');
let isPushed = false;
let isAudioPlaying = false;

// Ensure audio starts from the beginning on page load
window.addEventListener('load', () => {
  audio.currentTime = 0;  // Start at the beginning
});

box.addEventListener('click', () => {
  if (box.classList.contains('moving')) return;

  box.classList.add('moving');
  box.classList.remove('pushed', 'reverse');
  void box.offsetWidth; // Force reflow to restart animation

  if (isPushed) {
    box.classList.add('reverse');
    hideLink();
    pauseAudio();
  } else {
    box.classList.add('pushed');
    setTimeout(() => {
      showLink();
    }, 2000);

    resumeAudio();
  }

  isPushed = !isPushed;
});

box.addEventListener('animationend', () => {
  box.classList.remove('moving');
});

function showLink() {
  linkContainer.classList.remove('hidden');
  linkContainer.classList.add('visible');
}

function hideLink() {
  linkContainer.classList.remove('visible');
  linkContainer.classList.add('hidden');
}

function resumeAudio() {
  if (audio.currentTime < audio.duration && !isAudioPlaying) {
    audio.play();
    isAudioPlaying = true;
  }
}

function pauseAudio() {
  if (!audio.paused && isAudioPlaying) {
    audio.pause();
    isAudioPlaying = false;
  }
}

// Ensure the audio stops after it completes once
audio.addEventListener('ended', () => {
  isAudioPlaying = false;
  audio.currentTime = 0; // Reset audio to start
});