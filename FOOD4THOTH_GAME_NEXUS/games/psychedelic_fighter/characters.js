/* ============================================================
   CHARACTERS — 10 Fighters + 1 Boss
   Each character is a hand-designed SVG creature with named
   body-part groups (g-head, g-torso, g-armL, g-armR, g-legL,
   g-legR, g-aux). The Game module poses them by transforming
   those groups.
   ============================================================ */

const CHARACTERS = [];

/* Helper for shared face primitives */
const face = (eyeColor='#000', extra='') => `
  <ellipse cx="0" cy="0" rx="22" ry="26" fill="currentColor" stroke="#000" stroke-width="2"/>
  <circle cx="-7" cy="-3" r="3" fill="#fff"/>
  <circle cx="7" cy="-3" r="3" fill="#fff"/>
  <circle cx="-7" cy="-3" r="1.5" fill="${eyeColor}"/>
  <circle cx="7" cy="-3" r="1.5" fill="${eyeColor}"/>
  <path d="M-6,8 Q0,12 6,8" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/>
  ${extra}
`;

/* Common limb shapes (used as fallback) */
const limbArm = (color, end='') => `
  <rect x="-6" y="0" width="12" height="55" rx="6" fill="${color}" stroke="#000" stroke-width="2"/>
  ${end}
`;
const limbLeg = (color, foot='') => `
  <rect x="-7" y="0" width="14" height="60" rx="6" fill="${color}" stroke="#000" stroke-width="2"/>
  ${foot}
`;
const fist = (color='#ffd9a8') => `<circle cx="0" cy="56" r="9" fill="${color}" stroke="#000" stroke-width="2"/>`;
const foot = (color='#222') => `<ellipse cx="2" cy="62" rx="11" ry="6" fill="${color}" stroke="#000" stroke-width="2"/>`;

/* ============================================================
   1. LORAXON — Truffula Warrior (Dr. Seuss)
   ============================================================ */
CHARACTERS.push({
  id: 'loraxon', name: 'LORAXON', tag: 'I speak for the smashings.',
  bio: 'A pelt-orange fury with a moustache like solar flares. Speaks in rhyming threats.',
  palette: { skin:'#ffaa55', cloth:'#ff5500', accent:'#ffe600', hair:'#ffaa55' },
  stats: { power:7, speed:5, range:5, weird:9 },
  ending: [
    "And so Loraxon, having squashed the last of the smog-loving Sneetches,",
    "climbed the highest stump in the Bat-Country Truffula thicket.",
    "He twirled his moustache twice, said a word that rhymed with NOTHING,",
    "and the sky itself bloomed into rainbow-flavored cotton candy.",
    "(But the trees, the trees — they grew back greener than before.)"
  ],
  endingPalette: ['#ff5500','#ffaa55','#ffe600','#ff2bd6'],
  render(pose, opts={}){
    const p = pose || {};
    return `<svg viewBox="-100 -180 200 280" xmlns="http://www.w3.org/2000/svg">
      <g class="g-aux" transform="translate(${p.aux?.x||0},${p.aux?.y||0})"></g>
      <g class="g-legL" transform="translate(-15,-60) rotate(${p.legL||0})">
        ${limbLeg('#ffaa55', foot('#aa3300'))}
      </g>
      <g class="g-legR" transform="translate(15,-60) rotate(${p.legR||0})">
        ${limbLeg('#ffaa55', foot('#aa3300'))}
      </g>
      <g class="g-torso" transform="translate(0,-90)">
        <ellipse cx="0" cy="20" rx="38" ry="40" fill="#ffaa55" stroke="#000" stroke-width="3"/>
        <ellipse cx="-15" cy="10" rx="6" ry="4" fill="#fff"/>
        <ellipse cx="15" cy="14" rx="5" ry="3" fill="#fff"/>
      </g>
      <g class="g-armL" transform="translate(-32,-80) rotate(${(p.armL||0)+10})">
        ${limbArm('#ffaa55', fist('#ffaa55'))}
      </g>
      <g class="g-armR" transform="translate(32,-80) rotate(${(p.armR||0)-10})">
        ${limbArm('#ffaa55', fist('#ffaa55'))}
      </g>
      <g class="g-head" transform="translate(0,-130) rotate(${p.head||0})">
        <!-- truffula tuft -->
        <circle cx="-15" cy="-30" r="14" fill="#ffe600"/>
        <circle cx="0" cy="-36" r="16" fill="#ff5500"/>
        <circle cx="15" cy="-30" r="14" fill="#ff2bd6"/>
        <circle cx="-25" cy="-22" r="9" fill="#ffaa55"/>
        <circle cx="25" cy="-22" r="9" fill="#ffaa55"/>
        <g style="color:#ffaa55">${face('#3a1500')}</g>
        <!-- giant moustache -->
        <path d="M-30,8 Q-50,14 -55,4 Q-50,18 -25,12 Q-15,8 0,10 Q15,8 25,12 Q50,18 55,4 Q50,14 30,8 Q15,5 0,7 Q-15,5 -30,8 Z"
              fill="#fff5dd" stroke="#000" stroke-width="2"/>
      </g>
    </svg>`;
  }
});

/* ============================================================
   2. ALYCE — Wonderland Berserker
   ============================================================ */
