// ------------------------------------------------
    // GLOBALS & SETUP
    // ------------------------------------------------
    const mainCanvas = document.getElementById('mainCanvas');
    const ctx = mainCanvas.getContext('2d');
    
    // Each "sprite" is: { image, x, y, rotation, scale }
    let sprites = [];
    let selectedSpriteIndex = -1;

    // For mouse dragging
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    // For pinch-to-zoom & rotation
    let isPinching = false;
    let pinchInitialDistance = 0;
    let pinchInitialAngle = 0;
    let pinchInitialScale = 1;
    let pinchInitialRotation = 0;
    let pinchInitialCenter = { x: 0, y: 0 };
    let spriteInitialCenter = { x: 0, y: 0 };
    let pinchTouchIds = [];

    // ---------- DARK MODE -----------
    document.getElementById('darkModeToggle').addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });

    // ------------------------------------------------
    // FILE UPLOAD => ADD SPRITES
    // ------------------------------------------------
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(e) {
      const files = e.target.files;
      if (!files.length) return;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
          sprites.push({
            image: img,
            x: (mainCanvas.width - img.width) / 2,
            y: (mainCanvas.height - img.height) / 2,
            rotation: 0,
            scale: 1
          });
          drawAllSprites();
        };
      }
    }

    // ------------------------------------------------
    // CANVAS SIZE / RESIZE
    // ------------------------------------------------
    const canvasWidthInput = document.getElementById('canvasWidth');
    const canvasHeightInput = document.getElementById('canvasHeight');
    const resizeCanvasBtn = document.getElementById('resizeCanvasBtn');

    resizeCanvasBtn.addEventListener('click', () => {
      const w = parseInt(canvasWidthInput.value, 10);
      const h = parseInt(canvasHeightInput.value, 10);
      if (w > 0 && h > 0) {
        mainCanvas.width = w;
        mainCanvas.height = h;
        drawAllSprites();
      }
    });

    // ------------------------------------------------
    // MOUSE EVENTS
    // ------------------------------------------------
    mainCanvas.addEventListener('mousedown', onMouseDown);
    mainCanvas.addEventListener('mousemove', onMouseMove);
    mainCanvas.addEventListener('mouseup', onMouseUp);
    mainCanvas.addEventListener('mouseleave', onMouseUp);

    function onMouseDown(e) {
      e.preventDefault();
      const { x, y } = getCanvasPosFromMouse(e);

      // Check if we clicked on a sprite (topmost first)
      for (let i = sprites.length - 1; i >= 0; i--) {
        if (hitTestSprite(sprites[i], x, y)) {
          selectedSpriteIndex = i;
          isDragging = true;
          dragOffsetX = x - sprites[i].x;
          dragOffsetY = y - sprites[i].y;
          rotationRange.value = sprites[i].rotation;
          scaleRange.value = sprites[i].scale;
          drawAllSprites();
          return;
        }
      }

      selectedSpriteIndex = -1;
      drawAllSprites();
    }

    function onMouseMove(e) {
      if (!isDragging || selectedSpriteIndex < 0) return;
      e.preventDefault();
      const { x, y } = getCanvasPosFromMouse(e);
      const spr = sprites[selectedSpriteIndex];
      spr.x = x - dragOffsetX;
      spr.y = y - dragOffsetY;
      drawAllSprites();
    }

    function onMouseUp() {
      isDragging = false;
      // If auto-save is checked => save the updated version
      if (document.getElementById('autoSaveCheckbox').checked) {
        saveToGallery();
      }
    }

    function getCanvasPosFromMouse(e) {
      const rect = mainCanvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }

    // ------------------------------------------------
    // TOUCH EVENTS (PINCH-TO-ZOOM + ROTATION)
    // ------------------------------------------------
    mainCanvas.addEventListener('touchstart', onTouchStart, { passive: false });
    mainCanvas.addEventListener('touchmove', onTouchMove, { passive: false });
    mainCanvas.addEventListener('touchend', onTouchEnd);
    mainCanvas.addEventListener('touchcancel', onTouchEnd);

    function onTouchStart(e) {
      e.preventDefault();
      if (isPinching && e.touches.length > 2) return;

      if (e.touches.length === 1) {
        // Single-finger => possibly a drag
        const touch = e.touches[0];
        const { x, y } = getTouchPos(touch);

        for (let i = sprites.length - 1; i >= 0; i--) {
          if (hitTestSprite(sprites[i], x, y)) {
            selectedSpriteIndex = i;
            isDragging = true;
            dragOffsetX = x - sprites[i].x;
            dragOffsetY = y - sprites[i].y;
            rotationRange.value = sprites[i].rotation;
            scaleRange.value = sprites[i].scale;
            drawAllSprites();
            break;
          }
        }
        if (!isDragging) {
          selectedSpriteIndex = -1;
          drawAllSprites();
        }
      } else if (e.touches.length === 2 && selectedSpriteIndex >= 0) {
        // Two-finger pinch start
        isDragging = false;
        isPinching = true;
        pinchTouchIds = [ e.touches[0].identifier, e.touches[1].identifier ];

        const pos1 = getTouchPos(e.touches[0]);
        const pos2 = getTouchPos(e.touches[1]);

        pinchInitialDistance = distance(pos1, pos2);
        pinchInitialAngle = angleBetweenPoints(pos1, pos2);

        const spr = sprites[selectedSpriteIndex];
        pinchInitialScale = spr.scale;
        pinchInitialRotation = spr.rotation;

        pinchInitialCenter = midpoint(pos1, pos2);

        const w = spr.image.width * spr.scale;
        const h = spr.image.height * spr.scale;
        spriteInitialCenter = {
          x: spr.x + w / 2,
          y: spr.y + h / 2
        };
      }
    }

    function onTouchMove(e) {
      e.preventDefault();

      if (isDragging && e.touches.length === 1 && selectedSpriteIndex >= 0) {
        const touch = e.touches[0];
        const { x, y } = getTouchPos(touch);
        const spr = sprites[selectedSpriteIndex];
        spr.x = x - dragOffsetX;
        spr.y = y - dragOffsetY;
        drawAllSprites();
        return;
      }

      if (isPinching && e.touches.length === 2 && selectedSpriteIndex >= 0) {
        const spr = sprites[selectedSpriteIndex];
        let touchA, touchB;
        for (let i = 0; i < e.touches.length; i++) {
          if (e.touches[i].identifier === pinchTouchIds[0]) touchA = e.touches[i];
          if (e.touches[i].identifier === pinchTouchIds[1]) touchB = e.touches[i];
        }
        if (!touchA || !touchB) return;

        const posA = getTouchPos(touchA);
        const posB = getTouchPos(touchB);

        const newDist = distance(posA, posB);
        const newAngle = angleBetweenPoints(posA, posB);

        const scaleRatio = newDist / pinchInitialDistance;
        spr.scale = pinchInitialScale * scaleRatio;

        const angleDeltaDeg = newAngle - pinchInitialAngle;
        spr.rotation = pinchInitialRotation + angleDeltaDeg;

        const newCenter = midpoint(posA, posB);
        const dx = newCenter.x - pinchInitialCenter.x;
        const dy = newCenter.y - pinchInitialCenter.y;

        const w = spr.image.width * spr.scale;
        const h = spr.image.height * spr.scale;
        const currentCenter = {
          x: spr.x + w / 2,
          y: spr.y + h / 2
        };
        const desiredCenter = {
          x: spriteInitialCenter.x + dx,
          y: spriteInitialCenter.y + dy
        };
        spr.x += (desiredCenter.x - currentCenter.x);
        spr.y += (desiredCenter.y - currentCenter.y);

        drawAllSprites();
      }
    }

    function onTouchEnd(e) {
      if (e.touches.length < 2) {
        isPinching = false;
        pinchTouchIds = [];
      }
      if (e.touches.length === 0) {
        isDragging = false;
        // Auto-save if user has that enabled
        if (document.getElementById('autoSaveCheckbox').checked) {
          saveToGallery();
        }
      }
    }

    // Helpers
    function getTouchPos(touch) {
      const rect = mainCanvas.getBoundingClientRect();
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
    function distance(p1, p2) {
      return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
    }
    function angleBetweenPoints(p1, p2) {
      const rad = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      return rad * (180 / Math.PI);
    }
    function midpoint(p1, p2) {
      return { x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2 };
    }

    // ------------------------------------------------
    // HITTEST & DRAWING
    // ------------------------------------------------
    function hitTestSprite(sprite, mx, my) {
      const w = sprite.image.width * sprite.scale;
      const h = sprite.image.height * sprite.scale;
      return (
        mx >= sprite.x &&
        mx <= sprite.x + w &&
        my >= sprite.y &&
        my <= sprite.y + h
      );
    }

    function drawAllSprites() {
      ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      for (let i = 0; i < sprites.length; i++) {
        drawSprite(sprites[i]);
      }
      if (selectedSpriteIndex >= 0) {
        highlightSprite(sprites[selectedSpriteIndex]);
      }
    }

    function drawSprite(sp) {
      const w = sp.image.width * sp.scale;
      const h = sp.image.height * sp.scale;

      ctx.save();
      ctx.translate(sp.x + w/2, sp.y + h/2);
      ctx.rotate(sp.rotation * Math.PI / 180);
      ctx.translate(-w/2, -h/2);

      ctx.drawImage(sp.image, 0, 0, w, h);
      ctx.restore();
    }

    function highlightSprite(sp) {
      // This draws the orange dashed outline (not included in offscreen saving)
      const w = sp.image.width * sp.scale;
      const h = sp.image.height * sp.scale;
      ctx.save();
      ctx.translate(sp.x + w/2, sp.y + h/2);
      ctx.rotate(sp.rotation * Math.PI / 180);
      ctx.translate(-w/2, -h/2);

      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = 'orange';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, w, h);
      ctx.restore();
    }

    // ------------------------------------------------
    // ROTATION / SCALE SLIDERS
    // ------------------------------------------------
    const rotationRange = document.getElementById('rotationRange');
    const scaleRange = document.getElementById('scaleRange');

    rotationRange.addEventListener('input', () => {
      if (selectedSpriteIndex < 0) return;
      sprites[selectedSpriteIndex].rotation = parseFloat(rotationRange.value);
      drawAllSprites();
      maybeAutoSave();
    });

    scaleRange.addEventListener('input', () => {
      if (selectedSpriteIndex < 0) return;
      sprites[selectedSpriteIndex].scale = parseFloat(scaleRange.value);
      drawAllSprites();
      maybeAutoSave();
    });

    // If autoSave checkbox is on, we save the new state whenever a slider changes:
    function maybeAutoSave() {
      if (document.getElementById('autoSaveCheckbox').checked) {
        saveToGallery();
      }
    }

    // ------------------------------------------------
    // LAYER REORDERING
    // ------------------------------------------------
    document.getElementById('bringForwardBtn').addEventListener('click', () => {
      if (selectedSpriteIndex < 0) return;
      if (selectedSpriteIndex < sprites.length - 1) {
        const sp = sprites[selectedSpriteIndex];
        sprites.splice(selectedSpriteIndex, 1);
        sprites.splice(selectedSpriteIndex + 1, 0, sp);
        selectedSpriteIndex++;
        drawAllSprites();
        maybeAutoSave();
      }
    });
    document.getElementById('sendBackwardBtn').addEventListener('click', () => {
      if (selectedSpriteIndex < 0) return;
      if (selectedSpriteIndex > 0) {
        const sp = sprites[selectedSpriteIndex];
        sprites.splice(selectedSpriteIndex, 1);
        sprites.splice(selectedSpriteIndex - 1, 0, sp);
        selectedSpriteIndex--;
        drawAllSprites();
        maybeAutoSave();
      }
    });

    // ------------------------------------------------
    // CLEAR CANVAS
    // ------------------------------------------------
    document.getElementById('clearCanvasBtn').addEventListener('click', () => {
      sprites = [];
      selectedSpriteIndex = -1;
      drawAllSprites();
    });

    // ------------------------------------------------
    // GALLERY (OFFSCREEN SAVE) & AUTO-SAVE
    // ------------------------------------------------
    const gallery = document.getElementById('gallery');
    document.getElementById('saveCanvasBtn').addEventListener('click', saveToGallery);
    document.getElementById('deleteSelectedBtn').addEventListener('click', deleteSelectedFromGallery);
    document.getElementById('clearGalleryBtn').addEventListener('click', () => {
      gallery.innerHTML = '';
    });
    document.getElementById('saveAllBtn').addEventListener('click', downloadAllImages);

    // 1) Use an offscreen canvas so highlight won't appear in saved images.
    function saveToGallery() {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = mainCanvas.width;
      offCanvas.height = mainCanvas.height;
      const offCtx = offCanvas.getContext('2d');

      // Draw each sprite in the same order, no highlight
      for (let i = 0; i < sprites.length; i++) {
        drawSpriteOffscreen(sprites[i], offCtx);
      }

      const dataURL = offCanvas.toDataURL('image/png');
      addGalleryItem(dataURL);
    }

    function drawSpriteOffscreen(sp, offCtx) {
      const w = sp.image.width * sp.scale;
      const h = sp.image.height * sp.scale;
      offCtx.save();
      offCtx.translate(sp.x + w/2, sp.y + h/2);
      offCtx.rotate(sp.rotation * Math.PI / 180);
      offCtx.translate(-w/2, -h/2);
      offCtx.drawImage(sp.image, 0, 0, w, h);
      offCtx.restore();
    }

    function addGalleryItem(dataURL) {
      const container = document.createElement('div');
      container.classList.add('item');

      const imgEl = document.createElement('img');
      imgEl.src = dataURL;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';

      // toggling selected
      imgEl.addEventListener('click', () => {
        container.classList.toggle('selected');
        checkbox.checked = !checkbox.checked;
      });
      checkbox.addEventListener('change', () => {
        container.classList.toggle('selected', checkbox.checked);
      });

      container.appendChild(checkbox);
      container.appendChild(imgEl);
      gallery.appendChild(container);
    }

    function deleteSelectedFromGallery() {
      const selectedItems = gallery.querySelectorAll('.item.selected');
      if (!selectedItems.length) {
        alert('No images selected.');
        return;
      }
      selectedItems.forEach(item => item.remove());
    }

    function downloadAllImages() {
      const items = gallery.querySelectorAll('.item img');
      if (!items.length) {
        alert('No images in the gallery.');
        return;
      }
      items.forEach((imgEl, index) => {
        const link = document.createElement('a');
        link.href = imgEl.src;
        link.download = `image_${index + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }

    document.getElementById('autoSaveCheckbox').addEventListener('change', (e) => {
      // If unchecking, no more auto saves on mouseup/touchend
      if (!e.target.checked) {
        // Just in case you need to remove them:
        // mainCanvas.removeEventListener('mouseup', autoSaveHandler); 
        // mainCanvas.removeEventListener('touchend', autoSaveHandler);
      }
      // If checking, we already handle it in onMouseUp and onTouchEnd
    });

    // ------------------------------------------------
    // GIF CREATION
    // ------------------------------------------------
    document.getElementById('gifQuality').addEventListener('input', function() {
      document.getElementById('qualityValue').textContent = this.value;
    });
    document.getElementById('createGifBtn').addEventListener('click', createGifFromGallery);

    function createGifFromGallery() {
      const images = gallery.getElementsByTagName("img");
      if (!images.length) {
        alert("No images in the gallery to create a GIF from!");
        return;
      }

      // 1) Read user-selected options
      const quality   = parseInt(document.getElementById("gifQuality").value, 10);
      const userWidth = parseInt(document.getElementById("gifWidth").value,   10);
      const userHeight= parseInt(document.getElementById("gifHeight").value,  10);
      const speed     = parseInt(document.getElementById("gifSpeed").value,   10);

      // 2) Create the GIF instance
      const gif = new GIF({
        workers: 2,
        quality: quality,
        width: userWidth,
        height: userHeight,
        workerScript: './lib/gif.worker.js'  // ensure it exists
      });

      // 3) For each <img> in the gallery, draw it onto an offscreen canvas
      for (let i = 0; i < images.length; i++) {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = userWidth;
        offCanvas.height = userHeight;
        const offCtx = offCanvas.getContext('2d');
        offCtx.drawImage(images[i], 0, 0, userWidth, userHeight);

        gif.addFrame(offCanvas, { delay: speed });
      }

      // 4) On finish => download
      gif.on('finished', function(blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'gallery_animation.gif';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });

      // 5) Start rendering
      gif.render();
    }