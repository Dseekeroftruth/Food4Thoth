/* ============================================================================
   CELLBOUND — A Roguevania
   Built in a single file. Procedural pixel art, procedural audio, procedural
   rooms, hand-tuned game feel.
   ============================================================================
   SECTIONS:
     [01] Config & Palette
     [02] Utilities
     [03] Input
     [04] Audio (procedural Web Audio SFX)
     [05] Particle system
     [06] Camera (with shake & lookahead)
     [07] Sprite data (pixel art definitions)
     [08] Sprite renderer + tile renderer
     [09] Damage numbers
     [10] Entities: base
     [11] Player
     [12] Enemies (Grunt, Archer, Brute, Boss)
     [13] Projectiles
     [14] Pickups
     [15] Rooms & World
     [16] HUD
     [17] Hub (meta-progression UI)
     [18] Game state machine + main loop
   ============================================================================ */

(() => {
'use strict';

/* ========================================================================== */
/* [01] CONFIG & PALETTE                                                       */
/* ========================================================================== */

const VW = 480;        // virtual (internal) width
const VH = 270;        // virtual (internal) height
const TILE = 16;       // tile size in virtual pixels
const TARGET_FPS = 60;
const DT = 1 / TARGET_FPS;

const C = {
  bg0:        '#06060e',
  bg1:        '#0d0d1a',
  bg2:        '#15152a',
  bg3:        '#1f1f3a',
  fog:        '#191926',
  stone:      '#2a2e3e',
  stoneDark:  '#1a1d29',
  stoneEdge:  '#3d4254',
  stoneHi:    '#525a72',
  spike:      '#8a4a4a',
  torch:      '#f4a261',
  ember:      '#e76f51',
  fire:       '#f9c74f',
  blood:      '#a01a1a',
  bloodDark:  '#5e0c0c',
  player:     '#cde6e9',
  playerDark: '#5e8b96',
  playerMid:  '#8ab4bd',
  playerEdge: '#2c3e44',
  playerCape: '#e63946',
  playerCape2:'#a01a1a',
  enemy1:     '#8e4f4f',  // grunt
  enemy1d:    '#5a2e2e',
  enemy2:     '#557d4a',  // archer
  enemy2d:    '#33502d',
  enemy3:     '#6b4a8e',  // brute
  enemy3d:    '#3f2a55',
  bossA:      '#3a1a4a',
  bossB:      '#7a2a4a',
  bossC:      '#e63946',
  gold:       '#f4d03f',
  goldDark:   '#b58c1f',
  cell:       '#5fc4d4',
  cellDark:   '#357a86',
  hp:         '#e63946',
  hpBg:       '#3a1a1f',
  text:       '#f1faee',
  textDim:    '#8a8aa0',
  textGold:   '#f4d03f',
  textCell:   '#5fc4d4',
  white:      '#ffffff',
  black:      '#000000',
  shadow:     'rgba(0,0,0,0.45)',
  iframe:     '#5fc4d4',
  warn:       '#f4a261',
  danger:     '#e63946',
};

/* ========================================================================== */
/* [02] UTILITIES                                                              */
/* ========================================================================== */

const TAU = Math.PI * 2;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const lerp  = (a, b, t)   => a + (b - a) * t;
const sign  = (v)         => (v > 0) - (v < 0);
const rand  = (a = 1, b)  => b === undefined ? Math.random() * a : a + Math.random() * (b - a);
const irand = (a, b)      => Math.floor(rand(a, b + 1));
const choice= (arr)       => arr[Math.floor(Math.random() * arr.length)];
const dist2 = (ax, ay, bx, by) => { const dx = bx - ax, dy = by - ay; return dx*dx + dy*dy; };

// AABB collision
function aabb(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

// Point-in-rectangle test (used by canvas-drawn UI buttons)
function pointInRect(p, r) {
  return p && r && p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
}

// Smooth lerp toward target (frame-rate independent-ish)
function approach(cur, target, step) {
  if (cur < target) return Math.min(cur + step, target);
  if (cur > target) return Math.max(cur - step, target);
  return cur;
}

/* ========================================================================== */
/* [03] INPUT                                                                  */
/* ========================================================================== */

const Input = {
  keys: new Set(),
  pressed: new Set(),  // single-frame buffer
  released: new Set(),

  init() {
    addEventListener('keydown', e => {
      const k = this.normalize(e.key);
      if (!this.keys.has(k)) this.pressed.add(k);
      this.keys.add(k);
      // Prevent default for game keys
      if ([' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
      }
    });
    addEventListener('keyup', e => {
      const k = this.normalize(e.key);
      this.keys.delete(k);
      this.released.add(k);
    });
    addEventListener('blur', () => { this.keys.clear(); });
  },

  normalize(k) { return k.length === 1 ? k.toLowerCase() : k; },

  endFrame() { this.pressed.clear(); this.released.clear(); },

  // Action queries
  axisX() {
    let x = 0;
    if (this.keys.has('a') || this.keys.has('ArrowLeft'))  x -= 1;
    if (this.keys.has('d') || this.keys.has('ArrowRight')) x += 1;
    return x;
  },
  down()      { return this.keys.has('s') || this.keys.has('ArrowDown'); },
  jumpHeld()  { return this.keys.has(' ') || this.keys.has('w') || this.keys.has('ArrowUp'); },
  jumpPress() { return this.pressed.has(' ') || this.pressed.has('w') || this.pressed.has('ArrowUp'); },
  attackPress(){return this.pressed.has('j') || this.pressed.has('z'); },
  heavyPress(){ return this.pressed.has('k') || this.pressed.has('x'); },
  rollPress() { return this.pressed.has('l') || this.pressed.has('c') || this.pressed.has('Shift'); },
  interactPress(){ return this.pressed.has('e') || this.pressed.has('Enter'); },
  pausePress(){ return this.pressed.has('Escape') || this.pressed.has('p'); },
  anyPress()  { return this.pressed.size > 0; },
};

/* ========================================================================== */
/* [04] AUDIO — procedural Web Audio SFX                                       */
/* ========================================================================== */

const AudioFX = {
  ctx: null,
  master: null,
  enabled: true,

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.35;
      this.master.connect(this.ctx.destination);
    } catch (e) { this.enabled = false; }
  },

  resume() { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); },

  // primitive: tone with envelope
  tone({ freq = 440, freqEnd, dur = 0.1, type = 'square', gain = 0.3, attack = 0.005, decay = 0.05, sustain = 0.0, release = 0.05 }) {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (freqEnd !== undefined) o.frequency.exponentialRampToValueAtTime(Math.max(0.01, freqEnd), t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + attack);
    g.gain.linearRampToValueAtTime(gain * sustain, t + attack + decay);
    g.gain.linearRampToValueAtTime(0, t + dur + release);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + dur + release + 0.02);
  },

  // primitive: noise burst
  noise({ dur = 0.08, gain = 0.18, lp = 8000, hp = 200 }) {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const len = Math.floor(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const lpf = this.ctx.createBiquadFilter(); lpf.type = 'lowpass'; lpf.frequency.value = lp;
    const hpf = this.ctx.createBiquadFilter(); hpf.type = 'highpass'; hpf.frequency.value = hp;
    const g = this.ctx.createGain(); g.gain.value = gain;
    src.connect(hpf); hpf.connect(lpf); lpf.connect(g); g.connect(this.master);
    src.start(t); src.stop(t + dur);
  },

  // semantic SFX
  jump()   { this.tone({ freq: 320, freqEnd: 580, dur: 0.08, type: 'square', gain: 0.18, attack: 0.005, decay: 0.04, release: 0.03 }); },
  doubleJump() { this.tone({ freq: 480, freqEnd: 760, dur: 0.09, type: 'triangle', gain: 0.2, attack: 0.005, decay: 0.04, release: 0.03 }); },
  land()   { this.noise({ dur: 0.05, gain: 0.10, lp: 1500, hp: 80 }); },
  step()   { this.noise({ dur: 0.03, gain: 0.05, lp: 2000, hp: 200 }); },
  swing()  { this.noise({ dur: 0.08, gain: 0.10, lp: 4000, hp: 600 });
             this.tone({ freq: 720, freqEnd: 320, dur: 0.06, type: 'sawtooth', gain: 0.06, attack: 0.005, decay: 0.04, release: 0.02 }); },
  heavy()  { this.noise({ dur: 0.12, gain: 0.16, lp: 3000, hp: 400 });
             this.tone({ freq: 220, freqEnd: 120, dur: 0.12, type: 'sawtooth', gain: 0.10, attack: 0.005, decay: 0.05, release: 0.04 }); },
  hit()    { this.noise({ dur: 0.06, gain: 0.18, lp: 2000, hp: 300 });
             this.tone({ freq: 180, freqEnd: 80, dur: 0.05, type: 'square', gain: 0.10, attack: 0.005, decay: 0.03, release: 0.02 }); },
  hurt()   { this.tone({ freq: 280, freqEnd: 110, dur: 0.20, type: 'square', gain: 0.18, attack: 0.005, decay: 0.10, release: 0.08 }); },
  death()  { this.tone({ freq: 220, freqEnd: 60, dur: 0.5, type: 'square', gain: 0.20, attack: 0.01, decay: 0.20, release: 0.20 }); },
  enemyDie(){ this.noise({ dur: 0.18, gain: 0.18, lp: 1500, hp: 200 });
              this.tone({ freq: 160, freqEnd: 50, dur: 0.20, type: 'square', gain: 0.10 }); },
  roll()   { this.noise({ dur: 0.16, gain: 0.10, lp: 1500, hp: 200 }); },
  pickupGold()  { this.tone({ freq: 880, freqEnd: 1320, dur: 0.10, type: 'square', gain: 0.14 }); },
  pickupCell()  { this.tone({ freq: 660, dur: 0.08, type: 'triangle', gain: 0.16 });
                  setTimeout(() => this.tone({ freq: 990, dur: 0.10, type: 'triangle', gain: 0.16 }), 60); },
  pickupHeart() { this.tone({ freq: 540, freqEnd: 720, dur: 0.14, type: 'triangle', gain: 0.16 }); },
  arrow()  { this.tone({ freq: 1200, freqEnd: 600, dur: 0.06, type: 'sawtooth', gain: 0.05 }); },
  charge() { this.tone({ freq: 200, freqEnd: 500, dur: 0.5, type: 'sawtooth', gain: 0.05, attack: 0.05, decay: 0.05, sustain: 0.7, release: 0.05 }); },
  doorOpen(){ this.tone({ freq: 110, freqEnd: 280, dur: 0.30, type: 'sawtooth', gain: 0.14 });
              this.noise({ dur: 0.20, gain: 0.10, lp: 1200, hp: 80 }); },
  uiSelect(){ this.tone({ freq: 660, dur: 0.04, type: 'square', gain: 0.10 }); },
  uiConfirm(){ this.tone({ freq: 880, freqEnd: 1100, dur: 0.08, type: 'square', gain: 0.12 }); },
  bossRoar() {
    this.tone({ freq: 60, freqEnd: 110, dur: 0.7, type: 'sawtooth', gain: 0.20 });
    this.noise({ dur: 0.6, gain: 0.18, lp: 800, hp: 60 });
  },
  victory() {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this.tone({ freq: f, dur: 0.2, type: 'triangle', gain: 0.18 }), i * 120));
  },
};

/* ========================================================================== */
/* [05] PARTICLES                                                              */
/* ========================================================================== */

class Particle {
  constructor(x, y, vx, vy, life, color, size = 1, gravity = 0, fade = true, shrink = false) {
    this.x = x; this.y = y; this.vx = vx; this.vy = vy;
    this.life = life; this.maxLife = life;
    this.color = color; this.size = size;
    this.gravity = gravity; this.fade = fade; this.shrink = shrink;
    this.dead = false;
  }
  update(dt) {
    this.life -= dt;
    if (this.life <= 0) { this.dead = true; return; }
    this.vy += this.gravity * dt;
    this.x += this.vx * dt; this.y += this.vy * dt;
  }
  draw(ctx) {
    const t = this.life / this.maxLife;
    const s = this.shrink ? Math.max(1, Math.ceil(this.size * t)) : this.size;
    if (this.fade) ctx.globalAlpha = clamp(t, 0, 1);
    ctx.fillStyle = this.color;
    ctx.fillRect(Math.floor(this.x - s/2), Math.floor(this.y - s/2), s, s);
    ctx.globalAlpha = 1;
  }
}

const Particles = {
  list: [],
  reset() { this.list.length = 0; },
  add(p) { this.list.push(p); },
  burst(x, y, count, opts = {}) {
    const { speed = 60, life = 0.4, color = '#fff', size = 2, gravity = 100, spread = TAU, dir = 0, fade = true, shrink = false } = opts;
    for (let i = 0; i < count; i++) {
      const a = dir + (Math.random() - 0.5) * spread;
      const sp = speed * (0.4 + Math.random() * 0.8);
      this.list.push(new Particle(x, y, Math.cos(a) * sp, Math.sin(a) * sp, life * (0.6 + Math.random() * 0.6), color, size, gravity, fade, shrink));
    }
  },
  blood(x, y, dir = 0) {
    this.burst(x, y, 8, { speed: 110, life: 0.5, color: C.blood, size: 2, gravity: 240, spread: 1.4, dir });
    this.burst(x, y, 4, { speed: 70, life: 0.6, color: C.bloodDark, size: 3, gravity: 240, spread: 2, dir });
  },
  spark(x, y, dir = 0) {
    this.burst(x, y, 6, { speed: 180, life: 0.18, color: C.fire, size: 2, gravity: 0, spread: 1.0, dir, shrink: true });
    this.burst(x, y, 4, { speed: 220, life: 0.14, color: C.white, size: 1, gravity: 0, spread: 0.8, dir, shrink: true });
  },
  dust(x, y) {
    this.burst(x, y, 5, { speed: 35, life: 0.35, color: C.stoneEdge, size: 2, gravity: -10, spread: 0.7, dir: -Math.PI / 2, shrink: true });
  },
  jumpDust(x, y) {
    this.burst(x, y, 4, { speed: 40, life: 0.3, color: C.stoneEdge, size: 2, gravity: 100, spread: 0.6, dir: 0, shrink: true });
    this.burst(x, y, 4, { speed: 40, life: 0.3, color: C.stoneEdge, size: 2, gravity: 100, spread: 0.6, dir: Math.PI, shrink: true });
  },
  death(x, y, color) {
    this.burst(x, y, 24, { speed: 140, life: 0.7, color, size: 2, gravity: 180, spread: TAU });
    this.burst(x, y, 8,  { speed: 60,  life: 0.9, color: '#fff', size: 1, gravity: 50, spread: TAU });
  },
  goldShimmer(x, y) {
    this.burst(x, y, 12, { speed: 80, life: 0.5, color: C.gold, size: 2, gravity: 80, spread: TAU, shrink: true });
  },
  cellSpark(x, y) {
    this.burst(x, y, 16, { speed: 120, life: 0.6, color: C.cell, size: 2, gravity: 60, spread: TAU, shrink: true });
  },
  trail(x, y, color, count = 1) {
    for (let i = 0; i < count; i++) {
      const ox = (Math.random() - 0.5) * 4;
      const oy = (Math.random() - 0.5) * 4;
      this.list.push(new Particle(x + ox, y + oy, 0, 0, 0.18, color, 2, 0, true, true));
    }
  },
  update(dt) {
    for (const p of this.list) p.update(dt);
    this.list = this.list.filter(p => !p.dead);
  },
  draw(ctx) {
    for (const p of this.list) p.draw(ctx);
  },
};

/* ========================================================================== */
/* [06] CAMERA                                                                 */
/* ========================================================================== */

const Camera = {
  x: 0, y: 0,
  shakeAmt: 0, shakeTime: 0,
  flashTime: 0, flashColor: '#fff',
  freezeTime: 0,
  bounds: null,

  reset() { this.x = 0; this.y = 0; this.shakeAmt = 0; this.shakeTime = 0; this.flashTime = 0; this.freezeTime = 0; },
  setBounds(x, y, w, h) { this.bounds = { x, y, w, h }; },

  follow(target, dt) {
    const lookX = target.facing * 24;
    const tx = target.x + target.w / 2 + lookX - VW / 2;
    const ty = target.y + target.h / 2 - VH / 2 - 20;
    this.x = lerp(this.x, tx, 1 - Math.pow(0.001, dt));
    this.y = lerp(this.y, ty, 1 - Math.pow(0.001, dt));
    if (this.bounds) {
      this.x = clamp(this.x, this.bounds.x, this.bounds.x + this.bounds.w - VW);
      this.y = clamp(this.y, this.bounds.y, this.bounds.y + this.bounds.h - VH);
    }
  },

  shake(amount, time = 0.2) {
    this.shakeAmt = Math.max(this.shakeAmt, amount);
    this.shakeTime = Math.max(this.shakeTime, time);
  },
  flash(color, time = 0.08) { this.flashColor = color; this.flashTime = Math.max(this.flashTime, time); },
  freeze(time)              { this.freezeTime = Math.max(this.freezeTime, time); },

  update(dt) {
    if (this.shakeTime > 0) { this.shakeTime -= dt; if (this.shakeTime <= 0) this.shakeAmt = 0; }
    if (this.flashTime > 0) this.flashTime -= dt;
    if (this.freezeTime > 0) this.freezeTime -= dt;
  },

  apply(ctx) {
    let sx = 0, sy = 0;
    if (this.shakeAmt > 0) {
      sx = (Math.random() - 0.5) * 2 * this.shakeAmt;
      sy = (Math.random() - 0.5) * 2 * this.shakeAmt;
    }
    ctx.translate(-Math.floor(this.x + sx), -Math.floor(this.y + sy));
  },

  drawFlash(ctx) {
    if (this.flashTime > 0) {
      ctx.globalAlpha = clamp(this.flashTime * 6, 0, 1) * 0.6;
      ctx.fillStyle = this.flashColor;
      ctx.fillRect(0, 0, VW, VH);
      ctx.globalAlpha = 1;
    }
  },
};

