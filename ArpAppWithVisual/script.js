// Prevent Tone.js audio context from starting on button click
document.addEventListener("click", async () => {
  if (Tone.context.state !== "running") {
    await Tone.start();
    console.log("Audio context started (iOS unlock).");
    // Perhaps play a note or do nothing
  }
}, { once: true });

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle-Controls1');
  const navigation = document.getElementById('controls');
  const navigation1 = document.getElementById('controls1');
  const navigation2 = document.getElementById('controls2');

  // Toggle navigation visibility with stopPropagation
  toggleButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click event from propagating to document
    const isHidden = navigation.classList.toggle('hidden');
    toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
  });

  toggleButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click event from propagating to document
    const isHidden = navigation1.classList.toggle('hidden');
    toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
  });

  toggleButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click event from propagating to document
    const isHidden = navigation2.classList.toggle('hidden');
    toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
  });
});
		
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

    let synth;
    let chordNotes;
    let pattern;

    const masterGain = new Tone.Volume(0).toDestination();
    const reverb = new Tone.Reverb({ decay: 2, wet: 0.2 });

    // Delay (60s max)
    let delayEffect = new Tone.FeedbackDelay({
     delayTime: 0.3,
     feedback: 0.5,
     maxDelay: 60
  });
    delayEffect.wet.value = 0.5;
    const delayVolume = new Tone.Volume(-10);


    // NEW Distortion
    const distortion = new Tone.Distortion({
      distortion: 0.3,
      oversample: "4x" // or "2x", "none"
    });
    distortion.wet.value = 0.5;

    // NEW Chorus
    const chorus = new Tone.Chorus({
      frequency: 1.5,
      depth: 0.7,
      wet: 0.5
    }).start();

    // NEW Phaser
    const phaser = new Tone.Phaser({
      frequency: 2,
      octaves: 3,
      wet: 0.5
    });
		
		const autoWah = new Tone.AutoWah({
  baseFrequency: 300, // a bit higher base freq
  octaves: 3,
  sensitivity: -55,   // more negative => triggers more easily
  wet: 0.8
});

// Example: Vibrato object (no .start() call)
    const vibrato = new Tone.Vibrato({
      frequency: 5,
      depth: 0.1,
      wet: 0.5
    });
	
	// AutoFilter
    const autoFilter = new Tone.AutoFilter({ frequency: 1, type: "sine", depth: 1, wet: 0.5 }).start();
	
	const bitCrusher = new Tone.BitCrusher({
  bits: 2,    // 1–8 typically
  wet: 0.5
});
	
// Tone.js analyzer
const analyzer = new Tone.Analyser("fft", 256);

// Define bufferLength
const bufferLength = 256;

