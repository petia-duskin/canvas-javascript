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

let hue = 0;

canvas.addEventListener('click', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }
})

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }
})

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 2 - 1.5;
        this.speedY = Math.random() * 2 - 1.5
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.5) this.size -= 0.07;
    }

    draw() {
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}


function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.5) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}


function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    handleParticles();
    hue++;

    requestAnimationFrame(animate)
}

animate();