/* ========================================================================== */
/* [07] SPRITE DATA                                                            */
/* Pixel art defined as 2D arrays. Each char maps to a palette key.            */
/* ========================================================================== */

// palette mapping for sprite chars
function makePal(map) { return map; }

// PLAYER -- 12w x 18h
const PAL_PLAYER = makePal({
  '.': null,
  'O': C.playerEdge,    // outline
  'L': C.playerDark,    // dark
  'M': C.playerMid,     // mid
  'H': C.player,        // highlight
  'C': C.playerCape,    // cape red
  'D': C.playerCape2,   // cape dark
  'E': '#000',          // eye
  'I': C.iframe,        // i-frame glow
  'F': C.fire,          // accent (glow)
});

const PLAYER_IDLE = [
  '....OOOO....',
  '...OLLLLO...',
  '...OLMMMO...',
  '...OMHEHO...',  // face with eyes
  '...OMMHHO...',
  '....OOOO....',
  '...DCCCCD...',  // shoulders/cape
  '..DCCCCCCD..',
  '..DCMHHMCD..',  // arms+body
  '..DCMHHMCD..',
  '..DCCCCCCD..',
  '..DDCCCCDD..',
  '...OLMMLO...',  // belt
  '...OL..LO...',
  '...OL..LO...',
  '...OM..MO...',
  '...OO..OO...',
  '...OO..OO...',
];

const PLAYER_RUN_1 = [
  '....OOOO....',
  '...OLLLLO...',
  '...OLMMMO...',
  '...OMHEHO...',
  '...OMMHHO...',
  '....OOOO....',
  '...DCCCCDD..',
  '..DCCCCCCDD.',
  '.DMHHMMHHM..',
  '..DCMHHMCD..',
  '..DCCCCCCD..',
  '...DCCCCD...',
  '...OLMMLO...',
  '...OL..LO...',
  '..OL..MO....',
  '.OM...MO....',
  'OO...OO.....',
  '.....OOO....',
];

const PLAYER_RUN_2 = [
  '....OOOO....',
  '...OLLLLO...',
  '...OLMMMO...',
  '...OMHEHO...',
  '...OMMHHO...',
  '....OOOO....',
  '..DDCCCCD...',
  '.DDCCCCCCD..',
  '..MHHMMHHMD.',
  '..DCMHHMCD..',
  '..DCCCCCCD..',
  '...DCCCCD...',
  '...OLMMLO...',
  '...OL..LO...',
  '....OM..LO..',
  '....OM...MO.',
  '.....OO...OO',
  '....OOO.....',
];

const PLAYER_JUMP = [
  '....OOOO....',
  '...OLLLLO...',
  '...OLMMMO...',
  '...OMHEHO...',
  '...OMMHHO...',
  '....OOOO....',
  '..DCCCCCCD..',
  '.DCCCCCCCCD.',
  'DCMHHMMHHMCD',
  '.DMHHMMHHM..',
  '..DCCCCCCD..',
  '...DCCCCD...',
  '...OLMMLO...',
  '..OL.MM.LO..',
  '.OM...MM..M.',
  'OO....OO..MO',
  '.......OOOO.',
  '............',
];

const PLAYER_FALL = [
  '....OOOO....',
  '...OLLLLO...',
  '...OLMMMO...',
  '...OMHEHO...',
  '...OMMHHO...',
  '....OOOO....',
  '..DCCCCCCD..',
  '.DCCCCCCCCD.',
  '.DCMHHMMHHMCD',
  '..DCMHHMCD..',
  '..DCCCCCCD..',
  '...DCCCCD...',
  '...OLMMLO...',
  '...OL..LO...',
  '...OM..MO...',
  '...OO..OO...',
  '...OO..OO...',
  '............',
];

const PLAYER_ATTACK_1 = [
  '....OOOO........',
  '...OLLLLO.......',
  '...OLMMMO.......',
  '...OMHEHO.......',
  '...OMMHHO.......',
  '....OOOO..F.....',
  '..DCCCCCDFFF....',
  '..DCCCCCCFFFFF..',
  '..MHHMMHHMFFFFFF',  // sword swinging out
  '..DCMHHMCDFFFF..',
  '..DCCCCCCD.F....',
  '..DDCCCCDD......',
  '...OLMMLO.......',
  '...OL..LO.......',
  '...OL..LO.......',
  '...OM..MO.......',
  '...OO..OO.......',
  '...OO..OO.......',
];

const PLAYER_ATTACK_2 = [
  '..F.OOOO........',
  '.FFFOLLLLO......',
  'FFFFOLMMMO......',
  '.FFFOMHEHO......',
  '..F.OMMHHO......',
  '....OOOO........',
  '...DCCCCCD......',
  '..DCCCCCCD......',
  '..DCMHHMCD......',
  '..DCMHHMCD......',
  '..DCCCCCCD......',
  '..DDCCCCDD......',
  '...OLMMLO.......',
  '...OL..LO.......',
  '...OL..LO.......',
  '...OM..MO.......',
  '...OO..OO.......',
  '...OO..OO.......',
];

const PLAYER_HEAVY = [
  '....OOOO........',
  '...OLLLLO.......',
  '...OLMMMO.......',
  '...OMHEHO.......',
  '...OMMHHO.......',
  '....OOOO........',
  '...DCCCCD.......',
  '..DCCCCCCD......',
  '..MHHMMHHM......',
  '..DCMHHMCDF.....',
  '..DCCCCCCDFF....',
  '..DDCCCCDDFFF...',
  '...OLMMLO.FFFF..',
  '...OL..LO..FFFF.',
  '...OL..LO...FFFF',
  '...OM..MO....FFF',
  '...OO..OO.....FF',
  '...OO..OO......F',
];

const PLAYER_ROLL = [
  '............',
  '............',
  '..IIIIIIII..',
  '.IIOLLLLOII.',
  'IIOMHEHMOII.',
  'IIOLMMMLOII.',
  '.IODCCCCDOI.',
  '.IDCMHHMCDI.',
  '.IDCCCCCCDI.',
  '.IDDCCCCDDI.',
  '..IDCCCCDI..',
  '..IOLMMLOI..',
  '..IOL..LOI..',
  '...IOM.MOI..',
  '....IOOOI...',
  '.....II.....',
  '............',
  '............',
];

const PLAYER_HURT = [
  '....OOOO....',
  '...OLLLLO...',
  '...OLMMMO...',
  '...OMHEHO...',
  '...OMMHHO...',
  '....OOOO....',
  '.DDCCCCCDD..',  // arms thrown back
  'DDCCCCCCDDD.',
  'D.MHHMMHHM.D',
  '..DCMHHMCD..',
  '..DCCCCCCD..',
  '...DCCCCD...',
  '...OLMMLO...',
  '..OL...LO...',
  '.OM..MM.O...',
  'OO..OO..MO..',
  '...OO....OO.',
  '............',
];

// GRUNT (8w x 14h) -- short, lumbering
const PAL_GRUNT = makePal({
  '.': null,
  'O': '#1a0a0a',
  'L': C.enemy1d,
  'M': C.enemy1,
  'E': '#fff200',
  'B': '#3a1a1a',
});

const GRUNT_IDLE_1 = [
  '..OOOO..',
  '.OLLLLO.',
  'OMMEMEMO',
  'OMMMMMMO',
  'OOLMMLOO',
  '.OOOOO..',
  'OBBBBBBO',
  'BMMMMMMB',
  'BMMMMMMB',
  'BMMMMMMB',
  'BLLLLLLB',
  'OO....OO',
  'OL....LO',
  'OO....OO',
];

const GRUNT_IDLE_2 = [
  '..OOOO..',
  '.OLLLLO.',
  'OMMEMEMO',
  'OMMMMMMO',
  'OOLMMLOO',
  '.OOOOO..',
  'OBBBBBBO',
  'BLLMMLLB',  // breathing
  'BMMMMMMB',
  'BMMMMMMB',
  'BLLLLLLB',
  'OO....OO',
  'OL....LO',
  'OO....OO',
];

const GRUNT_ATTACK = [
  '..OOOO..F....',
  '.OLLLLOFF....',
  'OMMEMEMOFF...',
  'OMMMMMMOFFF..',
  'OOLMMLOOFFFF.',
  '.OOOOOFFFFFFF',
  'OBBBBBBFFFFF.',
  'BMMMMMMBFFF..',
  'BMMMMMMB.F...',
  'BMMMMMMB.....',
  'BLLLLLLB.....',
  'OO....OO.....',
  'OL....LO.....',
  'OO....OO.....',
];

const GRUNT_TELEGRAPH = [
  '..OOOO..',
  '.O####O.',  // # = warning red overlay
  'O##E#E#O',
  'O######O',
  'OO####OO',
  '.OOOOO..',
  'OBBBBBBO',
  'B######B',
  'B######B',
  'B######B',
  'BLLLLLLB',
  'OO....OO',
  'OL....LO',
  'OO....OO',
];

// ARCHER (8w x 14h) -- thinner
const PAL_ARCHER = makePal({
  '.': null,
  'O': '#0a1a0a',
  'L': C.enemy2d,
  'M': C.enemy2,
  'E': '#ffff66',
  'B': '#1a3a1a',
  'W': '#aa8855',  // bow wood
});

const ARCHER_IDLE = [
  '..OOOO..',
  '.OLLLLO.',
  'OMMEEMMO',
  'OMMMMMMO',
  'OOMLLMOO',
  '.OOOOO..',
  '.OBBBBO.',
  '.BMMMMB.',
  '.BMMMMB.',
  '.BLLLLB.',
  '.OO..OO.',
  '.OL..LO.',
  '.OL..LO.',
  '.OO..OO.',
];

const ARCHER_AIMING = [
  '..OOOO..W....',
  '.OLLLLOWW....',
  'OMMEEMMWMW...',
  'OMMMMMOMW....',
  'OOMLLMWMW....',
  '.OOOOOMW.....',
  '.OBBBBW......',
  '.BMMMMBW.....',
  '.BMMMMBWW....',
  '.BLLLLB.W....',
  '.OO..OO.W....',
  '.OL..LO.W....',
  '.OL..LO......',
  '.OO..OO......',
];

// BRUTE (12w x 18h) -- big
const PAL_BRUTE = makePal({
  '.': null,
  'O': '#0a0510',
  'L': C.enemy3d,
  'M': C.enemy3,
  'E': '#ff66ff',
  'B': '#2a1525',
  'A': '#5a3055',
});

const BRUTE_IDLE = [
  '....OOOO....',
  '...OLLLLO...',
  '..OLMMMMLO..',
  '..OMEMMEMO..',
  '..OMMMMMMO..',
  '..OOLMMLOO..',
  '...OOOOOO...',
  '.OBBBBBBBBO.',
  'OBMMMMMMMMBO',
  'OBMMAMMAMMBO',
  'OBMMMMMMMMBO',
  'OBMMMMMMMMBO',
  'OBBLLLLLLBBO',
  '.OO..OO..OO.',
  '.OL..OO..LO.',
  '.OL..LL..LO.',
  '.OO..OO..OO.',
  '.OO..OO..OO.',
];

const BRUTE_ATTACK = [
  '....OOOO........',
  '...OLLLLO.......',
  '..OLMMMMLO......',
  '..OMEMMEMO......',
  '..OMMMMMMO......',
  '..OOLMMLOO......',
  '...OOOOOO.......',
  '.OBBBBBBBBOFFF..',
  'OBMMMMMMMMBOFFFF',
  'OBMMAMMAMMBO.FFF',
  'OBMMMMMMMMBOFF..',
  'OBMMMMMMMMBOF...',
  'OBBLLLLLLBBO....',
  '.OO..OO..OO.....',
  '.OL..OO..LO.....',
  '.OL..LL..LO.....',
  '.OO..OO..OO.....',
  '.OO..OO..OO.....',
];

// BOSS — Warden (24w x 28h)
const PAL_BOSS = makePal({
  '.': null,
  'O': '#000',
  'A': C.bossA,
  'B': C.bossB,
  'C': C.bossC,
  'E': '#ffff00',
  'F': '#ff8866',
  'W': '#aaaaff',
});

const BOSS_IDLE = [
  '..........OOOOOOOO......',
  '........OOAAAAAAAAOO....',
  '.......OABBBBBBBBBBAO...',
  '......OABBBBBBBBBBBBAO..',
  '.....OABBCCBBBBBBCCBBAO.',
  '.....OABCEECBBBBCEECBAO.',
  '.....OABBCCBBBBBBCCBBAO.',
  '......OABBBBOOOOBBBBBAO.',
  '......OABBBOAAAABBBBAO..',
  '.......OABBOAAAOOBAAO...',
  '........OOAAOOOAAOOO....',
  '.....OOOOAAAAAAAAAOOOO..',
  '...OOAABBBBBBBBBBBBBAAO.',
  '..OABBBBBBBCCCCCBBBBBBAO',
  '.OABBCCBBBCFFFFFCBBBCCBA',
  '.OABCFFCBBCFFFFFCBBCFFCA',
  '.OABBCCBBBCFFFFFCBBBCCBA',
  '.OABBBBBBBBCCCCCBBBBBBBA',
  '.OABBBBBBBBBBBBBBBBBBBBA',
  '.OAABBBBBBBBBBBBBBBBBAAO',
  '..OOAABBBBBBBBBBBBBAAOO.',
  '....OOAAAAAAAAAAAAAAOO..',
  '.....OAAAA..OO..AAAAO...',
  '.....OAAA....OO..AAAO...',
  '.....OAAA....OO..AAAO...',
  '.....OAA......OO.AAOO...',
  '.....OOO......OOOOO.....',
  '......OO........OO......',
];

const BOSS_TELEGRAPH = [
  '..........OOOOOOOO......',
  '........OOAAAAAAAAOO....',
  '.......OABBBBBBBBBBAO...',
  '......OABBBBBBBBBBBBAO..',
  '.....OACCCCBBBBBBCCCCAO.',
  '.....OACEECBBBBCEECCBAO.',  // eyes flash
  '.....OACCCCBBBBBBCCCCAO.',
  '......OABBBBOOOOBBBBBAO.',
  '......OABBBOAAAABBBBAO..',
  '.......OABBOAAAOOBAAO...',
  '........OOAAOOOAAOOO....',
  '.....OOOOAAAAAAAAAOOOO..',
  '...OOAACCCCCCCCCCCCCAAO.',  // body charge red
  '..OABCCBBBCCCCCCCBBCCBAO',
  '.OABCCCBBBCFFFFFCBBBCCCA',
  '.OABCFFCBBCFFFFFCBBCFFCA',
  '.OABCCCBBBCFFFFFCBBBCCCA',
  '.OABBCCBBBBCCCCCBBBBCCBA',
  '.OABBBBBBBBBBBBBBBBBBBBA',
  '.OAABBBBBBBBBBBBBBBBBAAO',
  '..OOAABBBBBBBBBBBBBAAOO.',
  '....OOAAAAAAAAAAAAAAOO..',
  '.....OAAAA..OO..AAAAO...',
  '.....OAAA....OO..AAAO...',
  '.....OAAA....OO..AAAO...',
  '.....OAA......OO.AAOO...',
  '.....OOO......OOOOO.....',
  '......OO........OO......',
];

// PROJECTILE — arrow
const PAL_ARROW = makePal({ '.': null, 'O': '#3a2a1a', 'W': '#aa8855', 'F': '#dd9' });
const ARROW_SPRITE = [
  '......WWWO',
  'F....WWWWO',
  'FF.WWWWFFO',
  'F....WWWWO',
  '......WWWO',
];

