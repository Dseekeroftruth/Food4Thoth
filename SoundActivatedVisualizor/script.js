

    // Controls Toggle
    document.addEventListener('DOMContentLoaded', () => {
      const toggleButton = document.getElementById('toggle-Controls1');
      const navigation = document.getElementById('controls');
      const navigation1 = document.getElementById('controls1');
      const navigation2 = document.getElementById('controls2');
      const navigation3 = document.getElementById('start-audio-btn');
      const navigation4 = document.getElementById('stop-audio-btn');
      const navigation5 = document.getElementById('h1');

      toggleButton.addEventListener('click', () => {
        const isHidden = navigation.classList.toggle('hidden');
        toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
      });
      toggleButton.addEventListener('click', () => {
        const isHidden = navigation1.classList.toggle('hidden');
        toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
      });
      toggleButton.addEventListener('click', () => {
        const isHidden = navigation2.classList.toggle('hidden');
        toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
      });
      toggleButton.addEventListener('click', () => {
        const isHidden = navigation3.classList.toggle('hidden');
        toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
      });
      toggleButton.addEventListener('click', () => {
        const isHidden = navigation4.classList.toggle('hidden');
        toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
      });
      toggleButton.addEventListener('click', () => {
        const isHidden = navigation5.classList.toggle('hidden');
        toggleButton.textContent = isHidden ? '☰ Controls' : '✖ Close';
      });
    });

    /***************************************************
     * 2. Canvas Resizing Setup
     ***************************************************/
    const canvas = document.getElementById("visualization");
    const ctx = canvas.getContext("2d");
    const canvas1 = document.getElementById("visualization1");
    const ctx1 = canvas1.getContext("2d");
    const canvas2 = document.getElementById("visualization2");
    const ctx2 = canvas2.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function resizeCanvas1() {
      canvas1.width = window.innerWidth;
      canvas1.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas1);
    resizeCanvas1();

    function resizeCanvas2() {
      canvas2.width = window.innerWidth;
      canvas2.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas2);
    resizeCanvas2();

    /***************************************************
     * 3. Audio & Visualization Setup
     ***************************************************/
    let audioContext = null;
    let analyser = null;
    let audioStream = null;
    let bufferLength = 0;
    let dataArray = null;

    // Start/Stop Buttons
    const startAudioBtn = document.getElementById("start-audio-btn");
    const stopAudioBtn = document.getElementById("stop-audio-btn");

    // Visualization flags
    let isVisualizationRunning = true;   // for Fractal
    let isVisualizationRunning1 = true;  // for Visualization1
    let isVisualizationRunning2 = true;  // for Visualization2

    // Shared angles and color offsets
    let angle = 0,     colorOffset = 0;
    let angle1 = 0,    colorOffset1 = 0;
    let angle2 = 0,    colorOffset2 = 0;

    // Spin speeds and spread factors
    let spinSpeed = 1,          spiralSpreadFactor = 4;
    let spinSpeed1 = 1,         spiralSpreadFactor1 = 4;
    let spinSpeed2 = 1,         spiralSpreadFactor2 = 4;

    // Shape size multipliers
    let shapeSizeFactor = 1;
    let shapeSizeFactor1 = 1;
    let shapeSizeFactor2 = 1;

    // AnimationFrame IDs for each visualization
    let animationFrameId = null;
    let animationFrameId1 = null;
    let animationFrameId2 = null;

    /***************************************************
     * 3a. Audio Initialization
     ***************************************************/
    async function initializeAudio() {
      try {
        // Create or resume the AudioContext
        if (!audioContext || audioContext.state === "closed") {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } else if (audioContext.state === "suspended") {
          await audioContext.resume();
        }

        // Stop existing stream, if any
        if (audioStream) {
          audioStream.getTracks().forEach(track => track.stop());
          audioStream = null;
        }

        // Always request the default microphone
        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const source = audioContext.createMediaStreamSource(audioStream);

        // Create analyser if needed
        if (!analyser) {
          analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          bufferLength = analyser.frequencyBinCount;
          dataArray = new Uint8Array(bufferLength);
        }

        // Connect the audio stream to the analyser
        source.connect(analyser);
        console.log("Microphone initialized and connected to analyser.");
      } catch (err) {
        console.error("Microphone initialization failed:", err);
        alert("Microphone access is required for this application.");
      }
    }

    /***************************************************
     * 3b. Device Change Handling
     ***************************************************/
    navigator.mediaDevices.ondevicechange = async () => {
      console.log("Device change detected. Reinitializing audio...");
      try {
        await initializeAudio();
        console.log("Audio reinitialized after device change.");
      } catch (err) {
        console.error("Error reinitializing audio after device change:", err);
      }
    };

    /***************************************************
     * 3c. Start/Stop Buttons
     ***************************************************/
    startAudioBtn.addEventListener("click", async () => {
      try {
        await initializeAudio();
        // Start all visualizations
        requestAnimationFrame(drawFractal);
        requestAnimationFrame(drawVisualization1);
        requestAnimationFrame(drawVisualization2);

        startAudioBtn.classList.add("hidden");
        stopAudioBtn.classList.remove("hidden");
        console.log("Microphone started; visualizations running.");
      } catch (err) {
        console.error("Failed to start microphone:", err);
        alert("Unable to start microphone. Check permissions.");
      }
    });

    stopAudioBtn.addEventListener("click", () => {
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
        audioStream = null;
      }
      // We do NOT close the audioContext; visualizations will receive zero amplitude
      stopAudioBtn.classList.add("hidden");
      startAudioBtn.classList.remove("hidden");
      console.log("Microphone stopped; visualizations continue with zero data.");
    });

    // Safety fallback: if stream ends unexpectedly, reinitialize
    setInterval(() => {
      if (audioStream && audioStream.getTracks().some(track => track.readyState === "ended")) {
        console.log("Audio stream ended. Attempting to reinitialize...");
        initializeAudio().catch(err => {
          console.error("Failed to reinitialize audio stream:", err);
        });
      }
    }, 1000);

    /***************************************************
     * 3d. Visualization Toggles
     ***************************************************/
    // Toggle for fractal
    const toggleVisualizationBtn = document.getElementById("toggle-visualization-btn");
    toggleVisualizationBtn.addEventListener("click", () => {
      isVisualizationRunning = !isVisualizationRunning;
      toggleVisualizationBtn.textContent = isVisualizationRunning ? "Hide Visualization" : "Show Visualization";

      if (!isVisualizationRunning) {
        cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        requestAnimationFrame(drawFractal);
      }
    });

    // Toggle for Visualization1
    const toggleVisualizationBtn1 = document.getElementById("toggle-visualization-btn1");
    toggleVisualizationBtn1.addEventListener("click", () => {
      isVisualizationRunning1 = !isVisualizationRunning1;
      toggleVisualizationBtn1.textContent = isVisualizationRunning1 ? "Hide Visualization" : "Show Visualization";

      if (!isVisualizationRunning1) {
        cancelAnimationFrame(animationFrameId1);
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
      } else {
        requestAnimationFrame(drawVisualization1);
      }
    });

    // Toggle for Visualization2
    const toggleVisualizationBtn2 = document.getElementById("toggle-visualization-btn2");
    toggleVisualizationBtn2.addEventListener("click", () => {
      isVisualizationRunning2 = !isVisualizationRunning2;
      toggleVisualizationBtn2.textContent = isVisualizationRunning2 ? "Hide Visualization" : "Show Visualization";

      if (!isVisualizationRunning2) {
        cancelAnimationFrame(animationFrameId2);
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      } else {
        requestAnimationFrame(drawVisualization2);
      }
    });

    /***************************************************
     * 4. Visualization Update Functions & Sliders
     ***************************************************/
    function updateSpinSpeed(value) {
      spinSpeed = parseFloat(value);
      document.getElementById("spin-speed-label").textContent = value;
    }
    function updateSpiralSpread(value) {
      spiralSpreadFactor = parseInt(value, 10);
      document.getElementById("spiral-spread-label").textContent = value;
    }
    function updateShapeSizeFactor(value) {
      shapeSizeFactor = parseFloat(value);
      document.getElementById("shape-size-factor-label").textContent = value;
    }

    function updateSpinSpeed1(value) {
      spinSpeed1 = parseFloat(value);
      document.getElementById("spin-speed-label1").textContent = value;
    }
    function updateSpiralSpread1(value) {
      spiralSpreadFactor1 = parseInt(value, 10);
      document.getElementById("spiral-spread-label1").textContent = value;
    }
    function updateShapeSizeFactor1(value) {
      shapeSizeFactor1 = parseFloat(value);
      document.getElementById("shape-size-factor-label1").textContent = value;
    }

    function updateSpinSpeed2(value) {
      spinSpeed2 = parseFloat(value);
      document.getElementById("spin-speed-label2").textContent = value;
    }
    function updateSpiralSpread2(value) {
      spiralSpreadFactor2 = parseInt(value, 10);
      document.getElementById("spiral-spread-label2").textContent = value;
    }
    function updateShapeSizeFactor2(value) {
      shapeSizeFactor2 = parseFloat(value);
      document.getElementById("shape-size-factor-label2").textContent = value;
    }

    /***************************************************
     * 4a. Fractal Visualization (drawFractal)
     ***************************************************/
    function drawFractal() {
      if (!isVisualizationRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.save();
      ctx.translate(cx, cy);

      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
      } else {
        // If no mic data, dataArray might be all zero
      }

      const avgAmp = dataArray ? dataArray.reduce((sum, v) => sum + v, 0) / bufferLength : 0;
      const maxAmp = dataArray ? Math.max(...dataArray) : 0;
      const normMax = maxAmp / 255;
      const patternType = normMax > 0.5 ? "spiral" : "circle";

      const totalSpirals = 20;
      const angleBetweenSpirals = (spiralSpreadFactor * Math.PI) / totalSpirals;

      for (let j = 0; j < totalSpirals; j++) {
        const isMirrored = j >= totalSpirals / 2;
        const spiralBaseAngle = j * angleBetweenSpirals;

        for (let i = 0; i < 360; i += 5) {
          const fraction = i / 360;
          let rad = 0;
          if (patternType === "spiral") {
            rad = fraction * 200 + (avgAmp / 255) * 150;
          } else {
            rad = (avgAmp / 255) * 200;
          }

          const sign = isMirrored ? -1 : 1;
          const shapeRotation = spiralBaseAngle + sign * (angle + i) * (Math.PI / 180);

          ctx.save();
          ctx.rotate(shapeRotation);

          const hue = (i + colorOffset + avgAmp * 2 + j * 18) % 360;
          const saturation = 50 + (avgAmp / 255) * 50;
          ctx.fillStyle = `hsl(${hue}, ${saturation}%, 50%)`;

          const rectSize = 10 * shapeSizeFactor;
          if (patternType === "spiral") {
            ctx.fillRect(rad, rad * 0.01, rectSize, rectSize);
          } else {
            // circle
            ctx.beginPath();
            const circleRadius = (avgAmp / 255) * 10;
            ctx.arc(rad, rad * 0.01, circleRadius, 0, 2 * Math.PI);
            ctx.fill();
          }
          ctx.restore();
        }
      }

      ctx.restore();

      // Update angles and color offsets
      const amplitudeFactor = 0.2 + normMax; 
      angle += spinSpeed * amplitudeFactor;
      colorOffset += 0.9 + (avgAmp / 255);

      animationFrameId = requestAnimationFrame(drawFractal);
    }

    /***************************************************
     * 4b. Visualization1 (drawVisualization1)
     ***************************************************/
    function drawVisualization1() {
			if (!isVisualizationRunning1) return;
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

  analyser.getByteFrequencyData(dataArray);

  const avgAmplitude = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
  const maxAmplitude = Math.max(...dataArray);

  const centerX = canvas1.width / 2;
  const centerY = canvas1.height / 2;

  ctx1.save();
  ctx1.translate(centerX, centerY);
	
	// Compute average amplitude & max amplitude
      const avgAmp1 = dataArray.reduce((sum, v) => sum + v, 0) / bufferLength; // 0..255
      const maxAmp1 = Math.max(...dataArray);                                  // 0..255

      // Decide pattern type based on amplitude (normalize to 0..1 for comparison)
      const normMax1 = maxAmp1 / 255;

  const totalSpirals = 20;
  const angleBetweenSpirals = (spiralSpreadFactor1 * Math.PI) / totalSpirals;

  for (let i = 0; i < totalSpirals; i++) {
    ctx1.save();
    ctx1.rotate(i * angleBetweenSpirals + angle1);
		
		for (let j = 0; j < 360; j += 10) {
			const isMirrored1 = j >= totalSpirals / 2; // half are mirrored
        const spiralBaseAngle1 = j * angleBetweenSpirals;
      const radius = j + avgAmplitude;
      const x = radius * Math.cos(j * (Math.PI / 180));
      const y = radius * Math.sin(j * (Math.PI / 180));
			
			// Mirror sign
          const sign1 = isMirrored1 ? -2 : 2;

          // shape rotation
          const shapeRotation1 =
            spiralBaseAngle1 + sign1 * (angle1 + i) * (Math.PI / 180);
						
						
          ctx1.rotate(shapeRotation1);

    // Multiply the shape size by "shapeSizeFactor2"
      const shapeSize = (avgAmplitude / 10) * shapeSizeFactor1;

  

      const hue = (j + colorOffset1) % 360;
      ctx1.fillStyle = `hsl(${hue}, 100%, 50%)`;

      if (maxAmplitude > 250) {
        drawShape(ctx1, x, y, shapeSize, 'triangle');
      } else if (maxAmplitude > 170) {
        drawShape(ctx1, x, y, shapeSize, 'square');
      } else if (maxAmplitude > 120) {
        drawShape(ctx1, x, y, shapeSize, 'circle');
      } else {
        ctx1.fillRect(x, y, 3 * shapeSizeFactor1, 3 * shapeSizeFactor1);
      }
    }
   

    ctx1.restore();
  }

  ctx1.restore();

  // 4c. UPDATE ANIMATION
      // The spin speed (user slider) + amplitude factor
      const amplitudeFactor1 = 0 + (normMax1 * .1); // "normMax" = maxAmp/255
      angle1 += spinSpeed1 * amplitudeFactor1;
      colorOffset1 += 0.9 + (avgAmp1 / 255);

  animationFrameId1 = requestAnimationFrame(drawVisualization1);
}

