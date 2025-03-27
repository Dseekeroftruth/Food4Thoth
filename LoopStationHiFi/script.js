// 1. Define songs/tracks
    const songsData = [
      {
        title: "Song 1",
        tracks: [
          { name: "Drum1",  url: "./song1/Loop1drum.m4a" },
          { name: "Drum2",  url: "./song1/Loop1drum2.m4a" },
          { name: "Drum3",  url: "./song1/Loop1drum3.m4a" },
          { name: "Drum4",  url: "./song1/Loop1drum4.m4a" },
          { name: "Drum5",  url: "./song1/Loop1drum5.m4a" },
          { name: "Synth1", url: "./song1/Loop1synth.m4a" },
          { name: "Synth2", url: "./song1/Loop1synth2.m4a" },
          { name: "Synth3", url: "./song1/Loop1synth3.m4a" },
          { name: "Synth4", url: "./song1/Loop1synth4.m4a" },
          { name: "Synth5", url: "./song1/Loop1synth5.m4a" },
          { name: "Synth6", url: "./song1/Loop1synth6.m4a" },
          { name: "Bass1",  url: "./song1/Loop1bass1.m4a" }
        ]
      },
      {
        title: "Song 2",
        tracks: [
          { name: "Beat 1",    url: "./song2/LoopDrum1.m4a" },
          { name: "Beat 2",    url: "./song2/LoopDrum2.m4a" },
          { name: "Beat 3",    url: "./song2/LoopDrum3.m4a" },
          { name: "Beat 4",    url: "./song2/LoopDrum4.m4a" },
          { name: "Flute 1",   url: "./song2/LoopFlute1.m4a" },
          { name: "Flute 2",   url: "./song2/LoopFlute2.m4a" },
          { name: "Flute 3",   url: "./song2/LoopFlute3.m4a" },
          { name: "Flute 4",   url: "./song2/LoopFlute4.m4a" },
          { name: "Synth 1",   url: "./song2/LoopSynth1.m4a" },
          { name: "Strings 1", url: "./song2/LoopAsia1.m4a" },
          { name: "Jungle 1",  url: "./song2/LoopJungle1.m4a" },
          { name: "Space 1",   url: "./song2/LoopSpace1.m4a" }
        ]
      },
			{
        title: "Song 3",
        tracks: [
          { name: "Beat 1", url: "./song3/LoopDrum1.m4a" },
          { name: "Beat 2", url: "./song3/LoopDrum2.m4a" },
          { name: "Beat 3", url: "./song3/LoopDrum3.m4a" },
          { name: "Beat 4", url: "./song3/LoopDrum4.m4a" },
          { name: "Beat 5", url: "./song3/LoopDrum5.m4a" },
          { name: "Beat 6", url: "./song3/LoopDrum6.m4a" },
          { name: "Beat 7", url: "./song3/LoopDrum7.m4a" },
          { name: "Beat 8", url: "./song3/LoopDrum8.m4a" },
          { name: "Beat 9", url: "./song3/LoopDrum9.m4a" },
          { name: "Beat 10", url: "./song3/LoopDrum10.m4a" },
					{ name: "Bass", url: "./song3/LoopBass1.m4a" },
          { name: "Synth", url: "./song3/LoopSynth1.m4a" }
        ]
      },
			{
        title: "Song 4",
        tracks: [
          { name: "Beat 1", url: "./song4/LoopDrum1.m4a" },
          { name: "Beat 2", url: "./song4/LoopDrum2.m4a" },
          { name: "Beat 3", url: "./song4/LoopDrum3.m4a" },
          { name: "Beat 4", url: "./song4/LoopDrum4.m4a" },
          { name: "Synth 5", url: "./song4/LoopSynth1.m4a" },
          { name: "Synth 6", url: "./song4/LoopSynth2.m4a" },
          { name: "Synth 7", url: "./song4/LoopSynth3.m4a" },
          { name: "Synth 8", url: "./song4/LoopSynth4.m4a" },
          { name: "Synth 9", url: "./song4/LoopSynth5.m4a" },
          { name: "Bass", url: "./song4/LoopBass1.m4a" },
					{ name: "Robo1", url: "./song4/LoopRobo1.m4a" },
          { name: "Robo2", url: "./song4/LoopRobo2.m4a" }
        ]
      }
    ];

    // 2. Tone.js Nodes: Effects
    // Distortion
    const distortion = new Tone.Distortion({ distortion: 0.3, oversample: "4x" });
    distortion.wet.value = 0;

    // Chorus
    const chorus = new Tone.Chorus({
      frequency: 1.5,
      depth: 0.7,
      wet: 0
    }).start();

    // Phaser
    const phaser = new Tone.Phaser({
      frequency: 2,
      octaves: 3,
      wet: 0
    });

    // AutoWah
    const autoWah = new Tone.AutoWah({
      baseFrequency: 300,
      octaves: 3,
      sensitivity: -55,
      wet: 0
    });

    // Vibrato
    const vibrato = new Tone.Vibrato({
      frequency: 5,
      depth: 0.1,
      wet: 0
    });

    // AutoFilter
    const autoFilter = new Tone.AutoFilter({
      frequency: 1,
      type: "sine",
      depth: 1,
      wet: 0
    }).start();

    // BitCrusher
    const bitCrusher = new Tone.BitCrusher({
      bits: 4,
      wet: 0
    });

    // Reverb
    const reverb = new Tone.Reverb({
      decay: 2,
      wet: 0
    });

    // Feedback Delay
    let delayEffect = new Tone.FeedbackDelay({
      delayTime: 0.3,
      feedback: 0.5,
      maxDelay: 60
    });
    delayEffect.wet.value = 0;

    // Chain everything: track -> distortion -> chorus -> phaser -> autoWah -> vibrato -> autoFilter -> bitCrusher -> delay -> reverb -> destination
    // We'll create a function to route the Players into this chain
    function routePlayerToEffects(player) {
      player.chain(
        distortion,
        chorus,
        phaser,
        autoWah,
        vibrato,
        autoFilter,
        bitCrusher,
        delayEffect,
        reverb,
        Tone.Destination
      );
    }

    // Will hold references to each track’s Player for the currently loaded song
    let currentTrackPlayers = [];

    // 3. Page Elements
    const songSelect         = document.getElementById("songSelect");
    const tracksContainer    = document.getElementById("tracksContainer");
    const playBtn            = document.getElementById("playBtn");
    const stopBtn            = document.getElementById("stopBtn");
    const playSelectedBtn    = document.getElementById("playSelectedBtn");

    // Distortion Controls
    const distBypass         = document.getElementById("dist-bypass");
    const distValue          = document.getElementById("dist-value");
    const distValueLabel     = document.getElementById("dist-value-label");
    const distWet            = document.getElementById("dist-wet");
    const distWetLabel       = document.getElementById("dist-wet-label");

    // Chorus Controls
    const chorusBypass       = document.getElementById("chorus-bypass");
    const chorusFrequency    = document.getElementById("chorus-frequency");
    const chorusFreqLabel    = document.getElementById("chorus-frequency-label");
    const chorusDepth        = document.getElementById("chorus-depth");
    const chorusDepthLabel   = document.getElementById("chorus-depth-label");
    const chorusWet          = document.getElementById("chorus-wet");
    const chorusWetLabel     = document.getElementById("chorus-wet-label");

    // Phaser Controls
    const phaserBypass       = document.getElementById("phaser-bypass");
    const phaserFrequency    = document.getElementById("phaser-frequency");
    const phaserFreqLabel    = document.getElementById("phaser-frequency-label");
    const phaserOctaves      = document.getElementById("phaser-octaves");
    const phaserOctavesLabel = document.getElementById("phaser-octaves-label");
    const phaserWet          = document.getElementById("phaser-wet");
    const phaserWetLabel     = document.getElementById("phaser-wet-label");

    // AutoWah
    const awBypass           = document.getElementById("aw-bypass");
    const awBasefreq         = document.getElementById("aw-basefreq");
    const awBasefreqLabel    = document.getElementById("aw-basefreq-label");
    const awOctaves          = document.getElementById("aw-octaves");
    const awOctavesLabel     = document.getElementById("aw-octaves-label");
    const awWet              = document.getElementById("aw-wet");
    const awWetLabel         = document.getElementById("aw-wet-label");

    // Vibrato
    const vibratoBypass      = document.getElementById("vibrato-bypass");
    const vibratoFrequency   = document.getElementById("vibrato-frequency");
    const vibratoFreqLabel   = document.getElementById("vibrato-frequency-label");
    const vibratoDepth       = document.getElementById("vibrato-depth");
    const vibratoDepthLabel  = document.getElementById("vibrato-depth-label");
    const vibratoWet         = document.getElementById("vibrato-wet");
    const vibratoWetLabel    = document.getElementById("vibrato-wet-label");

    // AutoFilter
    const afBypass           = document.getElementById("af-bypass");
    const afFrequency        = document.getElementById("af-frequency");
    const afFreqLabel        = document.getElementById("af-frequency-label");
    const afDepth            = document.getElementById("af-depth");
    const afDepthLabel       = document.getElementById("af-depth-label");
    const afWet              = document.getElementById("af-wet");
    const afWetLabel         = document.getElementById("af-wet-label");

    // BitCrusher
    const bitcrusherBypass   = document.getElementById("bitcrusher-bypass");
    const bitcrusherBits     = document.getElementById("bitcrusher-bits");
    const bitcrusherBitsLabel= document.getElementById("bitcrusher-bits-label");
    const bitcrusherWet      = document.getElementById("bitcrusher-wet");
    const bitcrusherWetLabel = document.getElementById("bitcrusher-wet-label");

    // Reverb
    const reverbBypass       = document.getElementById("reverb-bypass");
    const reverbDecaySlider  = document.getElementById("reverb-decay");
    const reverbDecayLabel   = document.getElementById("reverb-decay-label");
    const reverbWetSlider    = document.getElementById("reverb-wet");
    const reverbWetLabel     = document.getElementById("reverb-wet-label");

    // Delay
    const delayBypass        = document.getElementById("delay-bypass");
    const delayTimeSlider    = document.getElementById("delay-time");
    const delayTimeLabel     = document.getElementById("delay-time-label");
    const delayFeedback      = document.getElementById("delay-feedback");
    const delayFeedbackLabel = document.getElementById("delay-feedback-label");
    const delayWet           = document.getElementById("delay-wet");
    const delayWetLabel      = document.getElementById("delay-wet-label");

    // 4. Populate Song Select Dropdown
    songsData.forEach((song, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = song.title;
      songSelect.appendChild(option);
    });
    // By default, load the first song
    loadSong(0);

    // 5. Event Listeners for Song / Buttons
    songSelect.addEventListener("change", () => {
      const songIndex = parseInt(songSelect.value, 10);
      loadSong(songIndex);
    });
    playBtn.addEventListener("click", () => {
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }
      startSong();
    });
    stopBtn.addEventListener("click", () => {
      stopSong();
    });

    // 6. Load a Selected Song
    async function loadSong(songIndex) {
      // Stop & dispose old players
      currentTrackPlayers.forEach(p => p.dispose());
      currentTrackPlayers = [];

      // Clear UI
      tracksContainer.innerHTML = "";

      const selectedSong = songsData[songIndex];

      // Create track checkboxes & Tone Players
      selectedSong.tracks.forEach((track, idx) => {
        // UI
        const trackDiv = document.createElement("div");
        trackDiv.classList.add("track");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `track-${idx}`;
        checkbox.checked = true;

        const label = document.createElement("label");
        label.htmlFor = `track-${idx}`;
        label.textContent = track.name;

        trackDiv.appendChild(checkbox);
        trackDiv.appendChild(label);
        tracksContainer.appendChild(trackDiv);

        // Create the Player
        const player = new Tone.Player({
          url: track.url,
          loop: true,
          autostart: false
        });

        // Route to full effect chain
        routePlayerToEffects(player);

        currentTrackPlayers.push(player);

        // Toggle fade in/out
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            player.volume.rampTo(0, 0.1);
          } else {
            player.volume.rampTo(-Infinity, 0.1);
          }
        });
      });
    }

    // "Play Selected" logic
    let isPlaying = false;
    playSelectedBtn.addEventListener("click", () => {
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }
      playSelectedTracks();
    });
    function playSelectedTracks() {
      isPlaying = true;
      const trackCheckboxes = tracksContainer.querySelectorAll('input[type="checkbox"]');

      trackCheckboxes.forEach((checkbox, index) => {
        const player = currentTrackPlayers[index];
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            if (player.state !== "started") {
              player.sync().start(0);
            }
            player.volume.rampTo(0, 0.1);
          } else {
            player.volume.rampTo(-Infinity, 0.1);
          }
        });

        // Start only initially checked
        if (checkbox.checked) {
          if (player.state !== "started") {
            player.sync().start(0);
          }
          player.volume.rampTo(0, 0.1);
        }
      });

      if (Tone.Transport.state !== "started") {
        Tone.Transport.start();
      }
    }

    // 7. Start / Stop Song
    function startSong() {
      // Force all checkboxes on
      const trackCheckboxes = tracksContainer.querySelectorAll('input[type="checkbox"]');
      trackCheckboxes.forEach(chk => { chk.checked = true; });

      currentTrackPlayers.forEach(player => {
        if (player.state !== "started") {
          player.start();
        }
        player.volume.rampTo(0, 0.1);
      });
      Tone.Transport.start();
    }
    function stopSong() {
      currentTrackPlayers.forEach(p => {
        if (p.state === "started") {
          p.stop();
          p.unsync();
        }
      });
      Tone.Transport.stop();
      isPlaying = false;
    }

    /*************************************************************
     * EFFECTS EVENT LISTENERS
     *************************************************************/
    // =========== Distortion ===========
    distBypass.addEventListener("change", () => {
      if (distBypass.checked) {
        distortion.wet.value = parseFloat(distWet.value);
      } else {
        distortion.wet.value = 0;
      }
    });
    distValue.addEventListener("input", () => {
      distortion.distortion = parseFloat(distValue.value);
      distValueLabel.textContent = distValue.value;
    });
    distWet.addEventListener("input", () => {
      if (distBypass.checked) {
        distortion.wet.value = parseFloat(distWet.value);
      }
      distWetLabel.textContent = distWet.value;
    });

    // =========== Chorus ===========
    chorusBypass.addEventListener("change", () => {
      if (chorusBypass.checked) {
        chorus.wet.value = parseFloat(chorusWet.value);
      } else {
        chorus.wet.value = 0;
      }
    });
    chorusFrequency.addEventListener("input", () => {
      chorus.frequency.value = parseFloat(chorusFrequency.value);
      chorusFreqLabel.textContent = chorusFrequency.value + " Hz";
    });
    chorusDepth.addEventListener("input", () => {
      chorus.depth = parseFloat(chorusDepth.value);
      chorusDepthLabel.textContent = chorusDepth.value;
    });
    chorusWet.addEventListener("input", () => {
      if (chorusBypass.checked) {
        chorus.wet.value = parseFloat(chorusWet.value);
      }
      chorusWetLabel.textContent = chorusWet.value;
    });

    // =========== Phaser ===========
    phaserBypass.addEventListener("change", () => {
      if (phaserBypass.checked) {
        phaser.wet.value = parseFloat(phaserWet.value);
      } else {
        phaser.wet.value = 0;
      }
    });
    phaserFrequency.addEventListener("input", () => {
      phaser.frequency.value = parseFloat(phaserFrequency.value);
      phaserFreqLabel.textContent = phaserFrequency.value + " Hz";
    });
    phaserOctaves.addEventListener("input", () => {
      phaser.octaves = parseInt(phaserOctaves.value, 10);
      phaserOctavesLabel.textContent = phaserOctaves.value;
    });
    phaserWet.addEventListener("input", () => {
      if (phaserBypass.checked) {
        phaser.wet.value = parseFloat(phaserWet.value);
      }
      phaserWetLabel.textContent = phaserWet.value;
    });

    // =========== AutoWah ===========
    awBypass.addEventListener("change", () => {
      autoWah.wet.rampTo(awBypass.checked ? parseFloat(awWet.value) : 0, 0.05);
    });
    awBasefreq.addEventListener("input", () => {
      autoWah.baseFrequency = parseFloat(awBasefreq.value);
      awBasefreqLabel.textContent = awBasefreq.value + " Hz";
    });
    awOctaves.addEventListener("input", () => {
      autoWah.octaves = parseInt(awOctaves.value, 10);
      awOctavesLabel.textContent = awOctaves.value;
    });
    awWet.addEventListener("input", () => {
      if (awBypass.checked) {
        autoWah.wet.rampTo(parseFloat(awWet.value), 0.05);
      }
      awWetLabel.textContent = awWet.value;
    });

    // =========== Vibrato ===========
    vibratoBypass.addEventListener("change", () => {
      vibrato.wet.rampTo(vibratoBypass.checked ? parseFloat(vibratoWet.value) : 0, 0.05);
    });
    vibratoFrequency.addEventListener("input", () => {
      vibrato.frequency.rampTo(parseFloat(vibratoFrequency.value), 0.05);
      vibratoFreqLabel.textContent = vibratoFrequency.value + " Hz";
    });
    vibratoDepth.addEventListener("input", () => {
      vibrato.depth = parseFloat(vibratoDepth.value);
      vibratoDepthLabel.textContent = vibratoDepth.value;
    });
    vibratoWet.addEventListener("input", () => {
      if (vibratoBypass.checked) {
        vibrato.wet.rampTo(parseFloat(vibratoWet.value), 0.05);
      }
      vibratoWetLabel.textContent = vibratoWet.value;
    });

    // =========== AutoFilter ===========
    afBypass.addEventListener("change", () => {
      autoFilter.wet.rampTo(afBypass.checked ? parseFloat(afWet.value) : 0, 0.05);
    });
    afFrequency.addEventListener("input", () => {
      autoFilter.frequency.rampTo(parseFloat(afFrequency.value), 0.05);
      afFreqLabel.textContent = afFrequency.value + " Hz";
    });
    afDepth.addEventListener("input", () => {
      autoFilter.depth = parseFloat(afDepth.value);
      afDepthLabel.textContent = afDepth.value;
    });
    afWet.addEventListener("input", () => {
      if (afBypass.checked) {
        autoFilter.wet.rampTo(parseFloat(afWet.value), 0.05);
      }
      afWetLabel.textContent = afWet.value;
    });

    // Ensure the BitCrusher bypass checkbox is unchecked on load