// Define dataArray (only once)
const dataArray = new Uint8Array(bufferLength);
// Kick off some note for testing
// synth.triggerAttackRelease("C4", "2n");
				document.addEventListener('DOMContentLoaded', () => {
  const startAudioBtn = document.getElementById("start-audio-btn");
  const toggleArpBtn = document.getElementById("toggle-arp-btn");
  let isAudioStarted = false; // Track whether audio has started

  // Start Audio Button Logic
  startAudioBtn.addEventListener("click", async () => {
    if (!isAudioStarted) {
      // Start the audio context
      if (Tone.context.state !== "running") {
        await Tone.start();
        console.log("Audio context started.");
      }

      // Start the Tone.Transport
      Tone.Transport.start();
      pattern.mute = false; // Unmute the pattern

      // Start visualizations
      drawFractal();
      drawVisualization1();
      drawVisualization2();

      // Update button state
      startAudioBtn.textContent = "Stop Audio";
      isAudioStarted = true;
    } else {
      // Pause the Tone.Transport
      Tone.Transport.pause();
      pattern.mute = true; // Mute the pattern

      // Stop visualizations
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(animationFrameId1);
      cancelAnimationFrame(animationFrameId2);

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

      // Update button state
      startAudioBtn.textContent = "Tap to Start Audio";
      isAudioStarted = false;
    }
  });

  // Toggle Arpeggiator Button Logic
  toggleArpBtn.addEventListener("click", () => {
    if (!isAudioStarted) {
      console.warn("Audio has not been started yet. Please start audio first.");
      alert("Please start the audio before toggling the arpeggiator.");
      return; // Exit the function
    }

    // Toggle the arpeggiator mute state
    if (pattern) {
      pattern.mute = !pattern.mute;
      console.log(`Arpeggiator is now ${pattern.mute ? "muted" : "playing"}.`);
    } else {
      console.error("Pattern is not initialized.");
    }
  });
});
    /*********************************************************
     * 2. CREATE SYNTH
     *********************************************************/
    function createSynth(type) {
      if (synth) synth.dispose();

      let newSynth;
      switch(type) {
        case "AMSynth":
          newSynth = new Tone.PolySynth(Tone.AMSynth);
          break;
        case "FMSynth":
          newSynth = new Tone.PolySynth(Tone.FMSynth);
          break;
        case "DuoSynth":
  newSynth = new Tone.DuoSynth({
    voice0: { oscillator: { type: "triangle" } },
    voice1: { oscillator: { type: "sawtooth" } },
    harmonicity: 1.5, // Adjust the balance between voices
    vibratoRate: 5, // Vibrato speed
    vibratoAmount: 0.2, // Vibrato intensity
  });
  break;
        case "MonoSynth":
          newSynth = new Tone.PolySynth(Tone.MonoSynth);
          break;
        case "MembraneSynth":
          newSynth = new Tone.PolySynth(Tone.MembraneSynth);
          break;
        case "MetalSynth":
  newSynth = new Tone.MetalSynth({
    harmonicity: 12, // Adjust this for timbre changes
    modulationIndex: 32, // More or less metallic
    resonance: 4000, // Frequency of the resonance
    octaves: 1.5, // Detune effect
  });
  break;
        default:
          // default
          newSynth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "triangle" }, maxPolyphony: 1024,
            envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.2 }
          });
      }

      // CHAIN: synth -> distortion -> chorus -> phaser -> delay -> delayVolume -> reverb -> masterGain
      newSynth.chain(distortion, chorus, phaser, autoWah, vibrato, autoFilter, bitCrusher, delayEffect, delayVolume, reverb, masterGain, analyzer);
      return newSynth;
    }

    /*********************************************************
     * 3. INITIALIZE
     *********************************************************/
		 chordNotes = ["C4", "E4", "G4", "B4"];
    synth = createSynth("Synth");

    pattern = new Tone.Pattern((time, note) => {
      synth.triggerAttackRelease(note, "8n", time);
    }, chordNotes, "up");

    pattern.interval = "8n";
		pattern.mute = true;
    pattern.loop = true;
    pattern.start(0);

    Tone.Transport.start();
		

    /*********************************************************
     * 4. UI / FUNCTIONS
     *********************************************************/
		 
		 // BPM
    function updateBPM() {
      const bpm = parseInt(document.getElementById("bpm-input").value, 10) || 120;
      Tone.Transport.bpm.rampTo(bpm, 0.5);
    }

