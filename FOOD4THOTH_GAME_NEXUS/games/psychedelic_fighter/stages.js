/* ============================================================
   STAGES — 11 Psychedelic Backgrounds
   Each renderStage(opts) returns animated SVG markup.
   ============================================================ */

const STAGES = [];

/* 1. Truffula Forest */
STAGES.push({
  id: 'truffula', name: 'TRUFFULA THICKET',
  music: 'truffula',
  render(){
    return `<svg class="bg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="trSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffd6e8"/>
          <stop offset="50%" stop-color="#ff80d8"/>
          <stop offset="100%" stop-color="#ff4488"/>
        </linearGradient>
        <radialGradient id="trSun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffe600"/>
          <stop offset="60%" stop-color="#ff8800"/>
          <stop offset="100%" stop-color="#ff8800" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#trSky)"/>
      <circle cx="500" cy="200" r="120" fill="url(#trSun)">
        <animate attributeName="r" values="120;140;120" dur="6s" repeatCount="indefinite"/>
      </circle>
      <!-- truffula trees -->
      ${[100,250,400,600,750,900].map((x,i)=>{
        const colors = ['#ff5500','#ffe600','#ff2bd6','#00ff88','#cc66ff','#ff8800'];
        const c = colors[i % colors.length];
        return `<g transform="translate(${x},0)">
          <path d="M0,500 Q-3,400 0,300 Q5,200 -2,150" stroke="#ff80b0" stroke-width="6" fill="none">
            <animateTransform attributeName="transform" type="rotate" values="-2 0 500;2 0 500;-2 0 500" dur="${4+i*0.3}s" repeatCount="indefinite"/>
          </path>
          <ellipse cx="-2" cy="140" rx="40" ry="35" fill="${c}">
            <animate attributeName="ry" values="35;40;35" dur="${3+i*0.2}s" repeatCount="indefinite"/>
          </ellipse>
          <circle cx="-15" cy="130" r="15" fill="${c}" opacity="0.8"/>
          <circle cx="10" cy="135" r="12" fill="${c}" opacity="0.8"/>
        </g>`;
      }).join('')}
      <!-- ground -->
      <path d="M0,500 Q250,485 500,500 T1000,500 L1000,600 L0,600 Z" fill="#7f4dff"/>
      <path d="M0,520 Q250,510 500,520 T1000,520 L1000,600 L0,600 Z" fill="#5e1fce"/>
    </svg>`;
  }
});

/* 2. Wonderland Tea Party (warped) */
STAGES.push({
  id: 'wonderland', name: 'TEA PARTY VOID',
  music: 'wonderland',
  render(){
    return `<svg class="bg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="wlcheck" patternUnits="userSpaceOnUse" width="60" height="60">
          <rect width="30" height="30" fill="#000"/>
          <rect x="30" y="30" width="30" height="30" fill="#000"/>
          <rect x="30" y="0" width="30" height="30" fill="#fff"/>
          <rect x="0" y="30" width="30" height="30" fill="#fff"/>
        </pattern>
      </defs>
      <rect width="1000" height="600" fill="#1a0066"/>
      <!-- swirling clouds -->
      ${[...Array(12)].map((_,i)=>{
        const x=83*i, y=50+Math.sin(i)*120, c=['#ff66cc','#66ddff','#ffcc66'][i%3];
        return `<ellipse cx="${x}" cy="${y}" rx="60" ry="20" fill="${c}" opacity="0.5">
          <animateTransform attributeName="transform" type="translate" values="0,0;${50},${10};0,0" dur="${8+i*0.5}s" repeatCount="indefinite"/>
        </ellipse>`;
      }).join('')}
      <!-- floating teapot -->
      <g transform="translate(120,200)">
        <animateTransform attributeName="transform" type="translate" values="120,200;130,180;120,200" dur="5s" repeatCount="indefinite"/>
        <ellipse cx="0" cy="0" rx="50" ry="35" fill="#ff66aa" stroke="#000" stroke-width="2"/>
        <path d="M-50,-5 Q-70,-15 -65,-30 Q-50,-25 -45,-15" fill="#ff66aa" stroke="#000" stroke-width="2"/>
        <path d="M40,-5 Q60,5 55,15" fill="none" stroke="#000" stroke-width="2"/>
        <ellipse cx="0" cy="-20" rx="15" ry="8" fill="#cc4488" stroke="#000" stroke-width="1.5"/>
        <circle cx="0" cy="-30" r="4" fill="#ffe600"/>
      </g>
      <!-- floating teacups -->
      ${[800,650,500,350,200].map((x,i)=>`
        <g transform="translate(${x},${100+i*20})">
          <animateTransform attributeName="transform" type="rotate" values="0;15;-15;0" dur="${3+i*0.5}s" repeatCount="indefinite"/>
          <path d="M-15,-10 L-12,8 Q0,12 12,8 L15,-10 Z" fill="#fff" stroke="#000" stroke-width="1.5"/>
          <ellipse cx="0" cy="-10" rx="15" ry="3" fill="#aa3300"/>
          <path d="M12,-2 Q22,0 20,8" fill="none" stroke="#000" stroke-width="1.5"/>
        </g>
      `).join('')}
      <!-- checkered floor -->
      <path d="M0,400 L1000,400 L1000,600 L0,600 Z" fill="url(#wlcheck)" transform="skewX(-30)"/>
      <path d="M0,400 L1000,400 L1000,420 L0,420 Z" fill="#ff00ff"/>
    </svg>`;
  }
});

