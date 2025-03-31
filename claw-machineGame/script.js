/***********************
 * EXISTING CODE  ...
 **********************/
const elements = {
  clawMachine: document.querySelector('.claw-machine'),
  box: document.querySelector('.box'),
  collectionBox: document.querySelector('.collection-box'),
  collectionArrow: document.querySelector('.collection-arrow'),
  toys: [],
};

const settings = {
  targetToy: null,
  collectedNumber: 0,
};

// NEW CODE: Track total toys in game. If you want 12 total, set here:
const TOTAL_TOYS = 12;
// In your code, you skip i===8, so effectively 11 spawn. 
// Let's adjust logic or keep it consistent with your approach.

let gameMode = 'free'; // 'free' | 'challenge' | 'extra'
let timerInterval;
let startTime = 0;

// We'll keep best 3 times in an array (lowest is best).
let highScores = [999999, 999999, 999999];

let misses = 0; // track misses for extra mode

/***********************
 * TOYS + WORLD CODE
 **********************/
const m = 2;
const toys = {
  bear: { w: 20*m, h: 27*m },
  bunny: { w: 20*m, h: 29*m },
  golem: { w: 20*m, h: 27*m },
  cucumber: { w: 16*m, h: 28*m },
  penguin: { w: 24*m, h: 22*m },
  robot: { w: 20*m, h: 30*m },
};

const sortedToys = [...Object.keys(toys), ...Object.keys(toys)].sort(
  () => 0.5 - Math.random()
);

const cornerBuffer = 16;
const machineBuffer = { x: 36, y: 16 };

function radToDeg(rad){ return Math.round(rad * (180 / Math.PI)); }
function calcX(i, n){ return i % n; }
function calcY(i, n){ return Math.floor(i / n); }

/* ... measure machine stuff from DOM, etc. ... */
const {
  width: machineWidth,
  height: machineHeight,
  top: machineTop,
} = document.querySelector('.claw-machine').getBoundingClientRect();

const { height: machineTopHeight } =
  document.querySelector('.machine-top').getBoundingClientRect();

const { height: machineBottomHeight, top: machineBottomTop } =
  document.querySelector('.machine-bottom').getBoundingClientRect();

const maxArmLength = machineBottomTop - machineTop - machineBuffer.y;

function adjustAngle(angle){
  const a = angle % 360;
  return a < 0 ? a + 360 : a;
}

function randomN(min, max){
  return Math.round(min - 0.5 + Math.random()*(max - min + 1));
}

/***********************
 * NEW CODE: TIMER + HIGHSCORE
 **********************/

// Instead of one array, keep two separate lists:
let highScoresChallenge = [999999, 999999, 999999];
let highScoresExtra = [999999, 999999, 999999];