function showWarning(message) {
  const warningElement = document.getElementById("warning");
  warningElement.textContent = message;
  warningElement.style.display = "block";

  setTimeout(() => {
    warningElement.style.display = "none"; // Hide after 3 seconds
  }, 3000);
}

    function updateChord() {
  const validRoots = ["A", "B", "C", "D", "E", "F", "G"]; // Allowed note roots
  const validModifiers = ["#", "b"]; // Sharps and flats
  const text = document.getElementById("chord-input").value.trim();
  const inputNotes = text.split(/\s+/);
  const sanitizedNotes = [];
  const warnings = [];

  inputNotes.forEach(note => {
    // Extract the root (first character) and the rest of the note
    const root = note.charAt(0).toUpperCase();
    const remainder = note.slice(1);

    // Check if the root is valid and handle modifiers
    if (validRoots.includes(root)) {
      const modifier = remainder.charAt(0); // Check for # or b
      const octaveMatch = remainder.match(/\d+$/); // Extract octave (if any)
      const octave = octaveMatch ? octaveMatch[0] : "4"; // Default octave is 4

      if (modifier && validModifiers.includes(modifier)) {
        // Valid sharp/flat note
        sanitizedNotes.push(`${root}${modifier}${octave}`);
      } else if (!modifier || /\d/.test(modifier)) {
        // Valid natural note or just an octave
        sanitizedNotes.push(`${root}${octave}`);
      } else {
        // Invalid modifier
        warnings.push(note);
      }
    } else {
      // Invalid root
      warnings.push(note);
    }
  });

  // Handle warnings
  if (warnings.length > 0) {
    showWarning(`Warning: Invalid notes detected - ${warnings.join(", ")}. They were ignored.`);
  }

  // Only update if there are valid sanitized notes
  if (sanitizedNotes.length > 0) {
    if (JSON.stringify(sanitizedNotes) !== JSON.stringify(chordNotes)) {
      chordNotes = sanitizedNotes;
      pattern.values = chordNotes;
      console.log("Updated Chord Notes:", chordNotes);
    } else {
      console.log("Chord input is the same as the previous chord. No updates made.");
    }
  } else {
    console.log("No valid notes provided. Retaining previous chord notes:", chordNotes);
  }
}

    function handleChordPresetChange() {
      const val = document.getElementById("chord-select").value;
      if (val === "random") {
        chordNotes = generateRandomChord();
        document.getElementById("chord-input").value = chordNotes.join(" ");
        pattern.values = chordNotes;
      } else if (val) {
        chordNotes = val.split(/\s+/);
        document.getElementById("chord-input").value = chordNotes.join(" ");
        pattern.values = chordNotes;
      }
    }

    function generateRandomChord() {
      const roots = ["C","C#","D","D#","E","F",
                     "F#","G","G#","A","A#","B"];
      const root = roots[Math.floor(Math.random() * roots.length)];
      const octave = 3 + Math.floor(Math.random() * 3);
      const isMinor = Math.random() < 0.5;
      const hasSeventh = Math.random() < 0.5;

      let intervals;
      if (!isMinor) {
        intervals = [0,4,7];
        if (hasSeventh) intervals.push(Math.random() < 0.5 ? 11 : 10);
      } else {
        intervals = [0,3,7];
        if (hasSeventh) intervals.push(10);
      }

      return intervals.map(i => {
        const idx = roots.indexOf(root) + i;
        const noteName = roots[idx % 12];
        const extraOctaves = Math.floor(idx / 12);
        return noteName + (octave + extraOctaves);
      });
    }

    // Pattern
    function updatePatternType() {
      const val = document.getElementById("pattern-type").value;
      pattern.pattern = val;
    }

    function updatePatternInterval() {
      const val = document.getElementById("step-interval").value;
      pattern.interval = val;
    }

    // Reverb
    function setReverbWet(value) {
      reverb.wet.value = parseFloat(value);
    }

    // Delay
    function toggleDelay(isChecked) {
      if (isChecked) {
        delayEffect.wet.value = parseFloat(document.getElementById("delay-wet").value);
      } else {
        delayEffect.wet.value = 0;
      }
    }
    function setDelayTime(val) {
      delayEffect.delayTime.value = parseFloat(val);
      document.getElementById("delay-time-label").textContent = val + "s";
    }
    function setDelayFeedback(val) {
      delayEffect.feedback.value = parseFloat(val);
      document.getElementById("delay-feedback-label").textContent = val;
    }
    function setDelayWet(val) {
      const isOn = document.getElementById("delay-bypass").checked;
      delayEffect.wet.value = isOn ? parseFloat(val) : 0;
      document.getElementById("delay-wet-label").textContent = val;
    }
    function setDelayVolume(val) {
      delayVolume.volume.value = parseFloat(val);
      document.getElementById("delay-volume-label").textContent = val + " dB";
    }
		
		function resetDelay() {
  // Default values for the delay
  const defaultDelayTime = 0.3;
  const defaultFeedback = 0.5;
  const defaultWet = 0.5;
  const defaultVolume = -10;

  // Dispose of the current delay effect to clear the buffer
  delayEffect.dispose();

  // Recreate the delay effect with default values
  delayEffect = new Tone.FeedbackDelay({
    delayTime: defaultDelayTime,
    feedback: defaultFeedback,
    maxDelay: 60
  });
  delayEffect.wet.value = defaultWet;

  // Reset the delay volume
  delayVolume.volume.value = defaultVolume;

  // Rebuild the signal chain
  synth.chain(
    distortion,
    chorus,
    phaser,
    autoWah,
    vibrato,
    autoFilter,
    bitCrusher,
    delayEffect,
    delayVolume,
    reverb,
    masterGain
  );

  // Update UI elements
  document.getElementById("delay-time").value = defaultDelayTime;
  document.getElementById("delay-time-label").textContent = `${defaultDelayTime}s`;
  document.getElementById("delay-feedback").value = defaultFeedback;
  document.getElementById("delay-feedback-label").textContent = defaultFeedback;
  document.getElementById("delay-wet").value = defaultWet;
  document.getElementById("delay-wet-label").textContent = defaultWet;
  document.getElementById("delay-volume").value = defaultVolume;
  document.getElementById("delay-volume-label").textContent = `${defaultVolume} dB`;

  console.log("Delay has been reset. Buffer cleared, and default settings restored.");
}

    // Distortion
    function toggleDistortion(isChecked) {
      // If bypassed, set wet=0; otherwise restore
      if (isChecked) {
        distortion.wet.value = parseFloat(document.getElementById("dist-wet").value);
      } else {
        distortion.wet.value = 0;
      }
    }
    function setDistAmount(val) {
      distortion.distortion = parseFloat(val);
      document.getElementById("dist-value-label").textContent = val;
    }
    function setDistWet(val) {
      const isOn = document.getElementById("dist-bypass").checked;
      distortion.wet.value = isOn ? parseFloat(val) : 0;
      document.getElementById("dist-wet-label").textContent = val;
    }

    // Chorus
    function toggleChorus(isChecked) {
      if (isChecked) {
        chorus.wet.value = parseFloat(document.getElementById("chorus-wet").value);
      } else {
        chorus.wet.value = 0;
      }
    }
    function setChorusFreq(val) {
      chorus.frequency.value = parseFloat(val);
      document.getElementById("chorus-frequency-label").textContent = val + " Hz";
    }
    function setChorusDepth(val) {
      chorus.depth = parseFloat(val);
      document.getElementById("chorus-depth-label").textContent = val;
    }
    function setChorusWet(val) {
      const isOn = document.getElementById("chorus-bypass").checked;
      chorus.wet.value = isOn ? parseFloat(val) : 0;
      document.getElementById("chorus-wet-label").textContent = val;
    }

    // Phaser
    function togglePhaser(isChecked) {
      if (isChecked) {
        phaser.wet.value = parseFloat(document.getElementById("phaser-wet").value);
      } else {
        phaser.wet.value = 0;
      }
    }
    function setPhaserFreq(val) {
      phaser.frequency.value = parseFloat(val);
      document.getElementById("phaser-frequency-label").textContent = val + " Hz";
    }
    function setPhaserOctaves(val) {
      phaser.octaves = parseInt(val, 10);
      document.getElementById("phaser-octaves-label").textContent = val;
    }
    function setPhaserWet(val) {
      const isOn = document.getElementById("phaser-bypass").checked;
      phaser.wet.value = isOn ? parseFloat(val) : 0;
      document.getElementById("phaser-wet-label").textContent = val;
    }
		
		function toggleAutoWah(isOn) {
  autoWah.wet.rampTo(isOn ? parseFloat(document.getElementById("aw-wet").value) : 0, 0.05);
}
    function setAWBaseFreq(val) {
      autoWah.baseFrequency = parseFloat(val);
      document.getElementById("aw-basefreq-label").textContent = val + " Hz";
    }
    function setAWOctaves(val) {
      autoWah.octaves = parseInt(val, 10);
      document.getElementById("aw-octaves-label").textContent = val;
    }
    function setAWWet(val) {
      const isOn = document.getElementById("aw-bypass").checked;
      autoWah.wet.rampTo(isOn ? parseFloat(val) : 0, 0.05);
      document.getElementById("aw-wet-label").textContent = val;
    }
		
		// VIBRATO
    function toggleVibrato(isChecked) {
      const val = parseFloat(document.getElementById("vibrato-wet").value);
      vibrato.wet.rampTo(isChecked ? val : 0, 0.05);
    }
    function setVibratoFreq(val) {
      vibrato.frequency.rampTo(parseFloat(val), 0.05);
      document.getElementById("vibrato-frequency-label").textContent = val + " Hz";
    }
    function setVibratoDepth(val) {
      vibrato.depth = parseFloat(val);
      document.getElementById("vibrato-depth-label").textContent = val;
    }
    function setVibratoWet(val) {
      const isOn = document.getElementById("vibrato-bypass").checked;
      vibrato.wet.rampTo(isOn ? parseFloat(val) : 0, 0.05);
      document.getElementById("vibrato-wet-label").textContent = val;
    }
		
		// AUTOFILTER
    function toggleAutoFilter(isChecked) {
      const val = parseFloat(document.getElementById("af-wet").value);
      autoFilter.wet.rampTo(isChecked ? val : 0, 0.05);
    }
    function setAFreq(val) {
      autoFilter.frequency.rampTo(parseFloat(val), 0.05);
      document.getElementById("af-frequency-label").textContent = val + " Hz";
    }
    function setADepth(val) {
      autoFilter.depth = parseFloat(val);
      document.getElementById("af-depth-label").textContent = val;
    }
    function setAWet(val) {
      const isOn = document.getElementById("af-bypass").checked;
      autoFilter.wet.rampTo(isOn ? parseFloat(val) : 0, 0.05);
      document.getElementById("af-wet-label").textContent = val;
    }
		
		// BitCrusher toggle and controls