// CELL
const PAL_CELL = makePal({ '.': null, 'O': C.cellDark, 'M': C.cell, 'H': '#aaffff', 'W': '#fff' });
const CELL_SPRITE = [
  '.OOOO.',
  'OMHWMO',
  'OHHHHO',
  'OMHHMO',
  'OMMMMO',
  '.OOOO.',
];

// COIN
const PAL_COIN = makePal({ '.': null, 'O': C.goldDark, 'M': C.gold, 'H': '#ffeb88' });
const COIN_SPRITE = [
  '.OOO.',
  'OMHMO',
  'OHHMO',
  'OMHMO',
  '.OOO.',
];

// HEART
const PAL_HEART = makePal({ '.': null, 'O': '#5a0a0f', 'M': C.hp, 'H': '#ff8a8a' });
const HEART_SPRITE = [
  '.OO.OO.',
  'OMHMOHO',
  'OMMMMMO',
  'OMHMMMO',
  '.OMMM..',
  '..OM...',
  '...O...',
];

/* ========================================================================== */
/* [08] SPRITE RENDERER                                                        */
/* ========================================================================== */

function drawSprite(ctx, sprite, palette, x, y, flipX = false, tint = null) {
  x = Math.floor(x); y = Math.floor(y);
  const h = sprite.length;
  for (let row = 0; row < h; row++) {
    const line = sprite[row];
    const w = line.length;
    for (let col = 0; col < w; col++) {
      const ch = line[col];
      const color = palette[ch];
      if (!color) continue;
      const px = flipX ? x + (w - 1 - col) : x + col;
      ctx.fillStyle = tint || color;
      ctx.fillRect(px, y + row, 1, 1);
    }
  }
}

// Tile rendering (procedural, no images)
function drawTile(ctx, type, tx, ty, edges = {}) {
  const x = tx * TILE, y = ty * TILE;
  if (type === 1 || type === 2) {  // solid wall / ground
    // base
    ctx.fillStyle = C.stoneDark;
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = C.stone;
    ctx.fillRect(x + 1, y + 1, TILE - 2, TILE - 2);
    // top edge highlight
    if (edges.top) {
      ctx.fillStyle = C.stoneEdge;
      ctx.fillRect(x, y, TILE, 2);
      ctx.fillStyle = C.stoneHi;
      ctx.fillRect(x + 2, y + 1, TILE - 4, 1);
    }
    // bottom shadow
    if (edges.bottom) {
      ctx.fillStyle = C.stoneDark;
      ctx.fillRect(x, y + TILE - 2, TILE, 2);
    }
    // pseudo-random pebbles for texture (deterministic per tile)
    const seed = (tx * 73 + ty * 131) % 7;
    if (seed === 0) { ctx.fillStyle = C.stoneEdge; ctx.fillRect(x + 3, y + 5, 2, 2); }
    if (seed === 1) { ctx.fillStyle = C.stoneDark; ctx.fillRect(x + 9, y + 4, 2, 2); }
    if (seed === 2) { ctx.fillStyle = C.stoneEdge; ctx.fillRect(x + 6, y + 9, 2, 1); }
    if (seed === 3) { ctx.fillStyle = C.stoneDark; ctx.fillRect(x + 11, y + 11, 2, 2); }
    if (seed === 4) { ctx.fillStyle = C.stoneEdge; ctx.fillRect(x + 4, y + 12, 1, 1); }
  } else if (type === 3) {  // platform (one-way)
    ctx.fillStyle = C.stoneDark;
    ctx.fillRect(x, y, TILE, 4);
    ctx.fillStyle = C.stone;
    ctx.fillRect(x + 1, y + 1, TILE - 2, 2);
    ctx.fillStyle = C.stoneEdge;
    ctx.fillRect(x, y, TILE, 1);
    ctx.fillStyle = C.stoneHi;
    ctx.fillRect(x + 2, y + 1, TILE - 4, 1);
  } else if (type === 4) {  // spike
    ctx.fillStyle = C.stoneDark;
    ctx.fillRect(x, y + 12, TILE, 4);
    ctx.fillStyle = C.spike;
    for (let i = 0; i < 4; i++) {
      const sx = x + i * 4 + 1;
      ctx.beginPath();
      ctx.moveTo(sx, y + 14);
      ctx.lineTo(sx + 2, y + 4);
      ctx.lineTo(sx + 4, y + 14);
      ctx.fill();
    }
    ctx.fillStyle = '#c97a7a';
    for (let i = 0; i < 4; i++) {
      const sx = x + i * 4 + 1;
      ctx.fillRect(sx + 1, y + 6, 1, 6);
    }
  }
}

function drawTorch(ctx, x, y, t) {
  // sconce
  ctx.fillStyle = C.stoneDark;
  ctx.fillRect(x, y + 6, 4, 8);
  ctx.fillStyle = C.stoneEdge;
  ctx.fillRect(x + 1, y + 7, 2, 6);
  // flame (animated)
  const flicker = Math.sin(t * 18) * 0.3 + Math.sin(t * 7) * 0.2;
  ctx.fillStyle = C.ember;
  ctx.fillRect(x, y + 2 + flicker, 4, 4);
  ctx.fillStyle = C.torch;
  ctx.fillRect(x + 1, y + 1 + flicker, 2, 4);
  ctx.fillStyle = C.fire;
  ctx.fillRect(x + 1, y + 0 + flicker, 2, 2);
  // glow particles
  if (Math.random() < 0.3) {
    Particles.add(new Particle(x + 2, y + 2, (Math.random() - 0.5) * 10, -20 - Math.random() * 10, 0.5, C.ember, 1, 0, true, true));
  }
}

/* ========================================================================== */
/* [09] DAMAGE NUMBERS                                                         */
/* ========================================================================== */

class DamageNumber {
  constructor(x, y, value, color = C.text, big = false) {
    this.x = x; this.y = y;
    this.vx = (Math.random() - 0.5) * 30;
    this.vy = -60 - Math.random() * 30;
    this.life = 0.7; this.maxLife = 0.7;
    this.value = String(Math.round(value));
    this.color = color;
    this.big = big;
    this.dead = false;
  }
  update(dt) {
    this.life -= dt;
    if (this.life <= 0) { this.dead = true; return; }
    this.vy += 80 * dt;
    this.x += this.vx * dt; this.y += this.vy * dt;
    this.vx *= 0.9;
  }
  draw(ctx) {
    const t = this.life / this.maxLife;
    ctx.globalAlpha = clamp(t * 1.5, 0, 1);
    ctx.font = this.big ? 'bold 14px "VT323", monospace' : '12px "VT323", monospace';
    ctx.fillStyle = '#000';
    ctx.fillText(this.value, Math.floor(this.x) + 1, Math.floor(this.y) + 1);
    ctx.fillStyle = this.color;
    ctx.fillText(this.value, Math.floor(this.x), Math.floor(this.y));
    ctx.globalAlpha = 1;
  }
}

const DamageNumbers = {
  list: [],
  reset() { this.list.length = 0; },
  add(x, y, v, color, big) { this.list.push(new DamageNumber(x, y, v, color, big)); },
  update(dt) { for (const d of this.list) d.update(dt); this.list = this.list.filter(d => !d.dead); },
  draw(ctx) { for (const d of this.list) d.draw(ctx); },
};

/* ========================================================================== */
/* [10] ENTITY BASE                                                            */
/* ========================================================================== */

class Entity {
  constructor(x, y, w, h) {
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.vx = 0; this.vy = 0;
    this.onGround = false;
    this.facing = 1;
    this.dead = false;
    this.hp = 1; this.maxHp = 1;
    this.iframes = 0;
    this.kbX = 0; this.kbY = 0;  // applied knockback velocities
    this.team = 'neutral';
  }

  centerX() { return this.x + this.w / 2; }
  centerY() { return this.y + this.h / 2; }

  // resolve solid tile collisions against world.room.tiles
  moveAndCollide(world, dt) {
    // X
    this.x += (this.vx + this.kbX) * dt;
    this.collideAxis(world, 'x');
    // Y
    this.y += (this.vy + this.kbY) * dt;
    this.onGround = false;
    this.collideAxis(world, 'y');
    // decay knockback
    this.kbX = approach(this.kbX, 0, 800 * dt);
    this.kbY = approach(this.kbY, 0, 800 * dt);
  }

  collideAxis(world, axis) {
    if (!world.room) return;
    const tiles = world.room.tiles;
    const cols = world.room.cols, rows = world.room.rows;
    const x0 = Math.max(0, Math.floor(this.x / TILE));
    const x1 = Math.min(cols - 1, Math.floor((this.x + this.w - 1) / TILE));
    const y0 = Math.max(0, Math.floor(this.y / TILE));
    const y1 = Math.min(rows - 1, Math.floor((this.y + this.h - 1) / TILE));
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        const t = tiles[ty][tx];
        if (t === 1 || t === 2) {
          const tileR = { x: tx * TILE, y: ty * TILE, w: TILE, h: TILE };
          if (aabb(this, tileR)) {
            if (axis === 'x') {
              if (this.vx + this.kbX > 0) this.x = tileR.x - this.w;
              else if (this.vx + this.kbX < 0) this.x = tileR.x + tileR.w;
              this.vx = 0; this.kbX = 0;
            } else {
              if (this.vy + this.kbY > 0) {
                this.y = tileR.y - this.h;
                if (this.vy > 0 && !this.onGround) this.onLand && this.onLand();
                this.onGround = true;
              } else if (this.vy + this.kbY < 0) {
                this.y = tileR.y + tileR.h;
              }
              this.vy = 0; this.kbY = 0;
            }
          }
        } else if (t === 3 && axis === 'y') {
          // one-way platform: only collide from above when moving down
          const tileR = { x: tx * TILE, y: ty * TILE, w: TILE, h: 4 };
          if ((this.vy + this.kbY) >= 0 &&
              this.y + this.h - (this.vy + this.kbY) * dt <= tileR.y &&
              aabb(this, tileR) &&
              !this.dropping) {
            this.y = tileR.y - this.h;
            if (this.vy > 0 && !this.onGround) this.onLand && this.onLand();
            this.onGround = true;
            this.vy = 0; this.kbY = 0;
          }
        } else if (t === 4) {
          // spike
          const sR = { x: tx * TILE, y: ty * TILE + 4, w: TILE, h: TILE - 4 };
          if (aabb(this, sR) && this.takeDamage) this.takeDamage(15, 0, this.team === 'player' ? 'env' : null);
        }
      }
    }
  }
}

/* ========================================================================== */
/* [11] PLAYER                                                                 */
/* ========================================================================== */

class Player extends Entity {
  constructor(x, y) {
    super(x, y, 8, 16);
    this.team = 'player';
    this.maxHp = 100; this.hp = 100;
    this.gold = 0;

    this.runSpeed = 110;
    this.accel = 800;
    this.airAccel = 500;
    this.friction = 1100;
    this.airFriction = 200;
    this.jumpV = 230;
    this.gravity = 700;
    this.fallGravity = 950;
    this.maxFall = 360;

    this.coyote = 0;
    this.jumpBuffer = 0;
    this.jumpsLeft = 2;
    this.maxJumps = 2;
    this.jumpHeld = false;

    this.attackTimer = 0;
    this.attackCD = 0;
    this.attackChain = 0;     // 0 or 1 (alternates light attacks)
    this.attackChainTimer = 0;
    this.heavyTimer = 0;
    this.heavyCD = 0;

    this.rollTimer = 0;
    this.rollCD = 0;

    this.hurtTimer = 0;

    this.facing = 1;
    this.animT = 0;
    this.dropping = false;
    this.dropTimer = 0;

    this.stepTimer = 0;
    this.regenTick = 0;

    // upgrades carried in (set by Game.startRun)
    this.maxHpBonus = 0;
    this.startCells = 0;
  }

  applyUpgrades(upgrades) {
    if (upgrades.maxHpBonus) {
      this.maxHpBonus = upgrades.maxHpBonus;
      this.maxHp = 100 + upgrades.maxHpBonus;
      this.hp = this.maxHp;
    }
    if (upgrades.dmgBonus) this.dmgBonus = upgrades.dmgBonus; else this.dmgBonus = 0;
    if (upgrades.extraJump) { this.maxJumps = 3; this.jumpsLeft = 3; }
  }

  onLand() {
    Particles.jumpDust(this.centerX(), this.y + this.h);
    AudioFX.land();
  }

  takeDamage(amount, fromX = null, source = null) {
    if (this.iframes > 0 || this.rollTimer > 0.05) return false;  // i-frames during roll
    this.hp -= amount;
    this.iframes = 1.0;
    this.hurtTimer = 0.4;
    const dx = fromX === null ? -this.facing : sign(this.centerX() - fromX);
    this.kbX = -dx * 180;
    this.kbY = -120;
    Particles.blood(this.centerX(), this.centerY(), Math.atan2(0, dx));
    DamageNumbers.add(this.centerX(), this.y - 2, amount, C.danger, true);
    Camera.shake(5, 0.25);
    Camera.flash('#fff', 0.06);
    Camera.freeze(0.06);
    AudioFX.hurt();
    if (this.hp <= 0 && !this.dead) {
      this.dead = true;
      AudioFX.death();
      Particles.death(this.centerX(), this.centerY(), C.player);
      Camera.shake(8, 0.5);
    }
    return true;
  }

  // Returns the active attack hitbox if currently in active frames, else null
  attackHitbox() {
    if (this.attackTimer > 0 && this.attackTimer < 0.18) {
      const reach = 18, h = 14;
      return {
        x: this.facing > 0 ? this.x + this.w - 2 : this.x - reach + 2,
        y: this.y + 2,
        w: reach,
        h,
        damage: 15 + (this.dmgBonus || 0),
        kb: 180,
        type: 'light',
      };
    }
    if (this.heavyTimer > 0 && this.heavyTimer < 0.22 && this.heavyTimer > 0.05) {
      const reach = 22, h = 18;
      return {
        x: this.facing > 0 ? this.x + this.w - 4 : this.x - reach + 4,
        y: this.y - 2,
        w: reach,
        h,
        damage: 35 + (this.dmgBonus || 0),
        kb: 320,
        type: 'heavy',
      };
    }
    return null;
  }

  update(dt, world) {
    if (this.dead) return;

    this.animT += dt;
    if (this.iframes > 0) this.iframes -= dt;
    if (this.attackTimer > 0) this.attackTimer -= dt;
    if (this.attackCD > 0) this.attackCD -= dt;
    if (this.attackChainTimer > 0) this.attackChainTimer -= dt; else this.attackChain = 0;
    if (this.heavyTimer > 0) this.heavyTimer -= dt;
    if (this.heavyCD > 0) this.heavyCD -= dt;
    if (this.rollTimer > 0) this.rollTimer -= dt;
    if (this.rollCD > 0) this.rollCD -= dt;
    if (this.hurtTimer > 0) this.hurtTimer -= dt;
    if (this.dropTimer > 0) { this.dropTimer -= dt; if (this.dropTimer <= 0) this.dropping = false; }

    // Coyote / jump buffer
    if (this.onGround) { this.coyote = 0.1; this.jumpsLeft = this.maxJumps; }
    else this.coyote -= dt;
    if (Input.jumpPress()) this.jumpBuffer = 0.12;
    else this.jumpBuffer -= dt;

    // Roll
    if (Input.rollPress() && this.rollCD <= 0 && this.rollTimer <= 0 && this.attackTimer <= 0 && this.heavyTimer <= 0) {
      this.rollTimer = 0.32;
      this.rollCD = 0.55;
      const dirX = Input.axisX() || this.facing;
      this.facing = sign(dirX) || this.facing;
      this.vx = this.facing * 220;
      AudioFX.roll();
      Particles.dust(this.centerX(), this.y + this.h);
    }

    // Movement
    const ax = Input.axisX();
    const rolling = this.rollTimer > 0;
    const heavy = this.heavyTimer > 0;
    const lightLocked = this.attackTimer > 0.04;  // briefly slowed during light attack

    if (!rolling && !heavy) {
      const targetVx = ax * this.runSpeed * (lightLocked ? 0.5 : 1);
      const accel = this.onGround ? this.accel : this.airAccel;
      this.vx = approach(this.vx, targetVx, accel * dt);
      // friction when no input
      if (ax === 0) {
        const fric = this.onGround ? this.friction : this.airFriction;
        this.vx = approach(this.vx, 0, fric * dt);
      } else {
        this.facing = sign(ax) || this.facing;
      }
    } else if (rolling) {
      // maintain roll velocity
      this.vx = this.facing * 220;
    } else if (heavy) {
      // brief lunge during heavy
      if (this.heavyTimer > 0.18) this.vx = this.facing * 80;
      else this.vx = approach(this.vx, 0, 1500 * dt);
    }

    // Jump
    if (this.jumpBuffer > 0 && (this.coyote > 0 || this.jumpsLeft > 0)) {
      if (this.coyote > 0) {
        this.vy = -this.jumpV;
        this.coyote = 0;
        AudioFX.jump();
      } else {
        this.vy = -this.jumpV * 0.95;
        this.jumpsLeft -= 1;
        AudioFX.doubleJump();
        Particles.jumpDust(this.centerX(), this.y + this.h);
      }
      this.jumpBuffer = 0;
      this.jumpHeld = true;
    }
    // variable jump height
    if (!Input.jumpHeld() && this.vy < 0 && this.jumpHeld) {
      this.vy *= 0.55;
      this.jumpHeld = false;
    }
    if (!Input.jumpHeld()) this.jumpHeld = false;

    // Drop through platform
    if (Input.down() && Input.jumpPress() && this.onGround) {
      this.dropping = true; this.dropTimer = 0.25; this.y += 1;
    }

    // Light attack
    if (Input.attackPress() && this.attackCD <= 0 && this.heavyTimer <= 0 && this.rollTimer <= 0) {
      this.attackTimer = 0.25;
      this.attackCD = 0.32;
      this.attackChain = 1 - this.attackChain;
      this.attackChainTimer = 0.5;
      AudioFX.swing();
      // small forward nudge
      if (this.onGround) this.vx += this.facing * 30;
    }
    // Heavy attack
    if (Input.heavyPress() && this.heavyCD <= 0 && this.attackTimer <= 0 && this.rollTimer <= 0 && this.onGround) {
      this.heavyTimer = 0.45;
      this.heavyCD = 0.7;
      AudioFX.heavy();
      this.vx = this.facing * 60;
    }

    // Gravity
    if (!this.onGround) {
      const g = (this.vy > 0 || !Input.jumpHeld()) ? this.fallGravity : this.gravity;
      this.vy = Math.min(this.maxFall, this.vy + g * dt);
    }

    // Footsteps
    if (this.onGround && Math.abs(this.vx) > 30) {
      this.stepTimer -= dt;
      if (this.stepTimer <= 0) { AudioFX.step(); this.stepTimer = 0.22; }
    } else this.stepTimer = 0;

    this.moveAndCollide(world, dt);

    // attack damage application -- moved to world for centralized resolution
  }

