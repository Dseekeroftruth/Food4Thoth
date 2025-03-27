


/***************************************************
 * 1b. Controls Toggling
 ***************************************************/
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle-Controls1');
  const navigation = document.getElementById('controls');
  const navigation1 = document.getElementById('controls1');
  const navigation2 = document.getElementById('controls2');
  const navigation3 = document.getElementById('start-audio-btn');
  const navigation4 = document.getElementById('stop-audio-btn');
  const navigation5 = document.getElementById('h1');

  toggleButton.addEventListener('click', () => {
    const isHidden = navigation.classList.toggle('hidden');
    toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
  });
  toggleButton.addEventListener('click', () => {
    const isHidden = navigation1.classList.toggle('hidden');
    toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
  });
  toggleButton.addEventListener('click', () => {
    const isHidden = navigation2.classList.toggle('hidden');
    toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
  });
  toggleButton.addEventListener('click', () => {
    const isHidden = navigation3.classList.toggle('hidden');
    toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
  });
  toggleButton.addEventListener('click', () => {
    const isHidden = navigation4.classList.toggle('hidden');
    toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
  });
  toggleButton.addEventListener('click', () => {
    const isHidden = navigation5.classList.toggle('hidden');
    toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
  });
});

/***************************************************
 * 2. Canvas Resizing Setup
 ***************************************************/
const canvas = document.getElementById("visualization");
const ctx = canvas.getContext("2d");
const canvas1 = document.getElementById("visualization1");
const ctx1 = canvas1.getContext("2d");
const canvas2 = document.getElementById("visualization2");
const ctx2 = canvas2.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function resizeCanvas1() {
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas1);
resizeCanvas1();

function resizeCanvas2() {
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas2);
resizeCanvas2();

/***************************************************
 * 3. Audio & Visualization Setup
 ***************************************************/
let audioContext = null;
let micStream = null;
let playbackAudio = null;
let micAnalyser = null;
let playbackAnalyser = null;
let mediaSource = null;

/** 
 * This 'analyser' variable is what all visualizations use.
 * We switch it between micAnalyser and playbackAnalyser 
 * depending on which audio source is currently active.
 */
let analyser = null;

/**
 * Keep track of whether mic or playback is active:
 */
let micActive = false;
let playbackActive = false;

/** 
 * We'll store the requestAnimationFrame IDs for each visualization,
 * so we can cancel them if needed.
 */
let animationFrameId = null;
let animationFrameId1 = null;
let animationFrameId2 = null;

let bufferLength = 0;
let dataArray = null;

// Microphone buttons
const startAudioBtn = document.getElementById("start-audio-btn");
const stopAudioBtn = document.getElementById("stop-audio-btn");

// File input + Playback buttons
const fileInput = document.getElementById('file-upload');
const startPlaybackBtn = document.getElementById('start-visualization-btn');
const stopPlaybackBtn = document.getElementById('stop-visualization-btn');

/***************************************************
 * 3a. Initialize AudioContext
 ***************************************************/
function initializeAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

/***************************************************
 * RESET FUNCTION: Clears visuals & stops old playback
 ***************************************************/
function resetVisualsAndPlayback() {
  // Stop current playback if any
  if (playbackAudio) {
    playbackAudio.pause();
    playbackAudio.currentTime = 0; // Reset to beginning
    playbackAudio = null;
  }

  // Cancel all animation frames
  cancelAnimationFrame(animationFrameId);
  cancelAnimationFrame(animationFrameId1);
  cancelAnimationFrame(animationFrameId2);

  // Clear canvases
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  // Reset fractal/visualization variables
  angle = 0;       colorOffset = 0;
  angle1 = 0;      colorOffset1 = 0;
  angle2 = 0;      colorOffset2 = 0;

  // Mark playback as inactive
  playbackActive = false;

  // If mic isn't on, set analyser to null
  if (!micActive) {
    analyser = null;
  }

  // Re-enable the Start Visualization button, hide the Stop button
  startPlaybackBtn.disabled = false;
  stopPlaybackBtn.classList.add('hidden');
  startPlaybackBtn.classList.remove('hidden');

  console.log("Visuals & playback reset for new file.");
}

/***************************************************
 * 3b. Initialize Microphone
 ***************************************************/