CHARACTERS.push({
  id: 'alyce', name: 'ALYCE', tag: 'Off with everything.',
  bio: 'Ate the wrong cake, drank the wrong tea, and now keeps a flamingo croquet mallet for emergencies.',
  palette: { skin:'#fcdbb1', cloth:'#0066cc', accent:'#ffffff', hair:'#ffe066' },
  stats: { power:6, speed:7, range:7, weird:8 },
  ending: [
    "Alyce drank the last of the EAT-ME potion at the tournament's end.",
    "She grew until the sky was a thimble.",
    "Looking down at the cosmos, she found it, like everything else, a bit much.",
    "She set the universe down on the kitchen table and went to bed.",
    "Curiouser and curiouser."
  ],
  endingPalette: ['#0066cc','#fff','#ff4488','#ffe066'],
  render(pose, opts={}){
    const p = pose || {};
    return `<svg viewBox="-100 -180 200 280" xmlns="http://www.w3.org/2000/svg">
      <g class="g-legL" transform="translate(-12,-60) rotate(${p.legL||0})">
        ${limbLeg('#fcdbb1', foot('#000'))}
      </g>
      <g class="g-legR" transform="translate(12,-60) rotate(${p.legR||0})">
        ${limbLeg('#fcdbb1', foot('#000'))}
      </g>
      <g class="g-torso" transform="translate(0,-95)">
        <!-- pinafore -->
        <path d="M-35,40 L-40,5 L-25,-15 L25,-15 L40,5 L35,40 Z" fill="#0066cc" stroke="#000" stroke-width="3"/>
        <rect x="-22" y="-12" width="44" height="30" fill="#fff" opacity="0.9" stroke="#000" stroke-width="1.5"/>
        <rect x="-2" y="-10" width="4" height="26" fill="#0066cc"/>
        <circle cx="-15" cy="0" r="3" fill="#0066cc"/>
        <circle cx="15" cy="0" r="3" fill="#0066cc"/>
      </g>
      <g class="g-armL" transform="translate(-30,-90) rotate(${(p.armL||0)+5})">
        ${limbArm('#fcdbb1', fist('#fcdbb1'))}
      </g>
      <g class="g-armR" transform="translate(30,-90) rotate(${(p.armR||0)-5})">
        ${limbArm('#fcdbb1', `<g transform="translate(0,55)">
          <!-- flamingo mallet -->
          <rect x="-3" y="-2" width="6" height="40" fill="#ff66aa" stroke="#000" stroke-width="1"/>
          <path d="M-3,-2 Q-15,-12 -10,-25 Q-5,-30 0,-25 L4,-15 Q8,-8 5,-2 Z" fill="#ff66aa" stroke="#000" stroke-width="1.5"/>
          <circle cx="-5" cy="-25" r="2" fill="#000"/>
        </g>`)}
      </g>
      <g class="g-head" transform="translate(0,-135) rotate(${p.head||0})">
        <g style="color:#fcdbb1">${face('#0044aa')}</g>
        <!-- hair -->
        <path d="M-22,-15 Q-30,5 -22,18 Q-15,5 -10,-5 Z" fill="#ffe066" stroke="#000" stroke-width="2"/>
        <path d="M22,-15 Q30,5 22,18 Q15,5 10,-5 Z" fill="#ffe066" stroke="#000" stroke-width="2"/>
        <path d="M-22,-22 Q-15,-32 0,-30 Q15,-32 22,-22 Q15,-15 0,-15 Q-15,-15 -22,-22 Z" fill="#ffe066" stroke="#000" stroke-width="2"/>
        <!-- ribbon -->
        <path d="M-10,-30 L-6,-38 L0,-34 L6,-38 L10,-30 Z" fill="#0066cc" stroke="#000" stroke-width="1.5"/>
      </g>
    </svg>`;
  }
});

/* ============================================================
   3. GONZO RAOUL — Bat-Country Counsel
   ============================================================ */
CHARACTERS.push({
  id: 'raoul', name: 'GONZO RAOUL', tag: 'WE CAN\'T STOP HERE',
  bio: 'A degenerate attorney with a trunk full of mescaline, ether, and uppercut. Punches in waveforms.',
  palette: { skin:'#e8c89a', cloth:'#ff6600', accent:'#ffe600', hair:'#aa6622' },
  stats: { power:8, speed:6, range:6, weird:10 },
  ending: [
    "Raoul woke up in the desert, surrounded by champion belts and giant bats.",
    "He couldn't remember a single fight.",
    "But his attorney said it was all on tape, and the tape was on fire,",
    "and the fire was singing the National Anthem in seven keys.",
    "Buy the ticket, take the ride. Especially this ride."
  ],
  endingPalette: ['#ff6600','#ffe600','#aa3300','#000'],
  render(pose, opts={}){
    const p = pose || {};
    return `<svg viewBox="-100 -180 200 280" xmlns="http://www.w3.org/2000/svg">
      <g class="g-legL" transform="translate(-13,-60) rotate(${p.legL||0})">
        ${limbLeg('#3d2515', foot('#000'))}
      </g>
      <g class="g-legR" transform="translate(13,-60) rotate(${p.legR||0})">
        ${limbLeg('#3d2515', foot('#000'))}
      </g>
      <g class="g-torso" transform="translate(0,-95)">
        <!-- hawaiian shirt -->
        <path d="M-35,40 L-38,-10 L-22,-18 L22,-18 L38,-10 L35,40 Z"
              fill="#ff6600" stroke="#000" stroke-width="3"/>
        <circle cx="-22" cy="0" r="8" fill="#ffe600"/>
        <circle cx="20" cy="20" r="7" fill="#ffe600"/>
        <circle cx="-10" cy="25" r="6" fill="#ff2bd6"/>
        <circle cx="15" cy="-5" r="6" fill="#ff2bd6"/>
        <path d="M-22,0 L-22,40" stroke="#000" stroke-width="2"/>
      </g>
      <g class="g-armL" transform="translate(-32,-90) rotate(${(p.armL||0)+15})">
        ${limbArm('#ff6600', fist('#e8c89a'))}
      </g>
      <g class="g-armR" transform="translate(32,-90) rotate(${(p.armR||0)-15})">
        ${limbArm('#ff6600', `<g transform="translate(0,55)">
          ${fist('#e8c89a')}
          <!-- cigarette holder -->
          <line x1="0" y1="0" x2="20" y2="-15" stroke="#000" stroke-width="2"/>
          <rect x="18" y="-19" width="14" height="3" fill="#fff"/>
          <circle cx="32" cy="-17" r="2.5" fill="#ffe600"/>
          <circle cx="32" cy="-17" r="3" fill="#ff2bd6" opacity="0.6"/>
        </g>`)}
      </g>
      <g class="g-head" transform="translate(0,-135) rotate(${p.head||0})">
        <!-- bald head -->
        <ellipse cx="0" cy="0" rx="22" ry="26" fill="#e8c89a" stroke="#000" stroke-width="2"/>
        <!-- aviators -->
        <rect x="-22" y="-8" width="44" height="3" fill="#000"/>
        <ellipse cx="-12" cy="-2" rx="10" ry="7" fill="#000" stroke="#000" stroke-width="2"/>
        <ellipse cx="12" cy="-2" rx="10" ry="7" fill="#000" stroke="#000" stroke-width="2"/>
        <ellipse cx="-9" cy="-3" rx="3" ry="2" fill="#fff" opacity="0.6"/>
        <ellipse cx="15" cy="-3" rx="3" ry="2" fill="#fff" opacity="0.6"/>
        <path d="M-7,12 Q0,14 7,12" stroke="#000" stroke-width="2" fill="none"/>
        <!-- bucket hat -->
        <ellipse cx="0" cy="-16" rx="32" ry="6" fill="#ffe600" stroke="#000" stroke-width="2"/>
        <rect x="-22" y="-26" width="44" height="12" fill="#ffe600" stroke="#000" stroke-width="2"/>
      </g>
    </svg>`;
  }
});