  draw(ctx) {
    // shadow
    ctx.fillStyle = C.shadow;
    const shY = this.findGroundY();
    ctx.fillRect(Math.floor(this.x - 1), Math.floor(shY) - 1, this.w + 2, 2);

    // i-frame blink
    if (this.iframes > 0 && Math.floor(this.iframes * 20) % 2 === 0) return;

    const drawX = Math.floor(this.x - 2);
    const drawY = Math.floor(this.y - 2);
    const flip = this.facing < 0;

    if (this.rollTimer > 0) {
      drawSprite(ctx, PLAYER_ROLL, PAL_PLAYER, drawX, drawY, flip);
      return;
    }
    if (this.hurtTimer > 0.2) {
      drawSprite(ctx, PLAYER_HURT, PAL_PLAYER, drawX, drawY, flip);
      return;
    }
    if (this.heavyTimer > 0) {
      drawSprite(ctx, PLAYER_HEAVY, PAL_PLAYER, drawX, drawY, flip);
      return;
    }
    if (this.attackTimer > 0) {
      const sprite = this.attackChain ? PLAYER_ATTACK_2 : PLAYER_ATTACK_1;
      drawSprite(ctx, sprite, PAL_PLAYER, drawX, drawY, flip);
      return;
    }
    if (!this.onGround) {
      drawSprite(ctx, this.vy < 0 ? PLAYER_JUMP : PLAYER_FALL, PAL_PLAYER, drawX, drawY, flip);
      return;
    }
    if (Math.abs(this.vx) > 20) {
      const f = Math.floor(this.animT * 10) % 2;
      drawSprite(ctx, f === 0 ? PLAYER_RUN_1 : PLAYER_RUN_2, PAL_PLAYER, drawX, drawY, flip);
      return;
    }
    drawSprite(ctx, PLAYER_IDLE, PAL_PLAYER, drawX, drawY, flip);
  }

  findGroundY() {
    // approximate: cast down to find tile
    const world = window._gameRef.world;
    if (!world.room) return this.y + this.h;
    const cx = Math.floor((this.x + this.w / 2) / TILE);
    for (let ty = Math.floor((this.y + this.h) / TILE); ty < world.room.rows; ty++) {
      const t = world.room.tiles[ty]?.[cx];
      if (t === 1 || t === 2 || t === 3) return ty * TILE;
    }
    return this.y + this.h;
  }
}

/* ========================================================================== */
/* [12] ENEMIES                                                                */
/* ========================================================================== */

class Enemy extends Entity {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.team = 'enemy';
    this.aggroRange = 220;
    this.attackRange = 22;
    this.speed = 50;
    this.gravity = 700;
    this.dropGold = 5;
    this.dropCells = 1;
    this.iframes = 0;
    this.flashTimer = 0;
    this.state = 'idle';
    this.stateT = 0;
    this.color = C.enemy1;
  }

  takeDamage(amount, fromX, type) {
    if (this.iframes > 0) return false;
    this.hp -= amount;
    this.iframes = 0.08;
    this.flashTimer = 0.1;
    const dx = fromX === null ? -this.facing : sign(this.centerX() - fromX);
    const kbStrength = type === 'heavy' ? 280 : 150;
    this.kbX = dx * kbStrength;
    this.kbY = type === 'heavy' ? -120 : -60;
    Particles.blood(this.centerX(), this.centerY());
    Particles.spark(this.centerX() - dx * 4, this.centerY(), Math.atan2(0, dx));
    DamageNumbers.add(this.centerX(), this.y - 2, amount, type === 'heavy' ? C.fire : C.text, type === 'heavy');
    AudioFX.hit();
    Camera.shake(type === 'heavy' ? 5 : 2.5, type === 'heavy' ? 0.18 : 0.08);
    Camera.freeze(type === 'heavy' ? 0.08 : 0.04);
    if (this.hp <= 0 && !this.dead) {
      this.dead = true;
      Particles.death(this.centerX(), this.centerY(), this.color);
      AudioFX.enemyDie();
      Camera.shake(3, 0.15);
    }
    return true;
  }

  updateBase(dt, world) {
    if (this.iframes > 0) this.iframes -= dt;
    if (this.flashTimer > 0) this.flashTimer -= dt;
    this.stateT += dt;

    if (!this.onGround) this.vy = Math.min(360, this.vy + this.gravity * dt);
    this.moveAndCollide(world, dt);
  }
}

class Grunt extends Enemy {
  constructor(x, y) {
    super(x, y, 8, 14);
    this.maxHp = 30; this.hp = 30;
    this.speed = 40;
    this.attackRange = 18;
    this.color = C.enemy1;
    this.dropGold = 4;
    this.dropCells = 1;
    this.attackTelegraph = 0;
    this.attackActive = 0;
    this.attackCD = 0;
    this.animT = 0;
  }
  update(dt, world) {
    this.animT += dt;
    if (this.attackTelegraph > 0) this.attackTelegraph -= dt;
    if (this.attackActive > 0) this.attackActive -= dt;
    if (this.attackCD > 0) this.attackCD -= dt;

    const player = world.player;
    const dx = player.centerX() - this.centerX();
    const adx = Math.abs(dx);
    const seePlayer = adx < this.aggroRange && Math.abs(player.centerY() - this.centerY()) < 50;

    if (this.attackTelegraph <= 0 && this.attackActive <= 0) {
      if (seePlayer && adx < this.attackRange && this.attackCD <= 0) {
        this.attackTelegraph = 0.45;
        this.facing = sign(dx);
        this.vx = 0;
      } else if (seePlayer) {
        this.facing = sign(dx);
        this.vx = this.facing * this.speed;
      } else {
        this.vx = approach(this.vx, 0, 200 * dt);
      }
    } else if (this.attackTelegraph > 0) {
      // standing still, leaning
      this.vx = approach(this.vx, 0, 400 * dt);
      if (this.attackTelegraph <= dt) {
        this.attackActive = 0.18;
        this.attackCD = 1.0;
        AudioFX.swing();
      }
    } else {
      // attack active
      this.vx = approach(this.vx, this.facing * 40, 400 * dt);
    }

    this.updateBase(dt, world);
  }
  attackHitbox() {
    if (this.attackActive <= 0) return null;
    return {
      x: this.facing > 0 ? this.x + this.w : this.x - 12,
      y: this.y + 2,
      w: 14, h: 12,
      damage: 12,
    };
  }
  draw(ctx) {
    // shadow
    ctx.fillStyle = C.shadow;
    ctx.fillRect(Math.floor(this.x - 1), Math.floor(this.y + this.h - 1), this.w + 2, 2);

    // tint when telegraphing
    const flip = this.facing < 0;
    if (this.attackTelegraph > 0) {
      // pulse warning
      const pulse = Math.sin(this.attackTelegraph * 30) * 0.5 + 0.5;
      const palT = { ...PAL_GRUNT, 'M': pulse > 0.5 ? C.danger : C.enemy1, 'L': pulse > 0.5 ? '#ff8866' : C.enemy1d };
      drawSprite(ctx, GRUNT_IDLE_1, palT, this.x, this.y, flip);
    } else if (this.attackActive > 0) {
      drawSprite(ctx, GRUNT_ATTACK, PAL_GRUNT, flip ? this.x - 5 : this.x, this.y, flip);
    } else {
      const f = Math.floor(this.animT * 4) % 2;
      drawSprite(ctx, f === 0 ? GRUNT_IDLE_1 : GRUNT_IDLE_2, PAL_GRUNT, this.x, this.y, flip);
    }
    // flash white when hit
    if (this.flashTimer > 0) {
      ctx.globalAlpha = this.flashTimer * 8;
      ctx.fillStyle = '#fff';
      ctx.fillRect(this.x - 1, this.y - 1, this.w + 2, this.h + 2);
      ctx.globalAlpha = 1;
    }
  }
}

class Archer extends Enemy {
  constructor(x, y) {
    super(x, y, 8, 14);
    this.maxHp = 22; this.hp = 22;
    this.speed = 35;
    this.aggroRange = 280;
    this.attackRange = 200;
    this.minRange = 80;
    this.color = C.enemy2;
    this.dropGold = 6;
    this.dropCells = 1;
    this.aimTime = 0;
    this.cooldown = 0;
    this.animT = 0;
  }
  update(dt, world) {
    this.animT += dt;
    if (this.cooldown > 0) this.cooldown -= dt;
    const player = world.player;
    const dx = player.centerX() - this.centerX();
    const adx = Math.abs(dx);
    const sameLevel = Math.abs(player.centerY() - this.centerY()) < 80;
    const inSight = adx < this.aggroRange && sameLevel;

    if (this.aimTime > 0) {
      this.aimTime -= dt;
      this.vx = approach(this.vx, 0, 200 * dt);
      this.facing = sign(dx) || this.facing;
      if (this.aimTime <= 0) {
        // shoot
        const sx = this.x + this.w / 2 + this.facing * 6;
        const sy = this.y + 5;
        const speed = 200;
        const ang = Math.atan2(player.centerY() - sy, player.centerX() - sx);
        world.projectiles.push(new Arrow(sx, sy, Math.cos(ang) * speed, Math.sin(ang) * speed));
        this.cooldown = 1.4;
        AudioFX.arrow();
      }
    } else if (inSight && this.cooldown <= 0 && adx > 30) {
      this.aimTime = 0.7;
      AudioFX.charge();
    } else if (inSight && adx < this.minRange) {
      // back away
      this.facing = sign(dx);
      this.vx = -this.facing * this.speed;
    } else if (inSight) {
      this.facing = sign(dx);
      this.vx = approach(this.vx, 0, 200 * dt);
    } else {
      this.vx = approach(this.vx, 0, 200 * dt);
    }

    this.updateBase(dt, world);
  }
  draw(ctx) {
    ctx.fillStyle = C.shadow;
    ctx.fillRect(Math.floor(this.x - 1), Math.floor(this.y + this.h - 1), this.w + 2, 2);
    const flip = this.facing < 0;
    if (this.aimTime > 0) {
      drawSprite(ctx, ARCHER_AIMING, PAL_ARCHER, flip ? this.x - 5 : this.x, this.y, flip);
      // aim line warning
      const player = window._gameRef.world.player;
      const sx = this.x + this.w / 2;
      const sy = this.y + 5;
      ctx.strokeStyle = `rgba(244, 162, 97, ${0.3 + Math.sin(this.aimTime * 30) * 0.2})`;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(player.centerX(), player.centerY()); ctx.stroke();
    } else {
      drawSprite(ctx, ARCHER_IDLE, PAL_ARCHER, this.x, this.y, flip);
    }
    if (this.flashTimer > 0) {
      ctx.globalAlpha = this.flashTimer * 8;
      ctx.fillStyle = '#fff';
      ctx.fillRect(this.x - 1, this.y - 1, this.w + 2, this.h + 2);
      ctx.globalAlpha = 1;
    }
  }
}

class Brute extends Enemy {
  constructor(x, y) {
    super(x, y, 12, 18);
    this.maxHp = 70; this.hp = 70;
    this.speed = 30;
    this.attackRange = 26;
    this.color = C.enemy3;
    this.dropGold = 12;
    this.dropCells = 2;
    this.attackTelegraph = 0;
    this.attackActive = 0;
    this.attackCD = 0;
    this.animT = 0;
  }
  update(dt, world) {
    this.animT += dt;
    if (this.attackTelegraph > 0) this.attackTelegraph -= dt;
    if (this.attackActive > 0) this.attackActive -= dt;
    if (this.attackCD > 0) this.attackCD -= dt;

    const player = world.player;
    const dx = player.centerX() - this.centerX();
    const adx = Math.abs(dx);
    const inSight = adx < this.aggroRange;

    if (this.attackTelegraph <= 0 && this.attackActive <= 0) {
      if (inSight && adx < this.attackRange && this.attackCD <= 0) {
        this.attackTelegraph = 0.7;
        this.facing = sign(dx);
        this.vx = 0;
      } else if (inSight) {
        this.facing = sign(dx);
        this.vx = this.facing * this.speed;
      }
    } else if (this.attackTelegraph > 0) {
      this.vx = approach(this.vx, 0, 400 * dt);
      if (this.attackTelegraph <= dt) {
        this.attackActive = 0.25;
        this.attackCD = 1.4;
        AudioFX.heavy();
        Camera.shake(3, 0.1);
      }
    } else {
      // brute lunges forward
      this.vx = this.facing * 110;
    }

    this.updateBase(dt, world);
  }
  attackHitbox() {
    if (this.attackActive <= 0) return null;
    return {
      x: this.facing > 0 ? this.x + this.w : this.x - 18,
      y: this.y + 4,
      w: 22, h: 16,
      damage: 22,
    };
  }
  draw(ctx) {
    ctx.fillStyle = C.shadow;
    ctx.fillRect(Math.floor(this.x - 1), Math.floor(this.y + this.h - 1), this.w + 2, 2);
    const flip = this.facing < 0;
    if (this.attackTelegraph > 0) {
      const pulse = Math.sin(this.attackTelegraph * 24) * 0.5 + 0.5;
      const palT = { ...PAL_BRUTE, 'M': pulse > 0.5 ? C.danger : C.enemy3, 'A': pulse > 0.5 ? '#ff66ff' : C.enemy3d };
      drawSprite(ctx, BRUTE_IDLE, palT, this.x, this.y, flip);
    } else if (this.attackActive > 0) {
      drawSprite(ctx, BRUTE_ATTACK, PAL_BRUTE, flip ? this.x - 4 : this.x, this.y, flip);
    } else {
      drawSprite(ctx, BRUTE_IDLE, PAL_BRUTE, this.x, this.y, flip);
    }
    if (this.flashTimer > 0) {
      ctx.globalAlpha = this.flashTimer * 8;
      ctx.fillStyle = '#fff';
      ctx.fillRect(this.x - 1, this.y - 1, this.w + 2, this.h + 2);
      ctx.globalAlpha = 1;
    }
  }
}

class Boss extends Enemy {
  constructor(x, y) {
    super(x, y, 24, 28);
    this.maxHp = 350; this.hp = 350;
    this.color = C.bossB;
    this.aggroRange = 9999;
    this.dropGold = 50;
    this.dropCells = 15;
    this.phase = 1;
    this.attackTimer = 0;
    this.attackTelegraph = 0;
    this.attackActive = 0;
    this.attackCooldown = 1.5;
    this.attackPick = 0;
    this.animT = 0;
    this.entryT = 1.5;       // delay before fight begins
    this.summonCD = 4;
  }

