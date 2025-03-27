// =======================
    // 1. Define songs/tracks
    // =======================
    // Replace the URLs with your own audio file paths.
    const songsData = [
      {
        title: "Song 1",
        tracks: [
          { name: "Drum1", url: "./song1/Loop1drum.m4a" },
          { name: "Drum2", url: "./song1/Loop1drum2.m4a" },
          { name: "Drum3", url: "./song1/Loop1drum3.m4a" },
          { name: "Drum4", url: "./song1/Loop1drum4.m4a" },
					{ name: "Drum5", url: "./song1/Loop1drum5.m4a" },
          { name: "Synth1", url: "./song1/Loop1synth.m4a" },
          { name: "Synth2", url: "./song1/Loop1synth2.m4a" },
          { name: "Synth3", url: "./song1/Loop1synth3.m4a" },
					{ name: "Synth4", url: "./song1/Loop1synth4.m4a" },
          { name: "Synth5", url: "./song1/Loop1synth5.m4a" },
					{ name: "Synth6", url: "./song1/Loop1synth6.m4a" },
					{ name: "Bass1", url: "./song1/Loop1bass1.m4a" }
          
        ]
      },
      {
        title: "Song 2",
        tracks: [
          { name: "Beat 1", url: "./song2/LoopDrum1.m4a" },
          { name: "Beat 2", url: "./song2/LoopDrum2.m4a" },
          { name: "Beat 3", url: "./song2/LoopDrum3.m4a" },
          { name: "Beat 4", url: "./song2/LoopDrum4.m4a" },
          { name: "Flute 1", url: "./song2/LoopFlute1.m4a" },
          { name: "Flute 2", url: "./song2/LoopFlute2.m4a" },
          { name: "Flute 3", url: "./song2/LoopFlute3.m4a" },
          { name: "Flute 4", url: "./song2/LoopFlute4.m4a" },
          { name: "Synth 1", url: "./song2/LoopSynth1.m4a" },
          { name: "Strings 1", url: "./song2/LoopAsia1.m4a" },
					{ name: "Jungle 1", url: "./song2/LoopJungle1.m4a" },
          { name: "Space 1", url: "./song2/LoopSpace1.m4a" }
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
			
      // Add additional song objects as needed
    ];

    // ===================================
    // 2. Tone.js Audio Node Declarations
    // ===================================
    // Effects
    let reverb = new Tone.Reverb({
      decay: 1.5, // default from slider
      wet: 0      // 0 means fully dry, 1 means fully wet
    }).toDestination();

    let delay = new Tone.FeedbackDelay({
      delayTime: 0.5,
      feedback: 0.3,
      wet: 0
    }).toDestination();

    let distortion = new Tone.Distortion({
      distortion: 0.4,
      wet: 0
    }).toDestination();

    // Will hold references to each track’s Player for the currently loaded song
    let currentTrackPlayers = [];

    // ================
    // 3. Page Elements
    // ================
    const songSelect = document.getElementById("songSelect");
    const tracksContainer = document.getElementById("tracksContainer");
    const playBtn = document.getElementById("playBtn");
    const stopBtn = document.getElementById("stopBtn");

    const reverbToggle = document.getElementById("reverbToggle");
    const reverbDecay = document.getElementById("reverbDecay");

    const delayToggle = document.getElementById("delayToggle");
    const delayTime = document.getElementById("delayTime");

    const distToggle = document.getElementById("distToggle");
    const distAmount = document.getElementById("distAmount");

    // ===================================
    // 4. Populate Song Select Dropdown
    // ===================================
    songsData.forEach((song, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = song.title;
      songSelect.appendChild(option);
    });
    // By default, load the first song
    loadSong(0);

    // ================================
    // 5. Set up Event Listeners
    // ================================
    songSelect.addEventListener("change", () => {
      const songIndex = parseInt(songSelect.value, 10);
      loadSong(songIndex);
    });

    playBtn.addEventListener("click", () => {
      // Start the AudioContext if not already started
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }
      startSong(); 
    });

    stopBtn.addEventListener("click", () => {
      stopSong();
    });

    // Reverb Control
    reverbToggle.addEventListener("change", () => {
      reverb.wet.value = reverbToggle.checked ? 0.5 : 0;
    });
    reverbDecay.addEventListener("input", () => {
      reverb.decay = parseFloat(reverbDecay.value);
    });

    // Delay Control
    delayToggle.addEventListener("change", () => {
      delay.wet.value = delayToggle.checked ? 0.3 : 0;
    });
    delayTime.addEventListener("input", () => {
      delay.delayTime.value = parseFloat(delayTime.value);
    });

    // Distortion Control
    distToggle.addEventListener("change", () => {
      distortion.wet.value = distToggle.checked ? 0.5 : 0;
    });
    distAmount.addEventListener("input", () => {
      distortion.distortion = parseFloat(distAmount.value);
    });

    // ========================
    // 6. Load a Selected Song
    // ========================
    async function loadSong(songIndex) {
      // Stop & dispose any existing players first
      
      currentTrackPlayers.forEach(player => player.dispose());
      currentTrackPlayers = [];

      // Clear existing UI track list
      tracksContainer.innerHTML = "";

      const selectedSong = songsData[songIndex];

      // Create track checkboxes and Tone Players
      selectedSong.tracks.forEach((track, idx) => {
        // Track UI
        const trackDiv = document.createElement("div");
        trackDiv.classList.add("track");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `track-${idx}`;
        checkbox.checked = true; // default them ON

        const label = document.createElement("label");
        label.htmlFor = `track-${idx}`;
        label.textContent = track.name;

        trackDiv.appendChild(checkbox);
        trackDiv.appendChild(label);
        tracksContainer.appendChild(trackDiv);

        // Create a Player
        const player = new Tone.Player({
          url: track.url,
          loop: true,
          autostart: false
        });

        // Route through effects -> destination
        player.connect(reverb);
        player.connect(delay);
        player.connect(distortion);

        // Save reference
        currentTrackPlayers.push(player);

        // Toggling the checkbox fades in/out
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            player.volume.rampTo(0, 0.1); // fade in
          } else {
            player.volume.rampTo(-Infinity, 0.1); // fade out
          }
        });
      });
    }
		
		const playSelectedBtn = document.getElementById("playSelectedBtn");

