/* ============================================================
   CUTSCENES — Animated SVG "videos" for each fighter
   - renderWinCutscene(charId)  — round/match win flash
   - renderLoseCutscene(charId) — round/match loss flash
   - renderEndingCutscene(charId)— full tournament ending
   ============================================================ */

(function(global){

  /* ------- Helpers ------- */
  function bg(colors){
    const stops = colors.map((c,i)=>{
      const off = (i/(colors.length-1))*100;
      return `<stop offset="${off}%" stop-color="${c}"/>`;
    }).join('');
    const id = 'bg'+Math.floor(Math.random()*99999);
    return {
      defs: `<linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">${stops}</linearGradient>`,
      fill: `url(#${id})`,
      id
    };
  }

  function rays(cx, cy, color, count, len){
    let out = '';
    for(let i=0; i<count; i++){
      const a = (i/count)*360;
      out += `<rect x="${cx-3}" y="${cy-len}" width="6" height="${len}" fill="${color}" transform="rotate(${a} ${cx} ${cy})" opacity="0.7"/>`;
    }
    return `<g><animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="8s" repeatCount="indefinite"/>${out}</g>`;
  }

  function stars(n, w, h, color){
    let out = '';
    for(let i=0; i<n; i++){
      const x = Math.random()*w, y = Math.random()*h, r = Math.random()*2+0.5;
      const dur = (3 + Math.random()*4).toFixed(1)+'s';
      out += `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"><animate attributeName="opacity" values="0.2;1;0.2" dur="${dur}" repeatCount="indefinite"/></circle>`;
    }
    return out;
  }

  function blob(cx, cy, r, color, dur){
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="0.55">
      <animate attributeName="r" values="${r};${r*1.4};${r}" dur="${dur||'3s'}" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="${dur||'3s'}" repeatCount="indefinite"/>
    </circle>`;
  }

  /* ============================================================
     WIN CUTSCENE — quick flash of glory
     ============================================================ */
  function renderWinCutscene(charId){
    const c = getChar(charId);
    if(!c) return '';
    const p = c.palette || ['#ff2bd6','#00f0ff','#ffe600','#ff7a00'];
    const portrait = c.render(POSES.win, {scale:1});
    return `
    <div class="cutscene cutscene-win">
      <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        <defs>
          <radialGradient id="winGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="${p[2]||'#ffe600'}" stop-opacity="0.9"/>
            <stop offset="50%" stop-color="${p[0]}" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#000" stop-opacity="1"/>
          </radialGradient>
        </defs>
        <rect width="600" height="380" fill="url(#winGlow)"/>
        ${rays(300, 200, p[2]||'#ffe600', 24, 380)}
        ${stars(40, 600, 380, '#fff')}
        <text x="300" y="80" text-anchor="middle" font-family="Bungee Shade, cursive" font-size="56" fill="${p[2]||'#ffe600'}" stroke="${p[3]||'#000'}" stroke-width="2">VICTORY</text>
        <text x="300" y="340" text-anchor="middle" font-family="Rubik Mono One, sans-serif" font-size="22" fill="${p[1]||'#fff'}">${c.name}</text>
      </svg>
      <div class="cutscene-portrait">${portrait}</div>
    </div>`;
  }

  /* ============================================================
     LOSE CUTSCENE — KO, defeat
     ============================================================ */
  function renderLoseCutscene(charId){
    const c = getChar(charId);
    if(!c) return '';
    const p = c.palette || ['#666','#333','#fff','#ff0033'];
    const portrait = c.render(POSES.lose, {scale:0.9});
    return `
    <div class="cutscene cutscene-lose">
      <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        <defs>
          <radialGradient id="loseGrad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stop-color="#330000"/>
            <stop offset="60%" stop-color="#0a0014"/>
            <stop offset="100%" stop-color="#000"/>
          </radialGradient>
        </defs>
        <rect width="600" height="380" fill="url(#loseGrad)"/>
        <g opacity="0.4">${stars(60, 600, 380, '#ff4488')}</g>
        <g><text x="300" y="100" text-anchor="middle" font-family="Bungee Shade, cursive" font-size="60" fill="#ff0033" stroke="#000" stroke-width="2">DEFEAT</text>
          <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite"/>
        </g>
        <g opacity="0.7">
          <line x1="100" y1="180" x2="500" y2="220" stroke="#ff0033" stroke-width="2" stroke-dasharray="6 8"/>
          <line x1="80" y1="240" x2="520" y2="200" stroke="#660000" stroke-width="3"/>
        </g>
        <text x="300" y="340" text-anchor="middle" font-family="VT323, monospace" font-size="22" fill="#ff8888">~ ${c.tag} ~</text>
      </svg>
      <div class="cutscene-portrait lose">${portrait}</div>
    </div>`;
  }

  /* ============================================================
     ENDING CUTSCENE — full tournament victory story
     ============================================================ */

  // Per-character "scene" backdrop SVG using their endingPalette
  const endingScenes = {

    loraxon(p){
      return `
        <defs><linearGradient id="es-lor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${p[0]}"/><stop offset="100%" stop-color="${p[1]}"/>
        </linearGradient></defs>
        <rect width="800" height="450" fill="url(#es-lor)"/>
        ${stars(30, 800, 200, '#fff')}
        <!-- truffula trees regrowing -->
        ${[100,250,400,560,700].map((x,i)=>{
          const tuft = p[i%2===0?2:3];
          return `<g>
            <line x1="${x}" y1="450" x2="${x}" y2="${250-i*10}" stroke="#ffaa00" stroke-width="${6-i%3}" stroke-dasharray="14 8"/>
            <circle cx="${x}" cy="${240-i*10}" r="${30+i*3}" fill="${tuft}">
              <animate attributeName="r" values="${30+i*3};${36+i*3};${30+i*3}" dur="${2+i*0.3}s" repeatCount="indefinite"/>
            </circle></g>`;
        }).join('')}
        <text x="400" y="60" text-anchor="middle" font-family="Bungee Shade, cursive" font-size="36" fill="${p[2]}">THE FOREST RETURNS</text>`;
    },

    alyce(p){
      return `
        <defs><linearGradient id="es-al" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${p[0]}"/><stop offset="100%" stop-color="${p[3]}"/>
        </linearGradient></defs>
        <rect width="800" height="450" fill="url(#es-al)"/>
        <!-- floating teacups -->
        ${[150,350,550,250,650].map((x,i)=>`
          <g transform="translate(${x},${100+i*50})">
            <ellipse cx="0" cy="0" rx="40" ry="14" fill="${p[1]}"/>
            <rect x="-30" y="-20" width="60" height="22" fill="${p[1]}" stroke="${p[2]}" stroke-width="2"/>
            <animateTransform attributeName="transform" type="translate" values="${x},${100+i*50};${x},${130+i*50};${x},${100+i*50}" dur="${3+i*0.4}s" repeatCount="indefinite"/>
          </g>`).join('')}
        <!-- crown -->
        <g transform="translate(400,300)">
          <polygon points="-60,0 -40,-50 -20,-15 0,-60 20,-15 40,-50 60,0" fill="${p[2]}" stroke="${p[3]}" stroke-width="3"/>
          <circle cx="-40" cy="-50" r="6" fill="#ff0033"/>
          <circle cx="0" cy="-60" r="8" fill="#00ff88"/>
          <circle cx="40" cy="-50" r="6" fill="#0088ff"/>
        </g>
        <text x="400" y="80" text-anchor="middle" font-family="Cinzel Decorative, serif" font-size="32" fill="${p[2]}">QUEEN OF EVERYTHING</text>`;
    },

    raoul(p){
      return `
        <rect width="800" height="450" fill="${p[3]}"/>
        <!-- desert horizon -->
        <rect y="280" width="800" height="170" fill="${p[2]}" opacity="0.5"/>
        <!-- vegas neon -->
        <text x="400" y="100" text-anchor="middle" font-family="Bungee Shade, cursive" font-size="56" fill="${p[0]}" stroke="${p[1]}" stroke-width="2">VEGAS</text>
        <text x="400" y="160" text-anchor="middle" font-family="Bungee Shade, cursive" font-size="32" fill="${p[1]}">~ THE DREAM IS DEAD ~</text>
        <!-- bats -->
        ${[100,200,600,700].map((x,i)=>`
          <g transform="translate(${x},${200+i*15})">
            <path d="M-20,0 Q-10,-15 0,0 Q10,-15 20,0 L10,5 L0,0 L-10,5 Z" fill="${p[3]}" stroke="${p[1]}" stroke-width="1"/>
            <animateTransform attributeName="transform" type="translate" values="${x},${200+i*15};${x+30},${190+i*15};${x},${200+i*15}" dur="${1+i*0.2}s" repeatCount="indefinite"/>
          </g>`).join('')}
        <!-- car -->
        <g transform="translate(400,360)">
          <rect x="-90" y="-30" width="180" height="40" rx="8" fill="#cc0000" stroke="${p[3]}" stroke-width="2"/>
          <rect x="-60" y="-50" width="120" height="22" rx="4" fill="#660000" stroke="${p[3]}" stroke-width="2"/>
          <circle cx="-60" cy="20" r="14" fill="${p[3]}"/>
          <circle cx="60" cy="20" r="14" fill="${p[3]}"/>
        </g>`;
    },

    bucky(p){
      return `
        <defs><radialGradient id="es-bu" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="${p[1]}"/><stop offset="100%" stop-color="${p[0]}"/>
        </radialGradient></defs>
        <rect width="800" height="450" fill="url(#es-bu)"/>
        ${stars(80, 800, 450, p[3])}
        <!-- Big geodesic dome lattice -->
        <g transform="translate(400,250)">
          ${(function(){
            let pts=[]; const r=180;
            for(let i=0;i<12;i++){pts.push([Math.cos(i*Math.PI/6)*r, Math.sin(i*Math.PI/6)*r]);}
            let lines='';
            for(let i=0;i<pts.length;i++){
              for(let j=i+1;j<pts.length;j++){
                if((j-i)<=4 || (j-i)>=8) lines += `<line x1="${pts[i][0]}" y1="${pts[i][1]}" x2="${pts[j][0]}" y2="${pts[j][1]}" stroke="${p[2]}" stroke-width="1.4" opacity="0.8"/>`;
              }
            }
            let dots = pts.map(pt=>`<circle cx="${pt[0]}" cy="${pt[1]}" r="5" fill="${p[2]}"/>`).join('');
            return `<g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite"/>${lines}${dots}</g>`;
          })()}
        </g>
        <text x="400" y="60" text-anchor="middle" font-family="Rubik Mono One, sans-serif" font-size="28" fill="${p[2]}">TENSEGRITY ETERNAL</text>`;
    },

    voyager(p){
      return `
        <rect width="800" height="450" fill="${p[0]}"/>
        ${stars(120, 800, 450, p[1])}
        <!-- planet -->
        <circle cx="160" cy="380" r="120" fill="${p[1]}" opacity="0.3"/>
        <circle cx="160" cy="380" r="80" fill="${p[1]}" opacity="0.6"/>
        <!-- monolith -->
        <rect x="380" y="100" width="40" height="280" fill="${p[0]}" stroke="${p[1]}" stroke-width="2">
          <animate attributeName="x" values="380;382;380;378;380" dur="0.4s" repeatCount="indefinite"/>
        </rect>
        <!-- starchild eye-->
        <g transform="translate(620,200)">
          <circle cx="0" cy="0" r="80" fill="${p[1]}" opacity="0.2">
            <animate attributeName="r" values="80;100;80" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="0" cy="0" r="40" fill="${p[2]}"/>
          <circle cx="0" cy="0" r="20" fill="${p[0]}"/>
          <circle cx="-5" cy="-5" r="6" fill="${p[1]}"/>
        </g>
        <text x="400" y="50" text-anchor="middle" font-family="Bungee Shade, cursive" font-size="28" fill="${p[2]}">BEYOND THE INFINITE</text>`;
    },

    taarna(p){
      return `
        <defs><linearGradient id="es-ta" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${p[3]}"/><stop offset="100%" stop-color="${p[0]}"/>
        </linearGradient></defs>
        <rect width="800" height="450" fill="url(#es-ta)"/>
        <!-- twin moons -->
        <circle cx="200" cy="120" r="50" fill="${p[1]}"/>
        <circle cx="600" cy="160" r="35" fill="${p[2]}"/>
        <!-- spires -->
        ${[80,250,500,720].map((x,i)=>`<polygon points="${x},450 ${x-20},${250+i*20} ${x+20},${250+i*20}" fill="${p[0]}" stroke="${p[1]}" stroke-width="1"/>`).join('')}
        <!-- sword in stone -->
        <g transform="translate(400,300)">
          <rect x="-30" y="50" width="60" height="100" fill="${p[3]}"/>
          <line x1="0" y1="50" x2="0" y2="-100" stroke="${p[1]}" stroke-width="6"/>
          <line x1="-30" y1="-100" x2="30" y2="-100" stroke="${p[2]}" stroke-width="8"/>
          <circle cx="0" cy="-115" r="8" fill="${p[0]}"/>
          <g><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
            ${rays(0,-30, p[2], 12, 120)}
          </g>
        </g>
        <text x="400" y="50" text-anchor="middle" font-family="Cinzel Decorative, serif" font-size="32" fill="${p[1]}">THE LAST TAARAKIAN</text>`;
    },

    zorth(p){
      return `
        <defs><radialGradient id="es-zo" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stop-color="${p[1]}"/><stop offset="100%" stop-color="${p[0]}"/>
        </radialGradient></defs>
        <rect width="800" height="450" fill="url(#es-zo)"/>
        <!-- giant mushroom -->
        <g transform="translate(400,300)">
          <rect x="-30" y="0" width="60" height="150" fill="${p[2]}"/>
          <ellipse cx="0" cy="0" rx="180" ry="80" fill="${p[3]}"/>
          ${[-100,-50,0,50,100].map(x=>`<circle cx="${x}" cy="-20" r="12" fill="${p[1]}"/>`).join('')}
          <animateTransform attributeName="transform" type="translate" values="400,300;400,290;400,300" dur="3s" repeatCount="indefinite"/>
        </g>
        <!-- smoke rings -->
        ${[1,2,3,4].map(i=>`
          <ellipse cx="400" cy="${250-i*40}" rx="${50+i*15}" ry="${10+i*3}" fill="none" stroke="${p[2]}" stroke-width="2" opacity="${0.6-i*0.1}">
            <animate attributeName="ry" values="${10+i*3};${15+i*3};${10+i*3}" dur="${2+i*0.5}s" repeatCount="indefinite"/>
          </ellipse>`).join('')}
        <text x="400" y="60" text-anchor="middle" font-family="Bungee Shade, cursive" font-size="28" fill="${p[2]}">THE QUESTION ANSWERED</text>`;
    },

    cheshire(p){
      return `
        <rect width="800" height="450" fill="${p[3]}"/>
        ${stars(60, 800, 450, p[0])}
        <!-- floating grins -->
        ${[150,400,650].map((x,i)=>`
          <g transform="translate(${x},${150+i*60})">
            <path d="M-60,0 Q0,40 60,0 L50,5 L40,15 L20,20 L0,22 L-20,20 L-40,15 L-50,5 Z" fill="${p[2]}" stroke="${p[3]}" stroke-width="2"/>
            ${[-40,-25,-10,5,20,35].map(tx=>`<line x1="${tx}" y1="5" x2="${tx}" y2="18" stroke="${p[3]}" stroke-width="2"/>`).join('')}
            <animate attributeName="opacity" values="0.3;1;0.3" dur="${2+i*0.5}s" repeatCount="indefinite"/>
          </g>`).join('')}
        <!-- big striped tail -->
        <g transform="translate(400,360)">
          ${[0,30,60,90,120,150].map(a=>`<path d="M0,0 Q${20*Math.cos(a*Math.PI/180)},${-20-a*0.3} ${40*Math.cos(a*Math.PI/180)},${-40-a*0.3}" stroke="${a%60===0?p[1]:p[0]}" stroke-width="14" fill="none"/>`).join('')}
        </g>
        <text x="400" y="60" text-anchor="middle" font-family="Bungee Shade, cursive" font-size="28" fill="${p[1]}">WE'RE ALL MAD HERE</text>`;
    },

    mckennx(p){
      return `
        <defs><linearGradient id="es-mc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${p[0]}"/><stop offset="100%" stop-color="${p[3]}"/>
        </linearGradient></defs>
        <rect width="800" height="450" fill="url(#es-mc)"/>
        <!-- machine elves -->
        ${[200,400,600].map((x,i)=>`
          <g transform="translate(${x},${200})">
            <ellipse cx="0" cy="0" rx="40" ry="60" fill="${p[1]}" opacity="0.7"/>
            <circle cx="-15" cy="-20" r="6" fill="${p[2]}"/>
            <circle cx="15" cy="-20" r="6" fill="${p[2]}"/>
            <path d="M-20,10 Q0,20 20,10" stroke="${p[2]}" stroke-width="2" fill="none"/>
            <animateTransform attributeName="transform" type="translate" values="${x},200;${x},220;${x},200" dur="${2+i*0.4}s" repeatCount="indefinite"/>
          </g>`).join('')}
        <!-- fractal -->
        <g transform="translate(400,330)">
          ${[40,60,80,100,120,140].map((r,i)=>`<polygon points="${r},0 ${r/2},${r*0.866} ${-r/2},${r*0.866} ${-r},0 ${-r/2},${-r*0.866} ${r/2},${-r*0.866}" fill="none" stroke="${i%2?p[2]:p[3]}" stroke-width="2" opacity="${0.8-i*0.1}"><animateTransform attributeName="transform" type="rotate" from="0" to="${i%2?360:-360}" dur="${10+i*2}s" repeatCount="indefinite"/></polygon>`).join('')}
        </g>
        <text x="400" y="60" text-anchor="middle" font-family="VT323, monospace" font-size="32" fill="${p[2]}">THE LANGUAGE WAS ALWAYS THERE</text>`;
    },

    plasma(p){
      return `
        <defs><radialGradient id="es-pl" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stop-color="${p[1]}" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="${p[0]}"/>
        </radialGradient></defs>
        <rect width="800" height="450" fill="url(#es-pl)"/>
        ${stars(150, 800, 450, p[1])}
        <!-- big halo -->
        <g transform="translate(400,220)">
          <circle cx="0" cy="0" r="120" fill="none" stroke="${p[2]}" stroke-width="3" opacity="0.7">
            <animate attributeName="r" values="120;140;120" dur="3s" repeatCount="indefinite"/>
          </circle>
          ${(function(){
            let out='';
            for(let i=0;i<24;i++){
              const a=i*15*Math.PI/180;
              out+=`<circle cx="${130*Math.cos(a)}" cy="${130*Math.sin(a)}" r="4" fill="${p[2]}"/>`;
            }
            return `<g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="14s" repeatCount="indefinite"/>${out}</g>`;
          })()}
          <!-- cross -->
          <line x1="0" y1="-40" x2="0" y2="40" stroke="${p[1]}" stroke-width="6"/>
          <line x1="-25" y1="-15" x2="25" y2="-15" stroke="${p[1]}" stroke-width="6"/>
        </g>
        <text x="400" y="60" text-anchor="middle" font-family="Cinzel Decorative, serif" font-size="30" fill="${p[2]}">COLLAPSE / FORGIVENESS</text>`;
    },

    theeye(p){
      return `
        <defs><radialGradient id="es-eye" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stop-color="${p[2]}"/>
          <stop offset="60%" stop-color="${p[0]}"/>
          <stop offset="100%" stop-color="${p[3]}"/>
        </radialGradient></defs>
        <rect width="800" height="450" fill="url(#es-eye)"/>
        ${rays(400, 225, p[2], 36, 500)}
        <!-- pyramid -->
        <polygon points="400,80 700,400 100,400" fill="${p[0]}" stroke="${p[1]}" stroke-width="3"/>
        <!-- mega eye -->
        <g transform="translate(400,260)">
          <ellipse cx="0" cy="0" rx="120" ry="70" fill="${p[2]}" stroke="${p[1]}" stroke-width="3"/>
          <circle cx="0" cy="0" r="50" fill="${p[1]}"/>
          <circle cx="0" cy="0" r="25" fill="${p[3]}">
            <animate attributeName="r" values="20;30;20" dur="1.6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="-10" cy="-10" r="8" fill="${p[2]}"/>
        </g>
        <text x="400" y="50" text-anchor="middle" font-family="Bungee Shade, cursive" font-size="32" fill="${p[2]}">I AM THE WATCHER</text>`;
    }
  };

  function renderEndingCutscene(charId){
    const c = getChar(charId);
    if(!c) return '';
    const p = c.endingPalette || c.palette || ['#ff2bd6','#00f0ff','#ffe600','#000'];
    const sceneFn = endingScenes[charId] || endingScenes.theeye;
    const scene = sceneFn(p);
    const portrait = c.render(POSES.win, {scale:0.8});
    const lines = (c.ending || ['THE END.']).map((line,i)=>
      `<div class="ending-line" style="animation-delay:${i*0.6}s">${line}</div>`
    ).join('');
    return `
    <div class="ending-inner">
      <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" class="ending-svg">
        ${scene}
      </svg>
      <div class="ending-portrait">${portrait}</div>
      <div class="ending-lines">
        <h2 style="color:${p[2]||'#ffe600'}; font-family:'Cinzel Decorative', serif;">${c.name} — TOURNAMENT CHAMPION</h2>
        ${lines}
        <p class="ending-fin" style="color:${p[2]||'#ffe600'}">~ FIN ~</p>
      </div>
    </div>`;
  }

  /* ------- Export ------- */
  global.Cutscenes = {
    win: renderWinCutscene,
    lose: renderLoseCutscene,
    ending: renderEndingCutscene
  };

})(window);
