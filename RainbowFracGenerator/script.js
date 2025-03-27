// Global variables
    let canvas, ctx;
    let width, height;
    let imageData;
    let maxIterations = 1000;
    let colorTheme = "rainbow"; // default theme

    // Choose a random color theme from a set of options
    function chooseColorTheme() {
      const themes = ["rainbow", "vivid", "neon", "deepRainbow"];
      colorTheme = themes[Math.floor(Math.random() * themes.length)];
      console.log("Chosen Color Theme:", colorTheme);
    }

    window.onload = function() {
      canvas = document.getElementById('fractalCanvas');
      ctx = canvas.getContext('2d');
      resizeCanvas();
      generateFractal();

      document.getElementById('generateButton').addEventListener('click', generateFractal);
      document.getElementById('styleSelect').addEventListener('change', generateFractal);
      window.addEventListener('resize', onWindowResize, false);
    };

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function onWindowResize() {
      resizeCanvas();
      generateFractal();
    }

    function generateFractal() {
      // Randomize max iterations for more detail (500 - 2000)
      maxIterations = Math.floor(Math.random() * 1500) + 500;
      // Choose a new color theme each time
      chooseColorTheme();

      const style = document.getElementById('styleSelect').value;
      ctx.clearRect(0, 0, width, height);

      switch (style) {
        case 'mandelbrot':
          generateMandelbrotSet();
          break;
        case 'julia':
          generateJuliaSet();
          break;
        case 'mandala':
          generateMandalaPattern();
          break;
        case 'kaleidoscope':
          generateKaleidoscopePattern();
          break;
        case 'spiral':
          generateSpiralPattern();
          break;
        case 'tessellation':
          generateTessellationPattern();
          break;
        case 'paisley':
          generatePaisleyPattern();
          break;
        case 'sacred_geometry':
          generateSacredGeometryPattern();
          break;
        default:
          generateMandelbrotSet();
      }
    }

    // Fractal Generators

    function generateMandelbrotSet() {
      // Use more extreme random parameters
      const zoom = Math.random() * 2.5 + .1;  // from 0.2 to ~2.7
      const offsetX = Math.random() * 1 - 1.5;     // -2 to 2
      const offsetY = Math.random() * 1 - 1.5;     // -2 to 2

      imageData = ctx.createImageData(width, height);

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          let m = mandelbrot(
            (x - width / 4) / (0.5 * zoom * width) + offsetX,
            (y - height / 4) / (0.5 * zoom * height) + offsetY
          );
          let color = getColor(m);
          setPixel(imageData, x, y, color);
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }

    function mandelbrot(x, y) {
      let real = x, imag = y;
      let n = 0;
      while (n < maxIterations) {
        let real2 = real * real - imag * imag + x;
        let imag2 = 2 * real * imag + y;
        real = real2;
        imag = imag2;
        if (real * imag > 8) break;
        n++;
      }
      return n;
    }

    function generateJuliaSet() {
  // Define parameter ranges (derived from your favorites):
  const cImMin = -1.21, cImMax = -0.65;
  const cReMin = 6.449204310137091e-05, cReMax = 0.002;
  const zoomMin = 0.22, zoomMax = 1.17;
  const scaleFactorMin = 0.15, scaleFactorMax = 0.82;
  const maxIterMin = 600, maxIterMax = 2000;
  
  // Randomly choose parameters within these ranges:
  const cIm = Math.random() * (cImMax - cImMin) + cImMin;
  const cRe = Math.random() * (cReMax - cReMin) + cReMin;
  const zoom = Math.random() * (zoomMax - zoomMin) + zoomMin;
  const scaleFactor = Math.random() * (scaleFactorMax - scaleFactorMin) + scaleFactorMin;
  maxIterations = Math.floor(Math.random() * (maxIterMax - maxIterMin) + maxIterMin);
  
  // Log the chosen parameters to the console:
  console.log("Julia Set Parameters:");
  console.log({
    cIm: cIm,
    cRe: cRe,
    zoom: zoom,
    scaleFactor: scaleFactor,
    maxIterations: maxIterations
  });
  
  // Create a fresh image data buffer:
  imageData = ctx.createImageData(width, height);
  
  // Center the fractal on the canvas by mapping pixel coordinates to fractal space.
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let m = julia(
        (x - width / 2) / (scaleFactor * width),
        (y - height / 2) / (scaleFactor * height),
        cRe,
        cIm
      );
      let color = getColor(m);
      setPixel(imageData, x, y, color);
    }
  }
  // Render the fractal image at (0, 0)
  ctx.putImageData(imageData, 0, 0);
}

