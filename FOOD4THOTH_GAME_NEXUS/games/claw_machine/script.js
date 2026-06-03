/* =============================================================
   ✿ KAWAII CLAW CATCHER ✿  -  script.js
   Original mechanics preserved; sound, particles, polish added.
   ============================================================= */

/* -----------------------------------------------------------
   1. AUDIO  (Web Audio API – chiptune sounds, no asset files)
   ----------------------------------------------------------- */
const Audio = (() => {
  let ctx = null;
  let muted = false;
  const ensure = () => {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) { return null; }
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };
  const tone = ({ freq = 440, dur = 0.12, type = 'square', vol = 0.18, attack = 0.005, release = 0.06, slideTo = null }) => {
    if (muted) return;
    const c = ensure(); if (!c) return;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime);
    if (slideTo != null) osc.frequency.exponentialRampToValueAtTime(slideTo, c.currentTime + dur);
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(vol, c.currentTime + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur + release);
    osc.connect(g).connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + dur + release + 0.02);
  };
  const seq = (notes) => {
    notes.forEach((n, i) => setTimeout(() => tone(n), n.delay || i * 70));
  };
  return {
    move:    () => tone({ freq: 380, dur: 0.05, type: 'square', vol: 0.08 }),
    click:   () => tone({ freq: 720, dur: 0.05, type: 'square', vol: 0.12 }),
    drop:    () => tone({ freq: 200, dur: 0.18, type: 'sawtooth', vol: 0.14, slideTo: 80 }),
    grab:    () => seq([
      { freq: 660, dur: 0.06, type: 'square', vol: 0.14 },
      { freq: 880, dur: 0.06, type: 'square', vol: 0.14, delay: 80 },
    ]),
    miss:    () => tone({ freq: 240, dur: 0.25, type: 'sawtooth', vol: 0.14, slideTo: 110 }),
    collect: () => seq([
      { freq: 784, dur: 0.08, type: 'triangle', vol: 0.18 },
      { freq: 988, dur: 0.08, type: 'triangle', vol: 0.18, delay: 80 },
      { freq: 1318, dur: 0.16, type: 'triangle', vol: 0.18, delay: 160 },
    ]),
    win: () => {
      const notes = [523, 659, 784, 1047, 784, 1047, 1319];
      notes.forEach((f, i) => setTimeout(() =>
        tone({ freq: f, dur: 0.16, type: 'triangle', vol: 0.2 }), i * 130));
    },
    button: () => tone({ freq: 600, dur: 0.06, type: 'square', vol: 0.14, slideTo: 900 }),
    isMuted: () => muted,
    toggle:  () => { muted = !muted; if (!muted) ensure(); return muted; },
  };
})();

/* -----------------------------------------------------------
   2. ATMOSPHERE  (sakura petals + bg sparkles)
   ----------------------------------------------------------- */