  update(dt, world) {
    this.animT += dt;
    if (this.entryT > 0) {
      this.entryT -= dt;
      if (this.entryT <= dt) {
        AudioFX.bossRoar();
        Camera.shake(8, 0.6);
      }
      this.updateBase(dt, world);
      return;
    }
    if (this.attackCooldown > 0) this.attackCooldown -= dt;
    if (this.attackTelegraph > 0) this.attackTelegraph -= dt;
    if (this.attackActive > 0) this.attackActive -= dt;
    if (this.summonCD > 0) this.summonCD -= dt;

    // phase change
    if (this.hp < this.maxHp * 0.5 && this.phase === 1) {
      this.phase = 2;
      AudioFX.bossRoar();
      Camera.shake(8, 0.6);
      Camera.flash(C.bossC, 0.2);
      Particles.burst(this.centerX(), this.centerY(), 30, { speed: 220, life: 0.8, color: C.bossC, size: 3, gravity: 0, spread: TAU });
    }

    const player = world.player;
    const dx = player.centerX() - this.centerX();
    this.facing = sign(dx) || 1;

    if (this.attackTelegraph <= 0 && this.attackActive <= 0 && this.attackCooldown <= 0) {
      // pick attack
      const phase2 = this.phase === 2;
      const choices = phase2 ? ['slam', 'volley', 'dash', 'summon'] : ['slam', 'volley', 'dash'];
      this.attackPick = choice(choices);
      if (this.attackPick === 'summon' && this.summonCD > 0) this.attackPick = 'volley';
      this.attackTelegraph = phase2 ? 0.65 : 0.85;
    }
    if (this.attackTelegraph > 0 && this.attackTelegraph <= dt) {
      this.executeAttack(world);
    }

    if (this.attackActive <= 0 && this.attackTelegraph <= 0) {
      // gentle pacing
      this.vx = approach(this.vx, sign(dx) * 30, 80 * dt);
    }

    this.updateBase(dt, world);
  }

  executeAttack(world) {
    const player = world.player;
    if (this.attackPick === 'slam') {
      this.attackActive = 0.3;
      this.attackCooldown = 1.2;
      AudioFX.heavy();
      Camera.shake(5, 0.25);
      // shockwave projectiles along ground
      const dirs = this.phase === 2 ? [-1, 1] : [sign(player.centerX() - this.centerX()) || 1];
      for (const d of dirs) {
        for (let i = 1; i <= 5; i++) {
          setTimeout(() => {
            const sx = this.centerX() + d * (i * 16);
            const sy = this.y + this.h - 8;
            world.projectiles.push(new Shockwave(sx, sy, d * 100));
          }, i * 60);
        }
      }
    } else if (this.attackPick === 'volley') {
      this.attackActive = 0.4;
      this.attackCooldown = 1.5;
      AudioFX.charge();
      const count = this.phase === 2 ? 7 : 5;
      const spread = 1.0;
      const baseAng = Math.atan2(player.centerY() - this.centerY(), player.centerX() - this.centerX());
      for (let i = 0; i < count; i++) {
        const a = baseAng + (i - (count - 1) / 2) * (spread / count);
        const sp = 130;
        world.projectiles.push(new BossOrb(this.centerX(), this.centerY() - 6, Math.cos(a) * sp, Math.sin(a) * sp));
      }
    } else if (this.attackPick === 'dash') {
      this.attackActive = 0.45;
      this.attackCooldown = 1.6;
      AudioFX.bossRoar();
      const dx = player.centerX() - this.centerX();
      this.vx = sign(dx) * 240;
    } else if (this.attackPick === 'summon') {
      this.attackActive = 0.4;
      this.attackCooldown = 2.4;
      this.summonCD = 6;
      AudioFX.bossRoar();
      // spawn a grunt at sides
      for (const sx of [this.x - 30, this.x + this.w + 30]) {
        if (sx > 32 && sx < (world.room.cols - 2) * TILE) {
          world.enemies.push(new Grunt(sx, this.y));
          Particles.burst(sx + 4, this.y + 8, 16, { speed: 120, life: 0.5, color: C.bossC, size: 2, gravity: 0, spread: TAU });
        }
      }
    }
    this.attackTelegraph = 0;
  }

  attackHitbox() {
    if (this.attackPick === 'dash' && this.attackActive > 0) {
      return { x: this.x, y: this.y + 4, w: this.w, h: this.h - 8, damage: 25 };
    }
    if (this.attackPick === 'slam' && this.attackActive > 0) {
      return { x: this.x - 6, y: this.y + this.h - 12, w: this.w + 12, h: 12, damage: 25 };
    }
    return null;
  }

  draw(ctx) {
    // big shadow
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(Math.floor(this.x - 2), Math.floor(this.y + this.h - 1), this.w + 4, 3);

    const flip = this.facing < 0;
    const teleg = this.attackTelegraph > 0;
    drawSprite(ctx, teleg ? BOSS_TELEGRAPH : BOSS_IDLE, PAL_BOSS, this.x, this.y, flip);

    if (this.flashTimer > 0) {
      ctx.globalAlpha = this.flashTimer * 8;
      ctx.fillStyle = '#fff';
      ctx.fillRect(this.x - 2, this.y - 2, this.w + 4, this.h + 4);
      ctx.globalAlpha = 1;
    }

    // entry overlay
    if (this.entryT > 0) {
      ctx.globalAlpha = clamp(this.entryT * 1.5, 0, 1);
      ctx.fillStyle = C.bossC;
      ctx.font = 'bold 18px "Press Start 2P", monospace';
      const txt = 'THE WARDEN';
      const tw = ctx.measureText(txt).width;
      ctx.fillText(txt, this.centerX() - tw / 2, this.y - 8);
      ctx.globalAlpha = 1;
    }
  }
}

/* ========================================================================== */
/* [13] PROJECTILES                                                            */
/* ========================================================================== */

class Projectile extends Entity {
  constructor(x, y, vx, vy, w, h, life = 3) {
    super(x - w / 2, y - h / 2, w, h);
    this.vx = vx; this.vy = vy;
    this.life = life;
    this.team = 'enemy';
    this.damage = 10;
    this.gravity = 0;
  }
  update(dt, world) {
    this.life -= dt;
    if (this.life <= 0) { this.dead = true; return; }
    this.vy += this.gravity * dt;
    this.x += this.vx * dt; this.y += this.vy * dt;
    // tile collision (simple)
    const cx = Math.floor(this.centerX() / TILE);
    const cy = Math.floor(this.centerY() / TILE);
    const t = world.room.tiles[cy]?.[cx];
    if (t === 1 || t === 2) { this.dead = true; this.onHitWall(); }
    // bounds
    if (this.x < -32 || this.x > world.room.cols * TILE + 32 || this.y > world.room.rows * TILE + 32) this.dead = true;
  }
  onHitWall() {
    Particles.spark(this.centerX(), this.centerY());
  }
}

class Arrow extends Projectile {
  constructor(x, y, vx, vy) {
    super(x, y, vx, vy, 8, 4, 3);
    this.damage = 10;
    this.gravity = 80;
  }
  draw(ctx) {
    const ang = Math.atan2(this.vy, this.vx);
    ctx.save();
    ctx.translate(Math.floor(this.centerX()), Math.floor(this.centerY()));
    ctx.rotate(ang);
    drawSprite(ctx, ARROW_SPRITE, PAL_ARROW, -5, -2);
    ctx.restore();
    // trail
    Particles.add(new Particle(this.centerX(), this.centerY(), 0, 0, 0.15, '#aaa', 1, 0, true, true));
  }
}

class Shockwave extends Projectile {
  constructor(x, y, vx) {
    super(x, y, vx, 0, 14, 12, 0.6);
    this.damage = 18;
    this.gravity = 0;
  }
  update(dt, world) {
    this.life -= dt;
    if (this.life <= 0) { this.dead = true; return; }
    this.x += this.vx * dt;
    if (this.x < -32 || this.x > world.room.cols * TILE + 32) this.dead = true;
    if (Math.random() < 0.6) {
      Particles.add(new Particle(this.centerX(), this.centerY() + 4, (Math.random() - 0.5) * 60, -40 - Math.random() * 30, 0.3, C.bossC, 2, 60, true, true));
    }
  }
  draw(ctx) {
    const t = this.life / 0.6;
    ctx.globalAlpha = clamp(t, 0, 1);
    ctx.fillStyle = C.bossC;
    ctx.fillRect(Math.floor(this.x), Math.floor(this.y + 2), this.w, 8);
    ctx.fillStyle = C.fire;
    ctx.fillRect(Math.floor(this.x + 2), Math.floor(this.y + 4), this.w - 4, 4);
    ctx.fillStyle = C.white;
    ctx.fillRect(Math.floor(this.x + 4), Math.floor(this.y + 6), this.w - 8, 1);
    ctx.globalAlpha = 1;
  }
}

class BossOrb extends Projectile {
  constructor(x, y, vx, vy) {
    super(x, y, vx, vy, 8, 8, 4);
    this.damage = 18;
    this.gravity = 30;
  }
  draw(ctx) {
    ctx.fillStyle = C.bossA;
    ctx.fillRect(Math.floor(this.x - 1), Math.floor(this.y - 1), this.w + 2, this.h + 2);
    ctx.fillStyle = C.bossC;
    ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.w, this.h);
    ctx.fillStyle = C.fire;
    ctx.fillRect(Math.floor(this.x + 2), Math.floor(this.y + 2), this.w - 4, this.h - 4);
    ctx.fillStyle = C.white;
    ctx.fillRect(Math.floor(this.x + 3), Math.floor(this.y + 3), 2, 2);
    if (Math.random() < 0.5) {
      Particles.add(new Particle(this.centerX(), this.centerY(), (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, 0.25, C.bossC, 1, 0, true, true));
    }
  }
}

/* ========================================================================== */
/* [14] PICKUPS                                                                */
/* ========================================================================== */

class Pickup extends Entity {
  constructor(x, y, kind) {
    super(x - 4, y - 4, 8, 8);
    this.kind = kind;  // 'gold' | 'cell' | 'heart'
    this.life = 12;
    this.t = 0;
    this.vy = -100 - Math.random() * 60;
    this.vx = (Math.random() - 0.5) * 80;
    this.gravity = 400;
    this.attractT = 0.4;  // delay before auto-pull to player
  }
  update(dt, world) {
    this.t += dt; this.life -= dt;
    if (this.life <= 0) { this.dead = true; return; }
    if (this.attractT > 0) this.attractT -= dt;

    const player = world.player;
    const dx = player.centerX() - this.centerX();
    const dy = player.centerY() - this.centerY();
    const d2 = dx * dx + dy * dy;

    if (this.attractT <= 0 && d2 < 60 * 60) {
      const d = Math.sqrt(d2);
      const pull = 200;
      this.vx += (dx / d) * pull * dt * 6;
      this.vy += (dy / d) * pull * dt * 6;
      this.vx *= 0.92; this.vy *= 0.92;
    } else {
      this.vy += this.gravity * dt;
      this.vy = Math.min(this.vy, 240);
    }
    this.x += this.vx * dt; this.y += this.vy * dt;

    // tile collision (simple ground)
    const cx = Math.floor(this.centerX() / TILE);
    const cy = Math.floor((this.y + this.h) / TILE);
    const t = world.room.tiles[cy]?.[cx];
    if ((t === 1 || t === 2 || t === 3) && this.vy > 0) {
      this.y = cy * TILE - this.h;
      this.vy *= -0.4; this.vx *= 0.5;
      if (Math.abs(this.vy) < 30) this.vy = 0;
    }

    // pickup
    if (aabb(this, player)) {
      if (this.kind === 'gold') { player.gold += 1; AudioFX.pickupGold(); Particles.goldShimmer(this.centerX(), this.centerY()); world.run.gold += 1; }
      else if (this.kind === 'cell') { world.run.cells += 1; AudioFX.pickupCell(); Particles.cellSpark(this.centerX(), this.centerY()); }
      else if (this.kind === 'heart') { player.hp = Math.min(player.maxHp, player.hp + 20); AudioFX.pickupHeart(); Particles.burst(this.centerX(), this.centerY(), 12, { speed: 100, life: 0.5, color: C.hp, size: 2, spread: TAU, shrink: true }); }
      this.dead = true;
    }
  }
  draw(ctx) {
    const bob = Math.sin(this.t * 6) * 1.5;
    const x = Math.floor(this.x), y = Math.floor(this.y + bob);
    const blink = this.life < 3 && Math.floor(this.life * 8) % 2 === 0;
    if (blink) return;
    if (this.kind === 'gold') drawSprite(ctx, COIN_SPRITE, PAL_COIN, x + 1, y + 1);
    else if (this.kind === 'cell') drawSprite(ctx, CELL_SPRITE, PAL_CELL, x, y);
    else if (this.kind === 'heart') drawSprite(ctx, HEART_SPRITE, PAL_HEART, x, y);
    // glow trail
    if (Math.random() < 0.2) {
      const c = this.kind === 'gold' ? C.gold : this.kind === 'cell' ? C.cell : C.hp;
      Particles.add(new Particle(this.centerX(), this.centerY(), 0, -10, 0.3, c, 1, 0, true, true));
    }
  }
}

/* ========================================================================== */
/* [15] ROOMS & WORLD                                                          */
/* ========================================================================== */

// Room layouts: 30 cols x 17 rows = 480x272 (we use 30x17 tile grid for VW=480, VH=272 — minor overflow OK)
// Tile codes: 0 empty, 1 stone, 2 ground, 3 platform, 4 spike, 5 door, 6 spawn, 7 enemy spawn
// Each layout is a list of strings, each char represents a tile.
//   .  empty
//   #  solid stone
//   =  platform
//   ^  spike
//   D  door (placed by builder)
//   S  spawn
//   1  enemy easy
//   2  enemy med
//   3  enemy hard

const ROOM_LAYOUTS = [
  // Layout 1: simple corridor
  [
    '##############################',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#......===.........====......#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............===.............#',
    '#............................#',
    '#..S......1.......2.......1..#',
    '##############################',
    '##############################',
    '##############################',
  ],
  // Layout 2: pits and platforms
  [
    '##############################',
    '#............................#',
    '#............................#',
    '#............................#',
    '#......1................1....#',
    '#============......==========#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#......2.................2...#',
    '#######^^^^#######^^^^^#######',
    '#............................#',
    '#..S.........................#',
    '##############################',
    '##############################',
    '##############################',
  ],
  // Layout 3: vertical with spikes
  [
    '##############################',
    '#............................#',
    '#.....1...........2..........#',
    '#=============================',
    '#............................#',
    '#............................#',
    '#......======................#',
    '#............................#',
    '#............................#',
    '#==========.........=========#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#..S....1.........3..........#',
    '##############################',
    '##############################',
    '##############################',
  ],
  // Layout 4: arena
  [
    '##############################',
    '#............................#',
    '#............................#',
    '#............................#',
    '#...==..............===......#',
    '#............................#',
    '#............................#',
    '#......===..........==.......#',
    '#............................#',
    '#............................#',
    '#......1.....3.....2...1.....#',
    '#............................#',
    '#............................#',
    '#..S.........................#',
    '##############################',
    '##############################',
    '##############################',
  ],
  // Layout 5: tight pillars
  [
    '##############################',
    '#............................#',
    '#............................#',
    '#............................#',
    '#......##.........##.........#',
    '#......##........###.........#',
    '#......##.........##.........#',
    '#......##.........##.........#',
    '#......##.........##.........#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#..S....1......2.......1.....#',
    '##############################',
    '##############################',
    '##############################',
  ],
  // Layout 6: gauntlet
  [
    '##############################',
    '#............................#',
    '#............................#',
    '#=====.................======#',
    '#............................#',
    '#............................#',
    '#......2..........3..........#',
    '#========...===...===========#',
    '#............................#',
    '#............................#',
    '#............................#',
    '#......1.....1......2....1...#',
    '#============....=====^^^====#',
    '#............................#',
    '##############################',
    '##############################',
    '##############################',
  ],
];

// Boss room
const BOSS_ROOM = [
  '##############################',
  '#............................#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#......===............==.....#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#......==..........==........#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#..S......................B..#',
  '##############################',
  '##############################',
];

// Hub room
const HUB_ROOM = [
  '##############################',
  '#............................#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#..S......C.........P........#',
  '##############################',
  '##############################',
  '##############################',
];