/* ============================================================
   4. BUCKY DOME — Geodesic Geometer
   ============================================================ */
CHARACTERS.push({
  id: 'bucky', name: 'BUCKY DOME', tag: 'Tensegrity is the answer.',
  bio: 'A geodesic intelligence with no body, only relationships. Hits with synergetic vectors.',
  palette: { skin:'#c0e0ff', cloth:'#0099ff', accent:'#ffd700', hair:'#aaccff' },
  stats: { power:6, speed:5, range:9, weird:10 },
  ending: [
    "Bucky Dome dissolved the tournament back into pure geometry.",
    "Every fighter became a vertex; every punch, an edge.",
    "What remained was a single, perfect, polyhedron of intent.",
    "He named it Spaceship Earth, then politely asked it to behave.",
    "The polyhedron, for once, listened."
  ],
  endingPalette: ['#0099ff','#c0e0ff','#ffd700','#fff'],
  render(pose, opts={}){
    const p = pose || {};
    return `<svg viewBox="-100 -180 200 280" xmlns="http://www.w3.org/2000/svg">
      <g class="g-legL" transform="translate(-15,-60) rotate(${p.legL||0})">
        <rect x="-6" y="0" width="12" height="55" fill="#aaccff" stroke="#000" stroke-width="2" />
        <line x1="0" y1="5" x2="0" y2="50" stroke="#0099ff" stroke-width="1"/>
        ${foot('#0044aa')}
      </g>
      <g class="g-legR" transform="translate(15,-60) rotate(${p.legR||0})">
        <rect x="-6" y="0" width="12" height="55" fill="#aaccff" stroke="#000" stroke-width="2" />
        <line x1="0" y1="5" x2="0" y2="50" stroke="#0099ff" stroke-width="1"/>
        ${foot('#0044aa')}
      </g>
      <g class="g-torso" transform="translate(0,-95)">
        <!-- geodesic torso -->
        <polygon points="-30,40 -38,0 -20,-20 0,-25 20,-20 38,0 30,40" fill="#c0e0ff" stroke="#000" stroke-width="2"/>
        <line x1="-30" y1="40" x2="0" y2="-25" stroke="#0099ff" stroke-width="1"/>
        <line x1="30" y1="40" x2="0" y2="-25" stroke="#0099ff" stroke-width="1"/>
        <line x1="-38" y1="0" x2="38" y2="0" stroke="#0099ff" stroke-width="1"/>
        <line x1="-20" y1="-20" x2="20" y2="-20" stroke="#0099ff" stroke-width="1"/>
        <circle cx="0" cy="0" r="6" fill="#ffd700" stroke="#000" stroke-width="1.5"/>
      </g>
      <g class="g-armL" transform="translate(-32,-90) rotate(${(p.armL||0)+10})">
        ${limbArm('#aaccff', fist('#aaccff'))}
      </g>
      <g class="g-armR" transform="translate(32,-90) rotate(${(p.armR||0)-10})">
        ${limbArm('#aaccff', fist('#aaccff'))}
      </g>
      <g class="g-head" transform="translate(0,-135) rotate(${p.head||0})">
        <!-- geodesic dome head -->
        <polygon points="-26,8 -22,-8 -10,-22 10,-22 22,-8 26,8 18,18 -18,18" fill="#c0e0ff" stroke="#000" stroke-width="2"/>
        <line x1="-26" y1="8" x2="0" y2="-22" stroke="#0099ff" stroke-width="1"/>
        <line x1="26" y1="8" x2="0" y2="-22" stroke="#0099ff" stroke-width="1"/>
        <line x1="-22" y1="-8" x2="22" y2="-8" stroke="#0099ff" stroke-width="1"/>
        <line x1="-18" y1="18" x2="18" y2="18" stroke="#0099ff" stroke-width="1"/>
        <line x1="-10" y1="-22" x2="-18" y2="18" stroke="#0099ff" stroke-width="1"/>
        <line x1="10" y1="-22" x2="18" y2="18" stroke="#0099ff" stroke-width="1"/>
        <circle cx="-7" cy="0" r="3" fill="#ffd700"/>
        <circle cx="7" cy="0" r="3" fill="#ffd700"/>
        <path d="M-5,9 L5,9" stroke="#000" stroke-width="2"/>
      </g>
    </svg>`;
  }
});

/* ============================================================
   5. VOYAGER X — Monolith Astronaut
   ============================================================ */
