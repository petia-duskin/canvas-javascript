const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = window.innerWidth / 2;
const CANVAS_HEIGHT = window.innerHeight / 2;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;
})

let startBackground = 'white';
ctx.fillStyle = startBackground;
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

let drawColor = 'black'
let drawWidth = 2
let isDrawing = false

let restoreArray = []
let index = -1;

canvas.addEventListener('touchstart', start)
canvas.addEventListener('touchmove', draw)
canvas.addEventListener('mousedown', start)
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseout', stop)
canvas.addEventListener('mouseup', stop)
canvas.addEventListener('touchend', stop)

function start(event) {
    isDrawing = true
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop);
    event.preventDefault();
}

function draw(event) {
    if (isDrawing) {
        ctx.lineTo(event.clientX - canvas.offsetLeft,
            event.clientY - canvas.offsetTop)
        ctx.strokeStyle = drawColor;
        ctx.lineWidth = drawWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round'
        ctx.stroke()
    }

    event.preventDefault();
}

function stop(event) {
    if (isDrawing) {
        ctx.stroke();
        ctx.closePath();
        isDrawing = false;
    }

    if (event.type !== 'mouseout') {
        restoreArray.push(ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT))
        index++;
    }
}

function changeColor(element) {
    drawColor = element.style.background;
}

function clearCanvas() {
    ctx.fillStyle = startBackground;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    restoreArray = []
    index = -1;
}

function undoLast() {
    if (index <= 0) {
        clearCanvas()
    } else {
        index--;
        restoreArray.pop();
        ctx.putImageData(restoreArray[index], 0, 0)
    }

}