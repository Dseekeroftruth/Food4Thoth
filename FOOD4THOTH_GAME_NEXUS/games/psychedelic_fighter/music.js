/* ============================================================
   MUSIC ENGINE — 11 Procedural Soundtracks
   Each generates a different mood using Tone.js
   ============================================================ */

const Music = (() => {
  let initialized = false;
  let currentTrack = null;
  let currentParts = [];
  let synths = {};
  let muted = false;
  let masterVol = null;

  async function init(){
    if (initialized) {
      // even if initialized, the iOS audio context may have been suspended
      try { if (Tone.context && Tone.context.state !== 'running') await Tone.context.resume(); } catch(e){}
      return;
    }
    try {
      await Tone.start();
      // Some iOS versions need an explicit resume after start
      if (Tone.context && Tone.context.state !== 'running') {
        try { await Tone.context.resume(); } catch(e){}
      }
    } catch(e) {
      console.warn('Tone.start failed', e);
    }
    masterVol = new Tone.Volume(-8).toDestination();
    initialized = true;
  }

  /* expose context resume for the game layer to call on every input gesture */
  function resume(){
    try {
      if (Tone.context && Tone.context.state !== 'running') {
        Tone.context.resume && Tone.context.resume();
      }
    } catch(e){}
  }

  function stop(){
    currentParts.forEach(p => { try { p.stop(); p.dispose(); } catch(e){} });
    currentParts = [];
    Object.values(synths).forEach(s => { try { s.dispose(); } catch(e){} });
    synths = {};
    Tone.Transport.stop();
    Tone.Transport.cancel();
    currentTrack = null;
  }

  /* simple SFX – persistent global synths */
  let sfxKick, sfxPunch, sfxBlock, sfxKO, sfxSpecial;
  function initSFX(){
    if (sfxKick) return;
    sfxKick = new Tone.MembraneSynth({ pitchDecay:0.02, octaves:6, envelope:{attack:0.001, decay:0.2, sustain:0, release:0.1}}).connect(masterVol);
    sfxPunch = new Tone.NoiseSynth({ noise:{type:'pink'}, envelope:{attack:0.001, decay:0.08, sustain:0}}).connect(masterVol);
    sfxBlock = new Tone.MetalSynth({ frequency:200, envelope:{attack:0.001,decay:0.1,release:0.1}, harmonicity:5, modulationIndex:32}).connect(new Tone.Volume(-15).connect(masterVol));
    sfxKO = new Tone.FMSynth({ harmonicity:0.5, modulationIndex:8, envelope:{attack:0.01,decay:0.6,sustain:0,release:1}}).connect(masterVol);
    sfxSpecial = new Tone.PolySynth(Tone.Synth, { oscillator:{type:'sawtooth'}, envelope:{attack:0.005,decay:0.5,sustain:0.2,release:0.5}}).connect(masterVol);
  }
  function sfx(type){
    if (!initialized || muted) return;
    initSFX();
    const t = Tone.now();
    try {
      if (type==='punch'){ sfxPunch.triggerAttackRelease('8n', t); }
      else if (type==='kick'){ sfxKick.triggerAttackRelease('C2', '8n', t); }
      else if (type==='hit'){ sfxKick.triggerAttackRelease('A1','8n',t); sfxPunch.triggerAttackRelease('16n',t+0.01); }
      else if (type==='block'){ sfxBlock.triggerAttackRelease('C5','32n', t); }
      else if (type==='ko'){ sfxKO.triggerAttackRelease('C1','2n',t); }
      else if (type==='special'){ sfxSpecial.triggerAttackRelease(['C4','E4','G4','C5'], '4n', t); }
      else if (type==='select'){ sfxBlock.triggerAttackRelease('E5','64n',t); }
      else if (type==='confirm'){ sfxSpecial.triggerAttackRelease(['G4','D5'], '8n', t); }
    } catch(e){}
  }

  /* ----- TRACK BUILDERS ----- */
  /* Each takes scaleNotes / tempo / synths and returns disposers */
  function makePoly(type='sawtooth', vol=-12){
    const s = new Tone.PolySynth(Tone.Synth, { oscillator:{type}, envelope:{attack:0.05,decay:0.2,sustain:0.4,release:0.6}});
    s.connect(new Tone.Volume(vol).connect(masterVol));
    return s;
  }
  function makeBass(type='triangle', vol=-10){
    const s = new Tone.Synth({ oscillator:{type}, envelope:{attack:0.01,decay:0.2,sustain:0.6,release:0.4}});
    s.connect(new Tone.Volume(vol).connect(masterVol));
    return s;
  }
  function makeDrum(){
    return {
      kick: new Tone.MembraneSynth({pitchDecay:0.05,octaves:4,envelope:{attack:0.001,decay:0.4,sustain:0,release:0.4}}).connect(new Tone.Volume(-10).connect(masterVol)),
      snare: new Tone.NoiseSynth({noise:{type:'white'},envelope:{attack:0.001,decay:0.15,sustain:0}}).connect(new Tone.Volume(-18).connect(masterVol)),
      hat: new Tone.MetalSynth({envelope:{attack:0.001,decay:0.05,release:0.05},harmonicity:5.1,modulationIndex:32,resonance:4000,octaves:1.5}).connect(new Tone.Volume(-22).connect(masterVol))
    };
  }

  function startBeat(drums, pattern='basic', bpmDiv=2){
    // pattern : 16-step kick/snare/hat arrays
    const kicks = pattern==='basic' ? [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0]
                : pattern==='punk'  ? [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0]
                : pattern==='trip'  ? [1,0,0,1, 0,0,1,0, 1,0,0,1, 0,0,0,0]
                : pattern==='funk'  ? [1,0,0,1, 0,0,1,0, 0,1,0,0, 1,0,1,0]
                : pattern==='ambient' ? [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
                : pattern==='boss'  ? [1,0,1,1, 0,1,0,1, 1,1,0,1, 0,1,1,0]
                : [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const snares= pattern==='basic' ? [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0]
                : pattern==='punk'  ? [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0]
                : pattern==='trip'  ? [0,0,0,0, 1,0,0,0, 0,0,1,0, 1,0,0,0]
                : pattern==='funk'  ? [0,0,0,0, 1,0,0,0, 0,0,0,1, 1,0,0,0]
                : pattern==='ambient'?[0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
                : pattern==='boss'  ? [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1]
                : [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0];
    const hats  = pattern==='basic' ? [0,1,0,1, 0,1,0,1, 0,1,0,1, 0,1,0,1]
                : pattern==='punk'  ? [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1]
                : pattern==='trip'  ? [1,0,1,1, 0,1,0,1, 1,0,1,1, 0,1,0,1]
                : pattern==='funk'  ? [1,1,1,1, 0,1,1,1, 1,1,0,1, 1,1,1,1]
                : pattern==='ambient'?[0,0,0,1, 0,0,0,0, 0,0,0,1, 0,0,0,0]
                : pattern==='boss'  ? [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1]
                : [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1];
    let step = 0;
    const loop = new Tone.Loop(time => {
      if (kicks[step]) drums.kick.triggerAttackRelease('C2','16n',time);
      if (snares[step]) drums.snare.triggerAttackRelease('16n',time);
      if (hats[step]) drums.hat.triggerAttackRelease('C7','64n',time);
      step = (step+1)%16;
    }, '16n').start(0);
    return loop;
  }

  function startMelody(synth, scale, octave, rhythm='8n', complexity=0.6, transposeOctaves=0){
    let step = 0;
    const loop = new Tone.Loop(time => {
      if (Math.random() < complexity){
        const note = scale[Math.floor(Math.random()*scale.length)];
        const oct = octave + (Math.random()<0.3 ? 1 : 0) + transposeOctaves;
        synth.triggerAttackRelease(note + oct, '16n', time);
      }
      step++;
    }, rhythm).start(0);
    return loop;
  }

  function startBassline(bass, root, scale, pattern='walk', oct=2){
    let step = 0;
    const seq = pattern==='walk'  ? [0,2,4,2, 0,2,4,2, 5,4,2,0, 5,4,2,0]
              : pattern==='hold'  ? [0,0,0,0, 5,5,5,5, 4,4,4,4, 0,0,0,0]
              : pattern==='funk'  ? [0,0,3,0, 0,0,5,0, 0,0,3,0, 7,5,3,0]
              : pattern==='drone' ? [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
              : pattern==='boss'  ? [0,0,4,5, 6,5,4,3, 0,0,4,5, 7,5,3,2]
              : [0,0,0,0, 4,4,4,4, 5,5,5,5, 4,4,4,4];
    const loop = new Tone.Loop(time => {
      const idx = seq[step % seq.length];
      const note = scale[idx % scale.length] + oct;
      bass.triggerAttackRelease(note, '8n', time);
      step++;
    }, '8n').start(0);
    return loop;
  }

  /* ----- 11 TRACKS ----- */
  const TRACKS = {
    /* 1. Truffula — sunny carnival */
    truffula: () => {
      Tone.Transport.bpm.value = 130;
      const lead = makePoly('triangle',-12);
      const bass = makeBass('triangle',-10);
      const drums = makeDrum();
      const scale = ['C','D','E','G','A'];
      synths = {lead, bass, ...drums};
      currentParts.push(startBeat(drums, 'basic'));
      currentParts.push(startBassline(bass, 'C', scale, 'walk', 2));
      currentParts.push(startMelody(lead, scale, 4, '8n', 0.7));
    },
    /* 2. Wonderland — disorienting waltz */
    wonderland: () => {
      Tone.Transport.bpm.value = 105;
      const lead = makePoly('sine', -10);
      const bass = makeBass('sine', -8);
      const drums = makeDrum();
      const scale = ['D','F','G','A','C'];
      synths = {lead, bass, ...drums};
      currentParts.push(startBeat(drums, 'trip'));
      currentParts.push(startBassline(bass, 'D', scale, 'walk', 2));
      currentParts.push(startMelody(lead, scale, 5, '8n', 0.6));
    },
    /* 3. Bat Country — manic surf rock */
    batcountry: () => {
      Tone.Transport.bpm.value = 175;
      const lead = makePoly('sawtooth', -14);
      const bass = makeBass('square', -10);
      const drums = makeDrum();
      const scale = ['E','G','A','B','D'];
      synths = {lead, bass, ...drums};
      currentParts.push(startBeat(drums, 'punk'));
      currentParts.push(startBassline(bass, 'E', scale, 'walk', 2));
      currentParts.push(startMelody(lead, scale, 4, '16n', 0.7));
    },
    /* 4. Geodesic — minimalist arpeggio */
    geodesic: () => {
      Tone.Transport.bpm.value = 120;
      const lead = makePoly('square', -16);
      const bass = makeBass('triangle', -10);
      const drums = makeDrum();
      const scale = ['C','D','E','G','A','B'];
      synths = {lead, bass, ...drums};
      currentParts.push(startBeat(drums, 'basic'));
      currentParts.push(startBassline(bass, 'C', scale, 'hold', 2));
      currentParts.push(startMelody(lead, scale, 5, '16n', 0.9));
    },
    /* 5. Monolith — cosmic ambient */
    monolith: () => {
      Tone.Transport.bpm.value = 80;
      const lead = makePoly('sine', -10);
      const bass = makeBass('sine', -6);
      const drums = makeDrum();
      const scale = ['C','Eb','F','G','Bb'];
      synths = {lead, bass, ...drums};
      currentParts.push(startBeat(drums, 'ambient'));
      currentParts.push(startBassline(bass, 'C', scale, 'drone', 1));
      currentParts.push(startMelody(lead, scale, 4, '4n', 0.5));
    },
    /* 6. Wasteland — heavy metal */
    wasteland: () => {
      Tone.Transport.bpm.value = 150;
      const lead = makePoly('sawtooth', -14);
      const bass = makeBass('sawtooth', -10);
      const drums = makeDrum();
      const scale = ['E','G','A','B','D'];
      synths = {lead, bass, ...drums};
      currentParts.push(startBeat(drums, 'punk'));
      currentParts.push(startBassline(bass, 'E', scale, 'walk', 1));
      currentParts.push(startMelody(lead, scale, 4, '8n', 0.7));
    },
    /* 7. Spice — Middle Eastern modal */
    spice: () => {
      Tone.Transport.bpm.value = 110;
      const lead = makePoly('sawtooth', -14);
      const bass = makeBass('triangle', -10);
      const drums = makeDrum();
      const scale = ['D','Eb','F#','G','A','Bb','C#'];  // double harmonic
      synths = {lead, bass, ...drums};
      currentParts.push(startBeat(drums, 'trip'));
      currentParts.push(startBassline(bass, 'D', scale, 'walk', 2));
      currentParts.push(startMelody(lead, scale, 4, '8n', 0.7));
    },
    /* 8. Mushroom — psychedelic floaty */
    mushroom: () => {
      Tone.Transport.bpm.value = 100;
      const lead = makePoly('sine', -10);
      const bass = makeBass('sine', -8);
      const drums = makeDrum();
      const scale = ['F','Ab','Bb','C','Eb'];
      synths = {lead, bass, ...drums};
      currentParts.push(startBeat(drums, 'trip'));
      currentParts.push(startBassline(bass, 'F', scale, 'walk', 2));
      currentParts.push(startMelody(lead, scale, 4, '8n', 0.65));
    },
    /* 9. Ayahuasca — tribal drumming with overtones */
    ayahuasca: () => {
      Tone.Transport.bpm.value = 95;
      const lead = makePoly('sine', -12);
      const bass = makeBass('triangle', -8);
      const drums = makeDrum();
      const scale = ['A','C','D','E','G'];
      synths = {lead, bass, ...drums};
      currentParts.push(startBeat(drums, 'funk'));
      currentParts.push(startBassline(bass, 'A', scale, 'hold', 2));
      currentParts.push(startMelody(lead, scale, 5, '4n', 0.5));
    },
    /* 10. Quantum — glitchy IDM */
    quantum: () => {
      Tone.Transport.bpm.value = 145;
      const lead = makePoly('square', -14);
      const bass = makeBass('square', -10);
      const drums = makeDrum();
      const scale = ['C#','E','F#','G#','B'];
      synths = {lead, bass, ...drums};
      currentParts.push(startBeat(drums, 'funk'));
      currentParts.push(startBassline(bass, 'C#', scale, 'funk', 2));
      currentParts.push(startMelody(lead, scale, 5, '16n', 0.75));
    },
    /* 11. Pyramid — boss theme, ominous */
    pyramid: () => {
      Tone.Transport.bpm.value = 140;
      const lead = makePoly('sawtooth', -10);
      const bass = makeBass('sawtooth', -8);
      const drums = makeDrum();
      const scale = ['G','Ab','B','C','D','Eb','F#'];  // phrygian dominant
      synths = {lead, bass, ...drums};
      currentParts.push(startBeat(drums, 'boss'));
      currentParts.push(startBassline(bass, 'G', scale, 'boss', 1));
      currentParts.push(startMelody(lead, scale, 4, '8n', 0.85));
    }
  };

  const TRACK_NAMES = {
    truffula:'Truffula Carnival',
    wonderland:'Tea Party Waltz',
    batcountry:'Bat Country Surf',
    geodesic:'Synergy 909',
    monolith:'Black Slab Drift',
    wasteland:'Heavy Metal Sun',
    spice:'Spice Caravan',
    mushroom:'Fungal Dream',
    ayahuasca:'Mother Vine',
    quantum:'Probability Wave',
    pyramid:'The Eye Opens'
  };

  async function play(trackId){
    if (!initialized) await init();
    if (currentTrack === trackId) return;
    stop();
    if (muted) return;
    Tone.Transport.cancel();
    Tone.Transport.position = 0;
    if (TRACKS[trackId]){
      TRACKS[trackId]();
      currentTrack = trackId;
      Tone.Transport.start();
      showTrackName(TRACK_NAMES[trackId]||trackId);
    }
  }

  function setMuted(m){
    muted = m;
    if (muted){
      stop();
    }
  }

  function showTrackName(name){
    const el = document.getElementById('track-name');
    if (!el) return;
    el.textContent = '♪ ' + name;
    el.classList.add('show');
    clearTimeout(showTrackName._t);
    showTrackName._t = setTimeout(()=> el.classList.remove('show'), 3500);
  }

  return { init, play, stop, sfx, setMuted, resume, get muted(){ return muted; } };
})();
