(() => {
'use strict';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d', { alpha:false });
const $ = id => document.getElementById(id);

const roster = [
 {name:'Moldra Max', emoji:'🧬', color:'#ff2bd6', alt:'#00f6ff', style:'Double Helix Uppercut', hp:130, power:1.04, speed:1},
 {name:'Sneech Spiral', emoji:'🌈', color:'#c6ff00', alt:'#ff7b00', style:'Star Belly Cartwheel', hp:108, power:.94, speed:1.18},
 {name:'Alyx Mirrorfall', emoji:'🫖', color:'#7d2cff', alt:'#ffd447', style:'Teacup Dimension Cut', hp:118, power:1.0, speed:1.08},
 {name:'Gonzo Coyote', emoji:'🦎', color:'#ff6b00', alt:'#37ff8b', style:'Lizard King Rush', hp:124, power:1.06, speed:1.04},
 {name:'Bucky Fullerdome', emoji:'🔷', color:'#00d1ff', alt:'#ffffff', style:'Tensegrity Slam', hp:145, power:1.1, speed:.86},
 {name:'Quanta Flux', emoji:'⚛️', color:'#b100ff', alt:'#00ffbc', style:'Uncertainty Split', hp:105, power:.95, speed:1.24},
 {name:'Oddyssey Prime', emoji:'👁️', color:'#ffd447', alt:'#ff2bd6', style:'Monolith Mind Beam', hp:122, power:1, speed:1},
 {name:'Heavy Mettle', emoji:'🤘', color:'#c0c0c0', alt:'#ff003c', style:'Magazine Cover Crusher', hp:150, power:1.17, speed:.82},
 {name:'Gilly Grin', emoji:'🎪', color:'#fff200', alt:'#111111', style:'Banana Moon Mallet', hp:112, power:.97, speed:1.14},
 {name:'Oracle Ooze', emoji:'🌀', color:'#00ffa6', alt:'#722cff', style:'Tarot Slime Star', hp:128, power:1.07, speed:.96},
 {name:'Lord Kaleidojaw', emoji:'🐉', color:'#ff0048', alt:'#00f6ff', style:'Kaleido Apocalypse', hp:420, power:1.35, speed:.92, boss:true}
];

const levels = [
 {name:'Liquid Marble Lobby', sub:'wide entry arena with mushroom platforms', a:'#ff2bd6', b:'#00f6ff', ground:'#12001f'},
 {name:'Seussian Spiral Factory', sub:'bent platforms, rolling comic shadows', a:'#c6ff00', b:'#ff7b00', ground:'#101800'},
 {name:'Wonderlost Tea Engine', sub:'floating teacup ledges and clock portals', a:'#7d2cff', b:'#ffd447', ground:'#17001f'},
 {name:'Fear Canyon Rooftop', sub:'desert speed lines and neon signs', a:'#ff6b00', b:'#37ff8b', ground:'#240800'},
 {name:'Fullerdome Quantum Gym', sub:'geodesic platforms and tensegrity rails', a:'#00d1ff', b:'#ffffff', ground:'#001725'},
 {name:'Heavy Metal Astro-Chapel', sub:'chrome stairs, skull moons, amplifier walls', a:'#c0c0c0', b:'#ff003c', ground:'#111111'},
 {name:'Kaleidojaw Throne Roof', sub:'final boss, endless fractal skyline', a:'#ff0048', b:'#00f6ff', ground:'#220008', boss:true}
];

let W=innerWidth,H=innerHeight,dpr=1;
let world={w:2200,h:1100,gravity:1850};
let cam={x:0,y:0,z:0.72};
let hero=null, enemies=[], projectiles=[], particles=[], texts=[], platforms=[], pickups=[];
let heroIndex=0, levelIndex=0, waveIndex=0, running=false, paused=false, playable=false, musicOn=false, speedScale=1;
let keys={}, touch={}, t=0, last=0, shake=0, state='menu', waveLock=false, bossSpawned=false, music=null, forwardTimer=0, nextSpawnPending=false, platformStuckTimer=0, dropMode=false, dropDir=1, finaleTimer=0;

const wavesPerLevel = 3;

function fit(){
 dpr=Math.min(devicePixelRatio||1,2);
 W=innerWidth; H=innerHeight;
 canvas.width=Math.floor(W*dpr); canvas.height=Math.floor(H*dpr);
 canvas.style.width=W+'px'; canvas.style.height=H+'px';
 ctx.setTransform(dpr,0,0,dpr,0,0);
}
addEventListener('resize',fit); fit();

roster.slice(0,10).forEach((c,i)=>{
 const o=document.createElement('option'); o.value=i; o.textContent=`${c.name} — ${c.style}`; $('heroSelect').appendChild(o);
});

class Synth{
 constructor(){this.ctx=null;this.master=null;this.timer=null;this.step=0}
 async start(level=0){
  if(!this.ctx){this.ctx=new (window.AudioContext||window.webkitAudioContext)();this.master=this.ctx.createGain();this.master.gain.value=.15;this.master.connect(this.ctx.destination)}
  if(this.ctx.state==='suspended') await this.ctx.resume();
  this.stop(); this.step=0;
  const bpm=104+level*8, beat=60000/bpm, scale=[0,3,5,7,10,12,15,19,22];
  this.timer=setInterval(()=>{
   const root=42+(level%6)*5, n=scale[(this.step+level)%scale.length];
   this.note(root*Math.pow(2,n/12),.15,this.step%4?'square':'sawtooth',.06);
   if(this.step%4===0)this.note(36,.07,'triangle',.17);
   if(this.step%8===4)this.note(560+level*70,.05,'square',.05);
   this.step++;
  },beat/2);
 }
 note(freq,dur,type,gain){
  if(!this.ctx)return;
  const o=this.ctx.createOscillator(), g=this.ctx.createGain();
  o.type=type;o.frequency.value=freq;
  g.gain.setValueAtTime(.0001,this.ctx.currentTime);
  g.gain.linearRampToValueAtTime(gain,this.ctx.currentTime+.012);
  g.gain.exponentialRampToValueAtTime(.0001,this.ctx.currentTime+dur);
  o.connect(g);g.connect(this.master);o.start();o.stop(this.ctx.currentTime+dur+.02);
 }
 hit(){this.note(95,.07,'square',.18)}
 jump(){this.note(300,.08,'triangle',.07)}
 special(){for(let i=0;i<7;i++)setTimeout(()=>this.note(180+i*95,.15,'sawtooth',.07),i*22)}
 stop(){if(this.timer)clearInterval(this.timer);this.timer=null}
}

function start(useMusic){
 heroIndex=parseInt($('heroSelect').value,10);
 playable=$('modeSelect').value==='play';
 speedScale=parseFloat($('speedSelect').value);
 $('menu').classList.add('hidden');
 $('touchControls').classList.toggle('show',playable);
 running=true; paused=false; levelIndex=0; waveIndex=0; bossSpawned=false; state='level'; forwardTimer=0; nextSpawnPending=false; platformStuckTimer=0; dropMode=false; dropDir=1; finaleTimer=0;
 if(useMusic){musicOn=true;$('musicBtn').textContent='Music On'; if(!music)music=new Synth(); music.start(0)}
 setupLevel();
}
$('startBtn').addEventListener('click',()=>start(true));
$('startBtn').addEventListener('touchend',e=>{e.preventDefault();start(true)},{passive:false});
$('silentBtn').addEventListener('click',()=>start(false));
$('silentBtn').addEventListener('touchend',e=>{e.preventDefault();start(false)},{passive:false});
$('restartBtn').onclick=()=>{running=false;state='menu';finaleTimer=0;$('menu').classList.remove('hidden');$('touchControls').classList.remove('show'); if(music)music.stop()};
$('pauseBtn').onclick=()=>{paused=!paused;$('pauseBtn').textContent=paused?'Resume':'Pause'};
$('musicBtn').onclick=async()=>{musicOn=!musicOn;$('musicBtn').textContent=musicOn?'Music On':'Music Off'; if(!music)music=new Synth(); if(musicOn)await music.start(levelIndex); else music.stop()};

addEventListener('keydown',e=>keys[e.code]=true);
addEventListener('keyup',e=>keys[e.code]=false);
document.querySelectorAll('[data-touch]').forEach(btn=>{
 const k=btn.dataset.touch;
 const on=e=>{e.preventDefault();touch[k]=true};
 const off=e=>{e.preventDefault();touch[k]=false};
 btn.addEventListener('touchstart',on,{passive:false});
 btn.addEventListener('touchend',off,{passive:false});
 btn.addEventListener('touchcancel',off,{passive:false});
 btn.addEventListener('mousedown',on);
 btn.addEventListener('mouseup',off);
 btn.addEventListener('mouseleave',off);
});

function setupLevel(){
 waveLock=false;
 nextSpawnPending=false;
 platformStuckTimer=0;
 dropMode=false;
 dropDir=1;
 finaleTimer=0;
 state='level';
 const lvl=levels[levelIndex];
 $('levelTitle').textContent=lvl.name;
 $('levelSub').textContent=lvl.sub;
 $('bossName').textContent='Boss';
 $('bossHp').style.width='0%';
 buildPlatforms();
 hero = makeFighter(roster[heroIndex], 160, 100, true);
 hero.maxHp = Math.max(hero.maxHp, 210);
 hero.hp = hero.maxHp;
 hero.powerBoost = 2.5;
 hero.shield = 2.0;
 hero.haste = 2.0;
 hero.magnet = 2.5;
 enemies=[]; particles=[]; texts=[]; projectiles=[]; pickups=[];
 waveIndex=0; waveLock=false; forwardTimer=0; nextSpawnPending=false;
 spawnText(world.w/2,280,lvl.name,lvl.b,2.4,58);
 spawnWave();
 if(musicOn && music) music.start(levelIndex);
}

function buildPlatforms(){
 platforms=[];
 const groundY=world.h-110;
 platforms.push({x:-200,y:groundY,w:world.w+400,h:160,type:'ground'});
 const patterns=[
  [[360,780],[780,620],[1210,735],[1580,555],[1840,820]],
  [[260,690],[620,530],[980,700],[1360,520],[1760,690]],
  [[340,840],[520,620],[910,470],[1300,640],[1670,500],[1900,760]],
  [[260,760],[600,610],[920,820],[1220,590],[1560,745],[1850,565]],
  [[310,620],[700,760],[1110,530],[1480,700],[1800,520]],
  [[230,820],[520,610],[870,720],[1220,560],[1570,680],[1900,810]],
  [[300,780],[680,620],[1040,470],[1390,620],[1740,780]]
 ];
 const pts=patterns[levelIndex%patterns.length];
 pts.forEach((p,i)=>platforms.push({x:p[0],y:p[1],w:220+(i%2)*70,h:24,type:'ledge'}));
}

function makeFighter(ch,x,y,isHero=false){
 const heroHpBonus = isHero ? 1.55 : 1;
 const heroSizeBonus = isHero ? 1.08 : 1;
 return {
  ch,x,y,vx:0,vy:0,w:(isHero?80:70)*heroSizeBonus,h:(isHero?146:128)*heroSizeBonus,
  hp:ch.hp*heroHpBonus,maxHp:ch.hp*heroHpBonus,face:1,onGround:false,isHero,dead:false,
  state:'idle',attack:'',attackTimer:0,hitDone:false,cd:0,specialCd:1,energy:35,
  aiJump:0, aiThink:0, inv:0, combo:0,
  defeated:false, dissolve:0, dissolveDelay:0, rot:0, deadSolid:false,
  stuckTimer:0, dropMode:false, dropDir:1,
  powerBoost:0, shield:0, haste:0, magnet:0
 };
}


function spawnPickup(x,y,type){
 const table={
  health:{emoji:'❤️',color:'#ff285a',label:'HEALTH +'},
  megaHealth:{emoji:'💖',color:'#ff7bff',label:'MEGA HEALTH'},
  power:{emoji:'⚡',color:'#fff200',label:'POWER BOOST'},
  shield:{emoji:'🛡️',color:'#00f6ff',label:'SHIELD'},
  haste:{emoji:'🔥',color:'#ff7b00',label:'HASTE'}
 };
 const p=table[type]||table.health;
 pickups.push({
  x,y,vx:(Math.random()-.5)*4,vy:-7-Math.random()*5,
  type,emoji:p.emoji,color:p.color,label:p.label,
  life:900, size:type==='megaHealth'?38:31, bob:Math.random()*Math.PI*2
 });
}

function maybeDropPickup(enemy){
 const r=Math.random();
 let type=null;
 if(enemy.isBoss) type='megaHealth';
 else if(r<.24) type='health';
 else if(r<.34) type='power';
 else if(r<.43) type='shield';
 else if(r<.51) type='haste';
 if(type) spawnPickup(enemy.x, enemy.y-enemy.h*.55, type);
}

function updatePickups(){
 for(const p of pickups){
  p.vy += .22;
  p.x += p.vx;
  p.y += p.vy;
  p.life--;

  // land on platforms
  for(const plat of platforms){
   if(p.x>plat.x && p.x<plat.x+plat.w && p.y>plat.y-8 && p.y<plat.y+28 && p.vy>=0){
    p.y=plat.y-12;
    p.vy=-Math.abs(p.vy)*.32;
    p.vx*=.88;
   }
  }

  // magnet effect for hero
  const dx=hero.x-p.x, dy=(hero.y-hero.h*.55)-p.y;
  const dist=Math.hypot(dx,dy);
  const magnetRange = hero.magnet>0 ? 310 : 120;
  if(dist<magnetRange){
   p.x += dx * .055;
   p.y += dy * .055;
  }
  if(dist<72){
   collectPickup(p);
   p.life=0;
  }
 }
 pickups=pickups.filter(p=>p.life>0);
}

function collectPickup(p){
 if(!hero)return;
 if(p.type==='health'){
  hero.hp=Math.min(hero.maxHp, hero.hp+42);
 }
 if(p.type==='megaHealth'){
  hero.hp=Math.min(hero.maxHp, hero.hp+110);
  hero.energy=100;
 }
 if(p.type==='power'){
  hero.powerBoost=Math.max(hero.powerBoost,7.5);
  hero.energy=Math.min(100,hero.energy+35);
 }
 if(p.type==='shield'){
  hero.shield=Math.max(hero.shield,7.5);
 }
 if(p.type==='haste'){
  hero.haste=Math.max(hero.haste,7.5);
 }
 spawnText(hero.x,hero.y-hero.h*1.55,p.label,p.color,.9,26);
 burst(hero.x,hero.y-hero.h*.8,p.color,26);
 if(musicOn&&music) music.special();
}

function spawnWave(){
 // This function is usually called by the scheduled transition after a wave is cleared.
 // Do NOT reject the call just because nextSpawnPending is true.
 waveLock=true;
 nextSpawnPending=false;
 forwardTimer=0;
 enemies=[];
 const lvl=levels[levelIndex];
 const isBossLevel = levelIndex === levels.length-1;
 const count = isBossLevel ? (waveIndex<2 ? 6+waveIndex*2 : 1) : 4 + waveIndex*2 + Math.floor(levelIndex*.5);
 if(isBossLevel && waveIndex===2){
  const boss=makeFighter(roster[10], world.w-350, 200, false);
  boss.maxHp=roster[10].hp; boss.hp=boss.maxHp; boss.w=112; boss.h=178; boss.isBoss=true;
  enemies.push(boss); bossSpawned=true; $('bossName').textContent=boss.ch.name;
  spawnText(world.w/2,320,'LORD KALEIDOJAW DESCENDS',boss.ch.alt,2.5,54);
 } else {
  for(let i=0;i<count;i++){
   const pool=roster.slice(0,10).filter((_,idx)=>idx!==heroIndex);
   const ch=pool[(i+waveIndex+levelIndex)%pool.length];
   const e=makeFighter(ch, 500+Math.random()*(world.w-700), 100, false);
   e.hp*=.62 + levelIndex*.04 + waveIndex*.05; e.maxHp=e.hp;
   enemies.push(e);
  }
  spawnText(world.w/2,330,`WAVE ${waveIndex+1}`,lvl.a,1.8,52);
 }
 $('waveTitle').textContent=`Level ${levelIndex+1} / Wave ${waveIndex+1}`;
 state='level';
 waveLock=false;
}

function update(dt){
 if(paused)return;
 dt*=speedScale; t+=dt; shake=Math.max(0,shake-dt*16);

 if(state==='finale'){
  finaleTimer += dt;
  updateFinale(dt);
  draw();
  return;
 }

 if(!running){draw();return}

 // Failsafe: never allow the hero to remain stuck in advance mode.
 if(state==='advance' && nextSpawnPending){
  forwardTimer -= dt;
  if(forwardTimer < -2.0){
   state='level';
   waveLock=false;
   nextSpawnPending=false;
   spawnWave();
  }
 }

 handleHero(dt);
 enemies.forEach(e=>enemyAI(e,dt));
 [hero,...enemies].forEach(f=>physics(f,dt));
 resolveCombat();
 updatePickups();
 cleanup();
 updateCamera(dt);
 updateHud();
}

function handleHero(dt){
 if(hero.dead)return;

 // Auto mode slowly recharges health, especially between waves.
 if(!playable){
  const regenRate = (state === 'advance') ? 18 : 5.5;
  if(hero.hp < hero.maxHp){
   hero.hp = Math.min(hero.maxHp, hero.hp + regenRate * dt);
  }
 }

 hero.powerBoost=Math.max(0,hero.powerBoost-dt);
 hero.shield=Math.max(0,hero.shield-dt);
 hero.haste=Math.max(0,hero.haste-dt);

 if(state === 'advance' && !playable){
  autoMoveForward(dt);
  return;
 }

 if(playable){
  const left=keys.KeyA||keys.ArrowLeft||touch.left;
  const right=keys.KeyD||keys.ArrowRight||touch.right;
  const hasteMul = hero.haste>0 ? 1.45 : 1;
  if(left) hero.vx-=1200*dt*hero.ch.speed*hasteMul;
  if(right) hero.vx+=1200*dt*hero.ch.speed*hasteMul;
  if((keys.KeyW||keys.Space||keys.ArrowUp||touch.jump) && hero.onGround) jump(hero);
  if(keys.KeyF||touch.punch){attack(hero,'punch'); touch.punch=false}
  if(keys.KeyG||touch.kick){attack(hero,hero.onGround?'kick':'jumpKick'); touch.kick=false}
  if(keys.KeyH||touch.special){attack(hero,'special'); touch.special=false}
 } else {
  autoHero(dt);
 }
 hero.energy=Math.min(100,hero.energy+dt*9);
}


function autoMoveForward(dt){
 // Between waves, keep the hero visibly moving forward instead of freezing.
 const target = Math.min(world.w - 180, hero.x + 520);
 if(hero.x < target){
  hero.vx += 900 * dt * hero.ch.speed * (hero.haste>0?1.45:1);
  hero.face = 1;
 }
 if(hero.onGround && Math.random() < .012){
  jump(hero);
 }
 // Recenter if the hero reached the far side, giving a side-scroller room-to-room feel.
 if(hero.x > world.w - 220){
  hero.x = 140;
  hero.y = 100;
  hero.vx = 0;
  hero.vy = 0;
  burst(hero.x, hero.y, hero.ch.alt, 16);
 }
}


function currentPlatformUnder(f){
 // Return the ledge/ground the fighter is currently standing on.
 let best=null;
 for(const p of platforms){
  const withinX = f.x+f.w*.35>p.x && f.x-f.w*.35<p.x+p.w;
  const closeY = Math.abs(f.y-p.y)<8;
  if(withinX && closeY){
   if(!best || p.y < best.y) best=p;
  }
 }
 return best;
}


function shouldDropFromPlatformFor(f,target){
 if(!target || !f.onGround) return false;
 const p=currentPlatformUnder(f);
 if(!p || p.type==='ground') return false;

 const targetBelow = target.y > f.y + 85;
 const farBelow = target.y > f.y + 135;
 const targetOutsideLedge = target.x < p.x-80 || target.x > p.x+p.w+80;
 return targetBelow && (farBelow || targetOutsideLedge || Math.abs(target.x-f.x)>100);
}

function escapePlatformFor(f,dt,target){
 const p=currentPlatformUnder(f);
 if(!p){
  f.dropMode=false;
  f.stuckTimer=0;
  return false;
 }

 if(!f.dropMode){
  f.dropDir = target && target.x < f.x ? -1 : 1;
  const desiredEdge = f.dropDir>0 ? p.x+p.w+42 : p.x-42;
  const leftEdge = p.x-42;
  const rightEdge = p.x+p.w+42;

  if(Math.abs(f.x-desiredEdge) > Math.max(240,p.w*.75)){
   f.dropDir = Math.abs(f.x-leftEdge) < Math.abs(f.x-rightEdge) ? -1 : 1;
  }
  f.dropMode=true;
 }

 f.face=f.dropDir;
 f.vx += f.dropDir * 1200 * dt * f.ch.speed;

 // Push slightly off the ledge so platform collision no longer catches the fighter.
 if((f.dropDir<0 && f.x < p.x-24) || (f.dropDir>0 && f.x > p.x+p.w+24)){
  f.onGround=false;
  f.vy = Math.max(f.vy, 180);
  f.dropMode=false;
  f.stuckTimer=0;
  burst(f.x,f.y-f.h*.2,f.ch.alt,8);
 }
 return true;
}

function shouldDropFromPlatform(target){
 return shouldDropFromPlatformFor(hero,target);
}

function escapePlatform(dt,target){
 if(!dropMode){
  spawnText(hero.x,hero.y-hero.h*1.35,'DROP DOWN',hero.ch.alt,.9,24);
 }
 // Keep the existing global hero flags in sync with the generic fighter fields.
 hero.dropMode = dropMode;
 hero.stuckTimer = platformStuckTimer;
 hero.dropDir = dropDir;

 const active = escapePlatformFor(hero,dt,target);

 dropMode = hero.dropMode;
 platformStuckTimer = hero.stuckTimer;
 dropDir = hero.dropDir;

 if(active && !dropMode){
  burst(hero.x,hero.y-hero.h*.2,hero.ch.alt,10);
 }
 return active;
}

function autoHero(dt){
 const live=enemies.filter(e=>!e.defeated);
 if(!live.length){
  platformStuckTimer=0;
  dropMode=false;
  return;
 }

 const target=live.sort((a,b)=>Math.abs(a.x-hero.x)+Math.abs(a.y-hero.y)*.7 - (Math.abs(b.x-hero.x)+Math.abs(b.y-hero.y)*.7))[0];
 const dx=target.x-hero.x, dy=target.y-hero.y;

 // Platform escape: if hero is stuck on a ledge above enemies,
 // walk off/drop down before trying to attack again.
 if(shouldDropFromPlatform(target)){
  platformStuckTimer += dt;
  if(platformStuckTimer > .55 || dropMode){
   if(escapePlatform(dt,target)) return;
  }
 } else if(!dropMode) {
  platformStuckTimer = Math.max(0, platformStuckTimer - dt*2);
 }

 if(dropMode){
  if(escapePlatform(dt,target)) return;
 }

 const hasteMul = hero.haste>0 ? 1.45 : 1;
 if(Math.abs(dx)>120) hero.vx+=Math.sign(dx)*1150*dt*hero.ch.speed*hasteMul;

 // If target is above, jump. If target is below, avoid jumping and seek edge/drop behavior.
 if(target.y < hero.y-80 && hero.onGround && Math.random()<.055) jump(hero);

 if(Math.abs(dx)<135 && Math.abs(dy)<125 && hero.cd<=0){
  if(!hero.onGround) attack(hero,Math.random()>.45?'jumpKick':'jumpPunch');
  else if(hero.energy>82 && hero.specialCd<=0) attack(hero,'special');
  else attack(hero,Math.random()>.55?'kick':'punch');
 }

 // Occasional cinematic jump, but not when enemies are below.
 if(hero.onGround && target.y >= hero.y-20 && Math.random()<.008) jump(hero);
}

function enemyAI(e,dt){
 if(e.dead)return;
 const dx=hero.x-e.x, dy=hero.y-e.y, dist=Math.hypot(dx,dy);
 e.aiThink-=dt;

 // Same platform-drop intelligence as the hero:
 // if the enemy is stuck above the hero, walk off the platform and continue fighting.
 if(shouldDropFromPlatformFor(e, hero)){
  e.stuckTimer += dt;
  if(e.stuckTimer > .45 || e.dropMode){
   if(escapePlatformFor(e,dt,hero)) return;
  }
 } else if(!e.dropMode){
  e.stuckTimer = Math.max(0, e.stuckTimer - dt*2);
 }

 if(e.dropMode){
  if(escapePlatformFor(e,dt,hero)) return;
 }

 if(Math.abs(dx)>110) e.vx+=Math.sign(dx)*760*dt*e.ch.speed;
 if(hero.y<e.y-90 && e.onGround && Math.random()<.018) jump(e);
 if(e.onGround && hero.y >= e.y-20 && Math.random()<.003) jump(e);

 if(dist<145 && e.cd<=0 && e.aiThink<=0){
  const type=!e.onGround ? 'jumpKick' : e.isBoss && e.energy>70 ? 'special' : Math.random()>.55?'kick':'punch';
  attack(e,type);
  e.aiThink=.25+Math.random()*.55;
 }
 e.energy=Math.min(100,e.energy+dt*5);
}

function jump(f){
 f.vy=-720*(f.isHero?1.03:1);
 f.onGround=false;
 burst(f.x,f.y+f.h/2,f.ch.alt,8);
 if(f.isHero && musicOn && music)music.jump();
}

function attack(f,type){
 if(f.dead || f.cd>0 || f.attackTimer>0)return;
 f.attack=type;
 f.attackTimer = type==='special'?.75 : type==='kick'||type==='jumpKick'?.42:.34;
 f.hitDone=false;
 f.cd= type==='special'?1.1:.34;
 if(type==='special'){f.specialCd=3.4; f.energy=Math.max(0,f.energy-72); if(musicOn&&music)music.special()}
 const label=type==='special'?f.ch.style:type.replace(/([A-Z])/g,' $1').toUpperCase();
 spawnText(f.x,f.y-f.h*.8,label,f.ch.alt,.5,type==='special'?24:18);
}

function physics(f,dt){
 if(f.defeated){
  updateDefeatedBody(f,dt);
  return;
 }
 if(f.dead)return;
 f.inv=Math.max(0,f.inv-dt); f.cd=Math.max(0,f.cd-dt); f.specialCd=Math.max(0,f.specialCd-dt);
 if(f.attackTimer>0){f.attackTimer-=dt;if(f.attackTimer<=0){f.attack='';f.hitDone=false}}
 f.vy += world.gravity*dt;
 f.x += f.vx*dt; f.y += f.vy*dt;
 f.vx *= Math.pow(.0008,dt);
 f.x=Math.max(40,Math.min(world.w-40,f.x));
 f.onGround=false;
 for(const p of platforms){
  const prevY=f.y-f.vy*dt;
  const bottom=f.y;
  const prevBottom=prevY;
  if(f.x+f.w*.35>p.x && f.x-f.w*.35<p.x+p.w && prevBottom<=p.y && bottom>=p.y && f.vy>=0){
   f.y=p.y; f.vy=0; f.onGround=true;
  }
 }
 if(f.y>world.h+300){
  f.hp-=35; f.x=hero.isHero?120:world.w-200; f.y=100; f.vy=0;
 }
 f.face = (f.isHero ? nearestEnemyDir(f) : Math.sign(hero.x-f.x)||f.face) || 1;
 if(f.hp<=0 && !f.defeated){defeatFighter(f)}
}


function defeatFighter(f){
 f.defeated=true;
 f.dead=true;
 f.deadSolid=false; // passable immediately
 f.attack='';
 f.attackTimer=0;
 f.hitDone=true;
 f.hp=0;
 f.inv=999;
 f.vx += -f.face * (160 + Math.random()*140);
 f.vy = -260 - Math.random()*120;
 f.rot = (Math.random()-.5)*1.2;
 f.dissolve=1;
 f.dissolveDelay=.55;
 burst(f.x,f.y-f.h/2,f.ch.color,34);
 if(!f.isHero) maybeDropPickup(f);
 spawnText(f.x,f.y-f.h,`${f.ch.name} DOWN`,f.ch.alt,1,20);
}

function updateDefeatedBody(f,dt){
 // Defeated enemies are passable and only act like falling visual bodies.
 f.dissolveDelay -= dt;
 f.vy += world.gravity*dt;
 f.x += f.vx*dt;
 f.y += f.vy*dt;
 f.vx *= Math.pow(.01,dt);
 f.rot += f.vx * dt * .002;

 // Land on platforms or ground, but never block anyone.
 for(const p of platforms){
  const prevY=f.y-f.vy*dt;
  if(f.x+f.w*.3>p.x && f.x-f.w*.3<p.x+p.w && prevY<=p.y && f.y>=p.y && f.vy>=0){
   f.y=p.y;
   f.vy=0;
   f.vx*=.82;
  }
 }

 if(f.dissolveDelay<=0){
  f.dissolve -= dt*.72;
  if(Math.random()<.34){
   burst(
    f.x+(Math.random()-.5)*f.w,
    f.y-f.h*.55+(Math.random()-.5)*f.h*.7,
    Math.random()>.5?f.ch.color:f.ch.alt,
    2
   );
  }
 }
 if(f.y>world.h+400) f.dissolve=0;
}

function nearestEnemyDir(f){
 const live=enemies.filter(e=>!e.defeated);
 if(!live.length)return f.face||1;
 const n=live.sort((a,b)=>Math.abs(a.x-f.x)-Math.abs(b.x-f.x))[0];
 return Math.sign(n.x-f.x)||f.face||1;
}

function attackBox(f){
 const reach = f.attack==='special'?210 : f.attack==='kick'||f.attack==='jumpKick'?135 : 105;
 const height = f.attack==='special'?135:95;
 return {x:f.x + f.face*reach*.5, y:f.y-f.h*.55, w:reach, h:height};
}
function hitRect(f){return {x:f.x-f.w*.42,y:f.y-f.h,w:f.w*.84,h:f.h}}

function resolveCombat(){
 const fighters=[hero,...enemies.filter(e=>!e.defeated)];
 for(const a of fighters){
  if(!a.attack || a.hitDone || a.attackTimer<=0)continue;
  const total=a.attack==='special'?.75 : a.attack==='kick'||a.attack==='jumpKick'?.42:.34;
  if(a.attackTimer>total*.55)continue;
  const targets=a.isHero?enemies.filter(e=>!e.defeated && !e.dead):[hero].filter(h=>!h.defeated && !h.dead);
  const box=attackBox(a);
  let did=false;
  for(const b of targets){
   if(overlap(box,hitRect(b))){
    did=true;
    const heroAttackBonus = a.isHero ? 1.45 : 1;
    const boostBonus = a.powerBoost>0 ? 1.65 : 1;
    const dmg=(a.attack==='special'?32:a.attack==='kick'||a.attack==='jumpKick'?16:10)*a.ch.power*(a.isBoss?1.2:1)*heroAttackBonus*boostBonus;
    damage(b,dmg,a);
   }
  }
  if(did)a.hitDone=true;
 }
}

function damage(b,dmg,a){
 if(b.inv>0)return;
 const shieldReduction = (b.isHero && b.shield>0) ? .42 : 1;
 const finalDmg = dmg * shieldReduction;
 b.hp-=finalDmg; b.inv=.08;
 const knockScale = b.isHero ? .72 : 1;
 b.vx += a.face*(a.attack==='special'?720:390)*knockScale;
 b.vy -= (a.attack==='jumpKick'?190:70)*knockScale;
 shake=a.attack==='special'?14:7;
 burst(b.x,b.y-b.h*.55,a.attack==='special'?a.ch.alt:'#fff',a.attack==='special'?32:16);
 spawnText(b.x,b.y-b.h*.78,`${Math.round(finalDmg)}`,a.ch.color,.55,22);
 if(a.isHero) a.energy=Math.min(100,a.energy+8);
 if(musicOn&&music)music.hit();
}

function cleanup(){
 // Remove dissolved bodies only after their visual dissolve is complete.
 enemies=enemies.filter(e=>!(e.defeated && e.dissolve<=0));

 const live=enemies.filter(e=>!e.defeated);

 // When a wave is cleared, switch to an advance state immediately.
 // This keeps the hero moving forward while the next wave/level is prepared.
 if(!live.length && running && !nextSpawnPending){
  nextSpawnPending=true;
  waveLock=true;
  state='advance';
  forwardTimer=1.45;
  spawnText(hero.x+180,hero.y-hero.h*1.35,'MOVE FORWARD',hero.ch.alt,1.1,28);

  waveIndex++;

  if(levelIndex===levels.length-1 && bossSpawned){
   finishGame();
   return;
  }

  if(waveIndex>=wavesPerLevel){
   levelIndex++;
   if(levelIndex>=levels.length){
    finishGame();
    return;
   }
   waveIndex=0;
   bossSpawned=false;
   $('waveTitle').textContent='Entering next level...';
   setTimeout(()=>{
    if(running){
     state='level';
     waveLock=false;
     nextSpawnPending=false;
     setupLevel();
    }
   },1350);
  } else {
   $('waveTitle').textContent=`Next wave incoming... ${waveIndex+1}`;
   setTimeout(()=>{
    if(running){
     state='level';
     waveLock=false;
     spawnWave();
    }
   },1250);
  }
 }

 if(hero.hp<=0){
  hero.hp=hero.maxHp*.55; hero.x=120; hero.y=100; hero.vx=0; hero.vy=0;
  spawnText(world.w/2,250,'HERO REVIVES',hero.ch.alt,1.3,42);
  burst(hero.x,hero.y,hero.ch.color,40);
 }

 particles=particles.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.35;p.life-=1;return p.life>0});
 texts=texts.filter(s=>{s.y-=.7;s.life-=.016;return s.life>0});
}


