/*********************************************************
     * 1. GLOBALS
     *********************************************************/
    let synth;
    let chordNotes;
    let pattern;

    const masterGain = new Tone.Volume(0).toDestination();
    const reverb = new Tone.Reverb({ decay: 2, wet: 0.2 });

    // Delay (60s max)
    const delayEffect = new Tone.FeedbackDelay({
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

    // iOS Audio Unlock
    const startAudioBtn = document.getElementById("start-audio-btn");
    startAudioBtn.addEventListener("click", async () => {
      if (Tone.context.state !== "running") {
        await Tone.start();
        console.log("Audio context started.");
      }
    }, { once: true });

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
          newSynth = new Tone.PolySynth(Tone.DuoSynth);
          break;
        case "MonoSynth":
          newSynth = new Tone.PolySynth(Tone.MonoSynth);
          break;
        case "MembraneSynth":
          newSynth = new Tone.PolySynth(Tone.MembraneSynth);
          break;
        case "MetalSynth":
          newSynth = new Tone.PolySynth(Tone.MetalSynth);
          break;
        default:
          // default
          newSynth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "sine" },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 1 }
          });
      }

      // CHAIN: synth -> distortion -> chorus -> phaser -> delay -> delayVolume -> reverb -> masterGain
      newSynth.chain(distortion, chorus, phaser, delayEffect, delayVolume, reverb, masterGain);
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

    // Chords
    function updateChord() {
      const text = document.getElementById("chord-input").value.trim();
      if (text) {
        chordNotes = text.split(/\s+/);
        pattern.values = chordNotes;
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
      const val = document.getElementById("osc-type").value;
      synth.set({ oscillator: { type: val } });
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

    // Toggle Arp
    function toggleArp() {
      pattern.mute = !pattern.mute;
    }

    // Octave Shift
    function applyOctaveShift() {
      const shiftValue = parseInt(document.getElementById("octave-shift").value, 10);
      chordNotes = chordNotes.map(note => Tone.Frequency(note).transpose(shiftValue).toNote());
      pattern.values = chordNotes;
    }