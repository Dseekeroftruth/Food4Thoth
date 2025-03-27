// ------------------------
// ADVANCED FRACTAL SCRIPT (Touch + Pressure, Multiple Fractals)
// ------------------------

let fractalCanvas = null;
let fractalCtx = null;
let isDrawingFractal = false;

// Used for iterative fractals: bigger = denser
const N_POINTS = 90000;

// Pointer coordinates & pressure
let lastPointerX = 200;
let lastPointerY = 200;
let lastPressure = 1.0;

document.addEventListener("DOMContentLoaded", () => {
  fractalCanvas = document.getElementById("fractalCanvas");
  fractalCtx = fractalCanvas.getContext("2d");
	
	// Set default canvas size to 350
  const sizeSelect = document.getElementById("fractalCanvasSize");
  sizeSelect.value = "400"; // Set dropdown to 350
  fractalCanvas.width = 400;
  fractalCanvas.height = 400;

  // Mouse events
  fractalCanvas.addEventListener("mousedown", handlePointerDown);
  fractalCanvas.addEventListener("mousemove", handlePointerMove);
  document.addEventListener("mouseup", () => (isDrawingFractal = false));

  // Touch events
  fractalCanvas.addEventListener("touchstart", handlePointerDown, { passive: false });
  fractalCanvas.addEventListener("touchmove", handlePointerMove, { passive: false });
  document.addEventListener("touchend", () => (isDrawingFractal = false));
  document.addEventListener("touchcancel", () => (isDrawingFractal = false));

  // Clear & Hexagram & Gallery
  document.getElementById("clearFractalCanvasBtn")
          .addEventListener("click", clearFractalCanvas);
  
  

  // Canvas size
  document.getElementById("fractalCanvasSize")
          .addEventListener("change", resizeFractalCanvas);
});


/** 
 * MOUSE / TOUCH DOWN
 */
function handlePointerDown(evt) {
  evt.preventDefault();
  isDrawingFractal = true;
  updatePointerCoords(evt);
  drawFractal();
}

/** 
 * MOUSE / TOUCH MOVE
 */
function handlePointerMove(evt) {
  if (!isDrawingFractal) return;
  evt.preventDefault();
  updatePointerCoords(evt);
  drawFractal();
}

/**
 * Updates lastPointerX/Y and tries to get press force from evt
 */
function updatePointerCoords(evt) {
  const rect = fractalCanvas.getBoundingClientRect();
  let clientX, clientY, force;

  if (evt.touches && evt.touches.length > 0) {
    clientX = evt.touches[0].clientX;
    clientY = evt.touches[0].clientY;
    force = evt.touches[0].force || 0; // iOS Safari
  } else {
    clientX = evt.clientX;
    clientY = evt.clientY;
    // Some browsers with pointer events might have evt.pressure
    force = evt.pressure || 0;
  }

  lastPointerX = clientX - rect.left;
  lastPointerY = clientY - rect.top;

  // fallback if no pressure => 1.0
  lastPressure = force > 0 ? force : 1.0;

  // Add time offset so each new draw is unique
  const tOff = (Date.now() % 1000) / 1000;
  lastPointerX += tOff;
  lastPointerY += tOff;
}

function drawFractal() {
  const fractalType = document.getElementById("fractalTypeSelect").value;

  switch (fractalType) {
    case "flow": 
      drawFlowFractal();
      break;

    case "spiral": 
      drawSpiralFractal();
      break;

    case "tree": 
      drawTreeFractal();
      break;

    case "julia":
      drawJuliaFractal();
      break;

    case "labyrinth":
      drawLabyrinthFractal();
      break;

    case "mandelbrot":
  // Instead of the old dynamic version, call:
  drawMandelbrotRandom();
  break;

    case "fern":
      drawBarnsleyFernDynamic();
      break;

    default:
      // optional fallback
      console.warn("Unknown fractalType:", fractalType);
      break;
  }

  // Auto-save if checked
  const saveAll = document.getElementById("saveFractalImagesCheckbox").checked;
  if (saveAll) {
    saveFractalToGallery();
  }
}

/** 
 * 1) FLOW FIELD FRACTAL
 *    More color variation than your old "flow field" version.
 */