class Room {
  constructor(layout, kind = 'normal') {
    this.kind = kind;
    this.cols = layout[0].length;
    this.rows = layout.length;
    this.tiles = [];
    this.spawn = { x: 32, y: 32 };
    this.bossSpawn = null;
    this.enemyMarkers = [];
    this.collectorAt = null;
    this.portalAt = null;

    for (let y = 0; y < this.rows; y++) {
      const row = [];
      for (let x = 0; x < this.cols; x++) {
        const ch = layout[y][x];
        if (ch === '#') row.push(1);
        else if (ch === '=') row.push(3);
        else if (ch === '^') row.push(4);
        else { row.push(0);
          if (ch === 'S') this.spawn = { x: x * TILE, y: y * TILE - 16 };
          else if (ch === 'B') this.bossSpawn = { x: x * TILE - 8, y: y * TILE - 16 };
          else if (ch === 'C') this.collectorAt = { x: x * TILE, y: y * TILE - 16 };
          else if (ch === 'P') this.portalAt   = { x: x * TILE, y: y * TILE - 16 };
          else if (ch === '1') this.enemyMarkers.push({ x: x * TILE, y: y * TILE - 16, tier: 1 });
          else if (ch === '2') this.enemyMarkers.push({ x: x * TILE, y: y * TILE - 16, tier: 2 });
          else if (ch === '3') this.enemyMarkers.push({ x: x * TILE, y: y * TILE - 16, tier: 3 });
        }
      }
      this.tiles.push(row);
    }

    // door/exit position: scan from BOTTOM UP so we always pick the ground-level
    // slot, not an internal ledge above a mid-room wall. Falls back to top-down
    // if no slot is found at the bottom.
    this.doorAt = { x: (this.cols - 2) * TILE - 4, y: (this.rows - 3) * TILE - 8 };
    let foundDoor = false;
    for (let y = this.rows - 2; y >= 1; y--) {
      if (this.tiles[y + 1] && this.tiles[y + 1][this.cols - 2] === 1 &&
          this.tiles[y][this.cols - 2] === 0 &&
          this.tiles[y - 1] && this.tiles[y - 1][this.cols - 2] === 0) {
        this.doorAt = { x: (this.cols - 2) * TILE - 4, y: y * TILE - 8 };
        foundDoor = true;
        break;
      }
    }
    if (!foundDoor) {
      // fallback: any empty-above-solid pair
      for (let y = 0; y < this.rows - 1; y++) {
        if (this.tiles[y + 1][this.cols - 2] === 1 && this.tiles[y][this.cols - 2] === 0) {
          this.doorAt = { x: (this.cols - 2) * TILE - 4, y: y * TILE - 8 };
          break;
        }
      }
    }
    this.doorOpen = false;

    // torches: place a few near the top of solid walls
    this.torches = [];
    for (let x = 4; x < this.cols - 4; x += 6) {
      for (let y = 1; y < this.rows - 2; y++) {
        if (this.tiles[y][x] === 1 && this.tiles[y - 1][x] === 0 && Math.random() < 0.35) {
          this.torches.push({ x: x * TILE + 6, y: y * TILE - 16 });
          break;
        }
      }
    }
  }

  draw(ctx, t) {
    // background gradient layers (already in canvas bg)
    // far parallax brick wall pattern
    ctx.fillStyle = C.bg2;
    ctx.fillRect(0, 0, this.cols * TILE, this.rows * TILE);
    // brick pattern
    ctx.fillStyle = C.bg3;
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if ((x + Math.floor(y / 2)) % 4 === 0 && y % 3 === 0) {
          ctx.fillRect(x * TILE + 2, y * TILE + 2, TILE - 4, TILE - 4);
        }
      }
    }

    // tiles
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const tile = this.tiles[y][x];
        if (tile !== 0) {
          const top = y > 0 && this.tiles[y - 1][x] === 0;
          const bottom = y < this.rows - 1 && this.tiles[y + 1][x] === 0;
          drawTile(ctx, tile, x, y, { top, bottom });
        }
      }
    }
    // torches
    for (const tr of this.torches) drawTorch(ctx, tr.x, tr.y, t);

    // door
    if (this.kind !== 'hub') {
      const dx = this.doorAt.x, dy = this.doorAt.y;
      ctx.fillStyle = this.doorOpen ? C.fire : C.stoneDark;
      ctx.fillRect(dx, dy, 8, 24);
      ctx.fillStyle = this.doorOpen ? C.torch : C.stone;
      ctx.fillRect(dx + 1, dy + 1, 6, 22);
      // pillars
      ctx.fillStyle = C.stoneDark;
      ctx.fillRect(dx - 2, dy - 2, 12, 2);
      ctx.fillRect(dx - 2, dy + 24, 12, 2);
      // glow when open
      if (this.doorOpen) {
        const g = (Math.sin(t * 6) * 0.3 + 0.7);
        ctx.globalAlpha = 0.3 * g;
        ctx.fillStyle = C.torch;
        ctx.fillRect(dx - 4, dy - 4, 16, 32);
        ctx.globalAlpha = 1;
      }
    }
  }
}

class World {
  constructor(game) {
    this.game = game;
    this.room = null;
    this.roomIndex = 0;
    this.totalRooms = 6;        // 6 normal rooms + boss
    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    this.pickups = [];
    this.mode = 'run';          // 'run' | 'hub' | 'boss'
    this.run = { cells: 0, gold: 0 };
    this.t = 0;
    this.cleared = false;
    this.bossDefeated = false;
    this.transitioning = false;
    this.transitionT = 0;
    this.transitionTarget = null;
  }

  startHub(meta) {
    this.mode = 'hub';
    this.room = new Room(HUB_ROOM, 'hub');
    Camera.setBounds(0, 0, this.room.cols * TILE, this.room.rows * TILE);
    this.player = new Player(this.room.spawn.x, this.room.spawn.y);
    this.player.applyUpgrades(meta.upgrades);
    this.enemies = []; this.projectiles = []; this.pickups = [];
    this.run = { cells: 0, gold: 0 };
    this.cleared = false; this.bossDefeated = false;
    this.transitioning = false; this.transitionT = 0; this._deathTimer = 0;
    this.roomT = 0;
    Camera.x = this.player.centerX() - VW / 2; Camera.y = this.player.centerY() - VH / 2;
  }

  startRun(meta) {
    this.mode = 'run';
    this.roomIndex = 0;
    this.run = { cells: 0, gold: 0 };
    this.bossDefeated = false;
    this.transitioning = false; this.transitionT = 0; this._deathTimer = 0;
    this._lastLayout = null;          // allow first room to be any layout
    this.loadRoom(meta);
  }

  loadRoom(meta) {
    if (this.roomIndex >= this.totalRooms) {
      this.loadBoss(meta);
      return;
    }
    // pick a layout, never repeating immediately
    let layout;
    do {
      layout = choice(ROOM_LAYOUTS);
    } while (layout === this._lastLayout && ROOM_LAYOUTS.length > 1);
    this._lastLayout = layout;

    this.room = new Room(layout, 'normal');
    Camera.setBounds(0, 0, this.room.cols * TILE, this.room.rows * TILE);

    // spawn player
    if (!this.player || this.player.dead) {
      this.player = new Player(this.room.spawn.x, this.room.spawn.y);
      this.player.applyUpgrades(meta.upgrades);
    } else {
      this.player.x = this.room.spawn.x; this.player.y = this.room.spawn.y;
      this.player.vx = 0; this.player.vy = 0;
      this.player.iframes = 0.5;
    }

    this.enemies = []; this.projectiles = []; this.pickups = [];
    this.cleared = false;
    this.roomT = 0;                     // time spent in this room
    this.transitioning = false;         // safety: ensure no stale transition state
    this.transitionT = 0;
    this._deathTimer = 0;

    // spawn enemies from markers (with progressive difficulty)
    for (const m of this.room.enemyMarkers) {
      let tier = m.tier + (Math.random() < 0.3 ? 1 : 0);
      tier = clamp(tier - (this.roomIndex < 2 ? 1 : 0), 1, 3);
      if (this.roomIndex >= 4 && Math.random() < 0.5) tier = Math.max(tier, 2);
      let enemy;
      if (tier === 1) enemy = Math.random() < 0.7 ? new Grunt(m.x, m.y) : new Archer(m.x, m.y);
      else if (tier === 2) enemy = Math.random() < 0.5 ? new Archer(m.x, m.y) : new Brute(m.x, m.y);
      else enemy = new Brute(m.x, m.y);
      this.enemies.push(enemy);
    }

    Camera.x = this.player.centerX() - VW / 2; Camera.y = this.player.centerY() - VH / 2;
    Camera.flash('#fff', 0.15);
  }

  loadBoss(meta) {
    this.mode = 'boss';
    this.room = new Room(BOSS_ROOM, 'boss');
    Camera.setBounds(0, 0, this.room.cols * TILE, this.room.rows * TILE);
    if (!this.player || this.player.dead) {
      this.player = new Player(this.room.spawn.x, this.room.spawn.y);
      this.player.applyUpgrades(meta.upgrades);
    } else {
      this.player.x = this.room.spawn.x; this.player.y = this.room.spawn.y;
      this.player.vx = 0; this.player.vy = 0;
      this.player.iframes = 1.0;
    }
    this.enemies = []; this.projectiles = []; this.pickups = [];
    this.cleared = false;
    if (this.room.bossSpawn) {
      this.enemies.push(new Boss(this.room.bossSpawn.x, this.room.bossSpawn.y));
    }
    Camera.x = this.player.centerX() - VW / 2; Camera.y = this.player.centerY() - VH / 2;
    Camera.flash(C.bossC, 0.4);
  }

  spawnDrops(enemy) {
    for (let i = 0; i < enemy.dropGold; i++) this.pickups.push(new Pickup(enemy.centerX(), enemy.centerY(), 'gold'));
    for (let i = 0; i < enemy.dropCells; i++) this.pickups.push(new Pickup(enemy.centerX(), enemy.centerY(), 'cell'));
    if (Math.random() < 0.18) this.pickups.push(new Pickup(enemy.centerX(), enemy.centerY(), 'heart'));
  }

  update(dt, meta) {
    if (Camera.freezeTime > 0) { return; }
    this.t += dt;

    // player
    if (this.player && !this.player.dead) this.player.update(dt, this);

    // enemies
    for (const e of this.enemies) if (!e.dead) e.update(dt, this);

    // resolve player attack vs enemies
    if (this.player) {
      const hb = this.player.attackHitbox && this.player.attackHitbox();
      if (hb) {
        for (const e of this.enemies) {
          if (e.dead) continue;
          if (aabb(hb, e)) {
            const hit = e.takeDamage(hb.damage, this.player.centerX(), hb.type);
            if (hit) {
              const dx = sign(e.centerX() - this.player.centerX());
              e.kbX = dx * hb.kb;
              if (hb.type === 'heavy') e.kbY = -100;
            }
          }
        }
      }
    }

    // resolve enemy attacks vs player
    for (const e of this.enemies) {
      if (e.dead) continue;
      // melee attack hitboxes
      const hb = e.attackHitbox && e.attackHitbox();
      if (hb && this.player && !this.player.dead) {
        if (aabb(hb, this.player)) {
          this.player.takeDamage(hb.damage, e.centerX());
        }
      }
      // body contact damage (light) for grunt/brute when not telegraphing
      if (!e.attackTelegraph && !e.attackActive && this.player && !this.player.dead) {
        if (e instanceof Grunt || e instanceof Brute) {
          if (aabb(e, this.player) && Math.random() < 0.2) {
            this.player.takeDamage(5, e.centerX());
          }
        }
      }
    }

    // projectiles
    for (const p of this.projectiles) {
      if (p.dead) continue;
      p.update(dt, this);
      if (this.player && !this.player.dead && aabb(p, this.player)) {
        if (this.player.takeDamage(p.damage, p.centerX())) p.dead = true;
      }
    }
    this.projectiles = this.projectiles.filter(p => !p.dead);

    // remove dead enemies & spawn drops
    for (const e of this.enemies) if (e.dead && !e._dropped) { this.spawnDrops(e); e._dropped = true; }
    this.enemies = this.enemies.filter(e => !e.dead);

    // pickups
    for (const p of this.pickups) p.update(dt, this);
    this.pickups = this.pickups.filter(p => !p.dead);

    // VOID CHECK: anything that falls below the room dies (defends against
    // any geometry holes; player takes lethal damage, enemies just die).
    if (this.room) {
      const voidY = this.room.rows * TILE + 64;
      if (this.player && !this.player.dead && this.player.y > voidY) {
        this.player.takeDamage(999, this.player.centerX(), 'void');
      }
      for (const e of this.enemies) {
        if (!e.dead && e.y > voidY) { e.dead = true; }
      }
      // pickups falling into the void just despawn quietly
      for (const p of this.pickups) if (p.y > voidY) p.dead = true;
    }

    // check clear / transitions
    if (this.mode === 'run') {
      this.roomT = (this.roomT || 0) + dt;
      if (!this.cleared && this.enemies.length === 0) {
        this.cleared = true;
        if (this.room) { this.room.doorOpen = true; AudioFX.doorOpen(); Camera.flash(C.torch, 0.15); }
      }
      // SAFETY NET: if a room has been active for 30 s and still hasn't cleared
      // (e.g. an enemy somehow ended up unreachable), open the door anyway so
      // the player is never permanently stuck.
      if (!this.cleared && this.roomT > 30 && this.room) {
        this.cleared = true;
        this.room.doorOpen = true;
        AudioFX.doorOpen();
        Camera.flash(C.warn, 0.2);
      }
      // door interaction
      if (this.cleared && this.room && this.room.doorOpen && this.player && !this.transitioning) {
        const door = { x: this.room.doorAt.x, y: this.room.doorAt.y, w: 8, h: 24 };
        if (aabb(door, this.player)) {
          this.transitioning = true; this.transitionT = 0; this.transitionTarget = 'next';
        }
      }
    } else if (this.mode === 'boss') {
      if (!this.bossDefeated && this.enemies.length === 0) {
        this.bossDefeated = true;
        AudioFX.victory();
        Camera.flash('#fff', 0.6);
        Camera.shake(8, 0.8);
        // spawn extra cells
        for (let i = 0; i < 20; i++) {
          this.pickups.push(new Pickup(this.player.centerX() + (Math.random() - 0.5) * 60, this.player.centerY(), 'cell'));
        }
        this.transitionTarget = 'victory';
      }
      if (this.bossDefeated && this.player) {
        // wait a bit, then open the way / return to hub
        this.transitionT += dt;
        if (this.transitionT > 4) this.transitioning = true;
      }
    } else if (this.mode === 'hub') {
      // Interact with portal
      if (this.player && this.room.portalAt) {
        const portal = { x: this.room.portalAt.x - 4, y: this.room.portalAt.y - 4, w: 16, h: 24 };
        if (aabb(portal, this.player) && Input.interactPress()) {
          this.transitioning = true; this.transitionT = 0; this.transitionTarget = 'run';
        }
      }
      // Interact with collector
      if (this.player && this.room.collectorAt && Input.interactPress()) {
        const coll = { x: this.room.collectorAt.x - 4, y: this.room.collectorAt.y - 4, w: 16, h: 24 };
        if (aabb(coll, this.player)) this.game.openShop = true;
      }
    }

    if (this.transitioning) {
      this.transitionT += dt;
      if (this.transitionT > 0.5) {
        this.transitioning = false;
        if (this.transitionTarget === 'next') { this.roomIndex += 1; this.loadRoom(meta); }
        else if (this.transitionTarget === 'run') { this.game.startRun(); }
        else if (this.transitionTarget === 'victory') { this.game.onBossDefeated(); }
      }
    }

    // player death handling
    if (this.player && this.player.dead && this.mode !== 'hub') {
      if (!this._deathTimer) this._deathTimer = 0;
      this._deathTimer += dt;
      if (this._deathTimer > 1.6) { this._deathTimer = 0; this.game.onPlayerDeath(); }
    } else this._deathTimer = 0;

    // camera follow (Camera.update is called in Game.update)
    if (this.player) Camera.follow(this.player, dt);

    Particles.update(dt);
    DamageNumbers.update(dt);
  }

  draw(ctx) {
    // far background (does not move)
    ctx.fillStyle = C.bg0;
    ctx.fillRect(0, 0, VW, VH);
    // Far parallax — distant arch shapes
    ctx.save();
    ctx.translate(-Math.floor(Camera.x * 0.2), -Math.floor(Camera.y * 0.2));
    ctx.fillStyle = C.bg1;
    for (let i = 0; i < 6; i++) ctx.fillRect(i * 90, 80, 60, 200);
    ctx.restore();

    // Mid parallax — closer pillars
    ctx.save();
    ctx.translate(-Math.floor(Camera.x * 0.5), -Math.floor(Camera.y * 0.5));
    ctx.fillStyle = C.bg2;
    for (let i = 0; i < 8; i++) {
      const x = (i * 70 + 20);
      ctx.fillRect(x, 40, 30, 220);
      ctx.fillStyle = C.bg3;
      ctx.fillRect(x + 2, 40, 26, 4);
      ctx.fillStyle = C.bg2;
    }
    ctx.restore();

    // Main game world
    ctx.save();
    Camera.apply(ctx);

    if (this.room) this.room.draw(ctx, this.t);

    // hub NPCs
    if (this.mode === 'hub') {
      if (this.room.collectorAt) drawCollector(ctx, this.room.collectorAt.x, this.room.collectorAt.y, this.t);
      if (this.room.portalAt) drawPortal(ctx, this.room.portalAt.x, this.room.portalAt.y, this.t);
    }

    // pickups
    for (const p of this.pickups) p.draw(ctx);
    // enemies
    for (const e of this.enemies) e.draw(ctx);
    // projectiles
    for (const p of this.projectiles) p.draw(ctx);
    // player
    if (this.player) this.player.draw(ctx);
    // particles
    Particles.draw(ctx);
    // damage numbers
    DamageNumbers.draw(ctx);

    ctx.restore();

    // flash overlay (in screen space)
    Camera.drawFlash(ctx);

    // transition fade
    if (this.transitioning) {
      ctx.globalAlpha = clamp(this.transitionT * 2, 0, 1);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, VW, VH);
      ctx.globalAlpha = 1;
    }
  }
}