function updateFinale(dt){
 // keep particles/text moving during the ending
 particles=particles.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.35;p.life-=1;return p.life>0});
 texts=texts.filter(s=>{s.y-=.22;s.life-=.010;return s.life>0});

 // Center the camera on the hero for a cinematic finale
 const targetZ = .92;
 cam.z += (targetZ-cam.z)*.035;
 const targetX = hero.x - W/(2*cam.z);
 const targetY = hero.y - H/(2*cam.z) - 120;
 cam.x += (targetX-cam.x)*.06;
 cam.y += (targetY-cam.y)*.06;
 cam.x=Math.max(0,Math.min(world.w-W/cam.z,cam.x));
 cam.y=Math.max(0,Math.min(world.h-H/cam.z,cam.y));

 // Hero drifts toward center stage
 const centerX = world.w * .5;
 hero.face = 1;
 hero.vx += Math.sign(centerX-hero.x) * 320 * dt;
 hero.vx *= Math.pow(.004,dt);
 hero.x += hero.vx * dt;
 hero.x = Math.max(80, Math.min(world.w-80, hero.x));

 // Victory particle choreography
 if(Math.random() < .45){
  const colors = [hero.ch.color, hero.ch.alt, '#ffffff', '#ffea00', '#00f6ff', '#ff2bd6'];
  const color = colors[(Math.floor(finaleTimer*10) + Math.floor(Math.random()*colors.length)) % colors.length];
  burst(hero.x + (Math.random()-.5)*420, hero.y-hero.h*.7 + (Math.random()-.5)*220, color, 4);
 }
 if(Math.random() < .10){
  spawnText(world.w*.5 + (Math.random()-.5)*240, 190 + Math.random()*260, '★', '#ffffff', .9, 28);
 }

 updateHud();
}