function drawFlowFractal() {
  const w = fractalCanvas.width;
  const h = fractalCanvas.height;

  // We'll draw short lines that follow a pseudo-flow
  for (let i = 0; i < 6000; i++) {
    let rx = Math.random() * w;
    let ry = Math.random() * h;

    // angle influenced by pointer coords & pressure
    let angle = Math.sin((rx + lastPointerX) * 0.01) +
                Math.cos((ry + lastPointerY) * 0.01);
    angle *= 0.5 + lastPressure; // scale by pressure

    const segLen = 12;
    let x2 = rx + segLen * Math.cos(angle);
    let y2 = ry + segLen * Math.sin(angle);

    // color
    let hue = ((rx + ry) * 0.2 + angle * 50) % 360;
    fractalCtx.strokeStyle = `hsl(${hue},100%,50%)`;
    fractalCtx.beginPath();
    fractalCtx.moveTo(rx, ry);
    fractalCtx.lineTo(x2, y2);
    fractalCtx.stroke();
  }
}

/**
 * 2) SPIRAL FRACTAL
 *    Harder press => bigger swirl. Also uses spiralFactorRange.
 */
function drawSpiralFractal() {
  const cx = lastPointerX;
  const cy = lastPointerY;

  const swirlFactor = parseFloat(document.getElementById("spiralFactorRange").value) || 0.1;
  let angleIncrement = swirlFactor + 0.06 * lastPressure; 
  let radiusIncrement = 0.05 + 0.06 * lastPressure; 
  let branchFactor   = 0.03 + 0.03 * lastPressure; 

  let angle = 0;
  let radius = 0;

  for (let i = 0; i < N_POINTS; i++) {
    let x = cx + radius * Math.cos(angle);
    let y = cy + radius * Math.sin(angle);

    // color
    const hue = (i * 0.5) % 360;
    fractalCtx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    fractalCtx.fillRect(x, y, 1.5, 1.5);

    // side branch
    const sign = Math.random() < 0.5 ? -1 : 1;
    let bx = x + sign * branchFactor * radius * Math.cos(angle * 2);
    let by = y + sign * branchFactor * radius * Math.sin(angle * 2);
    fractalCtx.fillRect(bx, by, 1.5, 1.5);

    angle += angleIncrement;
    radius += radiusIncrement;
  }
}

/**
 * 3) BRANCHING TREE FRACTAL
 *    Harder press => bigger trunk & branch factor. Depth from #depthInput.
 */
function drawTreeFractal() {
  

  const startX = lastPointerX;
  const startY = lastPointerY;
  const depth = parseInt(document.getElementById("depthInput").value, 10) || 10;

  const trunkLen = (50 + Math.random() * 40) * lastPressure;
  const angleVar = 20 + 15 * lastPressure;
  const branchFactor = 0.7 + 0.2 * (lastPressure - 1);

  drawTreeBranch(startX, startY, trunkLen, -90, depth, angleVar, branchFactor);
}

function drawTreeBranch(x1, y1, length, angleDeg, depth, angleVar, branchFactor) {
  if (depth <= 0) return;
  
  let rad = (Math.PI / 180) * angleDeg;
  let x2 = x1 + length * Math.cos(rad);
  let y2 = y1 + length * Math.sin(rad);

  // color by depth
  const hue = (depth * 40) % 360;
  fractalCtx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
  fractalCtx.lineWidth = Math.max(1, depth * 0.5);
  
  fractalCtx.beginPath();
  fractalCtx.moveTo(x1, y1);
  fractalCtx.lineTo(x2, y2);
  fractalCtx.stroke();

  const newDepth = depth - 1;
  const newLen = length * branchFactor;
  const offset = Math.random() * angleVar;

  // branch left
  drawTreeBranch(x2, y2, newLen, angleDeg - offset, newDepth, angleVar, branchFactor);
  // branch right
  drawTreeBranch(x2, y2, newLen, angleDeg + offset, newDepth, angleVar, branchFactor);

  // maybe a middle branch
  if (Math.random() > 0.5) {
    drawTreeBranch(x2, y2, newLen * 0.8, angleDeg, newDepth, angleVar, branchFactor);
  }
}