function julia(x, y, cRe, cIm) {
  let real = x, imag = y;
  let n = 0;  // start at 0 for full detail
  while (n < maxIterations) {
    let real2 = real * real - imag * imag + cRe;
    let imag2 = 2 * real * imag + cIm;  // using 2.0 for branching twist
    real = real2;
    imag = imag2;
    // Use the sum of squares as the escape criterion.
    if (real * real + imag * imag > 8) break;
    n++;
  }
  return n;
}



    function generateMandalaPattern() {
      // Increase number of sides and layers for extra complexity
      const numSides = Math.floor(Math.random() * 12) + 4;   // 4 to 15
      const numLayers = Math.floor(Math.random() * 15) + 30;    // 5 to 19
      const maxRadius = Math.min(width, height) / 1;

      for (let i = 0; i < numLayers; i++) {
        ctx.beginPath();
        const radius = (i / numLayers) * maxRadius;
        for (let j = 0; j <= numSides; j++) {
          const angle = (j / numSides) * Math.PI * 2;
          const x = width / 2 + radius * Math.cos(angle);
          const y = height / 2 + radius * Math.sin(angle);
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = getRandomColor();
        ctx.lineWidth = Math.random() * 3 + 1;
        ctx.stroke();
      }
    }

    function generateKaleidoscopePattern() {
      const numSegments = Math.floor(Math.random() * 16) + 6;  // 6 to 21 segments
      const maxRadius = Math.min(width, height) / 2;
      const imageData = ctx.createImageData(width, height);

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const dx = x - width / 2;
          const dy = y - height / 2;
          const angle = Math.atan2(dy, dx);
          const radius = Math.sqrt(dx * dx + dy * dy);
          const segment = Math.floor((angle + Math.PI) / (2 * Math.PI / numSegments));
          const color = getColor(segment * 15 + radius % 255);
          setPixel(imageData, x, y, color);
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }

    function generateSpiralPattern() {
      ctx.save();
      ctx.translate(width / 2, height / 2);
      const numSpirals = Math.floor(Math.random() * 8) + 2;  // 2 to 9 spirals
      const maxRadius = Math.min(width, height) / 1;

      for (let i = 0; i < numSpirals; i++) {
        ctx.beginPath();
        ctx.rotate((Math.PI * 2) / numSpirals);
        ctx.moveTo(0, 0);
        for (let r = 0; r < maxRadius; r += 1) {
          const angle = 0.2 * r; // increased twist for a more dramatic spiral
          const x = r * Math.cos(angle);
          const y = r * Math.sin(angle);
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = getRandomColor();
        ctx.lineWidth = Math.random() * 3 + 1;
        ctx.stroke();
      }
      ctx.restore();
    }

    function generateTessellationPattern() {
      const size = Math.floor(Math.random() * 50) + 30;
      const colors = [
        getRandomColor(),
        getRandomColor(),
        getRandomColor(),
        getRandomColor()
      ];

      for (let y = 0; y < height; y += size) {
        for (let x = 0; x < width; x += size) {
          ctx.fillStyle = colors[(Math.floor(x/size) + Math.floor(y/size)) % colors.length];
          ctx.fillRect(x, y, size, size);
        }
      }
    }

    function generatePaisleyPattern() {
      const numPaisleys = Math.floor(Math.random() * 1) + 300; // 20 to 60
      for (let i = 0; i < numPaisleys; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 60 + 20;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = getRandomColor();
        ctx.fill();
      }
    }

    function generateSacredGeometryPattern() {
      const numShapes = Math.floor(Math.random() * 12) + 20; // 3 to 10 shapes
      const maxRadius = Math.min(width, height) / 1;
      for (let i = 1; i <= numShapes; i++) {
        ctx.beginPath();
        const radius = (i / numShapes) * maxRadius;
        ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 30);
        ctx.strokeStyle = getRandomColor();
        ctx.lineWidth = Math.random() * 3 + 1;
        ctx.stroke();
      }
    }

    // Utility Functions

    function setPixel(imageData, x, y, color) {
      let index = (x + y * width) * 4;
      imageData.data[index + 0] = color.r;
      imageData.data[index + 1] = color.g;
      imageData.data[index + 2] = color.b;
      imageData.data[index + 3] = 255;
    }

    // getColor uses the chosen global colorTheme to produce different palettes
    function getColor(iteration) {
      let hue = (iteration * 25) % 1200;
      switch (colorTheme) {
        case "rainbow":
          return hslToRgb(hue / 360, 1, 0.5);
        
        case "vivid":
          return hslToRgb(hue / 360, 1, 0.5);
        case "neon":
          return hslToRgb(hue / 360, 1, 0.6);
        case "deepRainbow":
          return hslToRgb(hue / 360, 1, 0.4);
        default:
          return hslToRgb(hue / 360, 1, 0.5);
      }
    }

   

    // getRandomColor returns a CSS color string based on the current theme
    function getRandomColor() {
      let hue = Math.random() * 360;
      switch (colorTheme) {
        case "rainbow":
          return `hsl(${hue}, 100%, 50%)`;
        case "monochrome":
          let gray = Math.floor(Math.random() * 255);
          return `rgb(${gray}, ${gray}, ${gray})`;
        case "pastel":
          return `hsl(${hue}, 40%, 80%)`;
        case "vivid":
          return `hsl(${hue}, 100%, 50%)`;
        case "neon":
          return `hsl(${hue}, 100%, 60%)`;
        case "deepRainbow":
          return `hsl(${hue}, 100%, 40%)`;
        default:
          return `hsl(${hue}, 100%, 50%)`;
      }
    }

    // Convert HSL to RGB; returns an object with r, g, and b values (0-255)
    function hslToRgb(h, s, l) {
      let r, g, b;
      if (s == 0) {
        r = g = b = l; // achromatic
      } else {
        function hue2rgb(p, q, t) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        }
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }