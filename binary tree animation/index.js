const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ROOT_X = canvas.width / 2;
const ROOT_Y = 100;
const NODES_OFFSET = canvas.width / 4;
const LEVEL_OFFSET = 70;

class Node {
    leftChild = null;
    rightChild = null;
    value = null;
    radius = 25;
    fontSize = 17


    constructor(value, x, y) {
        this.value = value;
        this.x = x;
        this.y = y;
    }

    drawNode() {
        ctx.beginPath();
        ctx.fillStyle = '#FFDBBB';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill();


        // draw value inside node
        ctx.font = `${this.fontSize}px Arial`
        ctx.fillStyle = 'blue'
        const textMetrics = ctx.measureText(this.value);
        const textWidth = textMetrics.width;
        const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
        const xCenter = this.x - textWidth / 2;
        const yCenter = this.y + textHeight / 2;

        ctx.fillText(this.value, xCenter, yCenter)
    }

    drawEdge(toX, toY) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.strokeStyle = '#ffffff'
        ctx.lineTo(toX, toY);
        ctx.stroke();
    }
}

class BinaryTree {
    root = null;
    count = 0

    insert(value) {
        this.root = this._insert_recursive(this.root, null, value, ROOT_X, ROOT_Y, NODES_OFFSET);
        this.root.drawNode();
    }

    _insert_recursive(node, prev, value, x, y, offset) {
        if (node == null) {
            const newNode = new Node(value, x, y);
            if (prev != null) {
                prev.drawEdge(newNode.x, newNode.y)
            }
            return newNode;
        }

        if (x < node.radius * 2 || x > canvas.width - node.radius * 2) {
            console.log("x", x)
            canvas.style.overflow = 'auto'
        }

        if (y < node.radius * 2 || y > canvas.height - node.radius * 2) {
            console.log("y", y)
            canvas.style.overflow = 'auto'
        }

        if (offset < node.radius * 10) {
            offset = node.radius * 2;
        }

        if (value < node.value) {
            const newNode = this._insert_recursive(node.leftChild, node, value, x - offset, y + LEVEL_OFFSET, offset / 2);
            node.leftChild = newNode;
            newNode.drawNode();
        } else if (value > node.value) {
            const newNode = this._insert_recursive(node.rightChild, node, value, x + offset, y + LEVEL_OFFSET, offset / 2);
            node.rightChild = newNode;
            newNode.drawNode();
        }

        this.count++;
        return node;
    }


    traversePreOrder() {
        if (this.isEmpty()) {
            return;
        }

        this.recursivePreOrder(this.root);
    }

    recursivePreOrder(current) {
        if (current == null) {
            return;
        }

        console.log(current.value);
        this.recursivePreOrder(current.leftChild);
        this.recursivePreOrder(current.rightChild);
    }

    isEmpty() {
        return this.root == null;
    }
}


const tree = new BinaryTree();
const arr = []

function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillTree(count) {
    tree.insert(0)
    for (let i = 0; i < count; i++) {
        tree.insert(generateRandomInt(-200, 200))
    }
}

fillTree(10)