

const { ceil, sin, cos, pow, PI } = Math;
const polar = (ang, r = 1) => [r * cos(ang), r * sin(ang)];
const { innerWidth: w, innerHeight: h } = window;
const canvas = document.getElementById("canvas");
canvas.width = w;
canvas.height = h;
const ctx = canvas.getContext("2d");
const tileWidth = 3;
noise.seed(Math.random());

const horizontalTilesCount = ceil(w / tileWidth);
const verticalTilesCount = ceil(h / tileWidth);

const line = (x1, y1, x2, y2, p) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.closePath();
};

for (let ix = 0; ix <= horizontalTilesCount; ix++) {
  const x = ix * tileWidth;
  for (let iy = 0; iy <= verticalTilesCount; iy++) {
    const y = iy * tileWidth;
    let p = noise.perlin2(x * 0.006, y * 0.006) / 0.75;
    p = pow(p, 2);
    const ang = p * 2 * PI;
    const [x2, y2] = polar(ang, tileWidth * 4);
    line(x, y, x + x2, y + y2, p);
  }
}

document.addEventListener("DOMContentLoaded", () => {
	const dropCap = document.querySelector(".drop-cap");
	const natureElements = document.querySelector(".nature-elements");

	// Create nature elements
	const elements = ["✨", "🤖", "⚡️", "👾", "🕳️", "👽"];
	for (let i = 0; i < 20; i++) {
		const element = document.createElement("span");
		element.textContent = elements[Math.floor(Math.random() * elements.length)];
		element.style.cssText = `
      position: absolute;
      font-size: ${Math.random() * 20 + 10}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      opacity: 0.7;
      transform: rotate(${Math.random() * 360}deg);
      animation: float ${Math.random() * 5 + 3}s infinite ease-in-out;
    `;
		natureElements.appendChild(element);
	}

	// Animate drop cap on hover
	dropCap.addEventListener("mouseover", () => {
		dropCap.style.animation = "grow 0.5s forwards";
	});

	dropCap.addEventListener("mouseout", () => {
		dropCap.style.animation = "shrink 0.5s forwards";
	});
});

// Add these styles to the CSS
document.head.insertAdjacentHTML(
	"beforeend",
	`
  <style>
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(5deg); }
    }

    @keyframes grow {
      to { transform: scale(1.1); color: #4a8c74; }
    }

    @keyframes shrink {
      from { transform: scale(1.1); color: #4a8c74; }
      to { transform: scale(1); color: #2c5e4c; }
    }
  </style>
`
);