/* 3. Las Vegas Bat Country */
STAGES.push({
  id: 'batcountry', name: 'BAT COUNTRY',
  music: 'batcountry',
  render(){
    return `<svg class="bg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bcSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff6600"/>
          <stop offset="40%" stop-color="#ff0066"/>
          <stop offset="80%" stop-color="#aa0066"/>
          <stop offset="100%" stop-color="#000033"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#bcSky)"/>
      <!-- mountains -->
      <path d="M0,400 L150,300 L300,380 L450,280 L600,360 L750,290 L900,350 L1000,320 L1000,500 L0,500 Z" fill="#440022"/>
      <path d="M0,420 L100,360 L250,400 L400,330 L550,400 L700,340 L850,400 L1000,360 L1000,500 L0,500 Z" fill="#220011"/>
      <!-- bats -->
      ${[...Array(20)].map((_,i)=>{
        const x=50*i, y=100+Math.sin(i*0.7)*100;
        return `<g>
          <animateTransform attributeName="transform" type="translate" values="${x},${y};${x+200},${y-30};${x+400},${y};${x+200},${y+30};${x},${y}" dur="${10+i*0.3}s" repeatCount="indefinite"/>
          <path d="M-8,0 Q-15,-5 -12,5 L-4,3 Q0,-3 4,3 L12,5 Q15,-5 8,0 Z" fill="#000"/>
        </g>`;
      }).join('')}
      <!-- vegas neon -->
      <g transform="translate(700,250)">
        <rect x="-3" y="0" width="6" height="200" fill="#222"/>
        <text x="0" y="-10" text-anchor="middle" font-family="Bungee Shade" font-size="22" fill="#ff00ff">VIVA</text>
        <text x="0" y="20" text-anchor="middle" font-family="Bungee Shade" font-size="22" fill="#ffe600">DEATH</text>
        <animate attributeName="opacity" values="1;0.3;1;0.5;1" dur="0.8s" repeatCount="indefinite"/>
      </g>
      <!-- road -->
      <polygon points="0,500 1000,500 800,600 200,600" fill="#1a1a1a"/>
      <path d="M450,500 L550,500 L600,600 L400,600 Z" fill="#ffe600" opacity="0.4"/>
      <line x1="500" y1="510" x2="500" y2="540" stroke="#ffe600" stroke-width="3"/>
      <line x1="500" y1="555" x2="500" y2="580" stroke="#ffe600" stroke-width="3"/>
    </svg>`;
  }
});