function finishGame(){
 running=false;
 state='finale';
 finaleTimer=0;
 if(music)music.stop();

 // Clear stray transition flags
 nextSpawnPending=false;
 waveLock=false;

 // Place the hero into a proud center-stage ending pose
 hero.hp = Math.max(hero.hp, hero.maxHp * .55);
 hero.energy = 100;
 hero.vx = 0;
 hero.vy = 0;
 hero.y = Math.min(hero.y, world.h - 110);

 // Grand finale text stack
 texts = [];
 spawnText(world.w/2,180,'GRAND FINALE',hero.ch.alt,7.0,84);
 spawnText(world.w/2,280,'LORD KALEIDOJAW HAS FALLEN',hero.ch.color,6.8,42);
 spawnText(world.w/2,350,`${hero.ch.name.toUpperCase()} CLEARS THE BUILDING`, '#ffffff',6.8,34);
 spawnText(world.w/2,420,'WAVES CONQUERED • BOSS DEFEATED • VICTORY', '#ffea00',6.8,26);

 // Massive celebration bursts
 for(let i=0;i<18;i++){
  setTimeout(()=>{
   burst(world.w*.5 + (Math.random()-.5)*900, 220 + Math.random()*300, hero.ch.color, 20);
   burst(world.w*.5 + (Math.random()-.5)*900, 220 + Math.random()*300, hero.ch.alt, 20);
   burst(world.w*.5 + (Math.random()-.5)*900, 220 + Math.random()*300, '#ffffff', 14);
  }, i * 180);
 }

 // Keep the last boss body around a bit if present, dissolving into the celebration
 const boss = enemies.find(e => e.isBoss);
 if(boss){
  boss.defeated = true;
  boss.dead = true;
  boss.dissolve = Math.max(.6, boss.dissolve || 1);
 }

 $('levelTitle').textContent='GRAND FINALE';
 $('levelSub').textContent='The psychedelic building erupts in victory';
 $('waveTitle').textContent='Champion Victorious';
 $('enemyCount').textContent='Enemies: 0';
 $('bossName').textContent='Boss Defeated';
 $('bossHp').style.width='0%';

 setTimeout(()=>{
  if(state==='finale'){
   $('menu').classList.remove('hidden');
   $('touchControls').classList.remove('show');
  }
 }, 7200);
}

