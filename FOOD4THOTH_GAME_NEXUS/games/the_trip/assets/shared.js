/* =========================================================================
   THE TRIP — shared state + helpers
   Every hub page includes this. Handles persistent dreamer state via
   localStorage, navigation, and atmospheric effects.
   ========================================================================= */

const TRIP = (function(){
  // --- safe deep clone: works even where structuredClone is unavailable ---
  function clone(o){
    try { if (typeof structuredClone === 'function') return structuredClone(o); }
    catch(_){}
    try { return JSON.parse(JSON.stringify(o)); }
    catch(_){ return Object.assign({}, o); }
  }

  // --- detect if localStorage is actually usable (Safari private mode, file://, etc) ---
  let LS_OK = false;
  try {
    if (typeof localStorage !== 'undefined') {
      const k = '__trip_probe__';
      localStorage.setItem(k, '1');
      localStorage.removeItem(k);
      LS_OK = true;
    }
  } catch(_){ LS_OK = false; }

  // --- in-memory fallback so TRIP still works even without localStorage ---
  const memStore = {};

  try {

  const KEY = 'dream.state.v1';

  const DEFAULT_STATE = {
    version: 1,
    started: null,            // ISO timestamp first run
    name: '',                 // dreamer name
    avatar: '',               // single emoji
    tonic: '',                // 'blue' | 'red' | 'yellow'
    threads: 0,               // meta-currency (persistent dream residue)
    lucidity: 50,             // 0..100 - clarity
    paranoia: 20,             // 0..100 - dread
    days: 0,                  // arbitrary time units
    visited: {},              // portal key -> true
    completed: {              // big milestones
      prologue:false, character:false,
      oracle:false, tea:false, codex:false,
      whimsy:false, doom:false, spiral:false
    },
    codex: [],                // unlocked lore entry ids
    flags: {},                // arbitrary story flags
    // a few one-shot events for flavour
    lastVisit: null,
    visitCount: 0
  };

  function load() {
    try {
      const raw = LS_OK ? localStorage.getItem(KEY) : memStore[KEY];
      if (!raw) return clone(DEFAULT_STATE);
      const obj = JSON.parse(raw);
      // shallow-merge defaults so new fields fill in
      return Object.assign(clone(DEFAULT_STATE), obj, {
        completed: Object.assign({}, DEFAULT_STATE.completed, obj.completed||{}),
        visited: Object.assign({}, DEFAULT_STATE.visited, obj.visited||{}),
        flags: Object.assign({}, DEFAULT_STATE.flags, obj.flags||{})
      });
    } catch(e) {
      console.warn('TRIP: state reset', e);
      return clone(DEFAULT_STATE);
    }
  }
  function save(s) {
    try {
      const str = JSON.stringify(s);
      if (LS_OK) localStorage.setItem(KEY, str);
      else memStore[KEY] = str;
    } catch(e) { console.warn('TRIP: cannot save', e); }
  }
  function reset() {
    try {
      if (LS_OK) localStorage.removeItem(KEY);
      else delete memStore[KEY];
    } catch(_){}
  }

  const state = load();

  // clamp helper
  const clamp = (v, lo=0, hi=100) => Math.max(lo, Math.min(hi, v));

  // change a stat & save
  function adjust(key, delta) {
    if (typeof state[key] === 'number') {
      if (key === 'lucidity' || key === 'paranoia') state[key] = clamp(state[key] + delta);
      else state[key] = state[key] + delta;
      save(state);
    }
  }
  function set(key, val) { state[key] = val; save(state); }
  function flag(key, val=true) { state.flags[key] = val; save(state); }
  function complete(key) { state.completed[key] = true; save(state); }
  function visit(key) { state.visited[key] = true; state.lastVisit = key; state.visitCount++; save(state); }
  function unlockCodex(id) {
    if (!state.codex.includes(id)) { state.codex.push(id); save(state); return true; }
    return false;
  }

  // portal definitions — source of truth for menu + nav
  const PORTALS = [
    { key:'prologue', name:'THE PAPER SQUARE',   icon:'◉',  desc:'How the trip began.',           href:'prologue.html',   variant:'v-purple', always:true },
    { key:'character',name:'THE DREAMER',        icon:'👁', desc:'Name yourself before the dream does.', href:'character.html', variant:'v-yellow', always:true },
    { key:'map',      name:'THE MAP',            icon:'🗺', desc:'Eight boroughs of a broken Wonderland.', href:'map.html', variant:'v-teal', always:true },
    { key:'oracle',   name:'THE CATERPILLAR',    icon:'🐛', desc:'Answer three questions. Get smoke.',     href:'oracle.html', variant:'v-lime' },
    { key:'tea',      name:'THE TEA PARTY',      icon:'🫖', desc:'It is always six. Drink in order.',       href:'tea-party.html', variant:'v-pink' },
    { key:'whimsy',   name:'WHIMSY WARS',        icon:'💼', desc:'Thirty dreams to pay the beast.',         href:'games/whimsy-wars.html', variant:'v-blood' },
    { key:'doom',     name:'WONDER / DOOM',      icon:'🔫', desc:'Find the throbbing door.',                href:'games/wonder-doom.html', variant:'v-pink' },
    { key:'spiral',   name:'THE NEON SPIRAL',    icon:'🌀', desc:'Descend into the serpent\'s eye.',         href:'games/neon-spiral.html', variant:'v-teal' },
    { key:'codex',    name:'THE CODEX',          icon:'📖', desc:'Catalog of things that saw you first.',   href:'codex.html', variant:'v-lime', always:true },
    { key:'ending',   name:'THE THROBBING DOOR', icon:'🚪', desc:'Only when both dreams end.',              href:'ending.html', variant:'v-yellow' }
  ];

  // codex entries unlocked progressively
  const CODEX = [
    { id:'jabberwock', title:'THE JABBERWOCK', sub:'LOAN SHARK OF THE TULGEY',
      body:'Slithy and toving, the Jabberwock writes contracts in your own blood. Each claw a compound-interest clause. Will not be outrun. Will not be placated. Will, occasionally, accept payment in Geodesic Gems.' },
    { id:'cheshire', title:'THE CHESHIRE', sub:'A GRIN WITH CITIZENSHIP',
      body:'A smile loose from its cat. Trafficked in Whoville for its reputed effect: briefly, everyone who sees it remembers being happy. Evaporates in direct sunlight. Non-refundable.' },
    { id:'caterpillar', title:'THE CATERPILLAR', sub:'THE ORACLE OF SMOKE',
      body:'Perches atop a mushroom of ambiguous legality. Asks three questions. Answers with three more. Dispenses Caterpillar Smoke, which is mildly prophetic and, on Tuesdays, conversational.' },
    { id:'mad-hatter', title:'THE MAD HATTER', sub:'HOST OF THE SIX OCLOCK',
      body:'Tea is served in a chapel of clocks all set to 6. Arrive, drink in the correct sequence, and receive a tincture that lets you shoot the dark in the face. Get it wrong and the chairs rearrange around you.' },
    { id:'red-queen', title:'THE RED QUEEN', sub:'EMPRESS OF THE CHESSBOARD',
      body:'Her tears are weaponized sorrow. One drop has started three revolutions and a minor divorce. Collected in little teal phials by her Card Soldiers, who sell them to tourists. Avoid her during odd turns, when the board moves.' },
    { id:'bucky', title:'R. BUCKMINSTER VULTURE', sub:'DOME ARCHITECT, DREAM SPECIES',
      body:'Keeps a Geodesic Dome in an abandoned quadrant. The triangles are load-bearing for reality itself. Will trade gems for blueprints. Has exactly one opinion, delivered in fifteen voices.' },
    { id:'bat', title:'BAT COUNTRY ESSENCE', sub:'BOTTLED DREAD',
      body:'Corked in Nevada during a long drive. One sip and the road behind you grows teeth. Two sips and you become a weapons journalist. Three sips is illegal in Whoville.' },
    { id:'neon-serpent', title:'THE NEON SERPENT', sub:'THE SPIRAL BELOW',
      body:'It has no face but knows yours. It coils under every dreamscape. To walk the Spiral is to be held in the coil for as long as the coil will have you. You cannot lose there, only leave.' },
    { id:'throbbing-door', title:'THE THROBBING DOOR', sub:'EXIT, HYPOTHETICALLY',
      body:'Hidden deep in the Wonder/Doom maze. Pulses in time with your heartbeat, which is not, at this point, entirely yours. Opens only for dreamers who have cleared their debts and their inventories.' },
    { id:'teapot', title:'THE DORMOUSE TEAPOT', sub:'BANK, SOMNAMBULENT',
      body:'Your money sleeps inside. Wakes to hum at 8% nightly interest. Never quite pours back exactly what you deposited, but the difference is philosophical.' },
    { id:'card-soldiers', title:'CARD SOLDIERS', sub:'THE QUEEN\'S PAYROLL',
      body:'Face-cards in shatter-proof tunics. Appear exactly when you\'re holding something you shouldn\'t be. Negotiable with Red Queen\'s Tears, a vorpal blade, or an airtight alibi.' }
  ];

  // toast
  function toast(msg, ms=2200) {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), ms);
  }

  // atmosphere: inject bg layers + floaters + vignette
  function mountAtmosphere(opts={}) {
    const frag = document.createDocumentFragment();
    if (!document.querySelector('.trip-bg'))  frag.appendChild(Object.assign(document.createElement('div'), {className:'trip-bg'}));
    if (!document.querySelector('.noise'))    frag.appendChild(Object.assign(document.createElement('div'), {className:'noise'}));
    if (!document.querySelector('.scanlines'))frag.appendChild(Object.assign(document.createElement('div'), {className:'scanlines'}));
    if (!document.querySelector('.vignette')) frag.appendChild(Object.assign(document.createElement('div'), {className:'vignette'}));
    document.body.prepend(frag);

    // floating glyphs
    if (!document.querySelector('.floaters') && opts.floaters !== false) {
      const host = document.createElement('div');
      host.className = 'floaters';
      const glyphs = [
        {c:'eye',g:'👁'}, {c:'dome',g:'⛶'}, {c:'rose',g:'✾'},
        {c:'bat',g:'☾'}, {c:'mush',g:'❦'}, {c:'eye',g:'◉'},
        {c:'dome',g:'⬡'}, {c:'rose',g:'✿'}, {c:'bat',g:'𖦹'},
        {c:'mush',g:'❋'}, {c:'spiral',g:'🌀'}, {c:'eye',g:'☥'}
      ];
      const n = opts.floaterCount ?? 14;
      for (let i=0; i<n; i++) {
        const g = glyphs[i % glyphs.length];
        const el = document.createElement('div');
        el.className = 'floater ' + g.c;
        el.textContent = g.g;
        el.style.left = (Math.random()*100) + '%';
        el.style.top = (Math.random()*100) + '%';
        el.style.animationDuration = (30 + Math.random()*40) + 's';
        el.style.animationDelay = (-Math.random()*40) + 's';
        el.style.fontSize = (30 + Math.random()*70) + 'px';
        host.appendChild(el);
      }
      document.body.appendChild(host);
    }
  }

  // inject persistent HUD at top of page (unless already there)
  function mountHUD(opts={}) {
    if (document.getElementById('tripHud')) return;
    const s = state;
    const hud = document.createElement('div');
    hud.className = 'hud'; hud.id = 'tripHud';
    const lu = clamp(s.lucidity);
    const pa = clamp(s.paranoia);
    hud.innerHTML = `
      <div class="stat">
        <div class="lbl">Dreamer</div>
        <div class="val" style="font-size:18px">${s.avatar || '◯'} ${escapeHtml(s.name || 'Nameless')}</div>
      </div>
      <div class="stat acid">
        <div class="lbl">Threads</div>
        <div class="val">${s.threads.toLocaleString()}</div>
      </div>
      <div class="stat" style="color:var(--neon-cyan)">
        <div class="lbl">Lucidity</div>
        <div class="val">${lu}</div>
        <div class="hud-bar" style="color:var(--neon-cyan)"><i style="width:${lu}%"></i></div>
      </div>
      <div class="stat blood">
        <div class="lbl">Paranoia</div>
        <div class="val">${pa}</div>
        <div class="hud-bar" style="color:var(--blood)"><i style="width:${pa}%"></i></div>
      </div>
      <div class="stat pink">
        <div class="lbl">Days</div>
        <div class="val">${s.days}</div>
      </div>
    `;
    document.body.prepend(hud);
  }

  function mountTopNav(active='') {
    if (document.getElementById('tripNav')) return;
    const nav = document.createElement('nav');
    nav.className = 'topnav'; nav.id = 'tripNav';
    nav.innerHTML = `
      <a href="index.html" class="home"${active==='hub'?' style="color:var(--neon-yellow);background:rgba(255,230,0,.1);border-color:var(--neon-yellow)"':''}>◉ HUB</a>
      <a href="character.html"${active==='character'?' style="color:var(--cream)"':''}>▷ DREAMER</a>
      <a href="map.html"${active==='map'?' style="color:var(--cream)"':''}>▷ MAP</a>
      <a href="oracle.html"${active==='oracle'?' style="color:var(--cream)"':''}>▷ CATERPILLAR</a>
      <a href="tea-party.html"${active==='tea'?' style="color:var(--cream)"':''}>▷ TEA</a>
      <a href="codex.html"${active==='codex'?' style="color:var(--cream)"':''}>▷ CODEX</a>
    `;
    // insert after HUD if present else at top
    const hud = document.getElementById('tripHud');
    if (hud) hud.after(nav); else document.body.prepend(nav);
  }

  function mountHomeButton(label='◉ HUB') {
    if (document.getElementById('tripHomeBtn')) return;
    const a = document.createElement('a');
    a.id = 'tripHomeBtn';
    a.className = 'home-btn';
    a.href = 'index.html';
    a.textContent = label;
    document.body.appendChild(a);
  }

  // utility: escape HTML
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  // simple typewriter
  function typewrite(el, text, opts={}) {
    return new Promise(resolve => {
      const speed = opts.speed ?? 28;
      const caret = opts.caret !== false;
      el.textContent = '';
      const caretEl = caret ? Object.assign(document.createElement('span'),{className:'caret',textContent:' '}) : null;
      if (caretEl) el.appendChild(caretEl);
      let i = 0;
      const step = () => {
        if (i >= text.length) { if (caretEl) caretEl.remove(); resolve(); return; }
        const ch = text[i++];
        const node = document.createTextNode(ch);
        if (caretEl) el.insertBefore(node, caretEl); else el.appendChild(node);
        const delay = /[.!?]/.test(ch) ? speed*8 : /[,;]/.test(ch) ? speed*4 : speed;
        setTimeout(step, delay);
      };
      step();
    });
  }

  // public API
  return {
    get state(){ return state; },
    save: () => save(state),
    reset,
    adjust, set, flag, complete, visit, unlockCodex,
    PORTALS, CODEX,
    toast,
    mountAtmosphere, mountHUD, mountTopNav, mountHomeButton,
    escapeHtml, typewrite
  };

  } catch(initErr) {
    // Absolute last-resort safety net: if anything above threw during init,
    // return a no-op TRIP object so every page still loads and displays.
    console.error('TRIP init failed — running in safe mode:', initErr);
    const noop = function(){};
    const noopStub = {
      version:1, name:'', avatar:'', tonic:'', threads:0, lucidity:50, paranoia:20,
      days:0, visited:{}, completed:{}, codex:[], flags:{}, visitCount:0
    };
    return {
      get state(){ return noopStub; },
      save: noop, reset: noop,
      adjust: noop, set: noop, flag: noop, complete: noop, visit: noop,
      unlockCodex: ()=>false,
      PORTALS: [], CODEX: [],
      toast: noop,
      mountAtmosphere: noop, mountHUD: noop, mountTopNav: noop, mountHomeButton: noop,
      escapeHtml: s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
      typewrite: (el, text) => { try { el.textContent = text; } catch(_){} return Promise.resolve(); }
    };
  }
})();

// Global safety net: log full error details so "Script error." can't mask them
if (typeof window !== 'undefined') {
  window.addEventListener('error', function(ev){
    try {
      console.error('[TRIP] window error:',
        ev.message, 'at', ev.filename + ':' + ev.lineno + ':' + ev.colno,
        ev.error && ev.error.stack ? '\n' + ev.error.stack : '');
    } catch(_){}
  });
  window.addEventListener('unhandledrejection', function(ev){
    try { console.error('[TRIP] unhandled promise rejection:', ev.reason); } catch(_){}
  });
}