bitcrusherBypass.checked = false;

bitcrusherBypass.addEventListener("change", () => {
  bitCrusher.wet.value = bitcrusherBypass.checked
    ? parseFloat(bitcrusherWet.value)
    : 0;
});

bitcrusherBits.addEventListener("input", () => {
  bitCrusher.bits = parseInt(bitcrusherBits.value, 10);
  bitcrusherBitsLabel.textContent = bitcrusherBits.value + " bits";
});

bitcrusherWet.addEventListener("input", () => {
  if (bitcrusherBypass.checked) {
    bitCrusher.wet.value = parseFloat(bitcrusherWet.value);
  }
  bitcrusherWetLabel.textContent = bitcrusherWet.value;
});

    // =========== Reverb ===========
    reverbBypass.addEventListener("change", () => {
      reverb.wet.value = reverbBypass.checked
        ? parseFloat(reverbWetSlider.value)
        : 0;
    });
    reverbDecaySlider.addEventListener("input", () => {
      reverb.decay = parseFloat(reverbDecaySlider.value);
      reverbDecayLabel.textContent = reverbDecaySlider.value + "s";
    });
    reverbWetSlider.addEventListener("input", () => {
      if (reverbBypass.checked) {
        reverb.wet.value = parseFloat(reverbWetSlider.value);
      }
      reverbWetLabel.textContent = reverbWetSlider.value;
    });

    // =========== Delay ===========
    delayBypass.addEventListener("change", () => {
      delayEffect.wet.value = delayBypass.checked
        ? parseFloat(delayWet.value)
        : 0;
    });
    delayTimeSlider.addEventListener("input", () => {
      // smoother approach is rampTo
      delayEffect.delayTime.rampTo(parseFloat(delayTimeSlider.value), 0.1);
      delayTimeLabel.textContent = delayTimeSlider.value + "s";
    });
    delayFeedback.addEventListener("input", () => {
      delayEffect.feedback.value = parseFloat(delayFeedback.value);
      delayFeedbackLabel.textContent = delayFeedback.value;
    });
    delayWet.addEventListener("input", () => {
      if (delayBypass.checked) {
        delayEffect.wet.value = parseFloat(delayWet.value);
      }
      delayWetLabel.textContent = delayWet.value;
    });