function drawCollector(ctx, x, y, t) {
  // robed figure with hood and glowing cell
  const bob = Math.sin(t * 2) * 0.5;
  const dy = y + bob;
  // hood
  ctx.fillStyle = C.bg3;
  ctx.fillRect(x + 2, dy - 6, 12, 8);
  ctx.fillStyle = '#000';
  ctx.fillRect(x + 5, dy - 2, 6, 3);
  // robe
  ctx.fillStyle = C.bg2;
  ctx.fillRect(x + 1, dy + 2, 14, 14);
  ctx.fillStyle = C.bg3;
  ctx.fillRect(x + 2, dy + 4, 12, 12);
  // glowing cell in hand
  const glow = Math.sin(t * 5) * 0.3 + 0.7;
  ctx.fillStyle = C.cell;
  ctx.globalAlpha = glow;
  ctx.fillRect(x + 6, dy + 8, 4, 4);
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#fff';
  ctx.fillRect(x + 7, dy + 9, 2, 2);
  // ground glow
  ctx.fillStyle = C.cell;
  ctx.globalAlpha = 0.15 * glow;
  ctx.fillRect(x - 4, dy + 14, 22, 3);
  ctx.globalAlpha = 1;

  // floating text
  ctx.fillStyle = C.textCell;
  ctx.font = '10px "VT323", monospace';
  ctx.fillText('THE COLLECTOR', x - 12, dy - 10);
  ctx.fillStyle = C.textDim;
  ctx.fillText('[E]', x + 2, dy - 18);
}

function drawPortal(ctx, x, y, t) {
  const cx = x + 8, cy = y + 8;
  // base
  ctx.fillStyle = C.bg3;
  ctx.fillRect(x, y + 14, 16, 4);
  // ring
  for (let i = 0; i < 3; i++) {
    const r = 8 - i * 2;
    const alpha = 0.3 + Math.sin(t * 4 + i) * 0.2;
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = C.cell;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, TAU);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  // center
  ctx.fillStyle = C.white;
  ctx.fillRect(cx - 1, cy - 1, 2, 2);
  // glow particles
  if (Math.random() < 0.3) {
    const a = Math.random() * TAU;
    Particles.add(new Particle(cx + Math.cos(a) * 8, cy + Math.sin(a) * 8, -Math.cos(a) * 20, -Math.sin(a) * 20, 0.5, C.cell, 1, 0, true, true));
  }
  ctx.fillStyle = C.text;
  ctx.font = '10px "VT323", monospace';
  ctx.fillText('PORTAL', x - 4, y - 6);
  ctx.fillStyle = C.textDim;
  ctx.fillText('[E]', x + 2, y - 14);
}

/* ========================================================================== */
/* [16] HUD                                                                    */
/* ========================================================================== */

function drawHUD(ctx, world, meta) {
  if (!world.player) return;

  // ----- Top-left HUD panel (HP, gold, cells stacked) -----
  // We give the panel a translucent backdrop so the HUD reads on any background.
  const px = 12, py = 10;             // panel inset from canvas edges
  const hpW = 96, hpH = 10;
  const hpRatio = clamp(world.player.hp / world.player.maxHp, 0, 1);

  // Panel background
  ctx.fillStyle = 'rgba(6, 6, 14, 0.55)';
  ctx.fillRect(px - 4, py - 4, hpW + 12, 46);

  // HP bar
  ctx.fillStyle = C.black;
  ctx.fillRect(px, py, hpW + 2, hpH + 2);
  ctx.fillStyle = C.hpBg;
  ctx.fillRect(px + 1, py + 1, hpW, hpH);
  ctx.fillStyle = C.hp;
  ctx.fillRect(px + 1, py + 1, Math.floor(hpW * hpRatio), hpH);
  ctx.fillStyle = C.white;
  ctx.fillRect(px + 1, py + 1, Math.floor(hpW * hpRatio), 1);
  // HP text
  ctx.font = '12px "VT323", monospace';
  ctx.fillStyle = C.text;
  ctx.fillText(`${Math.max(0, Math.ceil(world.player.hp))} / ${world.player.maxHp}`, px + hpW + 6, py + hpH);

  // Gold + Cells (row beneath HP)
  ctx.font = '12px "VT323", monospace';
  drawSprite(ctx, COIN_SPRITE, PAL_COIN, px, py + hpH + 6);
  ctx.fillStyle = C.textGold;
  ctx.fillText(String(world.player.gold), px + 8, py + hpH + 14);

  drawSprite(ctx, CELL_SPRITE, PAL_CELL, px + 38, py + hpH + 6);
  ctx.fillStyle = C.textCell;
  ctx.fillText(String(world.run.cells), px + 48, py + hpH + 14);

  // ----- Top-center context label -----
  ctx.font = '10px "VT323", monospace';
  if (world.mode === 'run') {
    ctx.fillStyle = C.textDim;
    const txt = `PRISON  ROOM ${world.roomIndex + 1} / ${world.totalRooms}`;
    const tw = ctx.measureText(txt).width;
    ctx.fillStyle = 'rgba(6, 6, 14, 0.55)';
    ctx.fillRect(VW / 2 - tw / 2 - 6, 6, tw + 12, 16);
    ctx.fillStyle = C.textDim;
    ctx.fillText(txt, VW / 2 - tw / 2, 17);
  } else if (world.mode === 'boss') {
    // Boss HP bar (bottom)
    const boss = world.enemies.find(e => e instanceof Boss);
    if (boss && boss.entryT <= 0) {
      const bw = 200, bh = 6;
      const bx = (VW - bw) / 2;
      const by = VH - 22;
      ctx.fillStyle = C.black;
      ctx.fillRect(bx - 1, by - 1, bw + 2, bh + 2);
      ctx.fillStyle = '#1a0a14';
      ctx.fillRect(bx, by, bw, bh);
      ctx.fillStyle = C.bossC;
      ctx.fillRect(bx, by, Math.floor(bw * Math.max(0, boss.hp / boss.maxHp)), bh);
      ctx.fillStyle = '#ffaa99';
      ctx.fillRect(bx, by, Math.floor(bw * Math.max(0, boss.hp / boss.maxHp)), 1);
      ctx.fillStyle = C.text;
      ctx.fillText('THE WARDEN', bx, by - 3);
      if (boss.phase === 2) {
        ctx.fillStyle = C.bossC;
        ctx.fillText('ENRAGED', bx + bw - 40, by - 3);
      }
    }
  } else if (world.mode === 'hub') {
    ctx.fillStyle = C.textDim;
    const txt = 'THE SAFE HOLD — APPROACH THE COLLECTOR OR PORTAL';
    const tw = ctx.measureText(txt).width;
    ctx.fillStyle = 'rgba(6, 6, 14, 0.55)';
    ctx.fillRect(VW / 2 - tw / 2 - 6, 6, tw + 12, 16);
    ctx.fillStyle = C.textDim;
    ctx.fillText(txt, VW / 2 - tw / 2, 17);
  }

  // Total stored cells (bottom-right corner)
  ctx.font = '10px "VT323", monospace';
  ctx.fillStyle = C.textDim;
  ctx.fillText(`STORED CELLS: ${meta.cells}`, VW - 96, VH - 8);
}

/* ========================================================================== */
/* [17] HUB / SHOP / META                                                      */
/* ========================================================================== */

const SHOP_ITEMS = [
  { id: 'maxHp1', name: 'VITALITY I', desc: '+25 max HP', cost: 5, max: 1 },
  { id: 'maxHp2', name: 'VITALITY II', desc: '+50 max HP (total)', cost: 12, max: 1, requires: 'maxHp1' },
  { id: 'dmg1',   name: 'EDGE I', desc: '+5 weapon damage', cost: 8, max: 1 },
  { id: 'dmg2',   name: 'EDGE II', desc: '+10 weapon damage (total)', cost: 18, max: 1, requires: 'dmg1' },
  { id: 'jump',   name: 'TRIPLE JUMP', desc: 'Gain a third jump', cost: 14, max: 1 },
  { id: 'heal',   name: 'EMERGENCY POTION', desc: 'Start each run at full HP +10', cost: 6, max: 1 },
];

class Meta {
  constructor() {
    this.cells = 0;
    this.bestRoom = 0;
    this.deaths = 0;
    this.bossKills = 0;
    this.purchased = {};      // { itemId: count }
    this.upgrades = {};
    this.load();
    this.computeUpgrades();
  }
  computeUpgrades() {
    this.upgrades = {
      maxHpBonus: (this.purchased.maxHp1 ? 25 : 0) + (this.purchased.maxHp2 ? 25 : 0),
      dmgBonus: (this.purchased.dmg1 ? 5 : 0) + (this.purchased.dmg2 ? 5 : 0),
      extraJump: !!this.purchased.jump,
      heal: !!this.purchased.heal,
    };
  }
  canBuy(item) {
    if (this.cells < item.cost) return false;
    if (this.purchased[item.id] && (this.purchased[item.id] >= item.max)) return false;
    if (item.requires && !this.purchased[item.requires]) return false;
    return true;
  }
  buy(item) {
    if (!this.canBuy(item)) return false;
    this.cells -= item.cost;
    this.purchased[item.id] = (this.purchased[item.id] || 0) + 1;
    this.computeUpgrades();
    this.save();
    AudioFX.uiConfirm();
    return true;
  }
  bank(cells) {
    this.cells += cells;
    this.save();
  }
  recordDeath(room) {
    this.deaths += 1;
    this.bestRoom = Math.max(this.bestRoom, room + 1);
    this.save();
  }
  recordVictory() {
    this.bossKills += 1;
    this.save();
  }
  save() {
    try { /* no-op: artifact storage would go here in a hosted env */ } catch (e) {}
  }
  load() { /* no-op */ }
}

/* ========================================================================== */
/* TOUCH CONTROLS — virtual buttons for iOS / Android                          */
/* ========================================================================== */

function initTouchControls() {
  const buttons = document.querySelectorAll('.tbtn[data-key]');
  if (!buttons.length) return;

  // Track which pointer/touch IDs are pressing which buttons.
  // This lets us release a button when the finger slides off it.
  const pressedTouches = new Map();  // touchId -> { btn, key }

  buttons.forEach(btn => {
    const key = btn.dataset.key;

    const press = () => {
      if (!Input.keys.has(key)) Input.pressed.add(key);
      Input.keys.add(key);
      btn.classList.add('active');
      // Resume audio on first touch (iOS requirement)
      AudioFX.resume();
    };

    const release = () => {
      if (Input.keys.has(key)) Input.released.add(key);
      Input.keys.delete(key);
      btn.classList.remove('active');
    };

    // Track per-pointer state so multi-touch and slide-off behave correctly.
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      for (const t of e.changedTouches) pressedTouches.set(t.identifier, { btn, key });
      press();
    }, { passive: false });

    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      for (const t of e.changedTouches) {
        const tracked = pressedTouches.get(t.identifier);
        if (tracked && tracked.btn === btn) pressedTouches.delete(t.identifier);
      }
      // Only release the key if no other touch is still on this button.
      const stillHeld = [...pressedTouches.values()].some(v => v.btn === btn);
      if (!stillHeld) release();
    }, { passive: false });

    btn.addEventListener('touchcancel', (e) => {
      e.preventDefault();
      for (const t of e.changedTouches) pressedTouches.delete(t.identifier);
      release();
    }, { passive: false });

    // Mouse fallback (desktop testing)
    btn.addEventListener('mousedown', (e) => { e.preventDefault(); press(); });
    btn.addEventListener('mouseup',   (e) => { e.preventDefault(); release(); });
    btn.addEventListener('mouseleave',(e) => { release(); });

    // Prevent context menu / long-press selection
    btn.addEventListener('contextmenu', (e) => e.preventDefault());
  });

  // Global touchmove handler for slide-off-button release: if a tracked touch
  // moves outside its button, release the key.
  document.addEventListener('touchmove', (e) => {
    for (const t of e.changedTouches) {
      const tracked = pressedTouches.get(t.identifier);
      if (!tracked) continue;
      const r = tracked.btn.getBoundingClientRect();
      if (t.clientX < r.left || t.clientX > r.right || t.clientY < r.top || t.clientY > r.bottom) {
        // Slid off — release this button (but keep tracking until touchend so we don't double-release)
        Input.keys.delete(tracked.key);
        Input.released.add(tracked.key);
        tracked.btn.classList.remove('active');
        pressedTouches.delete(t.identifier);
      }
    }
  }, { passive: false });

  // Prevent the page from scrolling/zooming when interacting with controls
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('gesturechange', (e) => e.preventDefault());
}

/* Reusable UI button — pixel-styled rect with label, supports disabled/highlight states. */
function drawUIButton(ctx, x, y, w, h, label, enabled = true, highlighted = true, accent = C.cell) {
  ctx.fillStyle = enabled ? '#000' : 'rgba(0,0,0,0.5)';
  ctx.fillRect(x - 1, y - 1, w + 2, h + 2);
  ctx.fillStyle = enabled ? 'rgba(20, 22, 34, 0.95)' : 'rgba(20, 22, 34, 0.5)';
  ctx.fillRect(x, y, w, h);
  // border
  ctx.fillStyle = enabled ? accent : C.textDim;
  ctx.fillRect(x, y, w, 1);                   // top
  ctx.fillRect(x, y + h - 1, w, 1);           // bottom
  ctx.fillRect(x, y, 1, h);                   // left
  ctx.fillRect(x + w - 1, y, 1, h);           // right
  // double bottom for that arcade feel
  if (enabled && highlighted) ctx.fillRect(x, y + h - 2, w, 2);
  // label
  ctx.font = '12px "VT323", monospace';
  ctx.fillStyle = enabled ? C.text : C.textDim;
  const tw = ctx.measureText(label).width;
  ctx.fillText(label, x + (w - tw) / 2, y + h / 2 + 4);
}

/* ========================================================================== */
/* [18] GAME STATE MACHINE & MAIN LOOP                                         */
/* ========================================================================== */

class Game {
  constructor() {
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    // Resize the display canvas to match its CSS size at the device pixel ratio,
    // so pixel art stays crisp on retina displays. We re-run on resize.
    this.resizeCanvas();
    addEventListener('resize', () => this.resizeCanvas());
    addEventListener('orientationchange', () => setTimeout(() => this.resizeCanvas(), 100));

    // virtual surface (low-res), we draw to it then scale up
    this.vctx = document.createElement('canvas');
    this.vctx.width = VW; this.vctx.height = VH;
    this.vc = this.vctx.getContext('2d');
    this.vc.imageSmoothingEnabled = false;

    this.state = 'menu';   // menu, hub, run, boss, dead, victory
    this.meta = new Meta();
    this.world = new World(this);
    this.openShop = false;
    this.shopIndex = 0;
    this.deathDelay = 0;
    this.victoryT = 0;
    this.bannerT = 0;
    this.banner = '';

    // Pause + UI state
    this.paused = false;
    this.pauseIndex = 0;
    this.muted = false;
    this._pendingTap = null;     // {x,y} in internal canvas coords, consumed once per frame
    this._restartBtn = null;
    this._continueBtn = null;
    this._pauseBtns = null;

    this.last = performance.now();
    this.acc = 0;

    Input.init();
    AudioFX.init();
    window._gameRef = this;
    initTouchControls();

    // Convert a pointer/touch event position into internal-canvas coordinates.
    const tapHandler = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = (clientX - rect.left) * VW / rect.width;
      const y = (clientY - rect.top)  * VH / rect.height;
      this._pendingTap = { x, y };
    };
    let lastTouchTime = 0;
    this.canvas.addEventListener('touchend', (e) => {
      if (!e.changedTouches.length) return;
      // Don't preventDefault here — the touch buttons already handle their own region.
      lastTouchTime = Date.now();
      const t = e.changedTouches[0];
      tapHandler(t.clientX, t.clientY);
    }, { passive: true });
    this.canvas.addEventListener('click', (e) => {
      // Suppress click that follows a touch (iOS fires both)
      if (Date.now() - lastTouchTime < 500) return;
      tapHandler(e.clientX, e.clientY);
    });