CHARACTERS.push({
  id: 'voyager', name: 'VOYAGER X', tag: 'My god — it\'s full of fists.',
  bio: 'Returned from the obelisk a slightly different person. Mostly the same. Mostly.',
  palette: { skin:'#ffffff', cloth:'#dddddd', accent:'#ff0033', hair:'#000' },
  stats: { power:7, speed:6, range:8, weird:9 },
  ending: [
    "Voyager X opened her helmet for the first time in nine years.",
    "Inside, where her face had been, was a small, perfect monolith.",
    "It hummed the chord that started everything.",
    "She set it on the trophy podium, bowed once, and walked off the edge of the stage,",
    "never to be seen again. Or always to be seen, depending on the angle."
  ],
  endingPalette: ['#000','#fff','#ff0033','#222'],
  render(pose, opts={}){
    const p = pose || {};
    return `<svg viewBox="-100 -180 200 280" xmlns="http://www.w3.org/2000/svg">
      <g class="g-legL" transform="translate(-13,-60) rotate(${p.legL||0})">
        <rect x="-7" y="0" width="14" height="55" rx="3" fill="#ddd" stroke="#000" stroke-width="2"/>
        <rect x="-9" y="48" width="18" height="14" rx="2" fill="#444" stroke="#000" stroke-width="2"/>
      </g>
      <g class="g-legR" transform="translate(13,-60) rotate(${p.legR||0})">
        <rect x="-7" y="0" width="14" height="55" rx="3" fill="#ddd" stroke="#000" stroke-width="2"/>
        <rect x="-9" y="48" width="18" height="14" rx="2" fill="#444" stroke="#000" stroke-width="2"/>
      </g>
      <g class="g-torso" transform="translate(0,-95)">
        <rect x="-32" y="-18" width="64" height="60" rx="6" fill="#fff" stroke="#000" stroke-width="3"/>
        <!-- chest controls -->
        <rect x="-20" y="-5" width="40" height="20" fill="#222" stroke="#000" stroke-width="1.5"/>
        <circle cx="-12" cy="5" r="3" fill="#ff0033"/>
        <circle cx="0" cy="5" r="3" fill="#ffe600"/>
        <circle cx="12" cy="5" r="3" fill="#0099ff"/>
        <rect x="-15" y="22" width="30" height="6" fill="#ff0033"/>
      </g>
      <g class="g-armL" transform="translate(-34,-90) rotate(${(p.armL||0)+10})">
        ${limbArm('#ddd', fist('#fff'))}
      </g>
      <g class="g-armR" transform="translate(34,-90) rotate(${(p.armR||0)-10})">
        <!-- monolith arm -->
        <rect x="-7" y="0" width="14" height="55" fill="#000" stroke="#000" stroke-width="2"/>
        <rect x="-10" y="50" width="20" height="22" fill="#000" stroke="#fff" stroke-width="1"/>
      </g>
      <g class="g-head" transform="translate(0,-135) rotate(${p.head||0})">
        <!-- helmet -->
        <circle cx="0" cy="0" r="25" fill="#fff" stroke="#000" stroke-width="2"/>
        <!-- visor -->
        <path d="M-20,-3 Q-20,-18 0,-18 Q20,-18 20,-3 L20,5 L-20,5 Z" fill="#000" stroke="#000" stroke-width="2"/>
        <ellipse cx="-10" cy="-8" rx="3" ry="2" fill="#ff0033" opacity="0.7"/>
        <ellipse cx="8" cy="-10" rx="2" ry="1.5" fill="#fff" opacity="0.5"/>
      </g>
    </svg>`;
  }
});

/* ============================================================
   6. TAARNA — Heavy Metal Magazine Warrior
   ============================================================ */
CHARACTERS.push({
  id: 'taarna', name: 'TAARNA', tag: 'silent. final. metal.',
  bio: 'Last of the Taarakian. Wields the obscene blade. Speaks through her bird.',
  palette: { skin:'#f8c8a8', cloth:'#cc0033', accent:'#ffe600', hair:'#fff' },
  stats: { power:9, speed:8, range:7, weird:6 },
  ending: [
    "Taarna sheathed the blade and mounted her giant bird.",
    "They flew into a sunset that was painted on a dragon's scale.",
    "The dragon was painted on a heavier sunset.",
    "She did not say a single word the entire victory tour.",
    "She didn't have to. The bird sang in airbrush."
  ],
  endingPalette: ['#cc0033','#fff','#ffe600','#000'],
  render(pose, opts={}){
    const p = pose || {};
    return `<svg viewBox="-100 -180 200 280" xmlns="http://www.w3.org/2000/svg">
      <g class="g-legL" transform="translate(-12,-60) rotate(${p.legL||0})">
        <rect x="-7" y="0" width="14" height="55" fill="#f8c8a8" stroke="#000" stroke-width="2"/>
        <rect x="-9" y="35" width="18" height="22" fill="#cc0033" stroke="#000" stroke-width="2"/>
        ${foot('#aa0022')}
      </g>
      <g class="g-legR" transform="translate(12,-60) rotate(${p.legR||0})">
        <rect x="-7" y="0" width="14" height="55" fill="#f8c8a8" stroke="#000" stroke-width="2"/>
        <rect x="-9" y="35" width="18" height="22" fill="#cc0033" stroke="#000" stroke-width="2"/>
        ${foot('#aa0022')}
      </g>
      <g class="g-torso" transform="translate(0,-95)">
        <!-- scale armor -->
        <path d="M-30,40 L-32,-15 L-15,-22 L15,-22 L32,-15 L30,40 Z" fill="#cc0033" stroke="#000" stroke-width="3"/>
        <path d="M-15,-15 L0,-10 L15,-15 L15,-5 L-15,-5 Z" fill="#ffe600" stroke="#000" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="4" fill="#ffe600"/>
        <path d="M-10,5 Q-10,15 0,18 Q10,15 10,5" fill="none" stroke="#ffe600" stroke-width="1.5"/>
      </g>
      <g class="g-armL" transform="translate(-30,-90) rotate(${(p.armL||0)+10})">
        ${limbArm('#f8c8a8', fist('#f8c8a8'))}
      </g>
      <g class="g-armR" transform="translate(30,-90) rotate(${(p.armR||0)-10})">
        ${limbArm('#f8c8a8', `<g transform="translate(0,55)">
          ${fist('#f8c8a8')}
          <!-- sword -->
          <rect x="-2" y="-50" width="4" height="50" fill="#ddd" stroke="#000" stroke-width="1"/>
          <polygon points="-2,-50 2,-50 0,-65" fill="#ddd" stroke="#000" stroke-width="1"/>
          <rect x="-8" y="-2" width="16" height="3" fill="#ffe600" stroke="#000" stroke-width="1"/>
        </g>`)}
      </g>
      <g class="g-head" transform="translate(0,-135) rotate(${p.head||0})">
        <g style="color:#f8c8a8">${face('#aa0022')}</g>
        <!-- white flowing hair -->
        <path d="M-24,-8 Q-32,10 -25,30 L-22,30 Q-15,15 -18,0 Z" fill="#fff" stroke="#000" stroke-width="2"/>
        <path d="M24,-8 Q32,10 25,30 L22,30 Q15,15 18,0 Z" fill="#fff" stroke="#000" stroke-width="2"/>
        <path d="M-22,-22 Q0,-32 22,-22 L18,-12 Q0,-18 -18,-12 Z" fill="#fff" stroke="#000" stroke-width="2"/>
        <!-- circlet -->
        <path d="M-16,-15 L0,-22 L16,-15 L12,-10 L-12,-10 Z" fill="#ffe600" stroke="#000" stroke-width="2"/>
        <circle cx="0" cy="-17" r="2.5" fill="#cc0033"/>
      </g>
    </svg>`;
  }
});