function startTimer() {
  startTime = Date.now();
  const timerDisplay = document.getElementById('timer-display');
  document.querySelector('.timer-wrapper').classList.remove('hidden');

  timerInterval = setInterval(() => {
    let now = Date.now();
    let diff = Math.floor((now - startTime) / 1000); // in seconds
    let min = Math.floor(diff / 60);
    let sec = diff % 60;
    timerDisplay.textContent =
      String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function getElapsedTime() {
  return Math.floor((Date.now() - startTime) / 1000);
}

/**
 * Insert a new high score for the given mode if it’s in that mode’s top 3.
 * mode can be 'challenge' or 'extra'.
 */
function updateHighScores(seconds, mode) {
  if (mode === 'challenge') {
    highScoresChallenge.push(seconds);
    highScoresChallenge.sort((a, b) => a - b); // ascending
    highScoresChallenge = highScoresChallenge.slice(0, 3);
  } else if (mode === 'extra') {
    highScoresExtra.push(seconds);
    highScoresExtra.sort((a, b) => a - b);
    highScoresExtra = highScoresExtra.slice(0, 3);
  }
}

/**
 * Renders the high-score list for the given mode only.
 */
function renderHighScores(mode) {
  const scoreboard = document.getElementById('scoreboard');
  const list = document.getElementById('score-list');
  scoreboard.classList.remove('hidden');
  list.innerHTML = '';

  // Decide which array to display
  let arr = mode === 'challenge' ? highScoresChallenge : highScoresExtra;

  arr.forEach(score => {
    if (score === 999999) {
      // means no real score stored yet
      list.innerHTML += `<li>--:--</li>`;
    } else {
      // Convert seconds to mm:ss
      let min = Math.floor(score / 60);
      let sec = score % 60;
      let mmss = String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
      list.innerHTML += `<li>${mmss}</li>`;
    }
  });
}

/***********************
 * NEW CODE: MISSES / PUT TOY BACK
 **********************/
function handleMiss(){
  if(gameMode === 'extra'){
    // If we have something in the collection, remove one toy
    const wrappers = elements.collectionBox.querySelectorAll('.toy-wrapper');
    if(wrappers.length > 0){
      const lastWrapper = wrappers[wrappers.length - 1];
      lastWrapper.remove();
      settings.collectedNumber--;

      // Optionally re-insert that toy into the game at random position
      // For simplicity, let's create a new random toy. 
      // If you want the same toy type that was removed, you can track it more carefully.
      spawnOneToy();
    }
  }
}

/***********************
 * WORLD OBJECTS ...
 **********************/
class Button {
  constructor({ className, action, isLocked, pressAction, releaseAction }) {
    Object.assign(this, { 
      el: document.querySelector(`.${className}`),
      isLocked 
    });
    this.el.addEventListener('click', action);
    ['mousedown','touchstart'].forEach(evt=>
      this.el.addEventListener(evt, pressAction)
    );
    ['mouseup','touchend'].forEach(evt=>
      this.el.addEventListener(evt, releaseAction)
    );

    if(!isLocked) this.activate();
  }
  activate(){
    this.isLocked = false;
    this.el.classList.add('active');
  }
  deactivate(){
    this.isLocked = true;
    this.el.classList.remove('active');
  }
}

class WorldObject {
  constructor(props){
    Object.assign(this, {
      x:0, y:0, z:0, angle:0, transformOrigin:{x:0,y:0}, 
      interval:null, default:{}, moveWith:[],
      el: props.className && document.querySelector(`.${props.className}`),
      ...props
    });
    this.setStyles();
    if(props.className){
      const {width,height} = this.el.getBoundingClientRect();
      this.w=width; this.h=height;
    }
    ['x','y','w','h'].forEach(k=> this.default[k] = this[k]);
  }
  setStyles(){
    Object.assign(this.el.style, {
      left: `${this.x}px`,
      top: !this.bottom && `${this.y}px`,
      bottom: this.bottom,
      width: `${this.w}px`,
      height: `${this.h}px`,
      transformOrigin: this.transformOrigin,
      zIndex: this.z
    });
  }
  setClawPos(clawPos){
    this.clawPos = clawPos;
  }
  setTransformOrigin(transformOrigin){
    this.transformOrigin = 
      (transformOrigin==='center')
        ? 'center'
        : `${transformOrigin.x}px ${transformOrigin.y}px`;
    this.setStyles();
  }
  handleNext(next){
    clearInterval(this.interval);
    if(next) next();
  }
  resumeMove({moveKey,target,moveTime,next}){
    this.interval=null;
    this.move({moveKey,target,moveTime,next});
  }
  resizeShadow(){
    elements.box.style.setProperty('--scale', 0.5 + this.h/maxArmLength/2);
  }
  move({moveKey,target,moveTime,next}){
    if(this.interval){
      this.handleNext(next);
    } else {
      const moveTarget = target || this.default[moveKey];
      this.interval = setInterval(()=>{
        const distance = Math.abs(this[moveKey]-moveTarget)<10
          ? Math.abs(this[moveKey]-moveTarget)
          : 10;
        const increment = (this[moveKey]>moveTarget) ? -distance : distance;
        if(increment>0 ? this[moveKey]<moveTarget : this[moveKey]>moveTarget){
          this[moveKey]+=increment;
          this.setStyles();
          if(moveKey==='h') this.resizeShadow();
          if(this.moveWith.length){
            this.moveWith.forEach(obj=>{
              if(!obj) return;
              if(moveKey==='h'){ 
                obj.y+=increment; 
              } else {
                obj[moveKey]+=increment; 
              }
              obj.setStyles();
            });
          }
        } else {
          this.handleNext(next);
        }
      }, moveTime||100);
    }
  }
  distanceBetween(target){
    return Math.round(
      Math.sqrt( (this.x-target.x)**2 + (this.y-target.y)**2 )
    );
  }
}

class Toy extends WorldObject {
  constructor(props){
    const toyType = sortedToys[props.index];
    const size = toys[toyType];
    super({
      el: Object.assign(document.createElement('div'), {
        className: `toy pix ${toyType}`,
      }),
      x: cornerBuffer
         + calcX(props.index,4)*((machineWidth - cornerBuffer*3)/4)
         + size.w/2
         + randomN(-6,6),
      y: machineBottomTop - machineTop + cornerBuffer
         + calcY(props.index,4)*((machineBottomHeight - cornerBuffer*2)/3)
         - size.h/2
         + randomN(-2,2),
      z:0,
      toyType,
      ...size,
      ...props
    });
    elements.box.append(this.el);
    const toy = this;

    this.el.addEventListener('click', ()=> this.collectToy(toy));
    elements.toys.push(this);
  }
  collectToy(toy){
    toy.el.classList.remove('selected');
    toy.x = machineWidth/2 - toy.w/2;
    toy.y = machineHeight/2 - toy.h/2;
    toy.z = 7;
    toy.el.style.setProperty('--rotate-angle','0deg');
    toy.setTransformOrigin('center');
    toy.el.classList.add('display');
    elements.clawMachine.classList.add('show-overlay');

    settings.collectedNumber++;
    elements.collectionBox.appendChild(
      Object.assign(document.createElement('div'), {
        className: `toy-wrapper ${settings.collectedNumber>6?'squeeze-in':''}`,
        innerHTML: `<div class="toy pix ${toy.toyType}"></div>`,
      })
    );

    setTimeout(()=>{
      elements.clawMachine.classList.remove('show-overlay');
      if(!document.querySelector('.selected')){
        elements.collectionArrow.classList.remove('active');
      }
      checkAllCollected(); // NEW CODE: check if done
    }, 1000);
  }
  setRotateAngle(){
    const angle = radToDeg(
      Math.atan2(
        this.y + this.h/2 - this.clawPos.y,
        this.x + this.w/2 - this.clawPos.x
      )
    ) - 90;
    const adjustedAngle = Math.round(adjustAngle(angle));
    this.angle = (adjustedAngle<180) ? adjustedAngle*-1 : 360 - adjustedAngle;
    this.el.style.setProperty('--rotate-angle', `${this.angle}deg`);
  }
}

/********************************
 * GAME FLOW: SETUP / RESET / ETC
 ********************************/

// Spawn all toys at game start
function spawnToys(){
  elements.toys = []; // clear old references
  // your code spawns 12 but skips i===8. We'll replicate that:
  for(let i=0; i<12; i++){
    if(i===8) continue; // skip
    new Toy({ index: i });
  }
}

function spawnOneToy(){
  let i = Math.floor(Math.random() * sortedToys.length);
  new Toy({ index: i });
}

// Clear the board (if we want a full reset)
function clearBoard(){
  // remove existing toys
  elements.toys.forEach(t=>{
    t.el.remove();
  });
  elements.toys = [];
  // remove from collection
  elements.collectionBox.innerHTML='';
  settings.collectedNumber = 0;
}

// Start game in given mode
function startGame(mode){
  gameMode = mode;
  // remove scoreboard/timer from previous
  
  document.querySelector('.timer-wrapper').classList.add('hidden');
  document.getElementById('timer-display').textContent = "00:00";
  
  clearBoard();
  spawnToys();

  if(mode==='challenge' || mode==='extra'){
    startTimer();
    misses = 0;
  } else {
    // free play
    stopTimer();
  }
}

// Check if all objects are collected
function checkAllCollected(){
  // If we have 12 toys, but you skip i===8 => only 11 exist. 
  // If your total is effectively 11, then:
  if(settings.collectedNumber >= 11){
    endGame();
  }
}

function endGame() {
  stopTimer();
  const finalTime = getElapsedTime();

  // If we’re in challenge mode:
  if (gameMode === 'challenge') {
    updateHighScores(finalTime, 'challenge');
    renderHighScores('challenge');
  } 
  // If we’re in extra mode:
  else if (gameMode === 'extra') {
    updateHighScores(finalTime, 'extra');
    renderHighScores('extra');
  }
  
  // Trigger final disco confetti + meltdown
  showCelebration();
}

/********************************
 * CELEBRATORY ENDING
 *   1) Animate each collected toy’s 3 frames
 *   2) Rainbow disco confetti
 *   3) “Melt” the screen
 *   4) Reset to original
 ********************************/
function showCelebration() {
  launchConfetti();

  const celebrationWrapper = document.createElement('div');
  celebrationWrapper.id = 'celebration-wrapper';

  const gif = document.createElement('img');
  gif.src = './images/IMG_1278.gif';
  gif.id = 'celebration-gif';

  // Actually append scoreboard in the wrapper
  const scoreboard = document.getElementById('scoreboard');
  scoreboard.classList.remove('hidden');
  celebrationWrapper.appendChild(gif);
  celebrationWrapper.appendChild(scoreboard);
  document.body.appendChild(celebrationWrapper);

  setTimeout(() => {
    document.body.classList.add('melt-screen');
  }, 8000);

  setTimeout(() => {
    // *** Move scoreboard back out ***
    celebrationWrapper.removeChild(scoreboard);
    document.body.appendChild(scoreboard);

    // Now remove the wrapper from DOM
    document.body.classList.remove('melt-screen');
    document.body.removeChild(celebrationWrapper);

    // scoreboard is still in DOM for next time
    scoreboard.classList.add('hidden');
    startGame('free');
  }, 10000);
}

  

// Example meltdown animation
// Put in your CSS:
/*
@mkeyframes meltdown {
  0% { filter: none; opacity: 1; }
  50% { filter: blur(10px); }
  100% { opacity: 0; transform: translateY(100vh) skewX(60deg); }
}
body.melt-screen {
  animation: meltdown 3s forwards;
}
*/

// A refined confetti generator:
    function launchConfetti() {
      // Create 100 confetti pieces for a denser effect
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          const confetto = document.createElement("div");
          confetto.className = "confetto";
          // Random horizontal start position
          confetto.style.left = Math.random() * 100 + "%";
          // Start above the viewport
          confetto.style.top = -20 + "px";
          // Set a random value for --rand so the hsl calculation is valid
          confetto.style.setProperty("--rand", Math.random());
          document.body.appendChild(confetto);
          
          // Animate: fall down with horizontal drift and rotation.
          const horizontalDrift = (Math.random() * 100) - 50; // drift between -50px to +50px
          const rotation = Math.random() * 720; // random rotation up to 720 deg
          confetto.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${horizontalDrift}px, 110vh) rotate(${rotation}deg)`, opacity: 0 }
          ], {
            duration: 4000 + Math.random() * 2000,
            easing: "ease-out",
            fill: "forwards"
          });
          // Remove after the animation
          setTimeout(() => confetto.remove(), 10000);
        }, i * 50);
      }
    }
    

// Minimal confetti styling
// add to your CSS
/*
.confetto {
  position: fixed;
  top: 0;
  width: 8px;
  height: 8px;
  background: hsl( calc(360 * var(--rand)), 100%, 50% );
  border-radius: 50%;
  pointer-events: none;
  animation: confettiSpin 1s linear infinite;
}
@keyframes confettiSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/

// Finally, wire up the new mode buttons
document.getElementById('btnFree').addEventListener('click', ()=> startGame('free'));
document.getElementById('btnChallenge').addEventListener('click', ()=> startGame('challenge'));
document.getElementById('btnExtraChallenge').addEventListener('click', ()=> startGame('extra'));

/********************************
 * MAIN CLUTCH + MOVEMENT (unchanged except we call handleMiss() on a miss)
 ********************************/
 
 //* set up *//
  elements.box.style.setProperty('--shadow-pos', `${maxArmLength}px`)

  const armJoint = new WorldObject({
    className: 'arm-joint',
  })

  const vertRail = new WorldObject({
    className: 'vert',
    moveWith: [null, armJoint],
  })

  const arm = new WorldObject({
    className: 'arm',
  })

  armJoint.resizeShadow()

  armJoint.move({
    moveKey: 'y',
    target: machineTopHeight - machineBuffer.y,
    moveTime: 50,
    next: () =>
      vertRail.resumeMove({
        moveKey: 'x',
        target: machineBuffer.x,
        moveTime: 50,
        next: () => {
          Object.assign(armJoint.default, {
            y: machineTopHeight - machineBuffer.y,
            x: machineBuffer.x,
          })
          Object.assign(vertRail.default, {
            x: machineBuffer.x,
          })
          activateHoriBtn()
        },
      }),
  })

function doOverlap(a,b){
  return (b.x>a.x && b.x<(a.x+a.w) && b.y>a.y && b.y<(a.y+a.h));
}

function getClosestToy(){
  const claw = {
    y: armJoint.y + maxArmLength + machineBuffer.y + 7,
    x: armJoint.x + 7,
    w: 40,
    h: 32
  };
  const overlapped = elements.toys.filter(t=> doOverlap(t,claw));
  if(overlapped.length){
    const toy = overlapped.sort((a,b)=> b.index - a.index)[0];
    toy.setTransformOrigin({
      x:claw.x - toy.x,
      y:claw.y - toy.y
    });
    toy.setClawPos({ x:claw.x, y:claw.y });
    settings.targetToy = toy;
  }
}

// spawning your 12 toys
// This is done in spawnToys()

// The normal button logic...
function stopHoriBtnAndActivateVertBtn(){
  armJoint.interval=null;
  horiBtn.deactivate();
  vertBtn.activate();
}

function activateHoriBtn(){
  horiBtn.activate();
  [vertRail, armJoint, arm].forEach(c=> c.interval=null);
}

function dropToy(){
  arm.el.classList.add('open');
  if(settings.targetToy){
    settings.targetToy.z=3;
    settings.targetToy.move({
      moveKey:'y',
      target: machineHeight - settings.targetToy.h -30,
      moveTime:50
    });
    [vertRail,armJoint,arm].forEach(o=> o.moveWith[0]=null);
  }
  setTimeout(()=>{
    arm.el.classList.remove('open');
    activateHoriBtn();
    if(settings.targetToy){
      settings.targetToy.el.classList.add('selected');
      elements.collectionArrow.classList.add('active');
      settings.targetToy=null;
    }
  },700);
}

function grabToy(){
  if(settings.targetToy){
    [vertRail,armJoint,arm].forEach(o=> o.moveWith[0]=settings.targetToy);
    settings.targetToy.setRotateAngle();
    settings.targetToy.el.classList.add('grabbed');
  } else {
    arm.el.classList.add('missed');
    // NEW CODE: handle a 'miss'
    handleMiss();
  }
}


// existing button code
const horiBtn = new Button({
  className:'hori-btn',
  isLocked:true,
  pressAction: ()=>{
    arm.el.classList.remove('missed');
    vertRail.move({
      moveKey:'x',
      target: machineWidth - armJoint.w - machineBuffer.x,
      next: stopHoriBtnAndActivateVertBtn
    });
  },
  releaseAction: ()=>{
    clearInterval(vertRail.interval);
    stopHoriBtnAndActivateVertBtn();
  }
});

const vertBtn = new Button({
  className:'vert-btn',
  isLocked:true,
  pressAction: ()=>{
    if(vertBtn.isLocked) return;
    armJoint.move({
      moveKey:'y',
      target: machineBuffer.y
    });
  },
  releaseAction: ()=>{
    clearInterval(armJoint.interval);
    vertBtn.deactivate();
    getClosestToy();
    setTimeout(()=>{
      arm.el.classList.add('open');
      arm.move({
        moveKey:'h',
        target: maxArmLength,
        next: ()=>{
          setTimeout(()=>{
            arm.el.classList.remove('open');
            grabToy();
            arm.resumeMove({
              moveKey:'h',
              next: ()=>{
                vertRail.resumeMove({
                  moveKey:'x',
                  next: ()=>{
                    armJoint.resumeMove({
                      moveKey:'y',
                      next: dropToy
                    });
                  }
                })
              }
            })
          },500);
        }
      })
    },500);
  }
});

/********************************
 * ON LOAD: Start free mode by default
 ********************************/
startGame('free');