// Canvas class for managing canvas
    class Canvas {
      constructor(id) {
        this.elem = document.getElementById(id);
        this.ctx = this.elem.getContext('2d');
        
        this.elem.width = window.innerWidth;
        this.elem.height = window.innerHeight;
        this.width = this.elem.width;
        this.height = this.elem.height;

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
      }

      clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }

      onWindowResize() {
        this.elem.width = window.innerWidth;
        this.elem.height = window.innerHeight;
        this.width = this.elem.width;
        this.height = this.elem.height;
        this.clear();
      }
    }
    
    let trees = [];  // Global array to track all trees

    class FractalTree3 {
      constructor(canvas, x, y, startLength, startWidth, maxOrder, growSpeed, swayStartDelay, callback) {
        this.canvas = canvas;
        this.ctx = this.canvas.ctx;
        this.x = x;
        this.y = y;
        this.start_length = startLength;
        this.start_width = startWidth;
        this.angle = Math.PI / 5;
        this.max_order = maxOrder;
        this.current_order = 0;
        this.sway_enabled = false;
        this.sway_angle = 0;
        this.swayStartDelay = swayStartDelay;
        this.growSpeed = growSpeed;
        this.callback = callback;
        this.treeSize = this.start_length * Math.pow(0.7, this.max_order);
        
        trees.push(this);  // Add this tree to the global tree array

        this.animateGrowth();
      }

      // Growth animation: draw tree without clearing the entire canvas
      animateGrowth() {
        let startTime = null;

        const grow = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          this.current_order = Math.min(this.max_order, Math.floor(this.max_order * (progress / this.growSpeed)));

          // Clear before drawing each frame to prevent trails
          this.canvas.clear();
          
          // Redraw all trees
          trees.forEach(tree => tree.draw());

          if (this.current_order < this.max_order) {
            requestAnimationFrame(grow);
          } else {
            setTimeout(() => {
              this.sway_enabled = true;
              this.swayTree();
              if (this.callback) this.callback();  // Call the next tree growth
            }, this.swayStartDelay);
          }
        };

        requestAnimationFrame(grow);
      }

      // Sway animation: clear and redraw all trees during sway
      swayTree() {
        const swaySpeed = 3000;
        const swayAmount = 0.1;

        const sway = (timestamp) => {
          if (this.sway_enabled) {
            this.sway_angle = Math.sin(timestamp / swaySpeed) * swayAmount;

            // Clear before drawing each frame to prevent trails
            this.canvas.clear();
            
            // Redraw all trees
            trees.forEach(tree => tree.draw());

            requestAnimationFrame(sway);
          }
        };

        requestAnimationFrame(sway);
      }

      draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);  // Start from given position
        this.ctx.strokeStyle = 'brown';

        this.drawBranch(this.start_length, this.start_width, this.current_order);
        this.ctx.restore();
      }

      drawBranch(length, width, order) {
        if (order === 0) return;
      
        // Draw the outline first
        this.ctx.lineWidth = width + 2;  // Outline width (slightly larger)
        this.ctx.strokeStyle = 'green';  // Outline color
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -length);
        this.ctx.stroke();
      
        // Draw the inner branch
        this.ctx.lineWidth = width;  // Inner branch width
        this.ctx.strokeStyle = '#663300';  // Inner branch color (tree color)
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -length);
        this.ctx.stroke();
      
        // Move to the top of the current branch
        this.ctx.translate(0, -length);
      
        // Apply sway effect if enabled
        const swayAdjustment = this.sway_enabled ? this.sway_angle : 0;
      
        // Draw right branch
        this.ctx.save();
        this.ctx.rotate(this.angle + swayAdjustment);  // Right branch with sway
        this.drawBranch(length * 0.7, width * 0.7, order - 1);
        this.ctx.restore();
      
        // Draw left branch
        this.ctx.save();
        this.ctx.rotate(-this.angle + swayAdjustment);  // Left branch with sway
        this.drawBranch(length * 0.7, width * 0.7, order - 1);
        this.ctx.restore();
      }
    }

    // Update the canvas clear method to clear the whole screen
    Canvas.prototype.clear = function() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    };

    // Function to create the forest
    function createForestForTree3() {
      const canvas = new Canvas('canvas3');
      let currentTree = 0;

      // Array of tree configurations
      const treeConfigs = [
        { x: canvas.width / 2, y: canvas.height, length: 220, width: 10, maxOrder: 10, growSpeed: 1000 },
        { x: canvas.width / 4, y: canvas.height - 180, length: 200, width: 6, maxOrder: 8, growSpeed: 1000 },
        { x: canvas.width * 3 / 4, y: canvas.height - 180, length: 200, width: 6, maxOrder: 8, growSpeed: 1000 },
        { x: canvas.width / 6, y: canvas.height - 175, length: 150, width: 4, maxOrder: 6, growSpeed: 1000 },
        { x: canvas.width * 5 / 6, y: canvas.height - 175, length: 150, width: 4, maxOrder: 6, growSpeed: 1000 },
        { x: canvas.width / 5, y: canvas.height - 150, length: 175, width: 5, maxOrder: 7, growSpeed: 1000 },
        { x: canvas.width * 4 / 5, y: canvas.height - 150, length: 175, width: 5, maxOrder: 7, growSpeed: 1000 },
        { x: canvas.width / 3, y: canvas.height - 135, length: 150, width: 5, maxOrder: 7, growSpeed: 1000 },
        { x: canvas.width * 2 / 3, y: canvas.height - 135, length: 150, width: 5, maxOrder: 7, growSpeed: 1000 },
        { x: canvas.width / 8, y: canvas.height - 120, length: 100, width: 3, maxOrder: 5, growSpeed: 1000 },
        { x: canvas.width * 7 / 8, y: canvas.height - 120, length: 100, width: 3, maxOrder: 5, growSpeed: 1000 },
        { x: canvas.width / 2, y: canvas.height, length: 280, width: 10, maxOrder: 10, growSpeed: 1000 }
      ];

      function growNextTree() {
        if (currentTree < treeConfigs.length) {
          const config = treeConfigs[currentTree];
          new FractalTree3(
            canvas,
            config.x,
            config.y,
            config.length,
            config.width,
            config.maxOrder,
            config.growSpeed,
            1,
            growNextTree  // Callback to grow the next tree
          );
          currentTree++;
        }
      }

      // Start growing the first tree
      growNextTree();
    }

    class FractalTree2 {
      constructor(canvas, x, y, startLength, startWidth, maxOrder, growSpeed, swayStartDelay, callback) {
        this.canvas = canvas;
        this.ctx = this.canvas.ctx;
        this.x = x;
        this.y = y;
        this.start_length = startLength;
        this.start_width = startWidth;
        this.angle = Math.PI / 2;
        this.max_order = maxOrder;
        this.current_order = 0;
        this.sway_enabled = false;
        this.sway_angle = 0;
        this.swayStartDelay = swayStartDelay;
        this.growSpeed = growSpeed;
        this.callback = callback;
        this.treeSize = this.start_length * Math.pow(0.7, this.max_order);
        
        trees.push(this);  // Add this tree to the global tree array

        this.animateGrowth();
      }

      // Growth animation: draw tree without clearing the entire canvas
      animateGrowth() {
        let startTime = null;

        const grow = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          this.current_order = Math.min(this.max_order, Math.floor(this.max_order * (progress / this.growSpeed)));

          // Clear before drawing each frame to prevent trails
          this.canvas.clear();
          
          // Redraw all trees
          trees.forEach(tree => tree.draw());

          if (this.current_order < this.max_order) {
            requestAnimationFrame(grow);
          } else {
            setTimeout(() => {
              this.sway_enabled = true;
              this.swayTree();
              if (this.callback) this.callback();  // Call the next tree growth
            }, this.swayStartDelay);
          }
        };

        requestAnimationFrame(grow);
      }

      // Sway animation: clear and redraw all trees during sway
      swayTree() {
        const swaySpeed = 3000;
        const swayAmount = 0.1;

        const sway = (timestamp) => {
          if (this.sway_enabled) {
            this.sway_angle = Math.sin(timestamp / swaySpeed) * swayAmount;

            // Clear before drawing each frame to prevent trails
            this.canvas.clear();
            
            // Redraw all trees
            trees.forEach(tree => tree.draw());

            requestAnimationFrame(sway);
          }
        };

        requestAnimationFrame(sway);
      }

      draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);  // Start from given position
        this.ctx.strokeStyle = 'brown';

        this.drawBranch(this.start_length, this.start_width, this.current_order);
        this.ctx.restore();
      }

      drawBranch(length, width, order) {
        if (order === 0) return;
      
        // Draw the outline first
        this.ctx.lineWidth = width + 2;  // Outline width (slightly larger)
        this.ctx.strokeStyle = 'lime';  // Outline color
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -length);
        this.ctx.stroke();
      
        // Draw the inner branch
        this.ctx.lineWidth = width;  // Inner branch width
        this.ctx.strokeStyle = 'olive';  // Inner branch color (tree color)
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -length);
        this.ctx.stroke();
      
        // Move to the top of the current branch
        this.ctx.translate(0, -length);
      
        // Apply sway effect if enabled
        const swayAdjustment = this.sway_enabled ? this.sway_angle : 0;
      
        // Draw right branch
        this.ctx.save();
        this.ctx.rotate(this.angle + swayAdjustment);  // Right branch with sway
        this.drawBranch(length * 0.7, width * 0.7, order - 1);
        this.ctx.restore();
      
        // Draw left branch
        this.ctx.save();
        this.ctx.rotate(-this.angle + swayAdjustment);  // Left branch with sway
        this.drawBranch(length * 0.7, width * 0.7, order - 1);
        this.ctx.restore();
      }
    }

    // Update the canvas clear method to clear the whole screen
    Canvas.prototype.clear = function() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    };

    // Function to create the forest
    function createForestForTree2() {
      const canvas = new Canvas('canvas2');
      let currentTree = 0;

      // Array of tree configurations
      const treeConfigs = [
        { x: canvas.width / 3, y: canvas.height, length: 80, width: 6, maxOrder: 10, growSpeed: 500 },
        { x: canvas.width * 2 / 3, y: canvas.height, length: 80, width: 6, maxOrder: 10, growSpeed: 500 },
        { x: canvas.width / 5, y: canvas.height, length: 50, width: 6, maxOrder: 8, growSpeed: 500 },
        { x: canvas.width * 4 / 5, y: canvas.height, length: 50, width: 6, maxOrder: 8, growSpeed: 500 },
        { x: canvas.width / 8, y: canvas.height, length: 30, width: 6, maxOrder: 6, growSpeed: 500 },
        { x: canvas.width * 7 / 8, y: canvas.height, length: 30, width: 6, maxOrder: 6, growSpeed: 500 },
        { x: canvas.width / 100, y: canvas.height, length: 100, width: 4, maxOrder: 10, growSpeed: 500 },
        { x: canvas.width * 99 / 100, y: canvas.height, length: 100, width: 4, maxOrder: 10, growSpeed: 500 },
        { x: canvas.width / 2, y: canvas.height, length: 30, width: 6, maxOrder: 6, growSpeed: 500 }
      ];

      function growNextTree() {
        if (currentTree < treeConfigs.length) {
          const config = treeConfigs[currentTree];
          new FractalTree2(
            canvas,
            config.x,
            config.y,
            config.length,
            config.width,
            config.maxOrder,
            config.growSpeed,
            0,
            growNextTree  // Callback to grow the next tree
          );
          currentTree++;
        }
      }

      // Start growing the first tree
      growNextTree();
    }

    // Initialize the trees
    window.onload = function() {
      createForestForTree3();  // Start creating the forest
      createForestForTree2();  // Start creating the forest
    };