    // Tap / click / key to start — handles iOS audio unlock
    const overlay = document.getElementById('overlay');
    let started = false;
    const begin = (e) => {
      if (started) return;
      started = true;
      if (e) { e.preventDefault(); }
      overlay.classList.add('hidden');
      AudioFX.resume();
      // Play a silent tone to definitively unlock iOS audio
      try { AudioFX.tone({ freq: 220, dur: 0.01, gain: 0.01 }); } catch (_) {}
      this.startHub();
      this.state = 'hub';
    };
    overlay.addEventListener('click', begin);
    overlay.addEventListener('touchend', begin, { passive: false });
    addEventListener('keydown', (e) => {
      if (overlay && !overlay.classList.contains('hidden')) begin(e);
    });
  }

  startHub() {
    this.world.startHub(this.meta);
    this.state = 'hub';
    this.banner = 'THE SAFE HOLD';
    this.bannerT = 2.5;
    this.paused = false;
    this.openShop = false;
    this.deathDelay = 0;
    this.victoryT = 0;
  }

  startRun() {
    this.world.startRun(this.meta);
    this.state = 'run';
    this.banner = 'PRISON DESCENT — RUN BEGINS';
    this.bannerT = 2.5;
    this.paused = false;
  }

  onPlayerDeath() {
    this.meta.recordDeath(this.world.roomIndex);
    // forfeit cells from this run (could persist a portion — we lose all to keep stakes)
    this.state = 'dead';
    this.deathDelay = 0;
    this.banner = 'YOU DIED';
    this.bannerT = 3;
  }

  onBossDefeated() {
    this.meta.bank(this.world.run.cells);
    this.meta.recordVictory();
    this.state = 'victory';
    this.victoryT = 0;
    this.banner = 'WARDEN DEFEATED';
    this.bannerT = 4;
  }

  // shop interactions when openShop=true
  updateShop(dt, tap) {
    if (Input.pausePress() || Input.interactPress()) {
      this.openShop = false; AudioFX.uiSelect(); return;
    }
    if (Input.pressed.has('s') || Input.pressed.has('ArrowDown')) { this.shopIndex = (this.shopIndex + 1) % SHOP_ITEMS.length; AudioFX.uiSelect(); }
    if (Input.pressed.has('w') || Input.pressed.has('ArrowUp'))   { this.shopIndex = (this.shopIndex + SHOP_ITEMS.length - 1) % SHOP_ITEMS.length; AudioFX.uiSelect(); }
    const buyAction = () => {
      const item = SHOP_ITEMS[this.shopIndex];
      if (this.meta.canBuy(item)) {
        this.meta.buy(item);
        if (this.world.player) this.world.player.applyUpgrades(this.meta.upgrades);
        Camera.flash(C.cell, 0.2);
      } else { AudioFX.uiSelect(); }
    };
    if (Input.attackPress() || Input.pressed.has('Enter')) buyAction();

    // Tap support: tap an item to select; tap the BUY button to purchase; tap CLOSE to leave.
    if (tap && this._shopRects) {
      for (let i = 0; i < this._shopRects.items.length; i++) {
        if (pointInRect(tap, this._shopRects.items[i])) {
          if (this.shopIndex === i) buyAction();
          else { this.shopIndex = i; AudioFX.uiSelect(); }
          return;
        }
      }
      if (pointInRect(tap, this._shopRects.buy)) buyAction();
      if (pointInRect(tap, this._shopRects.close)) { this.openShop = false; AudioFX.uiSelect(); }
    }
  }

  drawShop(ctx) {
    // dim background
    ctx.fillStyle = 'rgba(6, 6, 14, 0.85)';
    ctx.fillRect(0, 0, VW, VH);

    const W = 300, H = 220;
    const x = (VW - W) / 2, y = (VH - H) / 2;
    ctx.fillStyle = '#000';
    ctx.fillRect(x - 1, y - 1, W + 2, H + 2);
    ctx.fillStyle = C.bg2;
    ctx.fillRect(x, y, W, H);
    ctx.strokeStyle = C.cell;
    ctx.strokeRect(x + 0.5, y + 0.5, W - 1, H - 1);

    // title
    ctx.fillStyle = C.cell;
    ctx.font = 'bold 12px "Press Start 2P", monospace';
    ctx.fillText('THE COLLECTOR', x + 10, y + 16);
    ctx.fillStyle = C.textDim;
    ctx.font = '10px "VT323", monospace';
    ctx.fillText(`STORED CELLS: ${this.meta.cells}`, x + 10, y + 30);

    // items
    const itemRects = [];
    ctx.font = '12px "VT323", monospace';
    const rowH = 20;
    SHOP_ITEMS.forEach((item, i) => {
      const ry = y + 42 + i * rowH;
      const sel = i === this.shopIndex;
      const owned = this.meta.purchased[item.id] && this.meta.purchased[item.id] >= item.max;
      const can = this.meta.canBuy(item);
      const rect = { x: x + 6, y: ry - 2, w: W - 12, h: rowH - 2 };
      itemRects.push(rect);

      if (sel) { ctx.fillStyle = 'rgba(95, 196, 212, 0.18)'; ctx.fillRect(rect.x, rect.y, rect.w, rect.h); }
      ctx.fillStyle = sel ? C.cell : (owned ? C.textDim : (can ? C.text : C.textDim));
      ctx.fillText(`${sel ? '> ' : '  '}${item.name}`, x + 12, ry + 12);
      ctx.fillStyle = C.textDim;
      ctx.font = '10px "VT323", monospace';
      ctx.fillText(item.desc, x + 110, ry + 12);
      ctx.font = '12px "VT323", monospace';
      ctx.fillStyle = owned ? C.textDim : (can ? C.gold : C.textDim);
      ctx.fillText(owned ? 'OWNED' : `${item.cost}c`, x + W - 36, ry + 12);
    });

    // Bottom action buttons
    const buyW = 80, closeW = 80, btnH = 22;
    const btnY = y + H - btnH - 8;
    const buyX = x + W / 2 - buyW - 6;
    const closeX = x + W / 2 + 6;
    const item = SHOP_ITEMS[this.shopIndex];
    const canBuy = item && this.meta.canBuy(item);
    drawUIButton(ctx, buyX, btnY, buyW, btnH, 'BUY', canBuy, canBuy, C.gold);
    drawUIButton(ctx, closeX, btnY, closeW, btnH, 'CLOSE', true, true, C.textDim);

    this._shopRects = {
      items: itemRects,
      buy: { x: buyX, y: btnY, w: buyW, h: btnH },
      close: { x: closeX, y: btnY, w: closeW, h: btnH },
    };
  }

  update(dt) {
    // Detect shop opening (set by world hub interaction)
    if (this.openShop && !this._shopWasOpen) { this.shopIndex = 0; }
    this._shopWasOpen = this.openShop;

    // Drain any queued canvas tap into a per-frame value the state handlers can read.
    const tap = this._pendingTap; this._pendingTap = null;

    if (this.state === 'hub' || this.state === 'run' || this.state === 'boss') {
      if (this.openShop) {
        this.updateShop(dt, tap);
      } else if (this.paused) {
        this.updatePauseMenu(dt, tap);
      } else {
        // Toggle pause when the pause/menu button (Escape) is pressed
        if (Input.pausePress()) {
          this.paused = true;
          this.pauseIndex = 0;
          AudioFX.uiSelect();
        } else {
          this.world.update(dt, this.meta);
          // update state mirror
          if (this.world.mode === 'run') this.state = 'run';
          else if (this.world.mode === 'boss') this.state = 'boss';
          else if (this.world.mode === 'hub') this.state = 'hub';
        }
      }
    } else if (this.state === 'dead') {
      this.deathDelay += dt;
      // Tap on the RETURN TO HUB button OR any input restarts (after a brief grace).
      if (this.deathDelay > 1.2) {
        if (Input.anyPress()) { this.startHub(); }
        else if (tap && this._restartBtn && pointInRect(tap, this._restartBtn)) {
          AudioFX.uiConfirm();
          this.startHub();
        }
      }
    } else if (this.state === 'victory') {
      this.victoryT += dt;
      if (this.victoryT > 1.5) {
        if (Input.anyPress()) { this.startHub(); }
        else if (tap && this._continueBtn && pointInRect(tap, this._continueBtn)) {
          AudioFX.uiConfirm();
          this.startHub();
        }
      }
    }

    if (this.bannerT > 0) this.bannerT -= dt;
    Camera.update(dt);
  }

  updatePauseMenu(dt, tap) {
    const items = this.getPauseItems();
    if (Input.pausePress()) {
      this.paused = false;
      AudioFX.uiSelect();
      return;
    }
    if (Input.pressed.has('s') || Input.pressed.has('ArrowDown')) {
      this.pauseIndex = (this.pauseIndex + 1) % items.length;
      AudioFX.uiSelect();
    }
    if (Input.pressed.has('w') || Input.pressed.has('ArrowUp')) {
      this.pauseIndex = (this.pauseIndex + items.length - 1) % items.length;
      AudioFX.uiSelect();
    }
    if (Input.attackPress() || Input.pressed.has('Enter')) {
      items[this.pauseIndex].action();
      AudioFX.uiConfirm();
    }
    if (tap && this._pauseBtns) {
      for (let i = 0; i < this._pauseBtns.length; i++) {
        if (pointInRect(tap, this._pauseBtns[i])) {
          this.pauseIndex = i;
          items[i].action();
          AudioFX.uiConfirm();
          break;
        }
      }
    }
  }

  getPauseItems() {
    const items = [
      { label: 'RESUME', action: () => { this.paused = false; } },
    ];
    if (this.state === 'run' || this.state === 'boss') {
      items.push({ label: 'RETURN TO HUB', action: () => { this.paused = false; this.startHub(); } });
    }
    items.push({ label: this.muted ? 'SOUND: OFF' : 'SOUND: ON', action: () => { this.muted = !this.muted; AudioFX.enabled = !this.muted; } });
    return items;
  }

  drawPauseMenu(ctx) {
    // dim background
    ctx.fillStyle = 'rgba(6, 6, 14, 0.78)';
    ctx.fillRect(0, 0, VW, VH);

    // title
    ctx.fillStyle = C.cell;
    ctx.font = 'bold 18px "Press Start 2P", monospace';
    const title = 'PAUSED';
    const tw = ctx.measureText(title).width;
    ctx.fillText(title, (VW - tw) / 2, 64);

    // buttons
    const items = this.getPauseItems();
    const btnW = 200, btnH = 30, gap = 10;
    const totalH = items.length * btnH + (items.length - 1) * gap;
    const startY = (VH - totalH) / 2 + 12;
    this._pauseBtns = [];
    items.forEach((item, i) => {
      const bx = (VW - btnW) / 2;
      const by = startY + i * (btnH + gap);
      const sel = i === this.pauseIndex;
      this._pauseBtns.push({ x: bx, y: by, w: btnW, h: btnH });
      drawUIButton(ctx, bx, by, btnW, btnH, item.label, true, sel, sel ? C.cell : C.textDim);
    });

    // hint
    ctx.fillStyle = C.textDim;
    ctx.font = '10px "VT323", monospace';
    const hint = 'TAP a button — or use UP/DOWN + J — or press MENU again to resume';
    const hw = ctx.measureText(hint).width;
    ctx.fillText(hint, (VW - hw) / 2, VH - 14);
  }

  draw() {
    const ctx = this.vc;
    // clear
    ctx.fillStyle = C.bg0;
    ctx.fillRect(0, 0, VW, VH);

    if (this.world && (this.state === 'hub' || this.state === 'run' || this.state === 'boss' || this.state === 'dead' || this.state === 'victory')) {
      this.world.draw(ctx);
    }

    // HUD
    if (this.state === 'hub' || this.state === 'run' || this.state === 'boss') drawHUD(ctx, this.world, this.meta);

    // banner
    if (this.bannerT > 0) {
      const a = clamp(this.bannerT > 1 ? 1 : this.bannerT, 0, 1);
      ctx.globalAlpha = a;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, VH / 2 - 20, VW, 40);
      ctx.fillStyle = C.text;
      ctx.font = 'bold 14px "Press Start 2P", monospace';
      const tw = ctx.measureText(this.banner).width;
      ctx.fillText(this.banner, (VW - tw) / 2, VH / 2 + 4);
      ctx.globalAlpha = 1;
    }

    // shop overlay
    if (this.openShop) this.drawShop(ctx);

    // pause overlay (drawn last over everything game-related but not over dead/victory)
    if (this.paused) this.drawPauseMenu(ctx);

    // dead screen
    if (this.state === 'dead') {
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fillRect(0, 0, VW, VH);
      ctx.fillStyle = C.danger;
      ctx.font = 'bold 24px "Press Start 2P", monospace';
      const t = 'YOU DIED';
      const tw = ctx.measureText(t).width;
      ctx.fillText(t, (VW - tw) / 2, VH / 2 - 24);
      ctx.fillStyle = C.text;
      ctx.font = '12px "VT323", monospace';
      const sub = `room ${this.world.roomIndex + 1}  ·  cells lost: ${this.world.run.cells}`;
      const sw = ctx.measureText(sub).width;
      ctx.fillText(sub, (VW - sw) / 2, VH / 2 + 0);

      // RESTART button (tappable on mobile, also responds to any key)
      const ready = this.deathDelay > 1.2;
      const btnW = 160, btnH = 28;
      const btnX = (VW - btnW) / 2, btnY = VH / 2 + 16;
      this._restartBtn = ready ? { x: btnX, y: btnY, w: btnW, h: btnH } : null;
      drawUIButton(ctx, btnX, btnY, btnW, btnH, 'RETURN TO HUB', ready, ready, C.danger);
      if (ready) {
        ctx.fillStyle = C.textDim;
        ctx.font = '10px "VT323", monospace';
        const k = 'tap or press any key';
        const kw = ctx.measureText(k).width;
        if (Math.floor(this.deathDelay * 2) % 2 === 0)
          ctx.fillText(k, (VW - kw) / 2, btnY + btnH + 14);
      }
    } else {
      this._restartBtn = null;
    }

    // victory screen
    if (this.state === 'victory') {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, VW, VH);
      ctx.fillStyle = C.gold;
      ctx.font = 'bold 20px "Press Start 2P", monospace';
      const t = 'VICTORY';
      const tw = ctx.measureText(t).width;
      ctx.fillText(t, (VW - tw) / 2, VH / 2 - 24);
      ctx.fillStyle = C.text;
      ctx.font = '12px "VT323", monospace';
      const sub = `the warden falls — ${this.world.run.cells} cells banked`;
      const sw = ctx.measureText(sub).width;
      ctx.fillText(sub, (VW - sw) / 2, VH / 2 + 0);

      const ready = this.victoryT > 1.5;
      const btnW = 140, btnH = 28;
      const btnX = (VW - btnW) / 2, btnY = VH / 2 + 16;
      this._continueBtn = ready ? { x: btnX, y: btnY, w: btnW, h: btnH } : null;
      drawUIButton(ctx, btnX, btnY, btnW, btnH, 'CONTINUE', ready, ready, C.gold);
    } else {
      this._continueBtn = null;
    }

    // upscale to display canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.vctx, 0, 0, VW, VH, 0, 0, this.canvas.width, this.canvas.height);
  }

  loop = (now) => {
    let dt = (now - this.last) / 1000;
    this.last = now;
    if (dt > 0.1) dt = 0.1;          // clamp big stalls
    // fixed-ish step
    this.acc += dt;
    let safetyIters = 0;
    try {
      while (this.acc >= DT && safetyIters++ < 6) {
        this.update(DT);
        Input.endFrame();
        this.acc -= DT;
      }
      // if we still have leftover time after 6 iters, just discard so we don't spiral
      if (safetyIters >= 6) this.acc = 0;
      this.draw();
    } catch (err) {
      // a single bad frame should not kill the game — log and keep ticking
      console.error('[Cellbound] frame error:', err);
      this.acc = 0;
      Input.endFrame();
      // try to draw a frame anyway so user sees state
      try { this.draw(); } catch (_) {}
    }
    requestAnimationFrame(this.loop);
  };

  start() { requestAnimationFrame(this.loop); }

  resizeCanvas() {
    // Use device pixel ratio for crisp rendering on retina, capped to keep perf reasonable.
    // For pixel art with imageRendering: pixelated, an integer scale at internal multiples
    // (like 960x540, 1440x810, 1920x1080) gives sharpest results.
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const cssW = rect.width, cssH = rect.height;
    // Pick an integer scale of VW=480 that matches or exceeds CSS size, capped at 4x.
    const targetW = Math.min(1920, Math.max(VW, Math.ceil(cssW)));
    let scale = Math.min(4, Math.max(2, Math.round(targetW / VW)));
    const bufW = VW * scale, bufH = VH * scale;
    if (this.canvas.width !== bufW || this.canvas.height !== bufH) {
      this.canvas.width = bufW;
      this.canvas.height = bufH;
      this.ctx.imageSmoothingEnabled = false;
    }
  }
}

/* ========================================================================== */
/* INIT                                                                        */
/* ========================================================================== */

window.addEventListener('load', () => {
  const game = new Game();
  game.start();
});

})();