/* ============================================================
   7. ZORTH — Hookah Worm (sand-spice / Wonderland hybrid)
   ============================================================ */
CHARACTERS.push({
  id: 'zorth', name: 'ZORTH', tag: 'Whoooooo... are youuu...',
  bio: 'A 40-foot caterpillar fused with a sandworm fused with a jazz singer. Mostly torso. Mostly threat.',
  palette: { skin:'#88aa44', cloth:'#3d6628', accent:'#ffe066', hair:'#88aa44' },
  stats: { power:8, speed:4, range:9, weird:10 },
  ending: [
    "Zorth exhaled smoke shaped like every fighter he had ever swallowed.",
    "The smoke organized itself into a small parliament.",
    "The parliament voted, unanimously, to be reabsorbed.",
    "Zorth burped. The burp was a koan. The koan won every philosophy department on Earth.",
    "He has been napping since."
  ],
  endingPalette: ['#3d6628','#88aa44','#ffe066','#aa00aa'],
  render(pose, opts={}){
    const p = pose || {};
    return `<svg viewBox="-100 -180 200 280" xmlns="http://www.w3.org/2000/svg">
      <!-- worm body segments serve as legs -->
      <g class="g-legL" transform="translate(-20,-60) rotate(${p.legL||0})">
        <ellipse cx="0" cy="20" rx="20" ry="22" fill="#88aa44" stroke="#000" stroke-width="2"/>
        <ellipse cx="0" cy="48" rx="22" ry="20" fill="#669933" stroke="#000" stroke-width="2"/>
      </g>
      <g class="g-legR" transform="translate(20,-60) rotate(${p.legR||0})">
        <ellipse cx="0" cy="20" rx="20" ry="22" fill="#88aa44" stroke="#000" stroke-width="2"/>
        <ellipse cx="0" cy="48" rx="22" ry="20" fill="#669933" stroke="#000" stroke-width="2"/>
      </g>
      <g class="g-torso" transform="translate(0,-95)">
        <ellipse cx="0" cy="20" rx="40" ry="42" fill="#88aa44" stroke="#000" stroke-width="3"/>
        <ellipse cx="0" cy="20" rx="28" ry="30" fill="#669933" opacity="0.5"/>
        <circle cx="-15" cy="10" r="4" fill="#3d6628"/>
        <circle cx="15" cy="20" r="4" fill="#3d6628"/>
        <circle cx="0" cy="30" r="4" fill="#3d6628"/>
      </g>
      <g class="g-armL" transform="translate(-32,-90) rotate(${(p.armL||0)+10})">
        ${limbArm('#88aa44', fist('#88aa44'))}
      </g>
      <g class="g-armR" transform="translate(32,-90) rotate(${(p.armR||0)-10})">
        ${limbArm('#88aa44', `<g transform="translate(0,55)">
          ${fist('#88aa44')}
          <!-- hookah pipe -->
          <path d="M-2,-2 Q-15,-15 -10,-30 Q-5,-40 5,-35" stroke="#aa00aa" stroke-width="3" fill="none"/>
          <circle cx="6" cy="-37" r="6" fill="#aa00aa" stroke="#000" stroke-width="1.5"/>
          <circle cx="6" cy="-37" r="3" fill="#ff66ff" opacity="0.7"/>
        </g>`)}
      </g>
      <g class="g-head" transform="translate(0,-135) rotate(${p.head||0})">
        <ellipse cx="0" cy="0" rx="26" ry="22" fill="#88aa44" stroke="#000" stroke-width="3"/>
        <!-- 4 eyes for that worm vibe -->
        <circle cx="-12" cy="-5" r="5" fill="#fff" stroke="#000" stroke-width="1"/>
        <circle cx="12" cy="-5" r="5" fill="#fff" stroke="#000" stroke-width="1"/>
        <circle cx="-12" cy="-5" r="2.5" fill="#aa00aa"/>
        <circle cx="12" cy="-5" r="2.5" fill="#aa00aa"/>
        <circle cx="-7" cy="6" r="3" fill="#fff" stroke="#000" stroke-width="1"/>
        <circle cx="7" cy="6" r="3" fill="#fff" stroke="#000" stroke-width="1"/>
        <circle cx="-7" cy="6" r="1.2" fill="#aa00aa"/>
        <circle cx="7" cy="6" r="1.2" fill="#aa00aa"/>
        <path d="M-8,14 Q0,18 8,14" stroke="#000" stroke-width="2" fill="none"/>
        <!-- antenna -->
        <line x1="-8" y1="-22" x2="-12" y2="-32" stroke="#000" stroke-width="2"/>
        <line x1="8" y1="-22" x2="12" y2="-32" stroke="#000" stroke-width="2"/>
        <circle cx="-12" cy="-32" r="3" fill="#ffe066"/>
        <circle cx="12" cy="-32" r="3" fill="#ffe066"/>
      </g>
    </svg>`;
  }
});

/* ============================================================
   8. CHESHIRE Mk.III — Mechanical Grin Cat
   ============================================================ */