/* 4. Geodesic Dream Sphere */
STAGES.push({
  id: 'geodesic', name: 'GEODESIC SPHERE',
  music: 'geodesic',
  render(){
    return `<svg class="bg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="gdSky" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#88ccff"/>
          <stop offset="50%" stop-color="#0066ff"/>
          <stop offset="100%" stop-color="#000033"/>
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#gdSky)"/>
      <!-- giant geodesic dome -->
      <g transform="translate(500,300)">
        <animateTransform attributeName="transform" type="rotate" values="0 500 300;360 500 300" dur="60s" repeatCount="indefinite" additive="sum"/>
        <circle cx="0" cy="0" r="220" fill="none" stroke="#88ccff" stroke-width="1" opacity="0.3"/>
        ${[...Array(60)].map((_,i)=>{
          const a1 = (i/60)*Math.PI*2, a2 = ((i+1)/60)*Math.PI*2;
          const r1 = 220, r2 = 200;
          return `<line x1="${Math.cos(a1)*r1}" y1="${Math.sin(a1)*r1}" x2="${Math.cos(a2)*r2}" y2="${Math.sin(a2)*r2}" stroke="#00ffff" stroke-width="1" opacity="0.6"/>`;
        }).join('')}
        ${[...Array(20)].map((_,i)=>{
          const a = (i/20)*Math.PI*2;
          return `<line x1="0" y1="0" x2="${Math.cos(a)*220}" y2="${Math.sin(a)*220}" stroke="#0099ff" stroke-width="0.5" opacity="0.4"/>`;
        }).join('')}
        ${[60,120,180].map(r=>`<circle cx="0" cy="0" r="${r}" fill="none" stroke="#0099ff" stroke-width="0.5" opacity="0.4"/>`).join('')}
        <circle cx="0" cy="0" r="15" fill="#ffe600">
          <animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite"/>
        </circle>
      </g>
      <!-- floor -->
      <path d="M0,500 L1000,500 L1000,600 L0,600 Z" fill="#0044aa" opacity="0.7"/>
      ${[...Array(10)].map((_,i)=>`<line x1="${100*i}" y1="500" x2="${500-((500-100*i)*0.3)}" y2="600" stroke="#88ccff" stroke-width="1" opacity="0.4"/>`).join('')}
      <line x1="0" y1="540" x2="1000" y2="540" stroke="#88ccff" stroke-width="1" opacity="0.3"/>
      <line x1="0" y1="570" x2="1000" y2="570" stroke="#88ccff" stroke-width="1" opacity="0.3"/>
    </svg>`;
  }
});

/* 5. Black Monolith Void */
STAGES.push({
  id: 'monolith', name: 'BLACK MONOLITH',
  music: 'monolith',
  render(){
    return `<svg class="bg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="mlSky" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stop-color="#220022"/>
          <stop offset="50%" stop-color="#000011"/>
          <stop offset="100%" stop-color="#000"/>
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#mlSky)"/>
      <!-- stars -->
      ${[...Array(80)].map((_,i)=>{
        const x=Math.random()*1000, y=Math.random()*400, s=Math.random()*2;
        return `<circle cx="${x}" cy="${y}" r="${s}" fill="#fff">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="${2+s}s" repeatCount="indefinite"/>
        </circle>`;
      }).join('')}
      <!-- planet -->
      <circle cx="800" cy="150" r="80" fill="#ff6600"/>
      <circle cx="780" cy="130" r="20" fill="#cc4400"/>
      <circle cx="820" cy="170" r="15" fill="#cc4400"/>
      <ellipse cx="800" cy="150" rx="120" ry="20" fill="none" stroke="#ffaa66" stroke-width="2" opacity="0.6"/>
      <!-- THE MONOLITH -->
      <g transform="translate(500,380)">
        <rect x="-30" y="-180" width="60" height="180" fill="#000" stroke="#fff" stroke-width="1"/>
        <rect x="-30" y="-180" width="60" height="180" fill="url(#mlGlow)"/>
        <animate attributeName="opacity" values="1;0.95;1" dur="3s" repeatCount="indefinite"/>
      </g>
      <defs>
        <linearGradient id="mlGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.1"/>
          <stop offset="50%" stop-color="#fff" stop-opacity="0"/>
          <stop offset="100%" stop-color="#fff" stop-opacity="0.1"/>
        </linearGradient>
      </defs>
      <!-- floor reflection -->
      <path d="M0,400 L1000,400 L1000,600 L0,600 Z" fill="#000"/>
      <ellipse cx="500" cy="400" rx="100" ry="10" fill="#fff" opacity="0.1"/>
    </svg>`;
  }
});