async function initializeMic() {
  initializeAudioContext();

  // Stop existing mic stream if any
  if (micStream) {
    micStream.getTracks().forEach(track => track.stop());
    micStream = null;
  }

  // Request microphone
  micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const source = audioContext.createMediaStreamSource(micStream);

  // Create micAnalyser if needed
  if (!micAnalyser) {
    micAnalyser = audioContext.createAnalyser();
    micAnalyser.fftSize = 256;
  }

  // Connect source -> micAnalyser
  source.connect(micAnalyser);

  // Set as active
  micActive = true;
  analyser = micAnalyser; // Let mic override if both are on
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
}

/***************************************************
 * 3c. Initialize Playback Audio
 ***************************************************/
function initializePlaybackAudio(file) {
  initializeAudioContext();

  // Create new audio element from file
  playbackAudio = new Audio(URL.createObjectURL(file));
  playbackAudio.crossOrigin = 'anonymous';

  // Create/Connect playback source -> playbackAnalyser -> destination
  if (!playbackAnalyser) {
    playbackAnalyser = audioContext.createAnalyser();
    playbackAnalyser.fftSize = 256;
  }
  const playbackSource = audioContext.createMediaElementSource(playbackAudio);
  playbackSource.connect(playbackAnalyser);
  playbackAnalyser.connect(audioContext.destination);

  // Mark as active (but doesn't play until 'Start Visualization')
  playbackActive = true;
  analyser = playbackAnalyser; // If mic is also active, last started wins
  bufferLength = playbackAnalyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  startPlaybackBtn.disabled = false;
  console.log("Playback audio initialized.");
}

/***************************************************
 * 3d. Start/Stop Microphone Buttons
 ***************************************************/
startAudioBtn.addEventListener("click", async () => {
  try {
    await initializeMic();
    startVisuals(); // Start all 3 visual loops if not already running

    startAudioBtn.classList.add("hidden");
    stopAudioBtn.classList.remove("hidden");
    console.log("Microphone started; visualizations running.");
  } catch (err) {
    console.error("Failed to start microphone:", err);
    alert("Unable to start microphone. Check permissions.");
  }
});

stopAudioBtn.addEventListener("click", () => {
  if (micStream) {
    micStream.getTracks().forEach(track => track.stop());
    micStream = null;
  }
  micActive = false;

  // If playback is still active, switch to playbackAnalyser
  if (playbackActive && playbackAnalyser) {
    analyser = playbackAnalyser;
  } else {
    analyser = null;
  }

  stopAudioBtn.classList.add("hidden");
  startAudioBtn.classList.remove("hidden");
  console.log("Microphone stopped.");
});

/***************************************************
 * 3e. Start/Stop Playback Buttons
 ***************************************************/
// When user selects file
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    // *** 1. Reset old visuals & playback
    resetVisualsAndPlayback();

    // *** 2. Initialize new file
    initializePlaybackAudio(file);
  }
});

// "Start Visualization" with uploaded file
startPlaybackBtn.addEventListener('click', () => {
  if (playbackAudio) {
    playbackAudio.play();
    startVisuals(); // Start all 3 visual loops if not already running

    startPlaybackBtn.classList.add('hidden');
    stopPlaybackBtn.classList.remove('hidden');
    console.log("Playback started; visualizations running.");
  }
});

// "Stop Visualization" with uploaded file
stopPlaybackBtn.addEventListener('click', () => {
  if (playbackAudio) {
    playbackAudio.pause();
  }
  playbackActive = false;

  // If mic is still active, switch back to micAnalyser
  if (micActive && micAnalyser) {
    analyser = micAnalyser;
  } else {
    analyser = null;
  }

  stopPlaybackBtn.classList.add('hidden');
  startPlaybackBtn.classList.remove('hidden');
  console.log("Playback paused.");
});

/***************************************************
 * 3f. Single Function to Start All Visuals
 ***************************************************/
function startVisuals() {
  requestAnimationFrame(drawFractal);
  requestAnimationFrame(drawVisualization1);
  requestAnimationFrame(drawVisualization2);
}

/***************************************************
 * 3g. Device Change Handling (Optional)
 ***************************************************/