CHARACTERS.push({
  id: 'cheshire', name: 'CHESHIRE Mk.III', tag: 'we\'re all mad here.exe',
  bio: 'A mechanical grin with a cat attached. Phases between dimensions when irritated. Often irritated.',
  palette: { skin:'#cc66ff', cloth:'#ff66cc', accent:'#fff', hair:'#cc66ff' },
  stats: { power:6, speed:9, range:6, weird:10 },
  ending: [
    "Cheshire Mk.III faded out, one stripe at a time, until only the grin remained.",
    "The grin won three more tournaments before anyone noticed.",
    "Then it faded too, but the trophy was missing forever.",
    "If you find a trophy that is also a smile, congratulations.",
    "You are now Cheshire Mk.IV."
  ],
  endingPalette: ['#cc66ff','#ff66cc','#fff','#000'],
  render(pose, opts={}){
    const p = pose || {};
    return `<svg viewBox="-100 -180 200 280" xmlns="http://www.w3.org/2000/svg">
      <g class="g-legL" transform="translate(-13,-60) rotate(${p.legL||0})">
        ${limbLeg('#cc66ff', foot('#660099'))}
      </g>
      <g class="g-legR" transform="translate(13,-60) rotate(${p.legR||0})">
        ${limbLeg('#cc66ff', foot('#660099'))}
      </g>
      <g class="g-torso" transform="translate(0,-95)">
        <!-- striped body -->
        <ellipse cx="0" cy="15" rx="34" ry="38" fill="#cc66ff" stroke="#000" stroke-width="3"/>
        <path d="M-30,-5 Q-15,0 0,-5 Q15,0 30,-5 L30,5 Q15,10 0,5 Q-15,10 -30,5 Z" fill="#ff66cc"/>
        <path d="M-32,15 Q-15,20 0,15 Q15,20 32,15 L32,25 Q15,30 0,25 Q-15,30 -32,25 Z" fill="#ff66cc"/>
        <path d="M-30,35 Q-15,40 0,35 Q15,40 30,35 L30,45 Q15,50 0,45 Q-15,50 -30,45 Z" fill="#ff66cc"/>
        <!-- tail -->
        <path d="M30,30 Q60,20 65,-10 Q66,-30 50,-30" fill="none" stroke="#cc66ff" stroke-width="14" stroke-linecap="round"/>
        <path d="M30,30 Q60,20 65,-10 Q66,-30 50,-30" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round"/>
      </g>
      <g class="g-armL" transform="translate(-30,-90) rotate(${(p.armL||0)+10})">
        ${limbArm('#cc66ff', `<g transform="translate(0,55)">
          ${fist('#cc66ff')}
          <!-- claws -->
          <line x1="-6" y1="0" x2="-12" y2="-8" stroke="#fff" stroke-width="2"/>
          <line x1="0" y1="-6" x2="0" y2="-15" stroke="#fff" stroke-width="2"/>
          <line x1="6" y1="0" x2="12" y2="-8" stroke="#fff" stroke-width="2"/>
        </g>`)}
      </g>
      <g class="g-armR" transform="translate(30,-90) rotate(${(p.armR||0)-10})">
        ${limbArm('#cc66ff', `<g transform="translate(0,55)">
          ${fist('#cc66ff')}
          <line x1="-6" y1="0" x2="-12" y2="-8" stroke="#fff" stroke-width="2"/>
          <line x1="0" y1="-6" x2="0" y2="-15" stroke="#fff" stroke-width="2"/>
          <line x1="6" y1="0" x2="12" y2="-8" stroke="#fff" stroke-width="2"/>
        </g>`)}
      </g>
      <g class="g-head" transform="translate(0,-135) rotate(${p.head||0})">
        <!-- cat head -->
        <ellipse cx="0" cy="2" rx="28" ry="25" fill="#cc66ff" stroke="#000" stroke-width="3"/>
        <!-- ears -->
        <polygon points="-22,-15 -14,-32 -6,-15" fill="#cc66ff" stroke="#000" stroke-width="2"/>
        <polygon points="22,-15 14,-32 6,-15" fill="#cc66ff" stroke="#000" stroke-width="2"/>
        <polygon points="-18,-18 -14,-26 -10,-18" fill="#ff66cc"/>
        <polygon points="18,-18 14,-26 10,-18" fill="#ff66cc"/>
        <!-- eyes -->
        <ellipse cx="-10" cy="-2" rx="6" ry="7" fill="#ffe600" stroke="#000" stroke-width="1.5"/>
        <ellipse cx="10" cy="-2" rx="6" ry="7" fill="#ffe600" stroke="#000" stroke-width="1.5"/>
        <ellipse cx="-10" cy="-2" rx="1.5" ry="6" fill="#000"/>
        <ellipse cx="10" cy="-2" rx="1.5" ry="6" fill="#000"/>
        <!-- enormous grin -->
        <path d="M-22,12 Q-15,22 0,22 Q15,22 22,12 L18,16 L14,12 L10,16 L6,12 L2,16 L-2,12 L-6,16 L-10,12 L-14,16 L-18,12 Z"
              fill="#fff" stroke="#000" stroke-width="2"/>
        <!-- whiskers -->
        <line x1="-15" y1="8" x2="-30" y2="6" stroke="#000" stroke-width="1.5"/>
        <line x1="-15" y1="10" x2="-30" y2="12" stroke="#000" stroke-width="1.5"/>
        <line x1="15" y1="8" x2="30" y2="6" stroke="#000" stroke-width="1.5"/>
        <line x1="15" y1="10" x2="30" y2="12" stroke="#000" stroke-width="1.5"/>
      </g>
    </svg>`;
  }
});

/* ============================================================
   9. McKENN-X — DMT Shaman
   ============================================================ */
