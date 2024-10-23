const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})


const mouse = {
    x: undefined,
    y: undefined,
}

const particlesArray = [];

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 25 + 1;
        this.speedX = Math.random() * 2 - 1.5;
        this.speedY = Math.random() * 2 - 1.5
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        ctx.fillStyle = 'green'
        ctx.globalCompositeOperation = "lighter";
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}

function init() {
    createParticles(1000);
}

function createParticles(count) {
    for (let i = 0; i < count; i++) {
        particlesArray.push(new Particle());
    }
}

function triggerUpdateParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

function drawParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
    }
}

init();
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    triggerUpdateParticles();
    drawParticles();
    requestAnimationFrame(animate)
}

animate();