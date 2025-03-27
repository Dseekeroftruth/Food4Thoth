/* =========================================================
   1) TONE.JS SETUP: Define tracks (loops) and effects
   ========================================================= */

// Replace these with your own file paths for loops:
const trackData = [
  { name: "NoseLoop",     url: "./song1/LoopAsia1.m4a",   loop: true },
  { name: "LeftEarLoop",  url: "./song1/LoopFlute4.m4a",  loop: true },
  { name: "RightEarLoop", url: "./song1/LoopFlute3.m4a",  loop: true },
  { name: "MouthLoop",    url: "./song1/LoopFlute2.m4a", loop: true },
  { name: "LeftEyeLoop",  url: "./song1/LoopSynth1.m4a",  loop: true },
  { name: "RightEyeLoop", url: "./song1/LoopFlute1.m4a",  loop: true },
  { name: "LeftHandLoop", url: "./song1/LoopDrum4.m4a", loop: true },
  { name: "RightHandLoop",url: "./song1/LoopDrum3.m4a", loop: true },
  { name: "LeftFootLoop", url: "./song1/LoopDrum2.m4a", loop: true },
  { name: "RightFootLoop",url:"./song1/LoopDrum1.m4a",  loop: true },
];

const trackToElementId = {
  "NoseLoop":      "nose",
  "LeftEarLoop":   "leftEar",
  "RightEarLoop":  "rightEar",
  "MouthLoop":     "mouth",
  "LeftEyeLoop":   "leftEye",
  "RightEyeLoop":  "rightEye",
  "LeftHandLoop":  "leftHand",
  "RightHandLoop": "rightHand",
  "LeftFootLoop":  "leftFoot",
  "RightFootLoop": "rightFoot"
};

// Reverb
const reverb = new Tone.Reverb({
  decay: 2,
  wet: 0,
}).toDestination();

// Delay
const delay = new Tone.FeedbackDelay({
  delayTime: 0.4,
  feedback: 0.3,
  wet: 0,
}).toDestination();

// Distortion
const distortion = new Tone.Distortion({
  distortion: 0.4, // if you want to also map 'distortion' param, you could
  wet: 0,          // we'll just map the wet for now
}).toDestination();

// Create the players and route them to each effect in parallel
const players = {};
trackData.forEach(track => {
  players[track.name] = new Tone.Player({
    url: track.url,
    loop: track.loop,
    autostart: false,
  })
    .connect(reverb)
    .connect(delay)
    .connect(distortion);
});

// Keep track of which loops are playing
const isPlaying = {};
trackData.forEach(track => {
  isPlaying[track.name] = false; // all start off
});

/* =========================================================
   2) INTERACTIVITY: 
      - Clicking body parts toggles loops
      - Drag tie => reverb.wet
      - Drag mustache => distortion.wet
      - Drag glasses => delay.wet
   ========================================================= */

/* ---------- 2A) Toggling body parts (click) ----------- */

const noseEl      = document.getElementById("nose");
const leftEarEl   = document.getElementById("leftEar");
const rightEarEl  = document.getElementById("rightEar");
const mouthEl     = document.getElementById("mouth");
const leftEyeEl   = document.getElementById("leftEye");
const rightEyeEl  = document.getElementById("rightEye");
const leftHandEl  = document.getElementById("leftHand");
const rightHandEl = document.getElementById("rightHand");
const leftFootEl  = document.getElementById("leftFoot");
const rightFootEl = document.getElementById("rightFoot");

// Map each sprite to its loop name
noseEl.addEventListener("click",      () => toggleLoop("NoseLoop"));
leftEarEl.addEventListener("click",   () => toggleLoop("LeftEarLoop"));
rightEarEl.addEventListener("click",  () => toggleLoop("RightEarLoop"));
mouthEl.addEventListener("click",     () => toggleLoop("MouthLoop"));
leftEyeEl.addEventListener("click",   () => toggleLoop("LeftEyeLoop"));
rightEyeEl.addEventListener("click",  () => toggleLoop("RightEyeLoop"));
leftHandEl.addEventListener("click",  () => toggleLoop("LeftHandLoop"));
rightHandEl.addEventListener("click", () => toggleLoop("RightHandLoop"));
leftFootEl.addEventListener("click",  () => toggleLoop("LeftFootLoop"));
rightFootEl.addEventListener("click", () => toggleLoop("RightFootLoop"));

function toggleLoop(trackName) {
  // Start or resume the audio context
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
  const player = players[trackName];
  if (!player) return;

  // Identify the sprite element associated with this track
  const elementId = trackToElementId[trackName];
  const element = document.getElementById(elementId);

  if (!isPlaying[trackName]) {
    // Turn ON the loop and add glow
    player.start();
    isPlaying[trackName] = true;
    if (element) element.classList.add("active");
  } else {
    // Turn OFF the loop and remove glow
    player.stop();
    isPlaying[trackName] = false;
    if (element) element.classList.remove("active");
  }
}

