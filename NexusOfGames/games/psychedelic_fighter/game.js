/* ============================================================
   BAD TRIP COMBAT — Game Engine
   State machine + fight loop + AI + tournament
   ============================================================ */

(function(){

  /* =========================================================
     GLOBAL STATE
     ========================================================= */
  const State = {
    mode: null,          // 'tournament' | 'vscpu' | 'vsp2'
    p1Char: null,        // character id
    p2Char: null,
    stageId: null,
    selectingFor: 'p1',  // current select target
    bossUnlocked: false,
    tournamentBracket: [], // array of {oppId, stageId, done, won}
    tournamentIndex: 0,
    musicReady: false,
    audioOn: true
  };

  /* persistence */
  function loadUnlock(){
    try{ State.bossUnlocked = localStorage.getItem('btc.bossUnlocked')==='1'; }catch(e){}
  }
  function saveUnlock(){
    try{ localStorage.setItem('btc.bossUnlocked','1'); }catch(e){}
  }
  loadUnlock();

  /* =========================================================
     SCREEN MANAGER
     ========================================================= */
  function showScreen(id){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    const el = document.getElementById('screen-'+id);
    if(el) el.classList.add('active');
    // touch pad only during fight
    const tp = document.getElementById('touch-pad');
    if(tp){
      if(id === 'fight'){
        tp.style.display = '';
        // P2 side only visible in vsp2 mode
        if(State.mode === 'vsp2') tp.classList.remove('p1only');
        else tp.classList.add('p1only');
      } else {
        tp.style.display = 'none';
      }
    }
    // body class for orient prompt
    if(id === 'fight') document.body.classList.add('in-fight');
    else document.body.classList.remove('in-fight');
    // release any held touch-keys when leaving fight
    if(id !== 'fight'){
      touchKeys && touchKeys.forEach && touchKeys.forEach((set, tid)=> clearTouchKeys(tid));
      // also clear any sticky keyboard codes
      Object.keys(keyState).forEach(k=> keyState[k] = false);
      document.querySelectorAll('.tbtn.held').forEach(b=> b.classList.remove('held'));
    }
  }

  /* =========================================================
     AUDIO INIT (must be on user gesture)
     ========================================================= */
  async function ensureAudio(){
    if(State.musicReady) return;
    if(typeof Music !== 'undefined' && Music.init){
      try{ await Music.init(); State.musicReady = true; }catch(e){ console.warn('audio init failed', e); }
    }
  }

  /* =========================================================
     BOOT MENU
     ========================================================= */
  function initBootMenu(){
    document.querySelectorAll('#screen-boot .menu-btn').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        await ensureAudio();
        const mode = btn.dataset.mode;
        if(mode==='howto'){
          showScreen('howto');
        } else {
          State.mode = mode;
          State.p1Char = null;
          State.p2Char = null;
          State.stageId = null;
          State.selectingFor = 'p1';
          buildRoster();
          showScreen('select');
          updateSelectHeader();
        }
        Music.sfx && Music.sfx('confirm');
      });
    });

    document.getElementById('howto-back').addEventListener('click', ()=>{
      showScreen('boot');
    });
  }

  /* =========================================================
     CHARACTER SELECT
     ========================================================= */
  function buildRoster(){
    const r = document.getElementById('roster');
    r.innerHTML = '';
    CHARACTERS.forEach(c=>{
      const cell = document.createElement('div');
      cell.className = 'roster-cell';
      cell.dataset.id = c.id;
      if(c.isBoss && !State.bossUnlocked){
        cell.classList.add('locked');
      }
      cell.innerHTML = `
        ${c.render(POSES.idle, {scale: 0.8})}
        <div class="roster-name">${c.name}</div>
      `;
      cell.addEventListener('mouseenter', ()=> previewChar(c.id));
      cell.addEventListener('click', ()=>{
        if(cell.classList.contains('locked')){ Music.sfx && Music.sfx('hit'); return; }
        previewChar(c.id);
        document.querySelectorAll('.roster-cell').forEach(x=>x.classList.remove('selected'));
        cell.classList.add('selected');
        document.getElementById('select-confirm').disabled = false;
        Music.sfx && Music.sfx('select');
      });
      r.appendChild(cell);
    });
    if(CHARACTERS[0]) previewChar(CHARACTERS[0].id);
    document.getElementById('select-confirm').disabled = true;
  }

  function previewChar(id){
    const c = getChar(id); if(!c) return;
    document.getElementById('detail-portrait').innerHTML = c.render(POSES.idle, {scale: 1.1});
    document.getElementById('detail-name').textContent = c.name;
    document.getElementById('detail-tag').textContent = c.tag;
    document.getElementById('detail-bio').textContent = c.bio;
    const stats = c.stats || {power:50,speed:50,range:50,weird:50};
    const bar = (lbl,v)=> `<div class="stat"><span>${lbl}</span><div class="stat-bar"><span style="width:${v}%"></span></div></div>`;
    document.getElementById('detail-stats').innerHTML =
      bar('PWR', stats.power)+bar('SPD', stats.speed)+bar('RNG', stats.range)+bar('WTF', stats.weird);
  }

  function updateSelectHeader(){
    const sub = document.getElementById('select-sub');
    if(State.mode==='vsp2' && State.selectingFor==='p2'){
      sub.textContent = 'Player 2, choose your nightmare.';
    } else {
      sub.textContent = 'Player 1, pick your poison.';
    }
  }

  function initSelect(){
    document.getElementById('select-back').addEventListener('click', ()=>{
      if(State.selectingFor==='p2'){
        // back to p1 select
        State.selectingFor = 'p1';
        State.p1Char = null;
        buildRoster();
        updateSelectHeader();
      } else {
        showScreen('boot');
      }
    });

    document.getElementById('select-confirm').addEventListener('click', ()=>{
      const sel = document.querySelector('.roster-cell.selected');
      if(!sel) return;
      const id = sel.dataset.id;

      if(State.mode==='vsp2' && State.selectingFor==='p1'){
        State.p1Char = id;
        State.selectingFor = 'p2';
        buildRoster();
        updateSelectHeader();
        return;
      }

      if(State.mode==='vsp2'){
        State.p2Char = id;
      } else {
        State.p1Char = id;
        // CPU picks random opponent (not boss for non-tournament)
        if(State.mode==='vscpu'){
          const pool = CHARACTERS.filter(c=> c.id !== id && !c.isBoss);
          State.p2Char = pool[Math.floor(Math.random()*pool.length)].id;
        }
      }

      Music.sfx && Music.sfx('confirm');

      if(State.mode==='tournament'){
        buildTournamentBracket();
        showScreen('bracket');
        renderBracket();
      } else {
        buildStageGrid();
        showScreen('stage');
      }
    });
  }

  /* =========================================================
     TOURNAMENT BRACKET
     ========================================================= */
  function buildTournamentBracket(){
    const pool = CHARACTERS.filter(c=> c.id !== State.p1Char && !c.isBoss);
    // shuffle
    for(let i=pool.length-1; i>0; i--){
      const j = Math.floor(Math.random()*(i+1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const stagePool = STAGES.filter(s=> !s.boss);
    State.tournamentBracket = [];
    // 10 fights
    for(let i=0; i<10; i++){
      const opp = pool[i % pool.length];
      const stg = stagePool[i % stagePool.length];
      State.tournamentBracket.push({
        oppId: opp.id,
        stageId: stg.id,
        done: false,
        won: false,
        boss: false
      });
    }
    // boss
    State.tournamentBracket.push({
      oppId: 'theeye',
      stageId: 'pyramid',
      done: false,
      won: false,
      boss: true
    });
    State.tournamentIndex = 0;
  }

  function renderBracket(){
    const wrap = document.getElementById('bracket');
    wrap.innerHTML = '';
    State.tournamentBracket.forEach((b, idx)=>{
      const c = getChar(b.oppId);
      const cls = ['bracket-fight'];
      if(b.done) cls.push('done');
      if(idx === State.tournamentIndex) cls.push('current');
      if(b.boss) cls.push('boss');
      const div = document.createElement('div');
      div.className = cls.join(' ');
      div.innerHTML = `
        <div class="num">${b.boss ? 'BOSS' : ('FIGHT '+(idx+1))}</div>
        <div class="opp-icon">${c.render(POSES.idle, {scale:0.7})}</div>
        <div class="opp-name">${c.name}</div>
      `;
      wrap.appendChild(div);
    });

    const info = document.getElementById('bracket-info');
    if(State.tournamentIndex >= State.tournamentBracket.length){
      info.textContent = '★ CHAMPION ★';
    } else {
      const cur = State.tournamentBracket[State.tournamentIndex];
      const nxt = getChar(cur.oppId);
      info.textContent = cur.boss
        ? `FACE THE ALL-SEEING EYE — ${getStage(cur.stageId).name}`
        : `Next: ${nxt.name} @ ${getStage(cur.stageId).name}`;
    }
  }

  function initBracket(){
    document.getElementById('bracket-next').addEventListener('click', ()=>{
      if(State.tournamentIndex >= State.tournamentBracket.length){
        // already champion — go to ending
        showEnding(State.p1Char);
        return;
      }
      const cur = State.tournamentBracket[State.tournamentIndex];
      State.p2Char = cur.oppId;
      State.stageId = cur.stageId;
      startVSSplash();
      Music.sfx && Music.sfx('confirm');
    });
  }

  /* =========================================================
     STAGE SELECT (non-tournament)
     ========================================================= */
  function buildStageGrid(){
    const g = document.getElementById('stage-grid');
    g.innerHTML = '';
    STAGES.filter(s=> !s.boss || State.bossUnlocked).forEach(s=>{
      const cell = document.createElement('div');
      cell.className = 'stage-cell';
      cell.dataset.id = s.id;
      cell.innerHTML = s.render() + `<div class="stage-name">${s.name}</div>`;
      cell.addEventListener('click', ()=>{
        State.stageId = s.id;
        Music.sfx && Music.sfx('confirm');
        startVSSplash();
      });
      g.appendChild(cell);
    });
  }

  function initStage(){
    document.getElementById('stage-back').addEventListener('click', ()=>{
      if(State.mode==='vsp2'){
        State.selectingFor = 'p2';
      } else {
        State.selectingFor = 'p1';
      }
      buildRoster();
      showScreen('select');
      updateSelectHeader();
    });
    document.getElementById('stage-random').addEventListener('click', ()=>{
      const pool = STAGES.filter(s=> !s.boss || State.bossUnlocked);
      const s = pool[Math.floor(Math.random()*pool.length)];
      State.stageId = s.id;
      Music.sfx && Music.sfx('confirm');
      startVSSplash();
    });
  }

  /* =========================================================
     VS SPLASH
     ========================================================= */
  function startVSSplash(){
    const p1 = getChar(State.p1Char);
    const p2 = getChar(State.p2Char);
    document.getElementById('vs-p1').innerHTML = p1.render(POSES.win, {scale:1.1});
    document.getElementById('vs-p2').innerHTML = p2.render(POSES.win, {scale:1.1});
    // mirror p2 in vs splash
    const vs2 = document.getElementById('vs-p2');
    vs2.style.transform = 'scaleX(-1)';
    document.getElementById('vs-p1-name').textContent = p1.name;
    document.getElementById('vs-p2-name').textContent = p2.name;
    document.getElementById('vs-round').textContent =
      State.mode==='tournament'
        ? (State.tournamentBracket[State.tournamentIndex].boss ? 'FINAL — THE EYE' : `FIGHT ${State.tournamentIndex+1} OF 10`)
        : 'ROUND 1';

    showScreen('vs');
    setTimeout(()=> startFight(), 1900);
  }

  /* =========================================================
     FIGHT ENGINE
     ========================================================= */

  // Fight constants
  const STAGE_W = 1280;          // virtual world width
  const STAGE_H = 720;
  const GROUND_Y = STAGE_H - 60;
  const GRAVITY = 0.85;
  const MOVE_SPEED = 4.2;
  const JUMP_VEL = -16;
  const FIGHTER_W = 200;
  const FIGHTER_H = 280;
  const ATTACK_RANGE = 180;
  const PUNCH_RANGE = 150;
  const KICK_RANGE = 180;

  let Fight = null;
  let rafId = null;
  let stageEl = null;
  let scaleFactor = 1;

  function makeFighter(charId, pno){
    const c = getChar(charId);
    return {
      pno: pno,
      charId,
      char: c,
      x: pno===1 ? 280 : STAGE_W - 280,
      y: GROUND_Y,
      vx: 0,
      vy: 0,
      facing: pno===1 ? 1 : -1,
      hp: 100,
      meter: 0,
      blocking: false,
      crouching: false,
      onGround: true,
      pose: 'idle',
      poseTime: 0,
      attackType: null,        // 'punch'|'kick'|'special'
      attackTimer: 0,           // counts down
      attackHit: false,
      hitStun: 0,
      blockStun: 0,
      koed: false,
      walkPhase: 0,
      el: null,
      rounds: 0,
      input: { left:false,right:false,up:false,down:false,p:false,k:false,s:false },
      lastAttacks: { p:0,k:0,s:0,jump:0 }
    };
  }

  function startFight(){
    showScreen('fight');
    setupStage();
    Fight = {
      p1: makeFighter(State.p1Char, 1),
      p2: makeFighter(State.p2Char, 2),
      round: 1,
      timer: 60,
      lastTick: performance.now(),
      timerLast: performance.now(),
      paused: false,
      ended: false,
      shake: 0,
      announceQueue: [],
      announcer: '',
      announcerTimer: 0,
      finishMode: false
    };
    Fight.p1.facing = 1;
    Fight.p2.facing = -1;

    spawnFighters();
    updateHUD();

    // music for stage
    if(Music && Music.play){
      const stg = getStage(State.stageId);
      Music.play(stg.music || State.stageId);
    }

    // tournament label
    const tlabel = document.getElementById('hud-tournament');
    if(State.mode==='tournament'){
      const cur = State.tournamentBracket[State.tournamentIndex];
      tlabel.textContent = cur.boss ? 'FINAL · THE EYE' : `TOURNAMENT  ${State.tournamentIndex+1}/10`;
    } else {
      tlabel.textContent = State.mode==='vsp2' ? 'P1 vs P2' : 'P1 vs CPU';
    }

    queueAnnouncer(`ROUND ${Fight.round}`, 1100);
    setTimeout(()=> queueAnnouncer('FIGHT!', 800), 900);

    // start RAF
    if(rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
  }

  function setupStage(){
    stageEl = document.getElementById('stage');
    stageEl.innerHTML = '';
    // Background
    const stg = getStage(State.stageId);
    const bgWrap = document.createElement('div');
    bgWrap.style.position='absolute'; bgWrap.style.inset='0';
    bgWrap.innerHTML = stg.render();
    const svg = bgWrap.querySelector('svg');
    if(svg){ svg.classList.add('bg'); svg.removeAttribute('width'); svg.removeAttribute('height'); }
    stageEl.appendChild(bgWrap);

    // World (foreground container) — set virtual size immediately so fighters render correctly
    // even before the scale is calculated.
    const world = document.createElement('div');
    world.id = 'world';
    world.style.cssText = `position:absolute; left:0; top:0; width:${STAGE_W}px; height:${STAGE_H}px; transform-origin: 0 0;`;
    stageEl.appendChild(world);

    // Calculate scale from stage size. iOS Safari sometimes lays out late after
    // a display:none -> flex transition, so retry until we get nonzero dimensions.
    const applyScale = ()=>{
      const r = stageEl.getBoundingClientRect();
      if(r.width < 10 || r.height < 10) return false;
      scaleFactor = Math.min(r.width/STAGE_W, r.height/STAGE_H);
      const sw = STAGE_W * scaleFactor;
      const sh = STAGE_H * scaleFactor;
      world.style.transform =
        `translate(${(r.width-sw)/2}px, ${(r.height-sh)/2}px) scale(${scaleFactor})`;
      return true;
    };
    if(!applyScale()){
      let tries = 0;
      const tick = ()=>{
        if(applyScale() || ++tries > 30) return;
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }

  function spawnFighters(){
    const world = document.getElementById('world');
    [Fight.p1, Fight.p2].forEach(f=>{
      const el = document.createElement('div');
      el.className = 'fighter';
      el.style.left = (f.x - FIGHTER_W/2) + 'px';
      el.style.bottom = (STAGE_H - f.y) + 'px';
      el.innerHTML = f.char.render(POSES.idle, {scale:1});
      world.appendChild(el);
      f.el = el;
    });
  }

  function updateHUD(){
    const p1 = Fight.p1, p2 = Fight.p2;
    document.getElementById('hud-p1-name').textContent = p1.char.name;
    document.getElementById('hud-p2-name').textContent = p2.char.name;
    document.getElementById('hud-p1-hp').style.width = Math.max(0,p1.hp)+'%';
    document.getElementById('hud-p2-hp').style.width = Math.max(0,p2.hp)+'%';
    document.getElementById('hud-p1-meter').style.width = Math.min(100,p1.meter)+'%';
    document.getElementById('hud-p2-meter').style.width = Math.min(100,p2.meter)+'%';
    // rounds
    const renderRounds = (n)=>{
      let s = '';
      for(let i=0;i<2;i++) s += `<span class="rd${i<n?' win':''}"></span>`;
      return s;
    };
    document.getElementById('hud-p1-rounds').innerHTML = renderRounds(p1.rounds);
    document.getElementById('hud-p2-rounds').innerHTML = renderRounds(p2.rounds);
    document.getElementById('hud-timer').textContent = Math.ceil(Fight.timer);
  }

  /* ----------- ANNOUNCER ----------- */
  function queueAnnouncer(text, dur){
    Fight.announcer = text;
    Fight.announcerTimer = dur || 900;
    const el = document.getElementById('announcer');
    el.textContent = text;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
  }

  /* ----------- INPUT ----------- */
  const keyState = {};
  // map: touch identifier -> Set of keyCodes it's holding
  const touchKeys = new Map();

  function setKey(code, down){
    keyState[code] = down;
    // visual highlight
    document.querySelectorAll(`.tbtn[data-key="${code}"]`).forEach(b=>{
      if(down) b.classList.add('held');
      else b.classList.remove('held');
    });
  }

  function clearTouchKeys(touchId){
    const set = touchKeys.get(touchId);
    if(!set) return;
    set.forEach(code => setKey(code, false));
    touchKeys.delete(touchId);
  }

  // find which tbtn (if any) is under a point
  function buttonAt(x, y){
    const el = document.elementFromPoint(x, y);
    if(!el) return null;
    return el.closest('.tbtn');
  }

  function initInput(){
    // KEYBOARD
    window.addEventListener('keydown', (e)=>{
      if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)) e.preventDefault();
      keyState[e.code] = true;
      // Resume audio on any keypress (some browsers need it)
      resumeAudioContext();
    });
    window.addEventListener('keyup', (e)=>{
      keyState[e.code] = false;
    });

    // TOUCH — handled at document level so multi-touch works reliably
    // Each touch tracks which button it's currently over; sliding moves the press.
    const touchPad = document.getElementById('touch-pad');
    if(touchPad){
      const onStart = (e)=>{
        // Only handle if a finger touched a tbtn
        let handled = false;
        for(const t of e.changedTouches){
          const btn = buttonAt(t.clientX, t.clientY);
          if(btn && btn.dataset.key){
            handled = true;
            const code = btn.dataset.key;
            const set = touchKeys.get(t.identifier) || new Set();
            set.add(code);
            touchKeys.set(t.identifier, set);
            setKey(code, true);
          }
        }
        if(handled){
          e.preventDefault();
          resumeAudioContext();
        }
      };
      const onMove = (e)=>{
        let handled = false;
        for(const t of e.changedTouches){
          const set = touchKeys.get(t.identifier);
          if(!set) continue;
          handled = true;
          const btn = buttonAt(t.clientX, t.clientY);
          const newCode = (btn && btn.dataset.key) ? btn.dataset.key : null;
          // release any held codes that aren't this one
          [...set].forEach(code => {
            if(code !== newCode){ setKey(code, false); set.delete(code); }
          });
          if(newCode && !set.has(newCode)){
            set.add(newCode);
            setKey(newCode, true);
          }
        }
        if(handled) e.preventDefault();
      };
      const onEnd = (e)=>{
        for(const t of e.changedTouches){
          if(touchKeys.has(t.identifier)){
            clearTouchKeys(t.identifier);
            e.preventDefault();
          }
        }
      };
      touchPad.addEventListener('touchstart', onStart, {passive:false});
      touchPad.addEventListener('touchmove',  onMove,  {passive:false});
      touchPad.addEventListener('touchend',   onEnd,   {passive:false});
      touchPad.addEventListener('touchcancel',onEnd,   {passive:false});

      // Mouse fallback (for testing on desktop)
      let mouseDown = null;
      touchPad.addEventListener('mousedown', (e)=>{
        const btn = e.target.closest('.tbtn');
        if(btn && btn.dataset.key){
          mouseDown = btn.dataset.key;
          setKey(mouseDown, true);
          resumeAudioContext();
          e.preventDefault();
        }
      });
      window.addEventListener('mouseup', ()=>{
        if(mouseDown){ setKey(mouseDown, false); mouseDown = null; }
      });
    }

    // Prevent context menu / long-press selection on the touch pad
    if(touchPad){
      touchPad.addEventListener('contextmenu', e => e.preventDefault());
    }
  }

  /* Resume Web Audio context. iOS Safari is aggressive about suspending. */
  function resumeAudioContext(){
    try{
      if(typeof Music !== 'undefined' && Music.resume) Music.resume();
      if(typeof Tone !== 'undefined' && Tone.context && Tone.context.state !== 'running'){
        Tone.context.resume && Tone.context.resume();
      }
    }catch(e){}
  }

  function readInputs(){
    if(!Fight) return;
    // P1
    Fight.p1.input.left  = !!keyState['KeyA'];
    Fight.p1.input.right = !!keyState['KeyD'];
    Fight.p1.input.up    = !!keyState['KeyW'];
    Fight.p1.input.down  = !!keyState['KeyS'];
    Fight.p1.input.p     = !!keyState['KeyF'];
    Fight.p1.input.k     = !!keyState['KeyG'];
    Fight.p1.input.s     = !!keyState['KeyH'];

    if(State.mode==='vsp2'){
      Fight.p2.input.left  = !!keyState['ArrowLeft'];
      Fight.p2.input.right = !!keyState['ArrowRight'];
      Fight.p2.input.up    = !!keyState['ArrowUp'];
      Fight.p2.input.down  = !!keyState['ArrowDown'];
      Fight.p2.input.p     = !!keyState['KeyJ'];
      Fight.p2.input.k     = !!keyState['KeyK'];
      Fight.p2.input.s     = !!keyState['KeyL'];
    } else {
      runAI(Fight.p2, Fight.p1);
    }
  }

  /* ----------- AI ----------- */
  function runAI(ai, target){
    if(ai.koed || ai.hitStun > 0){
      ai.input = { left:false,right:false,up:false,down:false,p:false,k:false,s:false };
      return;
    }
    // reset
    ai.input.left = ai.input.right = ai.input.up = ai.input.down = false;
    ai.input.p = ai.input.k = ai.input.s = false;

    const dx = target.x - ai.x;
    const adx = Math.abs(dx);
    const towards = dx > 0 ? 'right' : 'left';

    // boss: more aggressive
    const isBoss = ai.char.isBoss;
    const aggression = isBoss ? 0.85 : 0.55;
    const blockChance = isBoss ? 0.35 : 0.5;

    // If target is attacking and we're close: maybe block
    if(target.attackTimer > 0 && adx < 220 && Math.random() < blockChance){
      ai.input.down = true;
      // also face target while blocking
      if(towards==='right') ai.input.right = true; else ai.input.left = true;
      return;
    }

    // Far: move toward
    if(adx > KICK_RANGE){
      if(towards==='right') ai.input.right = true; else ai.input.left = true;
      // occasional jump approach
      if(adx > 400 && Math.random() < 0.02 && ai.onGround) ai.input.up = true;
    } else {
      // In range: attack
      if(Math.random() < aggression * 0.06){
        // pick attack
        const pick = Math.random();
        if(ai.meter >= 50 && pick < 0.18){
          ai.input.s = true;
        } else if(pick < 0.55){
          ai.input.p = true;
        } else {
          ai.input.k = true;
        }
        // face target during attack
        if(towards==='right') ai.input.right = true; else ai.input.left = true;
      } else if(Math.random() < 0.01) {
        // occasional retreat-jump
        if(ai.onGround) ai.input.up = true;
      } else if(Math.random() < 0.015){
        // occasional crouch-block
        ai.input.down = true;
      } else {
        // hold position / face
        if(towards==='right') ai.input.right = true; else ai.input.left = true;
      }
    }
  }

  /* ----------- PHYSICS / FIGHTER UPDATE ----------- */
  function updateFighter(f, opp){
    if(!Fight || Fight.ended) return;

    if(f.koed){
      f.pose = 'ko';
      return;
    }

    // Face opponent automatically when idle / not attacking
    if(f.attackTimer <= 0 && !f.blocking && f.onGround){
      f.facing = (opp.x > f.x) ? 1 : -1;
    }

    if(f.hitStun > 0){
      f.hitStun--;
      f.pose = 'hit';
      // small knockback continues
      f.x += f.vx;
      if(f.vx > 0) f.vx = Math.max(0, f.vx - 0.6);
      else f.vx = Math.min(0, f.vx + 0.6);
      // gravity
      if(!f.onGround){
        f.vy += GRAVITY;
        f.y += f.vy;
        if(f.y >= GROUND_Y){ f.y = GROUND_Y; f.vy = 0; f.onGround = true; }
      }
      clampX(f);
      renderFighter(f);
      return;
    }

    // Attack timing
    if(f.attackTimer > 0){
      f.attackTimer--;
      // hit window check
      if(!f.attackHit && f.attackTimer < f.attackTotal - 4 && f.attackTimer > 2){
        const hit = checkAttackHit(f, opp);
        if(hit){
          f.attackHit = true;
          applyHit(f, opp);
        }
      }
      if(f.attackTimer === 0){
        f.attackType = null;
        f.attackHit = false;
      }
    }

    // Input -> action
    const in_ = f.input;
    let movingInput = false;

    // Block: holding down + not moving = block (or crouch)
    f.blocking = false;
    if(in_.down && f.onGround && f.attackTimer<=0){
      f.crouching = true;
      // block is true when opponent is attacking and we're holding down + facing them
      if(opp.attackTimer > 0){
        f.blocking = true;
      }
    } else {
      f.crouching = false;
    }

    // Movement (no movement during attack on ground)
    if(f.attackTimer<=0 && !f.crouching){
      if(in_.left && !in_.right){
        f.vx = -MOVE_SPEED;
        movingInput = true;
      } else if(in_.right && !in_.left){
        f.vx = MOVE_SPEED;
        movingInput = true;
      } else {
        if(f.onGround) f.vx *= 0.6;
      }
    } else if(f.crouching){
      if(f.onGround) f.vx *= 0.5;
    }

    // Jump
    if(in_.up && f.onGround && f.attackTimer<=0 && !f.crouching){
      const t = performance.now();
      if(t - f.lastAttacks.jump > 200){
        f.vy = JUMP_VEL;
        f.onGround = false;
        f.lastAttacks.jump = t;
      }
    }

    // Attacks (only on ground for simplicity, plus air-attacks)
    if(f.attackTimer<=0 && !f.crouching){
      const t = performance.now();
      if(in_.s && f.meter >= 50 && t - f.lastAttacks.s > 600){
        startAttack(f, 'special');
        f.lastAttacks.s = t;
      } else if(in_.p && t - f.lastAttacks.p > 280){
        startAttack(f, 'punch');
        f.lastAttacks.p = t;
      } else if(in_.k && t - f.lastAttacks.k > 380){
        startAttack(f, 'kick');
        f.lastAttacks.k = t;
      }
    }

    // Apply velocity
    f.x += f.vx;

    // Gravity
    if(!f.onGround){
      f.vy += GRAVITY;
      f.y += f.vy;
      if(f.y >= GROUND_Y){
        f.y = GROUND_Y; f.vy = 0; f.onGround = true;
      }
    }

    clampX(f);

    // Determine pose
    if(f.attackTimer > 0){
      if(f.attackType==='punch') f.pose = 'punch';
      else if(f.attackType==='kick') f.pose = 'kick';
      else if(f.attackType==='special') f.pose = 'special';
    } else if(!f.onGround){
      f.pose = 'jump';
    } else if(f.blocking){
      f.pose = 'block';
    } else if(f.crouching){
      f.pose = 'crouch';
    } else if(movingInput){
      f.walkPhase += 0.18;
      f.pose = (Math.sin(f.walkPhase) > 0) ? 'walk' : 'walkAlt';
    } else {
      f.pose = 'idle';
    }

    renderFighter(f);
  }

  function clampX(f){
    if(f.x < FIGHTER_W/2) f.x = FIGHTER_W/2;
    if(f.x > STAGE_W - FIGHTER_W/2) f.x = STAGE_W - FIGHTER_W/2;
  }

  function startAttack(f, type){
    f.attackType = type;
    f.attackHit = false;
    if(type==='punch'){ f.attackTotal = f.attackTimer = 14; }
    else if(type==='kick'){ f.attackTotal = f.attackTimer = 20; }
    else { f.attackTotal = f.attackTimer = 28; f.meter -= 50; }
    if(Music && Music.sfx) Music.sfx(type);
  }

  function checkAttackHit(attacker, defender){
    if(defender.koed) return false;
    const dx = defender.x - attacker.x;
    const facingMatch = (attacker.facing > 0 && dx > 0) || (attacker.facing < 0 && dx < 0);
    if(!facingMatch) return false;
    const adx = Math.abs(dx);
    const dy = Math.abs(defender.y - attacker.y);
    let range = PUNCH_RANGE;
    if(attacker.attackType==='kick') range = KICK_RANGE;
    if(attacker.attackType==='special') range = 240;
    if(adx > range) return false;
    if(dy > 200) return false;
    return true;
  }

  function applyHit(attacker, defender){
    let dmg = 8;
    if(attacker.attackType==='kick') dmg = 12;
    if(attacker.attackType==='special') dmg = 25;

    if(defender.blocking){
      dmg = Math.floor(dmg * 0.25);
      defender.blockStun = 8;
      defender.meter = Math.min(100, defender.meter + 4);
      if(Music && Music.sfx) Music.sfx('block');
      spawnHitSpark(defender, '✦', '#00f0ff', false);
      return;
    }

    defender.hp -= dmg;
    defender.hitStun = (attacker.attackType==='special') ? 28 : 16;
    defender.vx = (defender.x > attacker.x ? 1 : -1) * (attacker.attackType==='special' ? 8 : 5);
    if(attacker.attackType==='special'){
      defender.vy = -8;
      defender.onGround = false;
    }

    // meter
    attacker.meter = Math.min(100, attacker.meter + 5);
    defender.meter = Math.min(100, defender.meter + 8);

    Fight.shake = (attacker.attackType==='special') ? 18 : 10;

    if(Music && Music.sfx) Music.sfx('hit');

    // Hit spark
    const txt = attacker.attackType==='special' ? 'WHAM!' : (attacker.attackType==='kick' ? 'POW' : 'BIFF');
    const sparkColor = attacker.attackType==='special' ? '#ff2bd6' : '#ffe600';
    spawnHitSpark(defender, txt, sparkColor, true);
    spawnHitParticles(defender, sparkColor, attacker.attackType==='special' ? 16 : 9);

    // Hit class
    defender.el.classList.remove('hit');
    void defender.el.offsetWidth;
    defender.el.classList.add('hit');

    if(defender.hp <= 0){
      defender.hp = 0;
      defender.koed = true;
      defender.pose = 'ko';
      defender.vy = -10;
      defender.onGround = false;
      attacker.rounds++;
      Fight.ended = true;
      Fight.shake = 24;
      if(Music && Music.sfx) Music.sfx('ko');
      setTimeout(()=> endRound(attacker, defender, 'KO'), 1200);
    } else if(defender.hp <= 25 && !Fight.finishMode){
      Fight.finishMode = true;
      queueAnnouncer('FINISH ' + (defender.pno===1 ? 'P1' : 'THEM') + '!', 900);
    }

    updateHUD();
  }

  function spawnHitSpark(target, text, color, big){
    const world = document.getElementById('world');
    if(!world) return;
    const sp = document.createElement('div');
    sp.className = 'hit-spark';
    sp.textContent = text;
    sp.style.color = color;
    sp.style.left = (target.x - 40) + 'px';
    sp.style.bottom = (STAGE_H - target.y + 100) + 'px';
    if(big) sp.style.fontSize = '90px';
    world.appendChild(sp);
    setTimeout(()=> sp.remove(), 500);
  }

  function spawnHitParticles(target, color, count){
    const world = document.getElementById('world');
    if(!world) return;
    const n = count || 8;
    const left = target.x;
    const bottom = STAGE_H - target.y + 120;
    for(let i=0;i<n;i++){
      const p = document.createElement('div');
      p.className = 'hit-particle';
      const ang = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 70;
      p.style.setProperty('--tx', (Math.cos(ang) * dist).toFixed(1) + 'px');
      p.style.setProperty('--ty', (Math.sin(ang) * dist).toFixed(1) + 'px');
      const sz = 5 + Math.random() * 8;
      p.style.width = sz + 'px';
      p.style.height = sz + 'px';
      p.style.left = left + 'px';
      p.style.bottom = bottom + 'px';
      p.style.background = color;
      p.style.color = color;
      p.style.animationDelay = (Math.random() * 0.04).toFixed(3) + 's';
      world.appendChild(p);
      setTimeout(()=> p.remove(), 680);
    }
  }

  /* ----------- POSE/RENDER ----------- */
  function renderFighter(f){
    if(!f.el) return;
    // Position
    f.el.style.left = (f.x - FIGHTER_W/2) + 'px';
    f.el.style.bottom = (STAGE_H - f.y) + 'px';

    // facing
    if(f.facing < 0) f.el.classList.add('facing-left');
    else f.el.classList.remove('facing-left');

    // Pose: only re-render when changed (perf)
    const poseSig = f.pose + (f.koed ? '_ko' : '');
    if(f.lastPoseSig !== poseSig){
      f.lastPoseSig = poseSig;
      const pose = POSES[f.pose] || POSES.idle;
      f.el.innerHTML = f.char.render(pose, {scale:1});
      // for KO add tilt
      if(f.koed){
        f.el.style.transform = (f.facing < 0 ? 'scaleX(-1) ' : '') + 'rotate(80deg)';
      } else {
        f.el.style.transform = '';
      }
    }
  }

  /* ----------- LOOP ----------- */
  function loop(now){
    if(!Fight){ rafId = null; return; }
    const dt = Math.min(50, now - Fight.lastTick);
    Fight.lastTick = now;

    if(!Fight.paused && !Fight.ended){
      // Timer
      if(now - Fight.timerLast >= 1000){
        Fight.timer -= 1;
        Fight.timerLast = now;
        if(Fight.timer <= 0){
          Fight.timer = 0;
          Fight.ended = true;
          // determine winner by hp
          const winner = Fight.p1.hp > Fight.p2.hp ? Fight.p1 : (Fight.p2.hp > Fight.p1.hp ? Fight.p2 : null);
          const loser = winner ? (winner === Fight.p1 ? Fight.p2 : Fight.p1) : Fight.p1;
          if(winner) winner.rounds++;
          setTimeout(()=> endRound(winner, loser, winner ? 'TIME UP' : 'DRAW'), 800);
        }
      }

      readInputs();
      updateFighter(Fight.p1, Fight.p2);
      updateFighter(Fight.p2, Fight.p1);
      updateHUD();
    } else {
      // still allow knockback finishing
      if(Fight.ended){
        if(Fight.p1.koed) {
          // gravity for KO body
          if(!Fight.p1.onGround){ Fight.p1.vy += GRAVITY; Fight.p1.y += Fight.p1.vy; if(Fight.p1.y >= GROUND_Y){Fight.p1.y=GROUND_Y; Fight.p1.vy=0; Fight.p1.onGround=true;} }
          renderFighter(Fight.p1);
        }
        if(Fight.p2.koed) {
          if(!Fight.p2.onGround){ Fight.p2.vy += GRAVITY; Fight.p2.y += Fight.p2.vy; if(Fight.p2.y >= GROUND_Y){Fight.p2.y=GROUND_Y; Fight.p2.vy=0; Fight.p2.onGround=true;} }
          renderFighter(Fight.p2);
        }
      }
    }

    // shake
    if(Fight.shake > 0){
      const s = Fight.shake;
      const dx = (Math.random()-0.5) * s;
      const dy = (Math.random()-0.5) * s;
      stageEl.style.transform = `translate(${dx}px,${dy}px)`;
      Fight.shake -= 1.2;
      if(Fight.shake <= 0) stageEl.style.transform = '';
    }

    rafId = requestAnimationFrame(loop);
  }

  /* ----------- ROUND END ----------- */
  function endRound(winner, loser, reason){
    queueAnnouncer(reason || 'K.O.', 1500);
    setTimeout(()=>{
      // Match winner check (best of 3)
      if(winner && winner.rounds >= 2){
        endMatch(winner, loser);
        return;
      }
      // Show round end with cutscene
      showRoundEnd(winner, loser, reason);
    }, 1400);
  }

  function showRoundEnd(winner, loser, reason){
    showScreen('roundend');
    document.getElementById('roundend-title').textContent = reason || 'K.O.';
    const cs = winner
      ? Cutscenes.win(winner.charId)
      : (loser ? Cutscenes.lose(loser.charId) : '');
    document.getElementById('roundend-cutscene').innerHTML = cs;
    document.getElementById('roundend-text').textContent = winner
      ? `${winner.char.name} wins round ${winner.rounds} of 2.`
      : `Both fighters fade.`;
    const btn = document.getElementById('roundend-next');
    btn.textContent = 'NEXT ROUND ►';
    btn.onclick = ()=>{
      Music.sfx && Music.sfx('confirm');
      nextRound();
    };
  }

  function nextRound(){
    if(!Fight) return;
    Fight.round++;
    Fight.timer = 60;
    Fight.timerLast = performance.now();
    Fight.lastTick = performance.now();
    Fight.ended = false;
    Fight.shake = 0;
    Fight.finishMode = false;

    // reset positions and hp
    [Fight.p1, Fight.p2].forEach((f,i)=>{
      f.hp = 100;
      f.x = i===0 ? 280 : STAGE_W - 280;
      f.y = GROUND_Y;
      f.vx = 0; f.vy = 0;
      f.facing = i===0 ? 1 : -1;
      f.onGround = true;
      f.attackTimer = 0;
      f.attackType = null;
      f.attackHit = false;
      f.hitStun = 0;
      f.koed = false;
      f.pose = 'idle';
      f.lastPoseSig = null;
      f.el.style.transform = '';
      f.el.classList.remove('hit');
    });

    showScreen('fight');
    queueAnnouncer(`ROUND ${Fight.round}`, 1100);
    setTimeout(()=> queueAnnouncer('FIGHT!', 800), 900);
    updateHUD();
    if(rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
  }

  function endMatch(winner, loser){
    if(rafId) cancelAnimationFrame(rafId);
    rafId = null;
    Music && Music.stop && Music.stop();

    const playerWon = winner === Fight.p1;

    showScreen('roundend');
    document.getElementById('roundend-title').textContent = playerWon ? 'YOU WIN' : 'YOU LOSE';
    document.getElementById('roundend-cutscene').innerHTML = playerWon
      ? Cutscenes.win(winner.charId)
      : Cutscenes.lose(Fight.p1.charId);
    document.getElementById('roundend-text').textContent = playerWon
      ? `${winner.char.name} defeats ${loser.char.name}.`
      : `${winner.char.name} defeats you.`;

    const btn = document.getElementById('roundend-next');

    if(State.mode === 'tournament'){
      const cur = State.tournamentBracket[State.tournamentIndex];
      cur.done = true;
      cur.won = playerWon;
      if(playerWon){
        State.tournamentIndex++;
        // Check champion
        if(State.tournamentIndex >= State.tournamentBracket.length){
          // CHAMPION! unlock boss, ending
          if(!State.bossUnlocked){
            State.bossUnlocked = true;
            saveUnlock();
          }
          btn.textContent = '★ CLAIM YOUR ENDING ★';
          btn.onclick = ()=>{
            Music.sfx && Music.sfx('confirm');
            showEnding(Fight.p1.charId);
          };
        } else {
          btn.textContent = 'NEXT FIGHT ►';
          btn.onclick = ()=>{
            Music.sfx && Music.sfx('confirm');
            renderBracket();
            showScreen('bracket');
          };
        }
      } else {
        btn.textContent = '↻ MAIN MENU';
        btn.onclick = ()=>{
          Music.sfx && Music.sfx('confirm');
          showScreen('boot');
        };
      }
    } else {
      btn.textContent = '↻ MAIN MENU';
      btn.onclick = ()=>{
        Music.sfx && Music.sfx('confirm');
        showScreen('boot');
      };
    }
  }

  /* =========================================================
     ENDING / CREDITS
     ========================================================= */
  function showEnding(charId){
    showScreen('ending');
    const stg = document.getElementById('ending-stage');
    stg.innerHTML = Cutscenes.ending(charId);
    document.getElementById('ending-text').innerHTML = '';
    // music: pyramid theme as victory
    if(Music && Music.play) Music.play('pyramid');
  }

  function initEnding(){
    document.getElementById('ending-credits').addEventListener('click', ()=>{
      Music.sfx && Music.sfx('confirm');
      showCredits();
    });
    document.getElementById('ending-menu').addEventListener('click', ()=>{
      Music.sfx && Music.sfx('confirm');
      Music && Music.stop && Music.stop();
      showScreen('boot');
    });
  }

  function showCredits(){
    showScreen('credits');
    document.getElementById('credit-fighters').innerHTML =
      CHARACTERS.map(c=>`<b>${c.name}</b> — ${c.tag}`).join('<br>');
    document.getElementById('credit-stages').innerHTML =
      STAGES.map(s=>`<b>${s.name}</b>`).join(' · ');
  }

  function initCredits(){
    document.getElementById('credits-back').addEventListener('click', ()=>{
      Music && Music.stop && Music.stop();
      Music.sfx && Music.sfx('confirm');
      showScreen('boot');
    });
  }

  /* =========================================================
     AUDIO TOGGLE
     ========================================================= */
  function initAudioToggle(){
    const btn = document.getElementById('audio-toggle');
    btn.addEventListener('click', ()=>{
      State.audioOn = !State.audioOn;
      if(Music && Music.setMuted) Music.setMuted(!State.audioOn);
      btn.textContent = State.audioOn ? '🔊' : '🔇';
    });
  }

  /* =========================================================
     STARTUP
     ========================================================= */
  function start(){
    initBootMenu();
    initSelect();
    initStage();
    initBracket();
    initEnding();
    initCredits();
    initAudioToggle();
    initInput();

    // Boot stars (fewer on mobile for perf)
    const bs = document.querySelector('.boot-stars');
    if(bs){
      const isMobile = matchMedia('(max-width: 900px)').matches;
      const count = isMobile ? 60 : 160;
      let html = '';
      for(let i=0;i<count;i++){
        const x = Math.random()*100, y = Math.random()*100;
        const r = (Math.random()*2+0.4).toFixed(2);
        const dur = (2+Math.random()*4).toFixed(1)+'s';
        html += `<span style="position:absolute; left:${x}%; top:${y}%; width:${r}px; height:${r}px; background:#fff; border-radius:50%; box-shadow:0 0 4px #fff; animation: twinkle ${dur} infinite alternate;"></span>`;
      }
      bs.innerHTML = html;
    }

    // hide touch-pad initially
    const tp = document.getElementById('touch-pad');
    if(tp) tp.style.display = 'none';

    /* ----- iOS / mobile lifecycle handling ----- */

    // Resume audio on ANY user gesture anywhere — required by iOS Safari
    // (Tone.context can suspend when tab loses focus or after long idle.)
    const gestureUnlock = ()=> resumeAudioContext();
    document.addEventListener('touchstart', gestureUnlock, {passive:true});
    document.addEventListener('touchend', gestureUnlock, {passive:true});
    document.addEventListener('click', gestureUnlock, true);
    document.addEventListener('keydown', gestureUnlock);

    // Visibility change — pause music when backgrounded, resume on return
    document.addEventListener('visibilitychange', ()=>{
      if(document.hidden){
        if(Fight) Fight.paused = true;
      } else {
        if(Fight){
          Fight.paused = false;
          Fight.lastTick = performance.now();
          Fight.timerLast = performance.now();
        }
        resumeAudioContext();
      }
    });

    // Orientation/resize — rescale the stage if a fight is in progress
    // and pause when in portrait (orient prompt is covering the screen)
    const isBlockedPortrait = ()=>
      window.matchMedia('(max-width: 900px) and (orientation: portrait)').matches;
    const handleResize = ()=>{
      // pause/resume based on orientation
      if(Fight){
        if(isBlockedPortrait()){
          Fight.paused = true;
        } else if(Fight.paused && !document.hidden){
          Fight.paused = false;
          Fight.lastTick = performance.now();
          Fight.timerLast = performance.now();
        }
      }
      // rescale stage
      if(!stageEl || !Fight) return;
      const world = document.getElementById('world');
      if(!world) return;
      const r = stageEl.getBoundingClientRect();
      scaleFactor = Math.min(r.width/STAGE_W, r.height/STAGE_H);
      const sw = STAGE_W * scaleFactor;
      const sh = STAGE_H * scaleFactor;
      world.style.transform = `translate(${(r.width-sw)/2}px, ${(r.height-sh)/2}px) scale(${scaleFactor})`;
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', ()=> setTimeout(handleResize, 200));

    // Prevent double-tap zoom and pinch zoom on iOS
    document.addEventListener('gesturestart', e => e.preventDefault());
    document.addEventListener('gesturechange', e => e.preventDefault());
    document.addEventListener('gestureend', e => e.preventDefault());
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e)=>{
      const now = Date.now();
      if(now - lastTouchEnd <= 300) e.preventDefault();
      lastTouchEnd = now;
    }, {passive:false});

    // Stop iOS rubber-band scrolling
    document.addEventListener('touchmove', (e)=>{
      // only block if it's outside scrollable areas (roster/stage/credits)
      const inScrollable = e.target.closest('.roster, .stage-grid, .credits-scroll, .select-detail, .howto-wrap');
      if(!inScrollable) e.preventDefault();
    }, {passive:false});
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