function toggleBitCrusher(isChecked) {
  if (isChecked) {
    bitCrusher.wet.value = parseFloat(document.getElementById("bitcrusher-wet").value);
  } else {
    bitCrusher.wet.value = 0;
  }
}

function setBitCrusherBits(val) {
  bitCrusher.bits = parseInt(val, 10); // BitCrusher bits are integers
  document.getElementById("bitcrusher-bits-label").textContent = val + " bits";
}

function setBitCrusherWet(val) {
  const isOn = document.getElementById("bitcrusher-bypass").checked;
  bitCrusher.wet.value = isOn ? parseFloat(val) : 0;
  document.getElementById("bitcrusher-wet-label").textContent = val;
}
		
		function warpSynth() {
      const warpTypeSelect = document.getElementById("warp-type");
      const warpType = warpTypeSelect.value;
      switch(warpType) {
        case "random":
          randomWarp(); break;
        case "wild":
          wildWarp(); break;
        case "subtle":
          subtleWarp(); break;
        default:
          randomWarp(); break;
      }
    }

    function randomWarp() {
      const oscillatorTypes = ["sine", "triangle", "square", "sawtooth"];
      const randomOsc = oscillatorTypes[Math.floor(Math.random() * oscillatorTypes.length)];
      synth.set({
        oscillator: { type: randomOsc },
        detune: (Math.random() - 0.5) * 400,
      });
      console.log("Random warp applied");
    }

    function wildWarp() {
      const oscillatorTypes = ["sine", "triangle", "square", "sawtooth"];
      const randomOsc = oscillatorTypes[Math.floor(Math.random() * oscillatorTypes.length)];
      synth.set({
        oscillator: { type: randomOsc },
        detune: (Math.random() - 0.5) * 1200,
      });
      console.log("Wild warp applied");
    }

    function subtleWarp() {
      const oscillatorTypes = ["sine", "triangle", "square", "sawtooth"];
      const randomOsc = oscillatorTypes[Math.floor(Math.random() * oscillatorTypes.length)];
      synth.set({
        oscillator: { type: randomOsc },
        detune: (Math.random() - 0.5) * 50,
      });
      console.log("Subtle warp applied");
    }

    // Synth / Osc
    function updateSynthType() {
      const val = document.getElementById("synth-type").value;
      synth = createSynth(val);
    }
    function updateOscType() {
  const oscType = document.getElementById("osc-type").value;

  if (synth instanceof Tone.DuoSynth) {
    // DuoSynth has two separate voices
    synth.voice0.oscillator.type = oscType;
    synth.voice1.oscillator.type = oscType;
    console.log(`Updated oscillator type to ${oscType} for DuoSynth.`);
  } else if (synth instanceof Tone.MetalSynth) {
    // MetalSynth does not use a standard oscillator
    const warningMessage = "Oscillator type cannot be changed for MetalSynth. This setting will not affect the current synth.";
    console.warn(warningMessage);
    showWarning(warningMessage);
  } else if (synth instanceof Tone.PolySynth) {
    // PolySynth updates all voices
    synth.set({
      oscillator: {
        type: oscType,
      },
    });
    console.log(`Updated oscillator type to ${oscType} for PolySynth.`);
  } else if (synth.oscillator) {
    // For MonoSynth or similar synths
    synth.oscillator.type = oscType;
    console.log(`Updated oscillator type to ${oscType} for MonoSynth or similar.`);
  } else {
    const warningMessage = "Unsupported synth type for oscillator update.";
    console.warn(warningMessage);
    showWarning(warningMessage);
  }
}

    // Warp
    function warpSynth() {
      const warpTypeSelect = document.getElementById("warp-type");
      const warpType = warpTypeSelect.value;
      switch(warpType) {
        case "random": randomWarp(); break;
        case "wild": wildWarp(); break;
        case "subtle": subtleWarp(); break;
        default: randomWarp(); break;
      }
    }
    function randomWarp() {
      const oscillatorTypes = ["sine", "triangle", "square", "sawtooth"];
      const randomOsc = oscillatorTypes[Math.floor(Math.random() * oscillatorTypes.length)];
      synth.set({
        oscillator: { type: randomOsc },
        detune: (Math.random() - 0.5) * 400
      });
    }
    function wildWarp() {
      const oscillatorTypes = ["sine", "triangle", "square", "sawtooth"];
      const randomOsc = oscillatorTypes[Math.floor(Math.random() * oscillatorTypes.length)];
      synth.set({
        oscillator: { type: randomOsc },
        detune: (Math.random() - 0.5) * 1200
      });
    }
    function subtleWarp() {
      const oscillatorTypes = ["sine", "triangle", "square", "sawtooth"];
      const randomOsc = oscillatorTypes[Math.floor(Math.random() * oscillatorTypes.length)];
      synth.set({
        oscillator: { type: randomOsc },
        detune: (Math.random() - 0.5) * 50
      });
    }

		
    // Octave Shift
    function applyOctaveShift() {
      const shiftValue = parseInt(document.getElementById("octave-shift").value, 10);
      chordNotes = chordNotes.map(note => Tone.Frequency(note).transpose(shiftValue).toNote());
      pattern.values = chordNotes;
    }
		
		
		/**
 * Maps Tone.js FFT data (in dB) from [-100..0] dB to [0..255]
 * and puts the result into dataArray (Uint8Array).
 */