function updateCamera(dt){
 const targetZ = Math.min(0.86, Math.max(0.52, W/1500)); // zoomed-out perspective
 cam.z += (targetZ-cam.z)*.03;
 const targetX = hero.x - W/(2*cam.z);
 const targetY = hero.y - H/(2*cam.z) - 170;
 cam.x += (targetX-cam.x)*.055;
 cam.y += (targetY-cam.y)*.055;
 cam.x=Math.max(0,Math.min(world.w-W/cam.z,cam.x));
 cam.y=Math.max(0,Math.min(world.h-H/cam.z,cam.y));
}

function updateHud(){
 $('heroName').textContent=hero.ch.name;
 $('heroHp').style.width=Math.max(0,hero.hp/hero.maxHp*100)+'%';
 $('heroEnergy').style.width=Math.max(0,hero.energy)+'%';
 const live=enemies.filter(e=>!e.defeated);
 let status = state==='advance' ? 'Advancing...' : `Enemies: ${live.length}`;
 if(hero && (hero.powerBoost>0 || hero.shield>0 || hero.haste>0)){
  const buffs=[];
  if(hero.powerBoost>0) buffs.push('POWER');
  if(hero.shield>0) buffs.push('SHIELD');
  if(hero.haste>0) buffs.push('HASTE');
  status += ' • ' + buffs.join('/');
 }
 $('enemyCount').textContent = status;
 const boss=live.find(e=>e.isBoss);
 if(boss){$('bossName').textContent=boss.ch.name;$('bossHp').style.width=Math.max(0,boss.hp/boss.maxHp*100)+'%'}
 else {$('bossHp').style.width='0%'}
}