function makePetals(n = 14) {
  const host = document.getElementById('petals');
  for (let i = 0; i < n; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${10 + Math.random() * 12}s`;
    p.style.animationDelay = `${-Math.random() * 20}s`;
    p.style.transform = `scale(${0.6 + Math.random() * 0.8})`;
    host.appendChild(p);
  }
}
function makeBgSparkles(n = 22) {
  const host = document.getElementById('bgSparkles');
  for (let i = 0; i < n; i++) {
    const s = document.createElement('div');
    s.className = 'spark';
    s.style.left = `${Math.random() * 100}%`;
    s.style.top  = `${Math.random() * 100}%`;
    s.style.animationDuration = `${2 + Math.random() * 3}s`;
    s.style.animationDelay = `${-Math.random() * 5}s`;
    host.appendChild(s);
  }
}
makePetals();
makeBgSparkles();

/* -----------------------------------------------------------
   3. PARTICLE SYSTEM (in-game burst effects)
   ----------------------------------------------------------- */
const Particles = (() => {
  const layer = document.getElementById('particleLayer');
  const burst = (x, y, opts = {}) => {
    if (!layer) return;
    const {
      count = 10,
      kinds = ['heart', 'star', 'sparkle'],
      glyphs = { heart: '♡', star: '★', sparkle: '✦' },
      spread = 80,
      duration = 900,
    } = opts;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      p.className = `particle ${kind}`;
      p.textContent = glyphs[kind];
      p.style.left = `${x}px`;
      p.style.top  = `${y}px`;
      const angle = Math.random() * Math.PI * 2;
      const dist = spread * (0.5 + Math.random() * 0.7);
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 30; // slight upward bias
      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--dy', `${dy}px`);
      p.style.fontSize = `${10 + Math.random() * 14}px`;
      p.style.animation = `particleBurst ${duration}ms ease-out forwards`;
      p.style.animationDelay = `${Math.random() * 80}ms`;
      layer.appendChild(p);
      setTimeout(() => p.remove(), duration + 200);
    }
  };
  // Anchor a burst to a target element's center, relative to layer
  const burstAt = (el, opts) => {
    const layerRect = layer.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    burst(
      r.left - layerRect.left + r.width / 2,
      r.top  - layerRect.top  + r.height / 2,
      opts
    );
  };
  return { burst, burstAt };
})();

/* -----------------------------------------------------------
   4. CONFETTI (window-wide celebration)
   ----------------------------------------------------------- */
function launchConfetti(amount = 120) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'confetto';
      c.style.left = Math.random() * 100 + '%';
      c.style.top = '-20px';
      c.style.setProperty('--rand', Math.random());
      c.style.setProperty('--shape', Math.random() > 0.5 ? '50%' : '2px');
      document.body.appendChild(c);
      const horizontalDrift = (Math.random() * 200) - 100;
      const rotation = Math.random() * 1080;
      c.animate([
        { transform: 'translate(0,0) rotate(0)', opacity: 1 },
        { transform: `translate(${horizontalDrift}px, 110vh) rotate(${rotation}deg)`, opacity: 0 },
      ], {
        duration: 4500 + Math.random() * 2500,
        easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
        fill: 'forwards',
      });
      setTimeout(() => c.remove(), 8000);
    }, i * 25);
  }
}

/* -----------------------------------------------------------
   5. UI WIRING (sound toggle, mascot, mode pills)
   ----------------------------------------------------------- */
const ui = {
  soundBtn:    document.getElementById('btnSound'),
  mascotEl:    document.getElementById('mascotBubble'),
  mascotText:  document.getElementById('mascotText'),
  counterNum:  document.getElementById('counterNum'),
  counterMax:  document.getElementById('counterMax'),
  counterPill: document.getElementById('counterPill'),
  modePill:    document.getElementById('modePill'),
  modeLabel:   document.getElementById('modeLabel'),
  timerWrap:   document.getElementById('timerWrapper'),
  timerEl:     document.getElementById('timer-display'),
  winOverlay:  document.getElementById('winOverlay'),
  winCount:    document.getElementById('winCount'),
  winTime:     document.getElementById('winTime'),
  winReplay:   document.getElementById('winReplay'),
};

ui.soundBtn.addEventListener('click', () => {
  const isMuted = Audio.toggle();
  ui.soundBtn.classList.toggle('muted', isMuted);
  if (!isMuted) Audio.click();
});

const mascotLines = {
  idle:    ['Tap the buttons to grab a friend! ♡', 'You can do it~ ✿', 'Good luck~!'],
  freeIntro: 'Take your time! No pressure ♡',
  challengeIntro: 'Catch all 11 friends fast!! ⏱',
  extraIntro: 'Careful — misses cost you! 💢',
  grab:    ['Got one! ✨', 'So cute~!', 'Yatta! ♡'],
  miss:    ['Aww... try again!', 'So close!', 'Ganbatte~!'],
  collect: ['Welcome home! ♡', 'Cuteness +1', 'Aw, look!'],
};
function mascotSay(text) {
  ui.mascotText.textContent = text;
  ui.mascotEl.classList.remove('pulse');
  // force reflow to restart animation
  void ui.mascotEl.offsetWidth;
  ui.mascotEl.classList.add('pulse');
}
function mascotRandom(key) {
  const arr = mascotLines[key];
  if (!Array.isArray(arr)) { mascotSay(arr); return; }
  mascotSay(arr[Math.floor(Math.random() * arr.length)]);
}

function bumpPill(el) {
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
}

/* -----------------------------------------------------------
   6. ORIGINAL CLAW MACHINE STATE  (preserved from original)
   ----------------------------------------------------------- */
const elements = {
  clawMachine:    document.querySelector('.claw-machine'),
  box:            document.querySelector('.box'),
  collectionBox:  document.querySelector('.collection-box'),
  collectionArrow: document.querySelector('.collection-arrow'),
  toys: [],
};

const settings = {
  targetToy: null,
  collectedNumber: 0,
};

// 12 grid slots, but we skip i===8 to leave the collection-arrow area open => 11 toys total.
const TOTAL_TOYS = 11;
ui.counterMax.textContent = TOTAL_TOYS;

let gameMode = 'free';
let timerInterval = null;
let startTime = 0;

let highScoresChallenge = [Infinity, Infinity, Infinity];
let highScoresExtra     = [Infinity, Infinity, Infinity];

const m = 2;
const toys = {
  bear:     { w: 20*m, h: 27*m },
  bunny:    { w: 20*m, h: 29*m },
  golem:    { w: 20*m, h: 27*m },
  cucumber: { w: 16*m, h: 28*m },
  penguin:  { w: 24*m, h: 22*m },
  robot:    { w: 20*m, h: 30*m },
};

const sortedToys = [...Object.keys(toys), ...Object.keys(toys)]
  .sort(() => 0.5 - Math.random());

const cornerBuffer = 16;
const machineBuffer = { x: 36, y: 16 };

const radToDeg = (r) => Math.round(r * (180 / Math.PI));
const calcX = (i, n) => i % n;
const calcY = (i, n) => Math.floor(i / n);

const machineRect = elements.clawMachine.getBoundingClientRect();
const machineWidth  = machineRect.width;
const machineHeight = machineRect.height;
const machineTop    = machineRect.top;
const { height: machineTopHeight } = document.querySelector('.machine-top').getBoundingClientRect();
const { height: machineBottomHeight, top: machineBottomTop } =
  document.querySelector('.machine-bottom').getBoundingClientRect();

const maxArmLength = machineBottomTop - machineTop - machineBuffer.y;

function adjustAngle(a) { a = a % 360; return a < 0 ? a + 360 : a; }
function randomN(min, max) { return Math.round(min - 0.5 + Math.random() * (max - min + 1)); }

/* -----------------------------------------------------------
   7. TIMER / HIGH-SCORES
   ----------------------------------------------------------- */
function startTimer() {
  startTime = Date.now();
  ui.timerWrap.classList.remove('hidden');
  ui.timerEl.textContent = '00:00';
  ui.timerWrap.classList.remove('warn');
  timerInterval = setInterval(() => {
    const diff = Math.floor((Date.now() - startTime) / 1000);
    const mn = Math.floor(diff / 60);
    const sc = diff % 60;
    ui.timerEl.textContent =
      String(mn).padStart(2, '0') + ':' + String(sc).padStart(2, '0');
    if (gameMode === 'extra' && diff >= 60) ui.timerWrap.classList.add('warn');
  }, 250);
}
function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  ui.timerWrap.classList.add('hidden');
  ui.timerWrap.classList.remove('warn');
}
function getElapsedTime() { return Math.floor((Date.now() - startTime) / 1000); }

function fmtTime(s) {
  const mn = Math.floor(s / 60);
  const sc = s % 60;
  return String(mn).padStart(2, '0') + ':' + String(sc).padStart(2, '0');
}
function updateHighScores(seconds, mode) {
  const arr = mode === 'challenge' ? highScoresChallenge : highScoresExtra;
  arr.push(seconds);
  arr.sort((a, b) => a - b);
  arr.length = 3;
}
function renderHighScores(mode) {
  const board = document.getElementById('scoreboard');
  const list = document.getElementById('score-list');
  board.classList.remove('hidden');
  list.innerHTML = '';
  const arr = mode === 'challenge' ? highScoresChallenge : highScoresExtra;
  arr.forEach((score) => {
    const li = document.createElement('li');
    li.textContent = (score === Infinity || score >= 999999) ? '--:--' : fmtTime(score);
    list.appendChild(li);
  });
}

/* -----------------------------------------------------------
   8. MISS HANDLING (extra mode penalty)
   ----------------------------------------------------------- */
function handleMiss() {
  Audio.miss();
  document.querySelector('.cabinet').classList.add('shake');
  setTimeout(() => document.querySelector('.cabinet').classList.remove('shake'), 400);
  mascotRandom('miss');

  if (gameMode === 'extra') {
    const wrappers = elements.collectionBox.querySelectorAll('.toy-wrapper');
    if (wrappers.length > 0) {
      const last = wrappers[wrappers.length - 1];
      last.style.transition = 'transform 0.3s, opacity 0.3s';
      last.style.transform = 'scale(0.2) rotate(360deg)';
      last.style.opacity = '0';
      setTimeout(() => last.remove(), 300);
      settings.collectedNumber--;
      ui.counterNum.textContent = settings.collectedNumber;
      bumpPill(ui.counterPill);
      spawnOneToy();
    }
  }
}

/* -----------------------------------------------------------
   9. WORLD-OBJECT BASE  (preserved)
   ----------------------------------------------------------- */
class Button {
  constructor({ className, action, isLocked, pressAction, releaseAction }) {
    Object.assign(this, {
      el: document.querySelector(`.${className}`),
      isLocked,
    });
    if (action) this.el.addEventListener('click', action);
    ['mousedown', 'touchstart'].forEach((evt) =>
      this.el.addEventListener(evt, (e) => { Audio.move(); pressAction(e); })
    );
    ['mouseup', 'touchend', 'touchcancel'].forEach((evt) =>
      this.el.addEventListener(evt, releaseAction)
    );
    if (!isLocked) this.activate();
  }
  activate()   { this.isLocked = false; this.el.classList.add('active'); }
  deactivate() { this.isLocked = true;  this.el.classList.remove('active'); }
}

class WorldObject {
  constructor(props) {
    Object.assign(this, {
      x: 0, y: 0, z: 0, angle: 0,
      transformOrigin: { x: 0, y: 0 },
      interval: null, default: {}, moveWith: [],
      el: props.className && document.querySelector(`.${props.className}`),
      ...props,
    });
    this.setStyles();
    if (props.className) {
      const { width, height } = this.el.getBoundingClientRect();
      this.w = width; this.h = height;
    }
    ['x', 'y', 'w', 'h'].forEach((k) => this.default[k] = this[k]);
  }
  setStyles() {
    Object.assign(this.el.style, {
      left: `${this.x}px`,
      top: !this.bottom && `${this.y}px`,
      bottom: this.bottom,
      width: `${this.w}px`,
      height: `${this.h}px`,
      transformOrigin: this.transformOrigin,
      zIndex: this.z,
    });
  }
  setClawPos(p)         { this.clawPos = p; }
  setTransformOrigin(o) {
    this.transformOrigin = (o === 'center') ? 'center' : `${o.x}px ${o.y}px`;
    this.setStyles();
  }
  handleNext(next) { clearInterval(this.interval); if (next) next(); }
  resumeMove(o)    { this.interval = null; this.move(o); }
  resizeShadow()   { elements.box.style.setProperty('--scale', 0.5 + this.h / maxArmLength / 2); }
  move({ moveKey, target, moveTime, next }) {
    if (this.interval) { this.handleNext(next); return; }
    const moveTarget = target ?? this.default[moveKey];
    this.interval = setInterval(() => {
      const distance = Math.abs(this[moveKey] - moveTarget) < 10
        ? Math.abs(this[moveKey] - moveTarget)
        : 10;
      const inc = (this[moveKey] > moveTarget) ? -distance : distance;
      if (inc > 0 ? this[moveKey] < moveTarget : this[moveKey] > moveTarget) {
        this[moveKey] += inc;
        this.setStyles();
        if (moveKey === 'h') this.resizeShadow();
        if (this.moveWith.length) {
          this.moveWith.forEach((obj) => {
            if (!obj) return;
            if (moveKey === 'h') obj.y += inc;
            else                 obj[moveKey] += inc;
            obj.setStyles();
          });
        }
      } else {
        this.handleNext(next);
      }
    }, moveTime || 100);
  }
  distanceBetween(target) {
    return Math.round(
      Math.sqrt((this.x - target.x) ** 2 + (this.y - target.y) ** 2)
    );
  }
}

class Toy extends WorldObject {
  constructor(props) {
    const toyType = sortedToys[props.index];
    const size = toys[toyType];
    super({
      el: Object.assign(document.createElement('div'), {
        className: `toy pix ${toyType}`,
      }),
      x: cornerBuffer
        + calcX(props.index, 4) * ((machineWidth - cornerBuffer * 3) / 4)
        + size.w / 2 + randomN(-6, 6),
      y: machineBottomTop - machineTop + cornerBuffer
        + calcY(props.index, 4) * ((machineBottomHeight - cornerBuffer * 2) / 3)
        - size.h / 2 + randomN(-2, 2),
      z: 0, toyType, ...size, ...props,
    });
    elements.box.append(this.el);
    this.el.addEventListener('click', () => this.collectToy());
    elements.toys.push(this);
  }
  collectToy() {
    Audio.collect();
    Particles.burstAt(this.el, { count: 14, spread: 100 });

    this.el.classList.remove('selected');
    this.x = machineWidth / 2 - this.w / 2;
    this.y = machineHeight / 2 - this.h / 2;
    this.z = 7;
    this.el.style.setProperty('--rotate-angle', '0deg');
    this.setTransformOrigin('center');
    this.el.classList.add('display');
    elements.clawMachine.classList.add('show-overlay');

    settings.collectedNumber++;
    ui.counterNum.textContent = settings.collectedNumber;
    bumpPill(ui.counterPill);
    mascotRandom('collect');

    elements.collectionBox.appendChild(
      Object.assign(document.createElement('div'), {
        className: `toy-wrapper ${settings.collectedNumber > 6 ? 'squeeze-in' : ''}`,
        innerHTML: `<div class="toy pix ${this.toyType}"></div>`,
      })
    );

    setTimeout(() => {
      elements.clawMachine.classList.remove('show-overlay');
      if (!document.querySelector('.selected')) {
        elements.collectionArrow.classList.remove('active');
      }
      checkAllCollected();
    }, 1000);
  }
  setRotateAngle() {
    const angle = radToDeg(
      Math.atan2(
        this.y + this.h / 2 - this.clawPos.y,
        this.x + this.w / 2 - this.clawPos.x
      )
    ) - 90;
    const adj = Math.round(adjustAngle(angle));
    this.angle = (adj < 180) ? adj * -1 : 360 - adj;
    this.el.style.setProperty('--rotate-angle', `${this.angle}deg`);
  }
}

/* -----------------------------------------------------------
   10. GAME FLOW
   ----------------------------------------------------------- */
function spawnToys() {
  elements.toys = [];
  for (let i = 0; i < 12; i++) {
    if (i === 8) continue; // intentional gap (collection drop point)
    new Toy({ index: i });
  }
}
function spawnOneToy() {
  // Pick a random valid grid slot (0..11, skip 8 — collection drop area)
  let slot = Math.floor(Math.random() * 12);
  while (slot === 8) slot = Math.floor(Math.random() * 12);
  new Toy({ index: slot });
}
function clearBoard() {
  // Cancel any in-flight claw movements so mid-grab mode-switch is safe
  [armJoint, vertRail, arm].forEach((o) => {
    if (o && o.interval) clearInterval(o.interval);
    if (o) { o.interval = null; o.moveWith[0] = null; }
  });
  settings.targetToy = null;

  elements.toys.forEach((t) => t.el.remove());
  elements.toys = [];
  elements.collectionBox.innerHTML = '';
  settings.collectedNumber = 0;
  ui.counterNum.textContent = '0';
  // Clean any lingering "selected" toy + overlays
  document.querySelectorAll('.toy.selected, .toy.display').forEach(e => e.remove());
  elements.clawMachine.classList.remove('show-overlay');
  elements.collectionArrow.classList.remove('active');
  // Reset arm visual
  arm && arm.el.classList.remove('missed', 'open');
}

function setActiveModeButton(mode) {
  document.querySelectorAll('.mode-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.mode === mode);
  });
  const labels = { free: 'Free Play', challenge: 'Time Trial', extra: 'Hard Mode' };
  ui.modeLabel.textContent = labels[mode] || mode;
  bumpPill(ui.modePill);
}

function startGame(mode) {
  Audio.button();
  gameMode = mode;
  ui.timerEl.textContent = '00:00';
  ui.winOverlay.classList.add('hidden');
  document.getElementById('scoreboard').classList.add('hidden');

  clearBoard();
  spawnToys();
  setActiveModeButton(mode);

  if (mode === 'challenge')      mascotSay(mascotLines.challengeIntro);
  else if (mode === 'extra')     mascotSay(mascotLines.extraIntro);
  else                            mascotSay(mascotLines.freeIntro);

  if (mode === 'challenge' || mode === 'extra') startTimer();
  else stopTimer();
}

function checkAllCollected() {
  if (settings.collectedNumber >= TOTAL_TOYS) endGame();
}

function endGame() {
  stopTimer();
  const finalTime = getElapsedTime();

  if (gameMode === 'challenge') updateHighScores(finalTime, 'challenge');
  else if (gameMode === 'extra') updateHighScores(finalTime, 'extra');

  showCelebration(finalTime);
}

/* -----------------------------------------------------------
   11. CELEBRATION
   ----------------------------------------------------------- */
function showCelebration(finalTime) {
  Audio.win();
  launchConfetti(140);

  ui.winCount.textContent = TOTAL_TOYS;
  ui.winTime.textContent = (gameMode === 'free') ? '∞' : fmtTime(finalTime);

  // Re-render scoreboard inside the win overlay for timed modes
  if (gameMode === 'challenge') renderHighScores('challenge');
  else if (gameMode === 'extra') renderHighScores('extra');

  ui.winOverlay.classList.remove('hidden');
  ui.winOverlay.style.display = 'grid';

  // Steady stream of additional confetti waves
  setTimeout(() => launchConfetti(60), 1200);
  setTimeout(() => launchConfetti(40), 2400);
}

ui.winReplay.addEventListener('click', () => {
  Audio.button();
  ui.winOverlay.classList.add('hidden');
  ui.winOverlay.style.display = '';
  startGame(gameMode);
});

/* -----------------------------------------------------------
   12. MODE BUTTONS
   ----------------------------------------------------------- */
document.querySelectorAll('.mode-btn').forEach((btn) => {
  btn.addEventListener('click', () => startGame(btn.dataset.mode));
});

/* -----------------------------------------------------------
   13. CLAW MOVEMENT  (preserved, w/ sound + particle hooks)
   ----------------------------------------------------------- */
elements.box.style.setProperty('--shadow-pos', `${maxArmLength}px`);

const armJoint = new WorldObject({ className: 'arm-joint' });
const vertRail = new WorldObject({ className: 'vert', moveWith: [null, armJoint] });
const arm      = new WorldObject({ className: 'arm' });

armJoint.resizeShadow();
armJoint.move({
  moveKey: 'y',
  target: machineTopHeight - machineBuffer.y,
  moveTime: 50,
  next: () => vertRail.resumeMove({
    moveKey: 'x',
    target: machineBuffer.x,
    moveTime: 50,
    next: () => {
      Object.assign(armJoint.default, {
        y: machineTopHeight - machineBuffer.y,
        x: machineBuffer.x,
      });
      Object.assign(vertRail.default, { x: machineBuffer.x });
      activateHoriBtn();
    },
  }),
});

function doOverlap(a, b) {
  return (b.x > a.x && b.x < (a.x + a.w) && b.y > a.y && b.y < (a.y + a.h));
}

function getClosestToy() {
  const claw = {
    y: armJoint.y + maxArmLength + machineBuffer.y + 7,
    x: armJoint.x + 7,
    w: 40, h: 32,
  };
  const overlapped = elements.toys.filter((t) => doOverlap(t, claw));
  if (overlapped.length) {
    const toy = overlapped.sort((a, b) => b.index - a.index)[0];
    toy.setTransformOrigin({ x: claw.x - toy.x, y: claw.y - toy.y });
    toy.setClawPos({ x: claw.x, y: claw.y });
    settings.targetToy = toy;
  }
}

function stopHoriBtnAndActivateVertBtn() {
  armJoint.interval = null;
  horiBtn.deactivate();
  vertBtn.activate();
}
function activateHoriBtn() {
  horiBtn.activate();
  [vertRail, armJoint, arm].forEach((c) => c.interval = null);
}

function dropToy() {
  arm.el.classList.add('open');
  Audio.drop();
  if (settings.targetToy) {
    settings.targetToy.z = 3;
    settings.targetToy.move({
      moveKey: 'y',
      target: machineHeight - settings.targetToy.h - 30,
      moveTime: 50,
    });
    [vertRail, armJoint, arm].forEach((o) => o.moveWith[0] = null);
  }
  setTimeout(() => {
    arm.el.classList.remove('open');
    activateHoriBtn();
    if (settings.targetToy) {
      settings.targetToy.el.classList.add('selected');
      elements.collectionArrow.classList.add('active');
      // Sparkle puff at drop location
      Particles.burstAt(settings.targetToy.el, { count: 8, spread: 60, kinds: ['sparkle', 'star'] });
      settings.targetToy = null;
    }
  }, 700);
}

function grabToy() {
  if (settings.targetToy) {
    Audio.grab();
    [vertRail, armJoint, arm].forEach((o) => o.moveWith[0] = settings.targetToy);
    settings.targetToy.setRotateAngle();
    settings.targetToy.el.classList.add('grabbed');
    Particles.burstAt(settings.targetToy.el, { count: 10, spread: 70 });
    mascotRandom('grab');
  } else {
    arm.el.classList.add('missed');
    handleMiss();
  }
}

const horiBtn = new Button({
  className: 'hori-btn',
  isLocked: true,
  pressAction: () => {
    arm.el.classList.remove('missed');
    vertRail.move({
      moveKey: 'x',
      target: machineWidth - armJoint.w - machineBuffer.x,
      next: stopHoriBtnAndActivateVertBtn,
    });
  },
  releaseAction: () => {
    clearInterval(vertRail.interval);
    stopHoriBtnAndActivateVertBtn();
  },
});

const vertBtn = new Button({
  className: 'vert-btn',
  isLocked: true,
  pressAction: () => {
    if (vertBtn.isLocked) return;
    armJoint.move({ moveKey: 'y', target: machineBuffer.y });
  },
  releaseAction: () => {
    clearInterval(armJoint.interval);
    vertBtn.deactivate();
    getClosestToy();
    setTimeout(() => {
      arm.el.classList.add('open');
      arm.move({
        moveKey: 'h',
        target: maxArmLength,
        next: () => {
          setTimeout(() => {
            arm.el.classList.remove('open');
            grabToy();
            arm.resumeMove({
              moveKey: 'h',
              next: () => vertRail.resumeMove({
                moveKey: 'x',
                next: () => armJoint.resumeMove({
                  moveKey: 'y',
                  next: dropToy,
                }),
              }),
            });
          }, 500);
        },
      });
    }, 500);
  },
});

/* -----------------------------------------------------------
   14. KICKOFF
   ----------------------------------------------------------- */
startGame('free');

// Allow keyboard play (←/→ for horizontal, Space/↓ for drop)
document.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !horiBtn.isLocked) {
    horiBtn.el.dispatchEvent(new MouseEvent('mousedown'));
  } else if ((e.key === ' ' || e.key === 'ArrowDown') && !vertBtn.isLocked) {
    e.preventDefault();
    vertBtn.el.dispatchEvent(new MouseEvent('mousedown'));
  }
});
document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    horiBtn.el.dispatchEvent(new MouseEvent('mouseup'));
  } else if (e.key === ' ' || e.key === 'ArrowDown') {
    vertBtn.el.dispatchEvent(new MouseEvent('mouseup'));
  }
});