function convertFFTtoUint8Array(fftData, dataArray) {
  for (let i = 0; i < fftData.length; i++) {
    let dB = fftData[i];
    // Clip to [-100 dB..0 dB] range
    dB = Math.min(0, Math.max(-100, dB));
    // Map -100 => 0,  0 => 255
    dataArray[i] = Math.floor(((dB + 100) / 100) * 255);
  }
}
		

    /*********************************************************
     * 3. FRACTAL VISUALIZATION: SOUND-REACTIVE
     *********************************************************/
    let isVisualizationRunning = true;  // Toggles visualization
		let isVisualizationRunning1 = true;  // Toggles visualization
		let isVisualizationRunning2 = true;  // Toggles visualization
    let angle = 0;                      // Tracks overall rotation
    let colorOffset = 0;                // Tracks color cycling
		
		let angle1 = 0;                      // Tracks overall rotation
    let colorOffset1 = 0;                // Tracks color cycling
		
		let angle2 = 0;                      // Tracks overall rotation
    let colorOffset2 = 0;                // Tracks color cycling
		
		// Sliders
    let spinSpeed1 = 1;                  // Base spin speed
    let spiralSpreadFactor1 = 4;         // Default spiral spread

		// Sliders
    let spinSpeed2 = 1;                  // Base spin speed
    let spiralSpreadFactor2 = 4;         // Default spiral spread
		
    // Sliders
    let spinSpeed = 1;                  // Base spin speed
    let spiralSpreadFactor = 4;         // Default spiral spread

    // This variable ensures we can properly stop/restart the draw loop
    let animationFrameId = null;
		
		// This variable ensures we can properly stop/restart the draw loop
    let animationFrameId1 = null;
		
		// This variable ensures we can properly stop/restart the draw loop
    let animationFrameId2 = null;
		
		// For fractal (main)