function drawMandelbrotRandom() {
  const w = fractalCanvas.width;
  const h = fractalCanvas.height;
  
  // **READ USER ITERATION INPUT**:
  // e.g. #mandelbrotIterationsInput has a default of 300
  const maxIter = parseInt(
    document.getElementById("mandelbrotIterationsInput").value,
    10
  ) || 300;

  // Random zoom (any range you like)
  const zoom = Math.random() * 2 + 2;

  // Random center offsets (again, pick any range you like)
  const offsetX = Math.random() * 1 - 1;  // [-1..0]
  const offsetY = Math.random() * 1 - 1;  // [-1..0]

  // Create blank imageData
  let imageData = fractalCtx.createImageData(w, h);
  let data = imageData.data;
  let idx = 0;
  
  // Optional fade out old fractals so each new one doesn't fully erase them
  fractalCtx.fillStyle = "rgba(0,0,0,0.1)";
  fractalCtx.fillRect(0, 0, w, h);

  // Loop over each pixel
  for (let py = 0; py < h; py++) {
    // Map pixel Y to the complex plane
    let cy = (py - h / 2) / (0.5 * zoom * h) + offsetY;
    
    for (let px = 0; px < w; px++) {
      // Map pixel X to the complex plane
      let cx = (px - w / 2) / (0.5 * zoom * w) + offsetX;
      
      // Standard mandelbrot iteration
      let [iter, escaped] = mandelbrotIterations(cx, cy, maxIter);
      
      // Color based on iteration
      // e.g. a rainbow that changes every iteration
      let hue = (iter * 100) % 360; 
      let col = hslToRgb(hue, 1, 0.5);

      // Set pixel
      data[idx++] = col.r;
      data[idx++] = col.g;
      data[idx++] = col.b;
      data[idx++] = 255;
    }
  }

  // Render onto canvas
  fractalCtx.putImageData(imageData, 0, 0);
}

// user controls
  const maxIter = parseInt(document.getElementById('mandelbrotIterationsInput')?.value || '300', 10);
  const q = parseInt(document.getElementById('symmetrySelect').value, 10) || 1;

/**
 * Returns [iterationCount, escapedOrNot] for a single point in the complex plane.
 */
function mandelbrotIterations(cx, cy, maxIter) {
  let zx = 0, zy = 0;
  let iter = 0;
  
  while (iter < maxIter) {
    let xTemp = zx*zx - zy*zy + cx;
    zy = 2 * zx * zy + cy;
    zx = xTemp;

    if (zx*zx + zy*zy > 4) {
      return [iter, true];
    }
    iter++;
  }
  return [iter, false];
}



function drawBarnsleyFernDynamic() {
  // Partial fade for trails
  fractalCtx.fillStyle = "rgba(0,0,0,0.1)";
  fractalCtx.fillRect(0, 0, fractalCanvas.width, fractalCanvas.height);

  const w = fractalCanvas.width;
  const h = fractalCanvas.height;

  // More points => bushier fern
  const numPoints = 30000;

  // Bigger scale so the fern is larger
  // At pressure=1 => ~25, at pressure=2 => ~40
  let scaleFactor = 25 + 15 * (lastPressure - 1);

  // Shift it upward (so it's near top). We'll place the "base" at ~70% from top:
  // Adjust these numbers to taste.
  let verticalBase = h * 0.70;

  // Let’s offset the fern horizontally based on pointer X
  // pointer left => negative offset, pointer right => positive
  let offsetX = (lastPointerX - w / 2) * .05; 
  // offsetY for further upward shift; you can adjust it more if desired
  let offsetY = (lastPointerY - h / 2) * 0.05; 

  // We'll do a rotation for extra variation
  let rotationDegrees = (lastPointerX / w) * 720;
  let rotationRadians = (Math.PI / 180) * rotationDegrees;
  let cosA = Math.cos(rotationRadians);
  let sinA = Math.sin(rotationRadians);

  // Starting point in “fern space”
  let x = 0, y = 0; 

  for (let i = 0; i < numPoints; i++) {
    // Barnsley IFS
    let r = Math.random();
    let xNew, yNew;

    if (r < 0.01) {
      // f1
      xNew = 0;
      yNew = 0.16 * y;
    } else if (r < 0.85) {
      // f2 => increased chance for more 'stem'
      xNew = 0.85 * x + 0.04 * y;
      yNew = -0.04 * x + 0.85 * y + 1.6;
    } else if (r < 0.92) {
      // f3 => slightly changed probability
      xNew = 0.20 * x - 0.26 * y;
      yNew = 0.23 * x + 0.22 * y + 1.6;
    } else {
      // f4
      xNew = -0.15 * x + 0.28 * y;
      yNew = 0.26 * x + 0.24 * y + 0.44;
    }

    x = xNew;
    y = yNew;

    // Rotate
    let rx = x * cosA - y * sinA;
    let ry = x * sinA + y * cosA;

    // Scale + translation
    let px = Math.floor(w / 2 + offsetX + rx * scaleFactor);
    let py = Math.floor(verticalBase - offsetY - ry * scaleFactor);

    // Full rainbow color for each point
    // We'll link it to i so it continuously changes
    let hue = (i * 0.2) % 360;
    fractalCtx.fillStyle = `hsl(${hue}, 100%, 50%)`;

    fractalCtx.fillRect(px, py, 1, 1);
  }
}