function drawShape(ctx1, x, y, size, shape) {
  ctx1.beginPath();
  switch (shape) {
    case 'circle':
      ctx1.arc(x, y, size, 0, 8 * Math.PI);
      break;
    case 'square':
      ctx1.rect(x - size / 20, y - size / 20, size, size);
      break;
    case 'triangle':
      ctx1.moveTo(x, y - size);
      ctx1.lineTo(x - size, y + size);
      ctx1.lineTo(x + size, y + size);
      ctx1.closePath();
      break;
  }
  ctx1.fill();
}

    /***************************************************
     * 4c. Visualization2 (drawVisualization2)
     ***************************************************/
    function drawVisualization2() {
      if (!isVisualizationRunning2) return;
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

      const cx = canvas2.width / 2;
      const cy = canvas2.height / 2;
      ctx2.save();
      ctx2.translate(cx, cy);

      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
      }

      const avgAmp2 = dataArray ? dataArray.reduce((sum, v) => sum + v, 0) / bufferLength : 0;
      const maxAmp2 = dataArray ? Math.max(...dataArray) : 0;
      const normMax2 = maxAmp2 / 255;

      const totalSpirals = 20;
      const angleBetweenSpirals = (spiralSpreadFactor2 * Math.PI) / totalSpirals;

      for (let i = 0; i < totalSpirals; i++) {
        ctx2.save();
        ctx2.rotate(i * angleBetweenSpirals + angle2);

        for (let j = 0; j < 360; j += 10) {
          const radius = j + avgAmp2;
          const x = radius * Math.cos(j * (Math.PI / 180));
          const y = radius * Math.sin(j * (Math.PI / 180));

          const shapeSize = (avgAmp2 / 10) * shapeSizeFactor2;
          const hue = (j + colorOffset2) % 360;
          ctx2.fillStyle = `hsl(${hue}, 100%, 50%)`;

          if (maxAmp2 > 250) {
            drawShape2(ctx2, x, y, shapeSize, 'triangle');
          } else if (maxAmp2 > 170) {
            drawShape2(ctx2, x, y, shapeSize, 'square');
          } else if (maxAmp2 > 120) {
            drawShape2(ctx2, x, y, shapeSize, 'circle');
          } else {
            ctx2.fillRect(x, y, 3 * shapeSizeFactor2, 3 * shapeSizeFactor2);
          }
        }
        ctx2.restore();
      }

      ctx2.restore();

      // Update angle and color offset
      angle2 += spinSpeed2 * (normMax2 * 0.1);
      colorOffset2 += 0.9 + (avgAmp2 / 255);

      animationFrameId2 = requestAnimationFrame(drawVisualization2);
    }

    function drawShape2(ctx, x, y, size, shape) {
      ctx.beginPath();
      switch (shape) {
        case 'circle':
          ctx.arc(x, y, size, 0, 2 * Math.PI);
          break;
        case 'square':
          ctx.rect(x - size / 2, y - size / 2, size, size);
          break;
        case 'triangle':
          ctx.moveTo(x, y - size);
          ctx.lineTo(x - size, y + size);
          ctx.lineTo(x + size, y + size);
          ctx.closePath();
          break;
      }
      ctx.fill();
}
    