function draw(){
 ctx.save(); ctx.setTransform(dpr,0,0,dpr,0,0);
 if(shake>0) ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
 drawBackground();
 ctx.translate(-cam.x*cam.z,-cam.y*cam.z); ctx.scale(cam.z,cam.z);
 drawWorld();
 drawPlatforms();
 drawAdvanceCue();
 drawPickups();
 for(const e of enemies) drawFighter(e);
 drawFighter(hero);
 drawParticles();
 drawTexts();
 ctx.restore();
 drawFinaleOverlay();
}


function drawFinaleOverlay(){
 if(state !== 'finale') return;
 ctx.save();
 ctx.setTransform(dpr,0,0,dpr,0,0);

 // screen glow vignette
 const glow = ctx.createRadialGradient(W*.5,H*.35,20,W*.5,H*.5,Math.max(W,H));
 glow.addColorStop(0,'rgba(255,255,255,0.08)');
 glow.addColorStop(.35,'rgba(255,234,0,0.06)');
 glow.addColorStop(1,'rgba(0,0,0,0)');
 ctx.fillStyle=glow;
 ctx.fillRect(0,0,W,H);

 ctx.textAlign='center';
 ctx.lineWidth=8;

 // top banner
 ctx.globalAlpha=.88;
 ctx.fillStyle='rgba(0,0,0,.34)';
 roundRect(ctx, W*.13, 18, W*.74, 84, 24, true, false);
 ctx.globalAlpha=1;

 ctx.font='900 42px Impact, sans-serif';
 ctx.strokeStyle='#000';
 ctx.fillStyle='#ffffff';
 ctx.strokeText('GRAND FINALE',W*.5,72);
 ctx.fillText('GRAND FINALE',W*.5,72);

 ctx.font='900 22px Impact, sans-serif';
 ctx.fillStyle='#ffea00';
 ctx.strokeText('BOSS DEFEATED • BUILDING CLEARED • CHAMPION ASCENDANT',W*.5,102);
 ctx.fillText('BOSS DEFEATED • BUILDING CLEARED • CHAMPION ASCENDANT',W*.5,102);

 // bottom celebration ribbon
 ctx.globalAlpha=.88;
 ctx.fillStyle='rgba(0,0,0,.36)';
 roundRect(ctx, W*.18, H-90, W*.64, 54, 18, true, false);
 ctx.globalAlpha=1;
 ctx.font='900 20px Impact, sans-serif';
 ctx.fillStyle='#00f6ff';
 ctx.strokeText('Choose a new fighter when the menu returns to run the gauntlet again',W*.5,H-54);
 ctx.fillText('Choose a new fighter when the menu returns to run the gauntlet again',W*.5,H-54);
 ctx.restore();
}