CHARACTERS.push({
  id: 'mckennx', name: 'McKENN-X', tag: 'Self-transforming machine elf.',
  bio: 'A snake-channeling shaman whose every breath is a hyperspace tongue. Speaks in syllables of light.',
  palette: { skin:'#88dd88', cloth:'#006633', accent:'#ffe600', hair:'#003300' },
  stats: { power:7, speed:7, range:8, weird:10 },
  ending: [
    "McKenn-X opened his mouth and from it poured a parade of tiny self-transforming elves.",
    "They bowed, then assembled themselves into the shape of the Logos.",
    "The Logos demanded a rematch. McKenn-X laughed.",
    "Reality, embarrassed, agreed to lose more politely next time.",
    "He crowned himself with snakes and went looking for the next stranger thing."
  ],
  endingPalette: ['#006633','#88dd88','#ffe600','#aa00aa'],
  render(pose, opts={}){
    const p = pose || {};
    return `<svg viewBox="-100 -180 200 280" xmlns="http://www.w3.org/2000/svg">
      <g class="g-legL" transform="translate(-13,-60) rotate(${p.legL||0})">
        ${limbLeg('#88dd88', foot('#003300'))}
      </g>
      <g class="g-legR" transform="translate(13,-60) rotate(${p.legR||0})">
        ${limbLeg('#88dd88', foot('#003300'))}
      </g>
      <g class="g-torso" transform="translate(0,-95)">
        <!-- robe -->
        <path d="M-32,40 L-36,-10 L-22,-22 L22,-22 L36,-10 L32,40 Z" fill="#006633" stroke="#000" stroke-width="3"/>
        <!-- third eye -->
        <ellipse cx="0" cy="0" rx="14" ry="10" fill="#ffe600" stroke="#000" stroke-width="2"/>
        <circle cx="0" cy="0" r="6" fill="#aa00aa"/>
        <circle cx="0" cy="0" r="2" fill="#000"/>
        <!-- snake patterns -->
        <path d="M-24,15 Q-12,20 0,15 Q12,20 24,15" stroke="#88dd88" stroke-width="2" fill="none"/>
        <path d="M-24,25 Q-12,30 0,25 Q12,30 24,25" stroke="#88dd88" stroke-width="2" fill="none"/>
      </g>
      <g class="g-armL" transform="translate(-32,-90) rotate(${(p.armL||0)+10})">
        ${limbArm('#006633', fist('#88dd88'))}
      </g>
      <g class="g-armR" transform="translate(32,-90) rotate(${(p.armR||0)-10})">
        ${limbArm('#006633', `<g transform="translate(0,55)">
          ${fist('#88dd88')}
          <!-- staff with serpent -->
          <line x1="0" y1="0" x2="0" y2="-90" stroke="#663300" stroke-width="3"/>
          <path d="M-3,-90 Q-10,-95 -8,-100 Q0,-105 6,-100 Q10,-95 3,-90" fill="#88dd88" stroke="#000" stroke-width="1.5"/>
          <circle cx="0" cy="-100" r="5" fill="#aa00aa" stroke="#000" stroke-width="1.5"/>
        </g>`)}
      </g>
      <g class="g-head" transform="translate(0,-135) rotate(${p.head||0})">
        <g style="color:#88dd88">${face('#003300', `
          <!-- third eye -->
          <ellipse cx="0" cy="-12" rx="6" ry="4" fill="#ffe600" stroke="#000" stroke-width="1.5"/>
          <circle cx="0" cy="-12" r="2" fill="#aa00aa"/>
        `)}</g>
        <!-- snakes for hair -->
        <path d="M-22,-15 Q-30,-25 -22,-32 Q-15,-28 -18,-20" fill="#003300" stroke="#000" stroke-width="1.5"/>
        <path d="M22,-15 Q30,-25 22,-32 Q15,-28 18,-20" fill="#003300" stroke="#000" stroke-width="1.5"/>
        <path d="M-12,-22 Q-18,-35 -8,-38 Q0,-32 -5,-25" fill="#003300" stroke="#000" stroke-width="1.5"/>
        <path d="M12,-22 Q18,-35 8,-38 Q0,-32 5,-25" fill="#003300" stroke="#000" stroke-width="1.5"/>
        <path d="M0,-22 Q5,-38 0,-42 Q-5,-38 0,-22" fill="#003300" stroke="#000" stroke-width="1.5"/>
      </g>
    </svg>`;
  }
});

/* ============================================================
   10. SISTER PLASMA — Quantum Nun
   ============================================================ */
CHARACTERS.push({
  id: 'plasma', name: 'SISTER PLASMA', tag: 'in collapse, all is forgiven.',
  bio: 'A nun ordained by the Holy Wave Function. Exists in superposition until she punches you.',
  palette: { skin:'#f4d6c0', cloth:'#22115a', accent:'#fff', hair:'#fff' },
  stats: { power:7, speed:6, range:9, weird:10 },
  ending: [
    "Sister Plasma observed the trophy and the trophy collapsed into a single victorious state.",
    "She blessed the audience, all 11^7 of them, in every possible universe.",
    "In one universe she lost. She prayed for that one specifically.",
    "Then she folded herself into a wave and went home.",
    "Amen, in superposition."
  ],
  endingPalette: ['#22115a','#fff','#ffd700','#cc00ff'],
  render(pose, opts={}){
    const p = pose || {};
    return `<svg viewBox="-100 -180 200 280" xmlns="http://www.w3.org/2000/svg">
      <g class="g-legL" transform="translate(-12,-60) rotate(${p.legL||0})">
        <rect x="-7" y="0" width="14" height="55" fill="#22115a" stroke="#000" stroke-width="2"/>
        ${foot('#000')}
      </g>
      <g class="g-legR" transform="translate(12,-60) rotate(${p.legR||0})">
        <rect x="-7" y="0" width="14" height="55" fill="#22115a" stroke="#000" stroke-width="2"/>
        ${foot('#000')}
      </g>
      <g class="g-torso" transform="translate(0,-95)">
        <!-- habit -->
        <path d="M-38,40 L-42,-10 L-22,-22 L22,-22 L42,-10 L38,40 Z" fill="#22115a" stroke="#000" stroke-width="3"/>
        <!-- white collar / cross -->
        <path d="M-22,-20 L0,-12 L22,-20 L22,-10 L0,-2 L-22,-10 Z" fill="#fff" stroke="#000" stroke-width="1.5"/>
        <rect x="-3" y="0" width="6" height="20" fill="#ffd700" stroke="#000" stroke-width="1"/>
        <rect x="-9" y="6" width="18" height="6" fill="#ffd700" stroke="#000" stroke-width="1"/>
      </g>
      <g class="g-armL" transform="translate(-32,-90) rotate(${(p.armL||0)+10})">
        ${limbArm('#22115a', fist('#f4d6c0'))}
      </g>
      <g class="g-armR" transform="translate(32,-90) rotate(${(p.armR||0)-10})">
        ${limbArm('#22115a', fist('#f4d6c0'))}
      </g>
      <g class="g-head" transform="translate(0,-135) rotate(${p.head||0})">
        <!-- halo of particles -->
        <circle cx="0" cy="-2" r="36" fill="none" stroke="#cc00ff" stroke-width="1" opacity="0.5"/>
        <circle cx="0" cy="-2" r="42" fill="none" stroke="#fff" stroke-width="0.5" stroke-dasharray="2,4" opacity="0.7"/>
        <circle cx="-30" cy="-15" r="1.5" fill="#ffd700"/>
        <circle cx="30" cy="-15" r="1.5" fill="#ffd700"/>
        <circle cx="-40" cy="0" r="1.5" fill="#cc00ff"/>
        <circle cx="40" cy="0" r="1.5" fill="#cc00ff"/>
        <!-- veil -->
        <path d="M-26,-12 Q-30,-22 -22,-30 L22,-30 Q30,-22 26,-12 Q26,-25 0,-25 Q-26,-25 -26,-12 Z" fill="#22115a" stroke="#000" stroke-width="2"/>
        <g style="color:#f4d6c0">${face('#22115a')}</g>
        <!-- veil sides -->
        <path d="M-26,-10 Q-30,5 -24,18" fill="#22115a" stroke="#000" stroke-width="2"/>
        <path d="M26,-10 Q30,5 24,18" fill="#22115a" stroke="#000" stroke-width="2"/>
      </g>
    </svg>`;
  }
});