/**
 * 4) JULIA SET
 *    Drawn per-pixel. Harder press => modifies 'c' parameter for more variation.
 */
function drawJuliaFractal() {
  const w = fractalCanvas.width;
  const h = fractalCanvas.height;
  const maxIter = parseInt(document.getElementById("juliaIterationsInput").value, 10) || 100;

  // c parameter derived from pointer + pressure
  // e.g. range it in [-1..1]
  let cr = ((lastPointerX / w) - 0.5) * 2 * lastPressure;
  let ci = ((lastPointerY / h) - 0.5) * 2 * lastPressure;

  // imageData for direct pixel filling
  let imageData = fractalCtx.createImageData(w, h);
  let data = imageData.data;

  let idx = 0;
  for (let py = 0; py < h; py++) {
    let y0 = (py / h) * 4 - 2;  // map to [-2..2]

    for (let px = 0; px < w; px++) {
      let x0 = (px / w) * 4 - 2; // map to [-2..2]

      let x = x0, y = y0;
      let iteration = 5;
      while (x*x + y*y < 4 && iteration < maxIter) {
        let xTemp = x*x - y*y + cr;
        y = 2*x*y + ci;
        x = xTemp;
        iteration++;
      }

      // color based on iteration
      let ratio = iteration / maxIter;
      let hue = Math.floor(ratio * 1480) % 720;
      let col = hslToRgb(hue, 1.0, .5);

      data[idx]   = col.r;   // R
      data[idx+1] = col.g;   // G
      data[idx+2] = col.b;   // B
      data[idx+3] = 255;     // A
      idx += 4;
    }
  }
  fractalCtx.putImageData(imageData, 0, 0);
}

/**
 * Convert an HSL color to an {r,g,b} object for easy pixel filling
 */