function drawBackground(){
 const lvl=levels[Math.min(levelIndex,levels.length-1)]||levels[0];
 const g=ctx.createRadialGradient(W*.5,H*.35,20,W*.5,H*.45,Math.max(W,H));
 g.addColorStop(0,lvl.a); g.addColorStop(.42,'#120020'); g.addColorStop(1,'#030007');
 ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
 for(let i=0;i<26;i++){
  ctx.strokeStyle=i%2?hexA(lvl.b,.22):hexA(lvl.a,.18); ctx.lineWidth=1+(i%4);
  ctx.beginPath();
  const yy=(i*47 + Math.sin(t*1.7+i)*35)%H;
  ctx.moveTo(0,yy);
  for(let x=0;x<W;x+=45)ctx.lineTo(x,yy+Math.sin(x*.014+t*3+i)*28);
  ctx.stroke();
 }
}

function drawWorld(){
 const lvl=levels[Math.min(levelIndex,levels.length-1)]||levels[0];
 // distant walls
 for(let i=0;i<14;i++){
  const x=i*180 + Math.sin(t*.5+i)*15;
  ctx.fillStyle=i%2?hexA(lvl.a,.13):hexA(lvl.b,.11);
  ctx.fillRect(x,120,120,world.h-180);
  ctx.strokeStyle=hexA(i%2?lvl.b:lvl.a,.35); ctx.lineWidth=3; ctx.strokeRect(x,120,120,world.h-180);
 }
 // huge surreal central mandala
 ctx.save(); ctx.translate(world.w/2,420); ctx.rotate(t*.08);
 for(let i=0;i<12;i++){
  ctx.rotate(Math.PI/6);
  ctx.strokeStyle=i%2?hexA(lvl.a,.48):hexA(lvl.b,.48); ctx.lineWidth=5;
  ctx.strokeRect(100+i*14,-50-i*8,170+i*22,100+i*16);
 }
 ctx.restore();
 // title mural
 ctx.fillStyle='rgba(255,255,255,.12)';
 ctx.font='900 95px Impact, sans-serif'; ctx.textAlign='center';
 ctx.fillText(lvl.name.toUpperCase(),world.w/2,210);
}