navigator.mediaDevices.ondevicechange = async () => {
  console.log("Device change detected. Reinitializing audio (mic) if active...");
  try {
    if (micActive) {
      await initializeMic();
    }
  } catch (err) {
    console.error("Error reinitializing audio after device change:", err);
  }
};

/***************************************************
 * 3h. Safety fallback if mic stream ends unexpectedly
 ***************************************************/
setInterval(() => {
  if (micStream && micStream.getTracks().some(track => track.readyState === "ended")) {
    console.log("Microphone stream ended. Attempting to reinitialize...");
    initializeMic().catch(err => {
      console.error("Failed to reinitialize mic stream:", err);
    });
  }
}, 1000);

/***************************************************
 * 4. Visualization Toggles (Fractal, Viz1, Viz2)
 ***************************************************/
let isVisualizationRunning = true;   // for Fractal
let isVisualizationRunning1 = true;  // for Visualization1
let isVisualizationRunning2 = true;  // for Visualization2

const toggleVisualizationBtn = document.getElementById("toggle-visualization-btn");
toggleVisualizationBtn.addEventListener("click", () => {
  isVisualizationRunning = !isVisualizationRunning;
  toggleVisualizationBtn.textContent = isVisualizationRunning ? "Hide Visualization" : "Show Visualization";

  if (!isVisualizationRunning) {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    requestAnimationFrame(drawFractal);
  }
});

const toggleVisualizationBtn1 = document.getElementById("toggle-visualization-btn1");
toggleVisualizationBtn1.addEventListener("click", () => {
  isVisualizationRunning1 = !isVisualizationRunning1;
  toggleVisualizationBtn1.textContent = isVisualizationRunning1 ? "Hide Visualization" : "Show Visualization";

  if (!isVisualizationRunning1) {
    cancelAnimationFrame(animationFrameId1);
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  } else {
    requestAnimationFrame(drawVisualization1);
  }
});

const toggleVisualizationBtn2 = document.getElementById("toggle-visualization-btn2");
toggleVisualizationBtn2.addEventListener("click", () => {
  isVisualizationRunning2 = !isVisualizationRunning2;
  toggleVisualizationBtn2.textContent = isVisualizationRunning2 ? "Hide Visualization" : "Show Visualization";

  if (!isVisualizationRunning2) {
    cancelAnimationFrame(animationFrameId2);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  } else {
    requestAnimationFrame(drawVisualization2);
  }
});

/***************************************************
 * 5. Slider Controls for Each Visualization
 ***************************************************/
// For fractal
let spinSpeed = 1, spiralSpreadFactor = 4, shapeSizeFactor = 1;
function updateSpinSpeed(value) {
  spinSpeed = parseFloat(value);
  document.getElementById("spin-speed-label").textContent = value;
}
function updateSpiralSpread(value) {
  spiralSpreadFactor = parseInt(value, 10);
  document.getElementById("spiral-spread-label").textContent = value;
}
function updateShapeSizeFactor(value) {
  shapeSizeFactor = parseFloat(value);
  document.getElementById("shape-size-factor-label").textContent = value;
}

// For Visualization1
let spinSpeed1 = 1, spiralSpreadFactor1 = 4, shapeSizeFactor1 = 1;
function updateSpinSpeed1(value) {
  spinSpeed1 = parseFloat(value);
  document.getElementById("spin-speed-label1").textContent = value;
}
function updateSpiralSpread1(value) {
  spiralSpreadFactor1 = parseInt(value, 10);
  document.getElementById("spiral-spread-label1").textContent = value;
}
function updateShapeSizeFactor1(value) {
  shapeSizeFactor1 = parseFloat(value);
  document.getElementById("shape-size-factor-label1").textContent = value;
}

// For Visualization2
let spinSpeed2 = 1, spiralSpreadFactor2 = 4, shapeSizeFactor2 = 1;
function updateSpinSpeed2(value) {
  spinSpeed2 = parseFloat(value);
  document.getElementById("spin-speed-label2").textContent = value;
}
function updateSpiralSpread2(value) {
  spiralSpreadFactor2 = parseInt(value, 10);
  document.getElementById("spiral-spread-label2").textContent = value;
}
function updateShapeSizeFactor2(value) {
  shapeSizeFactor2 = parseFloat(value);
  document.getElementById("shape-size-factor-label2").textContent = value;
}