/* 6. Heavy Metal Wasteland */
STAGES.push({
  id: 'wasteland', name: 'HEAVY METAL WASTELAND',
  music: 'wasteland',
  render(){
    return `<svg class="bg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="wlSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffaa00"/>
          <stop offset="40%" stop-color="#ff4400"/>
          <stop offset="100%" stop-color="#330011"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#wlSky)"/>
      <!-- two suns -->
      <circle cx="700" cy="180" r="60" fill="#ffe600" opacity="0.9"/>
      <circle cx="780" cy="220" r="40" fill="#ff6600" opacity="0.9"/>
      <!-- alien spires -->
      <polygon points="100,500 130,250 160,500" fill="#220011"/>
      <polygon points="200,500 230,300 260,500" fill="#330022"/>
      <polygon points="800,500 830,200 860,500" fill="#220011"/>
      <polygon points="900,500 920,280 940,500" fill="#330022"/>
      <!-- floating skull -->
      <g transform="translate(500,200)">
        <animateTransform attributeName="transform" type="translate" values="500,200;500,180;500,200" dur="4s" repeatCount="indefinite"/>
        <circle cx="0" cy="0" r="40" fill="#f4ead5"/>
        <circle cx="-12" cy="-5" r="8" fill="#000"/>
        <circle cx="12" cy="-5" r="8" fill="#000"/>
        <circle cx="-12" cy="-5" r="3" fill="#ff0000"/>
        <circle cx="12" cy="-5" r="3" fill="#ff0000"/>
        <path d="M-3,8 L0,15 L3,8 Z" fill="#000"/>
        <rect x="-20" y="20" width="6" height="10" fill="#000"/>
        <rect x="-7" y="20" width="6" height="10" fill="#000"/>
        <rect x="6" y="20" width="6" height="10" fill="#000"/>
        <rect x="14" y="20" width="6" height="10" fill="#000"/>
        <!-- horns -->
        <path d="M-30,-10 Q-50,-30 -45,-50 Q-35,-40 -25,-25" fill="#222" stroke="#000" stroke-width="2"/>
        <path d="M30,-10 Q50,-30 45,-50 Q35,-40 25,-25" fill="#222" stroke="#000" stroke-width="2"/>
      </g>
      <!-- ground -->
      <path d="M0,500 L1000,500 L1000,600 L0,600 Z" fill="#440022"/>
      <path d="M0,520 Q200,510 500,525 T1000,520 L1000,540 L0,540 Z" fill="#220011"/>
      <!-- bones -->
      <ellipse cx="200" cy="560" rx="40" ry="6" fill="#aaa" stroke="#000" stroke-width="1"/>
      <ellipse cx="800" cy="570" rx="50" ry="6" fill="#aaa" stroke="#000" stroke-width="1"/>
    </svg>`;
  }
});

/* 7. Spice Desert */
STAGES.push({
  id: 'spice', name: 'SPICE DUNES',
  music: 'spice',
  render(){
    return `<svg class="bg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="spSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffcc66"/>
          <stop offset="60%" stop-color="#ff6600"/>
          <stop offset="100%" stop-color="#aa2200"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#spSky)"/>
      <circle cx="500" cy="200" r="100" fill="#ffe066" opacity="0.7"/>
      <!-- spice particles -->
      ${[...Array(40)].map((_,i)=>{
        const x=Math.random()*1000, y=Math.random()*400;
        return `<circle cx="${x}" cy="${y}" r="1.5" fill="#ffaaff" opacity="0.6">
          <animate attributeName="cy" values="${y};${y-20};${y}" dur="${3+i*0.1}s" repeatCount="indefinite"/>
        </circle>`;
      }).join('')}
      <!-- distant dunes -->
      <path d="M0,420 Q200,400 350,420 Q500,440 700,410 Q850,390 1000,420 L1000,500 L0,500 Z" fill="#cc6622"/>
      <path d="M0,460 Q150,440 300,460 Q500,480 700,450 Q900,430 1000,460 L1000,500 L0,500 Z" fill="#aa4422"/>
      <!-- worm trail rising -->
      <path d="M150,500 Q180,450 200,460 Q220,470 240,450 Q260,420 280,440" fill="none" stroke="#aa4422" stroke-width="6" opacity="0.6"/>
      <!-- ground -->
      <path d="M0,500 L1000,500 L1000,600 L0,600 Z" fill="#cc6622"/>
      <path d="M0,530 Q200,520 500,540 T1000,530 L1000,600 L0,600 Z" fill="#aa4422"/>
      <!-- distant pillars -->
      <rect x="800" y="380" width="20" height="120" fill="#552211"/>
      <rect x="60" y="400" width="15" height="100" fill="#552211"/>
    </svg>`;
  }
});