/* ============================================================
   11. THE EYE — BOSS / All-Seeing Pyramid
   ============================================================ */
CHARACTERS.push({
  id: 'theeye', name: 'THE EYE', tag: 'I HAVE ALWAYS BEEN WATCHING',
  bio: 'The final boss. A pyramid with one eye and many opinions. Beat the Tournament to unlock.',
  palette: { skin:'#ffaa00', cloth:'#aa0000', accent:'#fff', hair:'#000' },
  stats: { power:10, speed:7, range:10, weird:10 },
  isBoss: true,
  ending: [
    "The Eye, defeated, became a fighter like any other.",
    "It rented a small apartment over a kebab shop.",
    "It learned to enjoy daytime television.",
    "Once a year, on the anniversary of the tournament, it weeps a single, all-knowing tear.",
    "The tear contains every secret of the cosmos. Nobody picks it up."
  ],
  endingPalette: ['#ffaa00','#aa0000','#fff','#000'],
  render(pose, opts={}){
    const p = pose || {};
    return `<svg viewBox="-120 -200 240 300" xmlns="http://www.w3.org/2000/svg">
      <g class="g-legL" transform="translate(-22,-60) rotate(${p.legL||0})">
        <rect x="-7" y="0" width="14" height="60" fill="#aa0000" stroke="#000" stroke-width="2"/>
        ${foot('#660000')}
      </g>
      <g class="g-legR" transform="translate(22,-60) rotate(${p.legR||0})">
        <rect x="-7" y="0" width="14" height="60" fill="#aa0000" stroke="#000" stroke-width="2"/>
        ${foot('#660000')}
      </g>
      <g class="g-armL" transform="translate(-50,-90) rotate(${(p.armL||0)+10})">
        ${limbArm('#aa0000', fist('#ffaa00'))}
      </g>
      <g class="g-armR" transform="translate(50,-90) rotate(${(p.armR||0)-10})">
        ${limbArm('#aa0000', fist('#ffaa00'))}
      </g>
      <g class="g-torso" transform="translate(0,-100)">
        <!-- pyramid body -->
        <polygon points="-50,40 50,40 0,-50" fill="#ffaa00" stroke="#000" stroke-width="3"/>
        <polygon points="-50,40 50,40 0,-50" fill="url(#pyramidShade)" opacity="0.4"/>
        <!-- glyphs -->
        <text x="-20" y="20" font-family="serif" font-size="10" fill="#aa0000" font-weight="bold">∴</text>
        <text x="10" y="25" font-family="serif" font-size="10" fill="#aa0000" font-weight="bold">☥</text>
        <text x="0" y="35" font-family="serif" font-size="9" fill="#aa0000" font-weight="bold">⌬</text>
      </g>
      <g class="g-head" transform="translate(0,-130) rotate(${p.head||0})">
        <!-- the all-seeing eye -->
        <ellipse cx="0" cy="0" rx="40" ry="26" fill="#fff" stroke="#000" stroke-width="3"/>
        <radialGradient id="eyeBoss" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff"/>
          <stop offset="40%" stop-color="#ff00ff"/>
          <stop offset="80%" stop-color="#aa0000"/>
          <stop offset="100%" stop-color="#000"/>
        </radialGradient>
        <circle cx="0" cy="0" r="22" fill="url(#eyeBoss)"/>
        <circle cx="0" cy="0" r="10" fill="#000"/>
        <circle cx="-3" cy="-3" r="3" fill="#fff" opacity="0.9"/>
        <!-- rays -->
        <g opacity="0.6">
          <line x1="-50" y1="-15" x2="-65" y2="-25" stroke="#ffe600" stroke-width="2"/>
          <line x1="-55" y1="0" x2="-72" y2="0" stroke="#ffe600" stroke-width="2"/>
          <line x1="-50" y1="15" x2="-65" y2="25" stroke="#ffe600" stroke-width="2"/>
          <line x1="50" y1="-15" x2="65" y2="-25" stroke="#ffe600" stroke-width="2"/>
          <line x1="55" y1="0" x2="72" y2="0" stroke="#ffe600" stroke-width="2"/>
          <line x1="50" y1="15" x2="65" y2="25" stroke="#ffe600" stroke-width="2"/>
          <line x1="0" y1="-26" x2="0" y2="-44" stroke="#ffe600" stroke-width="2"/>
        </g>
      </g>
      <defs>
        <linearGradient id="pyramidShade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#000" stop-opacity="0.5"/>
          <stop offset="50%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.5"/>
        </linearGradient>
      </defs>
    </svg>`;
  }
});

/* ============================================================
   POSE PRESETS — applied as transforms to body part groups
   ============================================================ */
const POSES = {
  idle:    { armL: 0,   armR: 0,   legL: 0,   legR: 0,   head: 0 },
  walk:    { armL: 25,  armR: -25, legL: 15,  legR: -15, head: 0 },
  walkAlt: { armL: -25, armR: 25,  legL: -15, legR: 15,  head: 0 },
  jump:    { armL: 60,  armR: -60, legL: -30, legR: 30,  head: -5 },
  crouch:  { armL: 30,  armR: -30, legL: 60,  legR: -60, head: 5 },
  block:   { armL: -80, armR: 80,  legL: 5,   legR: -5,  head: 0 },
  punch:   { armL: 0,   armR: -110,legL: 0,   legR: 0,   head: 0 },
  punchL:  { armL: 110, armR: 0,   legL: 0,   legR: 0,   head: 0 },
  kick:    { armL: 30,  armR: -30, legL: 0,   legR: -100,head: 0 },
  hit:     { armL: -40, armR: 40,  legL: -10, legR: 10,  head: -15 },
  ko:      { armL: -90, armR: 90,  legL: -90, legR: 90,  head: -90, prone: true },
  special: { armL: -120,armR: 120, legL: -10, legR: 10,  head: 0 },
  win:     { armL: -90, armR: 90,  legL: 0,   legR: 0,   head: 0 },
  lose:    { armL: 60,  armR: -60, legL: 30,  legR: -30, head: 30 }
};

/* Find character by id */
function getChar(id){ return CHARACTERS.find(c => c.id === id); }