function drawAdvanceCue(){
 if(state !== 'advance' || !hero) return;
 ctx.save();
 ctx.globalAlpha=.75+.2*Math.sin(t*8);
 ctx.fillStyle=hero.ch.alt;
 ctx.strokeStyle='#000';
 ctx.lineWidth=5;
 const x=hero.x+170, y=hero.y-hero.h*.9;
 ctx.beginPath();
 ctx.moveTo(x,y);
 ctx.lineTo(x+90,y+32);
 ctx.lineTo(x,y+64);
 ctx.lineTo(x+18,y+38);
 ctx.lineTo(x-90,y+38);
 ctx.lineTo(x-90,y+26);
 ctx.lineTo(x+18,y+26);
 ctx.closePath();
 ctx.stroke();
 ctx.fill();
 ctx.fillStyle='#fff';
 ctx.font='900 22px Impact, sans-serif';
 ctx.textAlign='center';
 ctx.strokeText('NEXT WAVE',x,y-10);
 ctx.fillText('NEXT WAVE',x,y-10);
 ctx.restore();
}

function drawPlatforms(){
 const lvl=levels[Math.min(levelIndex,levels.length-1)]||levels[0];
 for(const p of platforms){
  ctx.fillStyle=p.type==='ground'?lvl.ground:hexA(lvl.a,.75);
  roundRect(ctx,p.x,p.y,p.w,p.h,14,true,false);
  ctx.strokeStyle=p.type==='ground'?hexA(lvl.b,.7):hexA(lvl.b,.9);
  ctx.lineWidth=p.type==='ground'?8:5; roundRect(ctx,p.x,p.y,p.w,p.h,14,false,true);
  if(p.type==='ledge'){
   ctx.fillStyle=hexA('#ffffff',.18);
   for(let x=p.x+20;x<p.x+p.w-20;x+=28){ctx.beginPath();ctx.arc(x,p.y+7,6,0,Math.PI*2);ctx.fill()}
  }
 }
}