let isPlaying = false; // Track if something is currently playing

// Add event listener for "Play Selected" button
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

    // Monitor real-time changes to the checkbox
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        if (player.state !== "started") {
          player.sync().start(0); // Sync with Tone.Transport and start in sync
        }
        player.volume.rampTo(0, 0.1); // Fade in
      } else {
        player.volume.rampTo(-Infinity, 0.1); // Fade out (mute)
      }
    });

    // Play only initially selected tracks
    if (checkbox.checked) {
      if (player.state !== "started") {
        player.sync().start(0); // Sync with Tone.Transport and start in sync
      }
      player.volume.rampTo(0, 0.1); // Ensure volume is at 0 dB
    }
  });

  // Start Tone.Transport if not already running
  if (Tone.Transport.state !== "started") {
    Tone.Transport.start();
  }
}



    // ============================
    // 7. Start / Stop Song Logic
    // ============================
    function startSong() {
      // Ensure *all* tracks start, regardless of checkbox state
      // Also set their checkboxes to "checked" so they’re audible
      const trackCheckboxes = tracksContainer.querySelectorAll('input[type="checkbox"]');
      trackCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
      });

      currentTrackPlayers.forEach(player => {
        if (player.state !== "started") {
          player.start();
        }
        // Ensure volume is at 0 dB (not muted)
        player.volume.rampTo(0, 0.1);
      });

      // Start the Tone Transport
      Tone.Transport.start();
    }

    function stopSong() {
  currentTrackPlayers.forEach(player => {
    if (player.state === "started") {
      player.stop();  // Stop playback
      player.unsync(); // Unsync the player from Tone.Transport to avoid sync issues
    }
  });

  Tone.Transport.stop();  // Stop the transport
  isPlaying = false;
}