/* 8. Mushroom Mindscape */
STAGES.push({
  id: 'mushroom', name: 'MUSHROOM MINDSCAPE',
  music: 'mushroom',
  render(){
    return `<svg class="bg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="mhSky" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stop-color="#ff66ff"/>
          <stop offset="50%" stop-color="#9900cc"/>
          <stop offset="100%" stop-color="#330066"/>
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#mhSky)"/>
      <!-- pulsing mandala -->
      <g transform="translate(500,200)">
        <animateTransform attributeName="transform" type="rotate" values="0 500 200;360 500 200" dur="40s" repeatCount="indefinite" additive="sum"/>
        ${[...Array(12)].map((_,i)=>{
          const a = (i/12)*360;
          return `<g transform="rotate(${a})">
            <ellipse cx="0" cy="-100" rx="20" ry="60" fill="#ff66ff" opacity="0.4"/>
          </g>`;
        }).join('')}
        <circle cx="0" cy="0" r="30" fill="#ffe600" opacity="0.7"/>
      </g>
      <!-- mushrooms -->
      ${[100, 280, 500, 720, 900].map((x, i) => {
        const colors = ['#ff0066', '#ffe600', '#00ff88', '#9900ff', '#ff8800'];
        const c = colors[i];
        const h = 80 + i*10;
        return `<g transform="translate(${x},500)">
          <rect x="-10" y="-${h}" width="20" height="${h}" fill="#fff5dd" stroke="#000" stroke-width="2"/>
          <ellipse cx="0" cy="-${h}" rx="40" ry="25" fill="${c}" stroke="#000" stroke-width="2"/>
          <circle cx="-15" cy="-${h+5}" r="5" fill="#fff"/>
          <circle cx="10" cy="-${h-3}" r="4" fill="#fff"/>
          <circle cx="0" cy="-${h-10}" r="3" fill="#fff"/>
          <animateTransform attributeName="transform" type="translate" values="${x},500;${x},495;${x},500" dur="${4+i}s" repeatCount="indefinite"/>
        </g>`;
      }).join('')}
      <!-- ground -->
      <path d="M0,500 L1000,500 L1000,600 L0,600 Z" fill="#660066"/>
      <path d="M0,520 Q500,510 1000,520 L1000,600 L0,600 Z" fill="#330033"/>
    </svg>`;
  }
});

/* 9. Ayahuasca Jungle */
STAGES.push({
  id: 'ayahuasca', name: 'AYAHUASCA JUNGLE',
  music: 'ayahuasca',
  render(){
    return `<svg class="bg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="ayaSky" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#003322"/>
          <stop offset="50%" stop-color="#001a11"/>
          <stop offset="100%" stop-color="#000"/>
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#ayaSky)"/>
      <!-- giant snake spiral -->
      <g transform="translate(500,300)">
        <animateTransform attributeName="transform" type="rotate" values="0 500 300;-360 500 300" dur="30s" repeatCount="indefinite" additive="sum"/>
        ${[...Array(8)].map((_,i)=>{
          const r = 200 - i*20;
          return `<circle cx="0" cy="0" r="${r}" fill="none" stroke="${i%2?'#00ff88':'#ffe600'}" stroke-width="6" stroke-dasharray="20,10" opacity="0.5"/>`;
        }).join('')}
      </g>
      <!-- vines -->
      ${[100, 220, 350, 700, 850, 950].map((x, i) => `
        <path d="M${x},0 Q${x+30*Math.sin(i)},150 ${x-20},300 Q${x+40},450 ${x},600" stroke="#005522" stroke-width="${4+i%3}" fill="none">
          <animate attributeName="d" values="
            M${x},0 Q${x+30},150 ${x-20},300 Q${x+40},450 ${x},600;
            M${x},0 Q${x-30},150 ${x+20},300 Q${x-40},450 ${x},600;
            M${x},0 Q${x+30},150 ${x-20},300 Q${x+40},450 ${x},600
          " dur="${8+i}s" repeatCount="indefinite"/>
        </path>
        <ellipse cx="${x-10}" cy="${100+i*40}" rx="20" ry="8" fill="#00aa55" transform="rotate(${30*i} ${x-10} ${100+i*40})"/>
        <ellipse cx="${x+15}" cy="${300+i*30}" rx="18" ry="7" fill="#00aa55" transform="rotate(${-30*i} ${x+15} ${300+i*30})"/>
      `).join('')}
      <!-- glowing eyes in jungle -->
      ${[200, 400, 600, 800].map((x, i) => `
        <circle cx="${x}" cy="${250+i*30}" r="3" fill="#ff0066">
          <animate attributeName="opacity" values="0;1;0" dur="${2+i*0.3}s" repeatCount="indefinite"/>
        </circle>
        <circle cx="${x+15}" cy="${250+i*30}" r="3" fill="#ff0066">
          <animate attributeName="opacity" values="0;1;0" dur="${2+i*0.3}s" repeatCount="indefinite"/>
        </circle>
      `).join('')}
      <!-- ground -->
      <path d="M0,500 L1000,500 L1000,600 L0,600 Z" fill="#001a0a"/>
    </svg>`;
  }
});