let shapeSizeFactor = 1;

// For visualization1
let shapeSizeFactor1 = 1;

// For visualization2
let shapeSizeFactor2 = 1;

function updateShapeSizeFactor(value) {
  shapeSizeFactor = parseFloat(value);
  document.getElementById("shape-size-factor-label").textContent = value;
}

function updateShapeSizeFactor1(value) {
  shapeSizeFactor1 = parseFloat(value);
  document.getElementById("shape-size-factor-label1").textContent = value;
}

function updateShapeSizeFactor2(value) {
  shapeSizeFactor2 = parseFloat(value);
  document.getElementById("shape-size-factor-label2").textContent = value;
}
		
		
    //--------------------------------------------------
    // 3a. SPIRAL SPREAD & SPIN SPEED UPDATE FUNCTIONS
    //--------------------------------------------------
    function updateSpiralSpread(value) {
      spiralSpreadFactor = parseInt(value, 10);
      document.getElementById("spiral-spread-label").textContent = value;
    }

    function updateSpinSpeed(value) {
      spinSpeed = parseFloat(value);
      document.getElementById("spin-speed-label").textContent = value;
    }
		
		function updateSpiralSpread1(value) {
      spiralSpreadFactor1 = parseInt(value, 10);
      document.getElementById("spiral-spread-label1").textContent = value;
    }

    function updateSpinSpeed1(value) {
      spinSpeed1 = parseFloat(value);
      document.getElementById("spin-speed-label1").textContent = value;
    }
		
		function updateSpiralSpread2(value) {
      spiralSpreadFactor2 = parseInt(value, 10);
      document.getElementById("spiral-spread-label2").textContent = value;
    }

    function updateSpinSpeed2(value) {
      spinSpeed2 = parseFloat(value);
      document.getElementById("spin-speed-label2").textContent = value;
    }

    //--------------------------------------------------
    // 3b. VISUALIZATION TOGGLE
    //--------------------------------------------------
    const toggleVisualizationBtn = document.getElementById("toggle-visualization-btn");
    toggleVisualizationBtn.addEventListener("click", () => {
      isVisualizationRunning = !isVisualizationRunning;
      toggleVisualizationBtn.textContent = isVisualizationRunning
        ? "Hide Visualization"
        : "Show Visualization";

      if (!isVisualizationRunning) {
        // Stop the animation & clear the canvas
        cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        // Restart
        requestAnimationFrame(drawFractal);
      }
    });
		
		const toggleVisualizationBtn1 = document.getElementById("toggle-visualization-btn1");
    toggleVisualizationBtn1.addEventListener("click", () => {
      isVisualizationRunning1 = !isVisualizationRunning1;
      toggleVisualizationBtn1.textContent = isVisualizationRunning1
        ? "Hide Visualization"
        : "Show Visualization";

      if (!isVisualizationRunning1) {
        // Stop the animation & clear the canvas
				
       cancelAnimationFrame(animationFrameId1);
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
      } else {
        // Restart
        requestAnimationFrame(drawVisualization1);
      }
    });
		
		const toggleVisualizationBtn2 = document.getElementById("toggle-visualization-btn2");
    toggleVisualizationBtn2.addEventListener("click", () => {
      isVisualizationRunning2 = !isVisualizationRunning2;
      toggleVisualizationBtn2.textContent = isVisualizationRunning2
        ? "Hide Visualization"
        : "Show Visualization";

      if (!isVisualizationRunning2) {
        // Stop the animation & clear the canvas
				
       cancelAnimationFrame(animationFrameId2);
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      } else {
        // Restart
        requestAnimationFrame(drawVisualization2);
      }
    });
		
		function drawVisualization2() {
			if (!isVisualizationRunning2) return;
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  // 1) Grab Tone’s FFT or waveform data:
const fftData = analyzer.getValue(); // array of floats in dB or wave data

// 2) Convert to 0..255 in dataArray:
convertFFTtoUint8Array(fftData, dataArray);

  const avgAmplitude = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
  const maxAmplitude = Math.max(...dataArray);

  const centerX = canvas2.width / 2;
  const centerY = canvas2.height / 2;

  ctx2.save();
  ctx2.translate(centerX, centerY);
	
	// Compute average amplitude & max amplitude
      const avgAmp2 = dataArray.reduce((sum, v) => sum + v, 0) / bufferLength; // 0..255
      const maxAmp2 = Math.max(...dataArray);                                  // 0..255

      // Decide pattern type based on amplitude (normalize to 0..1 for comparison)
      const normMax2 = maxAmp2 / 255;

  const totalSpirals = 20;
  const angleBetweenSpirals = (spiralSpreadFactor2 * Math.PI) / totalSpirals;

  for (let i = 0; i < totalSpirals; i++) {
    ctx2.save();
    ctx2.rotate(i * angleBetweenSpirals + angle2);
		
		for (let j = 0; j < 360; j += 10) {
      const radius = j + avgAmplitude;
      const x = radius * Math.cos(j * (Math.PI / 180));
      const y = radius * Math.sin(j * (Math.PI / 180));
			
			// Multiply the shape size by "shapeSizeFactor2"
      const shapeSize = (avgAmplitude / 10) * shapeSizeFactor2;

    

      const hue = (j + colorOffset2) % 360;
      ctx2.fillStyle = `hsl(${hue}, 100%, 50%)`;

      if (maxAmplitude > 250) {
        drawShape(ctx2, x, y, shapeSize, 'triangle');
      } else if (maxAmplitude > 170) {
        drawShape(ctx2, x, y, shapeSize, 'square');
      } else if (maxAmplitude > 120) {
        drawShape(ctx2, x, y, shapeSize, 'circle');
      } else {
        ctx2.fillRect(x, y, 3 * shapeSizeFactor2, 3 * shapeSizeFactor2);
      }
    }
   

    ctx2.restore();
  }

  ctx2.restore();

  // 4c. UPDATE ANIMATION
      // The spin speed (user slider) + amplitude factor
      const amplitudeFactor2 = 0 + (normMax2 * .1); // "normMax" = maxAmp/255
      angle2 += spinSpeed2 * amplitudeFactor2;
      colorOffset2 += 0.9 + (avgAmp2 / 255);

  animationFrameId2 = requestAnimationFrame(drawVisualization2);
}

