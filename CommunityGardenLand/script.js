class Canvas {
        constructor(id) {
            this.elem = document.getElementById(id);
            this.ctx = this.elem.getContext('2d');
            this.resizeCanvas();
            window.addEventListener('resize', this.resizeCanvas.bind(this), false);
        }

        resizeCanvas() {
            this.elem.width = window.innerWidth;
            this.elem.height = window.innerHeight;
            this.width = this.elem.width;
            this.height = this.elem.height;
            this.clear();
        }

        clear() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
    }

    let trees = []; // Global array to track all trees

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

            trees.push(this); // Add this tree to the global tree array
            this.animateGrowth();
        }

        animateGrowth() {
            let startTime = null;

            const grow = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                this.current_order = Math.min(this.max_order, Math.floor(this.max_order * (progress / this.growSpeed)));

                this.canvas.clear();
                trees.forEach(tree => tree.draw());

                if (this.current_order < this.max_order) {
                    requestAnimationFrame(grow);
                } else {
                    setTimeout(() => {
                        this.sway_enabled = true;
                        this.swayTree();
                        if (this.callback) this.callback();
                    }, this.swayStartDelay);
                }
            };

            requestAnimationFrame(grow);
        }

        swayTree() {
            const swaySpeed = 3000;
            const swayAmount = 0.1;

            const sway = (timestamp) => {
                if (this.sway_enabled) {
                    this.sway_angle = Math.sin(timestamp / swaySpeed) * swayAmount;

                    this.canvas.clear();
                    trees.forEach(tree => tree.draw());

                    requestAnimationFrame(sway);
                }
            };

            requestAnimationFrame(sway);
        }

        draw() {
            this.ctx.save();
            this.ctx.translate(this.x, this.y);
            this.ctx.strokeStyle = 'brown';
            this.drawBranch(this.start_length, this.start_width, this.current_order);
            this.ctx.restore();
        }

        drawBranch(length, width, order) {
            if (order === 0) return;
            this.ctx.lineWidth = width + 2;
            this.ctx.strokeStyle = 'green';
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(0, -length);
            this.ctx.stroke();

            this.ctx.lineWidth = width;
            this.ctx.strokeStyle = '#663300';
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(0, -length);
            this.ctx.stroke();

            this.ctx.translate(0, -length);
            const swayAdjustment = this.sway_enabled ? this.sway_angle : 0;

            this.ctx.save();
            this.ctx.rotate(this.angle + swayAdjustment);
            this.drawBranch(length * 0.7, width * 0.7, order - 1);
            this.ctx.restore();

            this.ctx.save();
            this.ctx.rotate(-this.angle + swayAdjustment);
            this.drawBranch(length * 0.7, width * 0.7, order - 1);
            this.ctx.restore();
        }
    }

    function createForestForTree3() {
        const canvas = new Canvas('canvas3');
        let currentTree = 0;

        const treeConfigs = [
            { x: canvas.width / 2, y: canvas.height, length: 220, width: 10, maxOrder: 10, growSpeed: 1000 },
            { x: canvas.width / 4, y: canvas.height - 180, length: 200, width: 6, maxOrder: 8, growSpeed: 1000 },
            { x: canvas.width * 3 / 4, y: canvas.height - 180, length: 200, width: 6, maxOrder: 8, growSpeed: 1000 },
            { x: canvas.width / 6, y: canvas.height - 175, length: 150, width: 4, maxOrder: 6, growSpeed: 1000 },
            { x: canvas.width * 5 / 6, y: canvas.height - 175, length: 150, width: 4, maxOrder: 6, growSpeed: 1000 }
        ];

        function growNextTree() {
            if (currentTree < treeConfigs.length) {
                const config = treeConfigs[currentTree];
                new FractalTree3(canvas, config.x, config.y, config.length, config.width, config.maxOrder, config.growSpeed, 1, growNextTree);
                currentTree++;
            }
        }

        growNextTree();
    }

    window.onload = function () {
        createForestForTree3();
    };