function hslToRgb(h, s, l) {
  // adapted from a standard HSL to RGB formula
  h = (h % 360) / 360;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l*s;
    const p = 2*l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

/**
 * 5) LABYRINTH FRACTAL
 *    Draw a square-spiral labyrinth from pointer outward.
 */
function drawLabyrinthFractal() {
  const cx = Math.floor(lastPointerX);
  const cy = Math.floor(lastPointerY);

  // We'll do a simple square spiral expansion
  // Each layer is bigger, with some randomization to create a labyrinth effect.
  let step = 5;
  let dir = 0; // 0=right,1=down,2=left,3=up
  let x = cx, y = cy;
  let hue = Math.random() * 360;

  fractalCtx.strokeStyle = "yellow";
  fractalCtx.lineWidth = 1.5;

  // We'll expand ~600 steps
  for (let i = 0; i < 600; i++) {
    // random color shift
    hue += 3;
    fractalCtx.strokeStyle = `hsl(${hue % 360}, 100%, 50%)`;

    let nx = x, ny = y;
    switch (dir) {
      case 0: nx = x + step; break; // right
      case 1: ny = y + step; break; // down
      case 2: nx = x - step; break; // left
      case 3: ny = y - step; break; // up
    }

    fractalCtx.beginPath();
    fractalCtx.moveTo(x, y);
    fractalCtx.lineTo(nx, ny);
    fractalCtx.stroke();

    x = nx;
    y = ny;

    if (i % 2 === 0) {
      step += 5; // expand every 2 segments
    }

    dir = (dir + 1) % 4; // rotate direction
  }
}

/**
 * Clears the canvas
 */
function clearFractalCanvas() {
  fractalCtx.clearRect(0, 0, fractalCanvas.width, fractalCanvas.height);
}

/**
 * Resize the canvas
 */
function resizeFractalCanvas() {
  const newSize = parseInt(document.getElementById("fractalCanvasSize").value, 10);
  fractalCanvas.width = newSize;
  fractalCanvas.height = newSize;
  clearFractalCanvas();
}



/**
 * Saves the fractal image to the gallery with a selection checkbox
 */
function saveFractalToGallery() {
    const dataURL = fractalCanvas.toDataURL("image/png");
    const gallery = document.getElementById("fractalGallery");

    const container = document.createElement("div");
    container.classList.add("fractal-item");

    const img = document.createElement("img");
    img.src = dataURL;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Toggle selection state when clicking image or checkbox
    img.addEventListener("click", () => {
        container.classList.toggle("selected");
        checkbox.checked = !checkbox.checked;
    });
    checkbox.addEventListener("change", () => {
        container.classList.toggle("selected", checkbox.checked);
    });

    container.appendChild(checkbox);
    container.appendChild(img);
    gallery.appendChild(container);
}

/**
 * Deletes selected fractals from the gallery
 */
function deleteSelectedFractals() {
    const selectedItems = document.querySelectorAll(".fractal-item.selected");

    if (selectedItems.length === 0) {
        alert("No images selected!");
        return;
    }

    selectedItems.forEach(item => item.remove());
}



/**
 * Save all images in the gallery to the user's device as separate files
 */
function saveAllFractalImages() {
    const gallery = document.getElementById("fractalGallery");
    const images = gallery.getElementsByTagName("img");

    if (images.length === 0) {
        alert("No fractal images to save!");
        return;
    }

    let delay = 1500; // 500ms delay to prevent browser throttling

    for (let i = 0; i < images.length; i++) {
        ((index) => {
            setTimeout(() => {
                let img = images[index];

                fetch(img.src)
                    .then(response => response.blob())
                    .then(blob => {
                        const blobURL = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = blobURL;
                        link.download = `fractal_${index + 1}.png`;

                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        // Free memory
                        URL.revokeObjectURL(blobURL);
                    })
                    .catch(error => console.error("Error downloading image:", error));
            }, index * delay);
        })(i);
    }
}

function createGifFromGallery() {
  const gallery = document.getElementById("fractalGallery");
  const images = gallery.getElementsByTagName("img");

  if (!images.length) {
    alert("No images in the gallery to create a GIF from!");
    return;
  }

  // 1) Read user-selected options
  const quality = parseInt(document.getElementById("quality").value, 10);
  const userWidth = parseInt(document.getElementById("width").value, 10);
  const userHeight = parseInt(document.getElementById("height").value, 10);
  const speed = parseInt(document.getElementById("speed").value, 10);

  // 2) Create the GIF instance (width/height optional).
  //    We'll pass them to ensure the final GIF is recognized as that size.
  const gif = new GIF({
    workers: 2,
    quality: quality,
    width: userWidth,
    height: userHeight,
    workerScript: './lib/gif.worker.js'
  });

  // 3) For each <img> in the gallery, draw it on a canvas that's userWidth x userHeight
  //    so it gets stretched exactly.
  for (let i = 0; i < images.length; i++) {
    const canvas = document.createElement('canvas');
    canvas.width = userWidth;
    canvas.height = userHeight;

    const ctx = canvas.getContext('2d');
    // Draw the <img> stretched to fill the canvas
    ctx.drawImage(images[i], 0, 0, userWidth, userHeight);

    // Add the canvas as a frame with the chosen delay
    gif.addFrame(canvas, { delay: speed });
  }

  // 4) When finished encoding => let the user download the .gif
  gif.on('finished', function(blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fractal_gallery.gif';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // free memory
  });

  // 5) Start rendering
  gif.render();
}

// Attach event listener to the "Save All" button
document.getElementById("saveAllFractalsBtn")
        .addEventListener("click", saveAllFractalImages);

/**
 * Clear gallery
 */
function clearFractalGallery() {
  document.getElementById("fractalGallery").innerHTML = "";
}

document.getElementById("createGifBtn")
        .addEventListener("click", createGifFromGallery);
// Attach delete event
    document.getElementById("deleteSelectedBtn").addEventListener("click", deleteSelectedFractals);
document.getElementById("clearFractalGalleryBtn")
          .addEventListener("click", clearFractalGallery);
					
document.getElementById('quality').addEventListener('input', function() {
  document.getElementById('qualityValue').textContent = this.value;
});

const toggleButton = document.getElementById('darkModeToggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});