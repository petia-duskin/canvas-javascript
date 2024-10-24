let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0)
}

window.addEventListener('resize', () => {
    cancelAnimationFrame(flowFieldAnimation)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0)
})

const mouse = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

class FlowFieldEffect {
    #ctx;
    #width;
    #height;

    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#width = width;
        this.#ctx.lineWidth = 1;
        this.#height = height;
        this.lastTime = 0;
        this.interval = 1000 / 60;
        this.timer = 0;
        this.cellSize = 25;
        this.#createGradient();
        this.#ctx.strokeStyle = this.gradient;
        this.radius = 0;
        this.vr = 0.01;
    }

    #createGradient() {
        this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height);
        this.gradient.addColorStop(0.1, "#ff5c33")
        this.gradient.addColorStop(0.2, "#ff66b3")
        this.gradient.addColorStop(0.4, "#ccccff")
        this.gradient.addColorStop(0.6, "#b3ffff")
        this.gradient.addColorStop(0.8, "#80ff80")
        this.gradient.addColorStop(0.9, "#ffff33")
    }

    #drawLine(angle, x, y) {
        let positionX = x;
        let positionY = y;
        let dx = mouse.x - positionX;
        let dy = mouse.y - positionY;
        let distance = dx * dx + dy * dy;
        if (distance > 150000) {
            distance = 50000
        } else if (distance < 40000) {
            distance = 400000
        }


        const length = distance / 10000;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
        this.#ctx.stroke();
    }

    animate(timeStamp) {
        let deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.interval) {
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            this.radius += this.vr;
            if (this.radius > 5 || this.radius < -5) {
                this.vr *= -1
            }

            for (let y = 0; y < this.#height; y += this.cellSize) {
                for (let x = 0; x < this.#width; x += this.cellSize) {
                    const angle = (Math.cos(x * 0.01) + Math.sin(y * 0.01)) * this.radius
                    this.#drawLine(angle, x, y)
                }
            }
            this.#drawLine(
                this.#width / 2,
                this.#height / 2
            )
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
    }
}