/* 10. Quantum Foam */
STAGES.push({
  id: 'quantum', name: 'QUANTUM FOAM',
  music: 'quantum',
  render(){
    return `<svg class="bg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="qfSky" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#000033"/>
          <stop offset="50%" stop-color="#220066"/>
          <stop offset="100%" stop-color="#000"/>
        </radialGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#qfSky)"/>
      <!-- particle bubbles -->
      ${[...Array(40)].map((_,i)=>{
        const x = Math.random()*1000, y = Math.random()*600, r = 5+Math.random()*30;
        const c = ['#00ffff','#ff00ff','#ffe600','#88ff88'][i%4];
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c}" stroke-width="1" opacity="0.5">
          <animate attributeName="r" values="${r};${r*1.5};${r}" dur="${2+i*0.1}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0;0.5" dur="${2+i*0.1}s" repeatCount="indefinite"/>
        </circle>`;
      }).join('')}
      <!-- entangled pair lines -->
      ${[...Array(15)].map((_,i)=>{
        const x1 = Math.random()*1000, y1 = Math.random()*400;
        const x2 = Math.random()*1000, y2 = Math.random()*400;
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fff" stroke-width="0.5" opacity="0.3" stroke-dasharray="4,4"/>`;
      }).join('')}
      <!-- floor reflection -->
      <path d="M0,500 L1000,500 L1000,600 L0,600 Z" fill="#000044" opacity="0.7"/>
      ${[...Array(20)].map((_,i)=>`<line x1="${50*i}" y1="500" x2="${500-((500-50*i)*0.4)}" y2="600" stroke="#00ffff" stroke-width="0.5" opacity="0.3"/>`).join('')}
    </svg>`;
  }
});

/* 11. Pyramid of the All-Seeing Eye (BOSS STAGE) */
STAGES.push({
  id: 'pyramid', name: 'EYE OF THE PYRAMID',
  music: 'pyramid', boss: true,
  render(){
    return `<svg class="bg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="pyramidEye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="30%" stop-color="#ff00ff"/>
          <stop offset="70%" stop-color="#aa0000"/>
          <stop offset="100%" stop-color="#000"/>
        </radialGradient>
        <linearGradient id="pyramidSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#aa0000"/>
          <stop offset="50%" stop-color="#220033"/>
          <stop offset="100%" stop-color="#000"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#pyramidSky)"/>
      <!-- giant pyramid -->
      <polygon points="500,80 200,500 800,500" fill="#aa6600" stroke="#ffe600" stroke-width="2"/>
      <polygon points="500,80 200,500 350,400 500,200" fill="#000" opacity="0.4"/>
      <polygon points="500,80 800,500 650,400 500,200" fill="#ffaa00" opacity="0.2"/>
      <!-- glyphs -->
      <text x="350" y="450" font-family="serif" font-size="40" fill="#ffe600" opacity="0.8">𓂀</text>
      <text x="600" y="450" font-family="serif" font-size="40" fill="#ffe600" opacity="0.8">𓏏</text>
      <text x="450" y="380" font-family="serif" font-size="30" fill="#ffe600" opacity="0.8">𓊨</text>
      <!-- THE EYE -->
      <g transform="translate(500,180)">
        <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="2s" repeatCount="indefinite" additive="sum"/>
        <ellipse cx="0" cy="0" rx="80" ry="50" fill="#fff" stroke="#000" stroke-width="3"/>
        <circle cx="0" cy="0" r="40" fill="url(#pyramidEye)"/>
        <circle cx="0" cy="0" r="18" fill="#000"/>
        <circle cx="-5" cy="-5" r="5" fill="#fff" opacity="0.9"/>
      </g>
      <!-- light rays -->
      ${[...Array(12)].map((_,i)=>{
        const a = (i/12)*Math.PI*2;
        const x2 = 500 + Math.cos(a)*500;
        const y2 = 180 + Math.sin(a)*500;
        return `<line x1="500" y1="180" x2="${x2}" y2="${y2}" stroke="#ffe600" stroke-width="2" opacity="0.2"/>`;
      }).join('')}
      <!-- ground -->
      <path d="M0,500 L1000,500 L1000,600 L0,600 Z" fill="#332200"/>
      <path d="M0,520 L1000,520 L1000,540 L0,540 Z" fill="#553311"/>
    </svg>`;
  }
});

function getStage(id){ return STAGES.find(s=>s.id===id); }