/***************************************************
 * 6. Actual Drawing Logic for Each Visualization
 ***************************************************/

// Shared angles, color offsets
let angle = 0,     colorOffset = 0;
let angle1 = 0,    colorOffset1 = 0;
let angle2 = 0,    colorOffset2 = 0;

// 6a. Fractal Visualization
function drawFractal() {
  if (!isVisualizationRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  ctx.save();
  ctx.translate(cx, cy);

  if (analyser && dataArray) {
    analyser.getByteFrequencyData(dataArray);
  }

  const avgAmp = dataArray ? dataArray.reduce((sum, v) => sum + v, 0) / bufferLength : 0;
  const maxAmp = dataArray ? Math.max(...dataArray) : 0;
  const normMax = maxAmp / 255;
  const patternType = normMax > 0.5 ? "spiral" : "circle";

  const totalSpirals = 20;
  const angleBetweenSpirals = (spiralSpreadFactor * Math.PI) / totalSpirals;

  for (let j = 0; j < totalSpirals; j++) {
    const isMirrored = j >= totalSpirals / 2;
    const spiralBaseAngle = j * angleBetweenSpirals;

    for (let i = 0; i < 360; i += 5) {
      const fraction = i / 360;
      let rad = 0;
      if (patternType === "spiral") {
        rad = fraction * 200 + (avgAmp / 255) * 150;
      } else {
        rad = (avgAmp / 255) * 200;
      }

      const sign = isMirrored ? -1 : 1;
      const shapeRotation = spiralBaseAngle + sign * (angle + i) * (Math.PI / 180);

      ctx.save();
      ctx.rotate(shapeRotation);

      const hue = (i + colorOffset + avgAmp * 2 + j * 18) % 360;
      const saturation = 50 + (avgAmp / 255) * 50;
      ctx.fillStyle = `hsl(${hue}, ${saturation}%, 50%)`;

      const rectSize = 10 * shapeSizeFactor;
      if (patternType === "spiral") {
        ctx.fillRect(rad, rad * 0.01, rectSize, rectSize);
      } else {
        // circle
        ctx.beginPath();
        const circleRadius = (avgAmp / 255) * 10;
        ctx.arc(rad, rad * 0.01, circleRadius, 0, 2 * Math.PI);
        ctx.fill();
      }
      ctx.restore();
    }
  }
  ctx.restore();

  // Update angles/color
  const amplitudeFactor = 0.2 + normMax; 
  angle += spinSpeed * amplitudeFactor;
  colorOffset += 0.9 + (avgAmp / 255);

  animationFrameId = requestAnimationFrame(drawFractal);
}

// 6b. Visualization1
function drawVisualization1() {
  if (!isVisualizationRunning1) return;
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

  if (analyser && dataArray) {
    analyser.getByteFrequencyData(dataArray);
  }

  const avgAmplitude = dataArray ? dataArray.reduce((sum, v) => sum + v, 0) / bufferLength : 0;
  const maxAmplitude = dataArray ? Math.max(...dataArray) : 0;
  const normMax1 = maxAmplitude / 255;

  const centerX = canvas1.width / 2;
  const centerY = canvas1.height / 2;
  ctx1.save();
  ctx1.translate(centerX, centerY);

  const totalSpirals = 20;
  const angleBetweenSpirals = (spiralSpreadFactor1 * Math.PI) / totalSpirals;

  for (let i = 0; i < totalSpirals; i++) {
    ctx1.save();
    ctx1.rotate(i * angleBetweenSpirals + angle1);

    for (let j = 0; j < 360; j += 10) {
      const isMirrored1 = j >= totalSpirals / 2;
      const spiralBaseAngle1 = j * angleBetweenSpirals;
      const radius = j + avgAmplitude;
      const x = radius * Math.cos(j * (Math.PI / 180));
      const y = radius * Math.sin(j * (Math.PI / 180));

      const sign1 = isMirrored1 ? -2 : 2;
      const shapeRotation1 = spiralBaseAngle1 + sign1 * (angle1 + i) * (Math.PI / 180);
      ctx1.rotate(shapeRotation1);

      const shapeSize = (avgAmplitude / 10) * shapeSizeFactor1;
      const hue = (j + colorOffset1) % 360;
      ctx1.fillStyle = `hsl(${hue}, 100%, 50%)`;

      if (maxAmplitude > 250) {
        drawShape(ctx1, x, y, shapeSize, 'triangle');
      } else if (maxAmplitude > 170) {
        drawShape(ctx1, x, y, shapeSize, 'square');
      } else if (maxAmplitude > 120) {
        drawShape(ctx1, x, y, shapeSize, 'circle');
      } else {
        ctx1.fillRect(x, y, 3 * shapeSizeFactor1, 3 * shapeSizeFactor1);
      }
    }
    ctx1.restore();
  }
  ctx1.restore();

  const amplitudeFactor1 = 0 + (normMax1 * 0.1);
  angle1 += spinSpeed1 * amplitudeFactor1;
  colorOffset1 += 0.9 + (avgAmplitude / 255);

  animationFrameId1 = requestAnimationFrame(drawVisualization1);
}

// shape drawing for Visualization1
function drawShape(ctx1, x, y, size, shape) {
  ctx1.beginPath();
  switch (shape) {
    case 'circle':
      ctx1.arc(x, y, size, 0, 8 * Math.PI);
      break;
    case 'square':
      ctx1.rect(x - size / 20, y - size / 20, size, size);
      break;
    case 'triangle':
      ctx1.moveTo(x, y - size);
      ctx1.lineTo(x - size, y + size);
      ctx1.lineTo(x + size, y + size);
      ctx1.closePath();
      break;
  }
  ctx1.fill();
}

// 6c. Visualization2
function drawVisualization2() {
  if (!isVisualizationRunning2) return;
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  const cx = canvas2.width / 2;
  const cy = canvas2.height / 2;
  ctx2.save();
  ctx2.translate(cx, cy);

  if (analyser && dataArray) {
    analyser.getByteFrequencyData(dataArray);
  }

  const avgAmp2 = dataArray ? dataArray.reduce((sum, v) => sum + v, 0) / bufferLength : 0;
  const maxAmp2 = dataArray ? Math.max(...dataArray) : 0;
  const normMax2 = maxAmp2 / 255;

  const totalSpirals = 20;
  const angleBetweenSpirals = (spiralSpreadFactor2 * Math.PI) / totalSpirals;

  for (let i = 0; i < totalSpirals; i++) {
    ctx2.save();
    ctx2.rotate(i * angleBetweenSpirals + angle2);

    for (let j = 0; j < 360; j += 10) {
      const radius = j + avgAmp2;
      const x = radius * Math.cos(j * (Math.PI / 180));
      const y = radius * Math.sin(j * (Math.PI / 180));

      const shapeSize = (avgAmp2 / 10) * shapeSizeFactor2;
      const hue = (j + colorOffset2) % 360;
      ctx2.fillStyle = `hsl(${hue}, 100%, 50%)`;

      if (maxAmp2 > 250) {
        drawShape2(ctx2, x, y, shapeSize, 'triangle');
      } else if (maxAmp2 > 170) {
        drawShape2(ctx2, x, y, shapeSize, 'square');
      } else if (maxAmp2 > 120) {
        drawShape2(ctx2, x, y, shapeSize, 'circle');
      } else {
        ctx2.fillRect(x, y, 3 * shapeSizeFactor2, 3 * shapeSizeFactor2);
      }
    }
    ctx2.restore();
  }
  ctx2.restore();

  angle2 += spinSpeed2 * (normMax2 * 0.1);
  colorOffset2 += 0.9 + (avgAmp2 / 255);

  animationFrameId2 = requestAnimationFrame(drawVisualization2);
}

// shape drawing for Visualization2
function drawShape2(ctx, x, y, size, shape) {
  ctx.beginPath();
  switch (shape) {
    case 'circle':
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      break;
    case 'square':
      ctx.rect(x - size / 2, y - size / 2, size, size);
      break;
    case 'triangle':
      ctx.moveTo(x, y - size);
      ctx.lineTo(x - size, y + size);
      ctx.lineTo(x + size, y + size);
      ctx.closePath();
      break;
  }
  ctx.fill();
}

/***************************************************
 * 5. iOS Compatibility Fix
 ***************************************************/
document.addEventListener('touchstart', () => {
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume().then(() => console.log('AudioContext resumed on iOS'));
  }
});