function drawFighter(f){
 if(!f || (f.defeated && f.dissolve<=0))return;
 const ch=f.ch;
 ctx.save(); ctx.translate(f.x,f.y);
 if(f.defeated){ ctx.rotate(f.rot || 0); }
 ctx.scale(f.face,1);
 const alpha=f.defeated?Math.max(0,Math.min(1,f.dissolve)):(f.dead?.45:1); ctx.globalAlpha=alpha;
 // shadow
 ctx.fillStyle='rgba(0,0,0,.42)'; ctx.beginPath(); ctx.ellipse(0,12,f.w*.55,18,0,0,Math.PI*2); ctx.fill();
 // aura
 ctx.shadowBlur=f.isBoss?45:24; ctx.shadowColor=ch.color; ctx.fillStyle=hexA(ch.color,f.isBoss?.22:.16);
 ctx.beginPath(); ctx.ellipse(0,-f.h*.55,f.w*.75,f.h*.75,0,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
 if(f.isHero && (f.powerBoost>0 || f.shield>0 || f.haste>0)){
  ctx.save();
  ctx.globalAlpha=.72;
  ctx.lineWidth=5;
  ctx.strokeStyle=f.powerBoost>0?'#fff200':(f.shield>0?'#00f6ff':'#ff7b00');
  ctx.beginPath();
  ctx.arc(0,-f.h*.62,f.w*.95+Math.sin(t*10)*8,0,Math.PI*2);
  ctx.stroke();
  ctx.restore();
 }
 // legs
 ctx.lineCap='round'; ctx.lineJoin='round'; ctx.lineWidth=f.isBoss?30:22; ctx.strokeStyle=ch.alt;
 const kick=(f.attack==='kick'||f.attack==='jumpKick')?56:0;
 ctx.beginPath();
 ctx.moveTo(-f.w*.2,-f.h*.33); ctx.lineTo(-f.w*.34,0);
 ctx.moveTo(f.w*.2,-f.h*.33); ctx.lineTo(f.w*.36+kick,0-(f.attack==='jumpKick'?42:0));
 ctx.stroke();
 // suit / lapel body
 ctx.lineWidth=6;
 ctx.strokeStyle='#07000b';

 const suitX=-f.w*.42, suitY=-f.h*.97, suitW=f.w*.84, suitH=f.h*.66;
 const darkSuit=shadeHex(ch.color,-78);
 const midSuit=shadeHex(ch.color,-36);

 // outer jacket silhouette
 ctx.fillStyle=darkSuit;
 ctx.beginPath();
 ctx.moveTo(suitX+f.w*.14,suitY);
 ctx.lineTo(suitX+suitW-f.w*.14,suitY);
 ctx.quadraticCurveTo(suitX+suitW+f.w*.10,suitY+f.h*.22,suitX+suitW*.82,suitY+suitH);
 ctx.lineTo(suitX+suitW*.18,suitY+suitH);
 ctx.quadraticCurveTo(suitX-f.w*.10,suitY+f.h*.22,suitX+f.w*.14,suitY);
 ctx.closePath();
 ctx.fill();
 ctx.stroke();

 // bright shirt / center panel
 ctx.fillStyle=hexA('#ffffff',.88);
 ctx.beginPath();
 ctx.moveTo(-f.w*.18,suitY+f.h*.05);
 ctx.lineTo(f.w*.18,suitY+f.h*.05);
 ctx.lineTo(f.w*.11,suitY+suitH*.88);
 ctx.lineTo(-f.w*.11,suitY+suitH*.88);
 ctx.closePath();
 ctx.fill();
 ctx.stroke();

 // colored lapels
 ctx.fillStyle=ch.color;
 ctx.beginPath();
 ctx.moveTo(-f.w*.38,suitY+f.h*.02);
 ctx.lineTo(-f.w*.04,suitY+f.h*.23);
 ctx.lineTo(-f.w*.22,suitY+f.h*.56);
 ctx.lineTo(-f.w*.42,suitY+f.h*.30);
 ctx.closePath();
 ctx.fill();
 ctx.stroke();

 ctx.fillStyle=ch.alt;
 ctx.beginPath();
 ctx.moveTo(f.w*.38,suitY+f.h*.02);
 ctx.lineTo(f.w*.04,suitY+f.h*.23);
 ctx.lineTo(f.w*.22,suitY+f.h*.56);
 ctx.lineTo(f.w*.42,suitY+f.h*.30);
 ctx.closePath();
 ctx.fill();
 ctx.stroke();

 // tie / lapel seam
 ctx.fillStyle=midSuit;
 ctx.beginPath();
 ctx.moveTo(0,suitY+f.h*.18);
 ctx.lineTo(f.w*.09,suitY+f.h*.36);
 ctx.lineTo(0,suitY+f.h*.60);
 ctx.lineTo(-f.w*.09,suitY+f.h*.36);
 ctx.closePath();
 ctx.fill();
 ctx.stroke();

 // jacket buttons
 ctx.fillStyle=ch.alt;
 for(let bx of [-f.w*.12,f.w*.12]){
   ctx.beginPath();
   ctx.arc(bx,suitY+f.h*.49,f.w*.045,0,Math.PI*2);
   ctx.fill();
   ctx.stroke();
 }
 // head
 ctx.fillStyle=ch.alt; ctx.beginPath(); ctx.arc(0,-f.h*1.08,f.w*.38,0,Math.PI*2); ctx.fill(); ctx.stroke();
 ctx.font=(f.isBoss?72:52)+'px serif'; ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.fillText(ch.emoji,0,-f.h*1.0);
 // arms
 ctx.lineWidth=f.isBoss?28:20; ctx.strokeStyle=ch.alt;
 const reach=f.attack==='punch'||f.attack==='jumpPunch'?60:f.attack==='special'?125:18;
 ctx.beginPath();
 ctx.moveTo(-f.w*.28,-f.h*.72); ctx.lineTo(-f.w*.68,-f.h*.48+Math.sin(t*8)*12);
 ctx.moveTo(f.w*.28,-f.h*.72); ctx.lineTo(f.w*.62+reach,-f.h*.56);
 ctx.stroke();
 if(f.attack==='special'){
  ctx.shadowBlur=35; ctx.shadowColor=ch.alt; ctx.strokeStyle=ch.alt; ctx.lineWidth=7;
  for(let q=0;q<5;q++){ctx.beginPath();ctx.arc(f.w*.65+q*30,-f.h*.56,24+q*16+Math.sin(t*11+q)*8,0,Math.PI*2);ctx.stroke()}
  ctx.shadowBlur=0;
 }
 // mini hp
 if(!f.isHero){
  ctx.scale(f.face,1);
  ctx.fillStyle='rgba(0,0,0,.55)'; ctx.fillRect(-45,-f.h*1.55,90,8);
  ctx.fillStyle=f.isBoss?'#ff003c':ch.color; ctx.fillRect(-45,-f.h*1.55,90*Math.max(0,f.hp/f.maxHp),8);
 }
 ctx.globalAlpha=1;
 ctx.restore();
}

function blob(x,y,w,h,r){
 ctx.beginPath();ctx.moveTo(x+r,y);
 ctx.bezierCurveTo(x+w*.35,y-16,x+w*.72,y-12,x+w-r,y);
 ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
 ctx.bezierCurveTo(x+w*.65,y+h+16,x+w*.25,y+h+10,x+r,y+h);
 ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.fill();ctx.stroke();
}

function drawPickups(){
 for(const p of pickups){
  ctx.save();
  ctx.translate(p.x,p.y + Math.sin(t*5+p.bob)*8);
  ctx.rotate(Math.sin(t*3+p.bob)*.18);
  ctx.shadowBlur=24;
  ctx.shadowColor=p.color;
  ctx.fillStyle=hexA(p.color,.22);
  ctx.beginPath();
  ctx.arc(0,0,p.size,0,Math.PI*2);
  ctx.fill();
  ctx.shadowBlur=0;
  ctx.strokeStyle=p.color;
  ctx.lineWidth=4;
  ctx.beginPath();
  ctx.arc(0,0,p.size*.78,0,Math.PI*2);
  ctx.stroke();
  ctx.font=(p.size*1.15)+'px serif';
  ctx.textAlign='center';
  ctx.textBaseline='middle';
  ctx.fillStyle='#fff';
  ctx.fillText(p.emoji,0,1);
  ctx.restore();
 }
}

function drawParticles(){particles.forEach(p=>{ctx.globalAlpha=Math.max(0,p.life/60);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1})}
function drawTexts(){texts.forEach(s=>{ctx.save();ctx.globalAlpha=Math.max(0,Math.min(1,s.life));ctx.font='900 '+s.size+'px Impact, sans-serif';ctx.textAlign='center';ctx.lineWidth=7;ctx.strokeStyle='#000';ctx.fillStyle=s.color;ctx.strokeText(s.text,s.x,s.y);ctx.fillText(s.text,s.x,s.y);ctx.restore()})}
function burst(x,y,color,n){for(let i=0;i<n;i++)particles.push({x,y,vx:(Math.random()-.5)*13,vy:(Math.random()-.9)*14,life:25+Math.random()*40,size:3+Math.random()*8,color})}
function spawnText(x,y,text,color,life,size){texts.push({x,y,text,color,life,size})}
function overlap(a,b){return Math.abs(a.x-b.x)*2<(a.w+b.w)&&Math.abs(a.y-b.y)*2<(a.h+b.h)}
function hexA(hex,a){const c=hex.replace('#','');const n=parseInt(c.length===3?c.split('').map(v=>v+v).join(''):c,16);return`rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`}
function shadeHex(hex,amt){
 const c=hex.replace('#','');
 const n=parseInt(c.length===3?c.split('').map(v=>v+v).join(''):c,16);
 const r=Math.max(0,Math.min(255,((n>>16)&255)+amt));
 const g=Math.max(0,Math.min(255,((n>>8)&255)+amt));
 const b=Math.max(0,Math.min(255,(n&255)+amt));
 return `rgb(${r},${g},${b})`;
}
function roundRect(ctx,x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();if(fill)ctx.fill();if(stroke)ctx.stroke()}

function loop(ts){
 const dt=Math.min(.033,(ts-last)/1000||.016); last=ts;
 update(dt); draw(); requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
})();