function drawShape(ctx1, x, y, size, shape) {
  ctx2.beginPath();
  switch (shape) {
    case 'circle':
      ctx1.arc(x, y, size, 0, 8 * Math.PI);
      break;
    case 'square':
      ctx2.rect(x - size / 20, y - size / 20, size, size);
      break;
    case 'triangle':
      ctx2.moveTo(x, y - size);
      ctx2.lineTo(x - size, y + size);
      ctx2.lineTo(x + size, y + size);
      ctx2.closePath();
      break;
  }
  ctx2.fill();
}

 function drawVisualization1() {
			if (!isVisualizationRunning1) return;
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
	
  // 1) Grab Tone’s FFT or waveform data:
const fftData = analyzer.getValue(); // array of floats in dB or wave data

// 2) Convert to 0..255 in dataArray:
convertFFTtoUint8Array(fftData, dataArray);

  const avgAmplitude = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
  const maxAmplitude = Math.max(...dataArray);

  const centerX = canvas1.width / 2;
  const centerY = canvas1.height / 2;

  ctx1.save();
  ctx1.translate(centerX, centerY);
	
	// Compute average amplitude & max amplitude
      const avgAmp1 = dataArray.reduce((sum, v) => sum + v, 0) / bufferLength; // 0..255
      const maxAmp1 = Math.max(...dataArray);                                  // 0..255

      // Decide pattern type based on amplitude (normalize to 0..1 for comparison)
      const normMax1 = maxAmp1 / 255;

  const totalSpirals = 20;
  const angleBetweenSpirals = (spiralSpreadFactor1 * Math.PI) / totalSpirals;

  for (let i = 0; i < totalSpirals; i++) {
    ctx1.save();
    ctx1.rotate(i * angleBetweenSpirals + angle1);
		
		for (let j = 0; j < 360; j += 10) {
			const isMirrored1 = j >= totalSpirals / 2; // half are mirrored
        const spiralBaseAngle1 = j * angleBetweenSpirals;
      const radius = j + avgAmplitude;
      const x = radius * Math.cos(j * (Math.PI / 180));
      const y = radius * Math.sin(j * (Math.PI / 180));
			
			// Mirror sign
          const sign1 = isMirrored1 ? -2 : 2;

          // shape rotation
          const shapeRotation1 =
            spiralBaseAngle1 + sign1 * (angle1 + i) * (Math.PI / 180);
						
						
          ctx1.rotate(shapeRotation1);

    // Multiply the shape size by "shapeSizeFactor2"
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

  // 4c. UPDATE ANIMATION
      // The spin speed (user slider) + amplitude factor
      const amplitudeFactor1 = 0 + (normMax1 * .1); // "normMax" = maxAmp/255
      angle1 += spinSpeed1 * amplitudeFactor1;
      colorOffset1 += 0.9 + (avgAmp1 / 255);

  animationFrameId1 = requestAnimationFrame(drawVisualization1);
}

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

document.getElementById('start-audio-btn').addEventListener('click', async () => {
  await initializeAudio();
  
	drawVisualization1();
  document.getElementById('start-audio-btn').style.display = 'none';
});
    //--------------------------------------------------
    // 3c. DRAW LOOP
    //--------------------------------------------------
    function drawFractal() {
      if (!isVisualizationRunning) return;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Centering transform
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.save();
      ctx.translate(cx, cy);
			
			// 1) Grab Tone’s FFT or waveform data:
const fftData = analyzer.getValue(); // array of floats in dB or wave data

// 2) Convert to 0..255 in dataArray:
convertFFTtoUint8Array(fftData, dataArray);
      // Compute average amplitude & max amplitude
			
      const avgAmp = dataArray.reduce((sum, v) => sum + v, 0) / bufferLength; // 0..255
      const maxAmp = Math.max(...dataArray);                                  // 0..255

      // Decide pattern type based on amplitude (normalize to 0..1 for comparison)
      const normMax = maxAmp / 255;
      const patternType = normMax > 0.5 ? "spiral" : "circle";

      // 4b. DRAW MULTIPLE SPIRALS
      const totalSpirals = 20;

      // Spiral spread (angle offset)
      const angleBetweenSpirals = (spiralSpreadFactor * Math.PI) / totalSpirals;

      for (let j = 0; j < totalSpirals; j++) {
        const isMirrored = j >= totalSpirals / 2; // half are mirrored
        const spiralBaseAngle = j * angleBetweenSpirals;

        // We step in increments of 5 degrees for shapes
        for (let i = 0; i < 360; i += 5) {
          const fraction = i / 360;

          // radius depends on pattern
          // Using 0..1 amplitude from "avgAmp/255"
          if (patternType === "spiral") {
            var rad = fraction * 200 + (avgAmp / 255) * 150;
          } else {
            var rad = (avgAmp / 255) * 200;
          }

          // Mirror sign
          const sign = isMirrored ? -1 : 1;

          // shape rotation
          const shapeRotation =
            spiralBaseAngle + sign * (angle + i) * (Math.PI / 180);

          ctx.save();
          ctx.rotate(shapeRotation);

          // color changes
          const hue = (i + colorOffset + (avgAmp * 2) + j * 18) % 360;
          const saturation = 50 + (avgAmp / 255) * 50;
          ctx.fillStyle = `hsl(${hue}, ${saturation}%, 50%)`;
					
					const rectSize = 10 * shapeSizeFactor; 
ctx.fillRect(rad, rad * 0.01, rectSize, rectSize);

          // draw shape
          if (patternType === "spiral") {
            ctx.fillRect(rad, rad * 0.01, 10, 10);
          } else {
            ctx.beginPath();
            // radius for circles can scale with amplitude for variety
            const circleRadius = (avgAmp / 255) * 10;
            ctx.arc(rad, rad * 0.01, circleRadius, 0, 2 * Math.PI);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      ctx.restore();

      // 4c. UPDATE ANIMATION
      // The spin speed (user slider) + amplitude factor
      const amplitudeFactor = 0.2 + (normMax * 1.0); // "normMax" = maxAmp/255
      angle += spinSpeed * amplitudeFactor;
      colorOffset += 0.9 + (avgAmp / 255);

      animationFrameId = requestAnimationFrame(drawFractal);
			
			
    }