/* ---------- 2B) Draggable Sliders for Effects ---------- */

const tieEl       = document.getElementById("mustache");       // reverb
const mustacheEl  = document.getElementById("tie");  // distortion
const glassesEl   = document.getElementById("glasses");   // delay

// We'll create a helper function to handle vertical dragging 
// and map the [0..maxTop] range to an effect param [0..1].
function makeDraggable(spriteEl, onDragUpdate) {
  let dragging = false;
  let startY = 0;
  let startTop = 0;

  spriteEl.addEventListener("mousedown", (e) => {
    dragging = true;
    startY = e.clientY;
    startTop = parseInt(window.getComputedStyle(spriteEl).top);
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    e.preventDefault();

    let dy = e.clientY - startY;
    let newTop = startTop + dy;

    // Constrain so it doesn’t move off screen
    const maxTop = window.innerHeight - spriteEl.offsetHeight;
    if (newTop < 0) newTop = 0;
    if (newTop > maxTop) newTop = maxTop;

    spriteEl.style.top = newTop + "px";

    // ratio in [0..1]
    let ratio = newTop / maxTop;
    onDragUpdate(ratio);
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });

  // Optional touch support
  spriteEl.addEventListener("touchstart", (e) => {
    dragging = true;
    startY = e.touches[0].clientY;
    startTop = parseInt(window.getComputedStyle(spriteEl).top);
  }, { passive: true });

  document.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    e.preventDefault();
    let dy = e.touches[0].clientY - startY;
    let newTop = startTop + dy;

    const maxTop = window.innerHeight - spriteEl.offsetHeight;
    if (newTop < 0) newTop = 0;
    if (newTop > maxTop) newTop = maxTop;

    spriteEl.style.top = newTop + "px";
    let ratio = newTop / maxTop;
    onDragUpdate(ratio);
  }, { passive: false });

  document.addEventListener("touchend", () => {
    dragging = false;
  });
}

// Tie => controls Reverb wet
makeDraggable(tieEl, (ratio) => {
  reverb.wet.value = ratio;
  
  // Example: If ratio > 0.1, show a glow, else remove it
  if (ratio > 0.1) {
    tieEl.classList.add("active");
  } else {
    tieEl.classList.remove("active");
  }
});

// Mustache => controls Distortion wet
makeDraggable(mustacheEl, (ratio) => {
  distortion.wet.value = ratio;
// Example: If ratio > 0.1, show a glow, else remove it
  if (ratio > 0.1) {
    mustacheEl.classList.add("active");
  } else {
    mustacheEl.classList.remove("active");
  }
});

// Glasses => controls Delay wet
makeDraggable(glassesEl, (ratio) => {
  delay.wet.value = ratio;
// Example: If ratio > 0.1, show a glow, else remove it
  if (ratio > 0.1) {
    glassesEl.classList.add("active");
  } else {
    glassesEl.classList.remove("active");
  }
});

/* =========================================================
   3) PLAY/STOP ALL BUTTONS
   ========================================================= */
const playBtn = document.getElementById("playBtn");
const stopBtn = document.getElementById("stopBtn");

playBtn.addEventListener("click", () => {
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
  
  // Start any loops not currently playing
  Object.keys(players).forEach((trackName) => {
    if (!isPlaying[trackName]) {
      players[trackName].start();
      isPlaying[trackName] = true;
      
      // Add the active class to the corresponding sprite
      const elementId = trackToElementId[trackName];
      const element = document.getElementById(elementId);
      if (element) element.classList.add("active");
    }
  });

  Tone.Transport.start(); // Ensure the transport starts
});

stopBtn.addEventListener("click", () => {
  // Stop all players
  Object.keys(players).forEach((trackName) => {
    players[trackName].stop();
    isPlaying[trackName] = false;

    // Remove the active class from the corresponding sprite
    const elementId = trackToElementId[trackName];
    const element = document.getElementById(elementId);
    if (element) element.classList.remove("active");
  });

  Tone.Transport.stop(); // Ensure the transport stops
});

document.addEventListener("DOMContentLoaded", () => {
    const instructions = document.getElementById("instructions");
    const toggleBtn = document.getElementById("toggleInstructions");

    // Load the last state from localStorage (if available)
    let isHidden = localStorage.getItem("instructionsHidden") === "true";

    if (isHidden) {
        instructions.classList.add("hidden");
        toggleBtn.textContent = "Show Instructions";
    }

    toggleBtn.addEventListener("click", () => {
        if (instructions.classList.contains("hidden")) {
            instructions.classList.remove("hidden");
            toggleBtn.textContent = "Hide Instructions";
            localStorage.setItem("instructionsHidden", "false");
        } else {
            instructions.classList.add("hidden");
            toggleBtn.textContent = "Show Instructions";
            localStorage.setItem("instructionsHidden", "true");
        }
    });
});