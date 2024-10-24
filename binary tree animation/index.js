const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

class Node {
    leftChild = null;
    rightChild = null;
    value = null;
    x = undefined;
    y = undefined;


    constructor(value, x, y) {
        this.value = value;
        this.x = x;
        this.y = y;
    }

    drawNode() {
        ctx.beginPath();
        ctx.fillStyle = 'white'
        ctx.arc(this.x, this.y, 30, 0, Math.PI * 2);
        ctx.fill();
    }

    drawEdge(targetX, targetY) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(targetX, targetY)
        ctx.stroke();
    }

    draw
}

const LEVEL_HEIGHT = 40;
const ROOT_X = canvas.width / 2;
const ROOT_Y = 50;

function drawLine(fromX, fromY, toX, toY) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)
    ctx.stroke();
}

class BinaryTree {
    root = null;

    // insert(value) {
    //     if (this.isEmpty()) {
    //         this.initialize(value);
    //         return;
    //     }
    //
    //     nodeY += 50;
    //     let current = this.root;
    //
    //     while (true) {
    //         if (value < current.value) {
    //             if (current.leftChild == null) {
    //                 nodeXLeft -= 100;
    //                 const newNode = new Node(value, nodeXLeft, nodeY);
    //                 current.leftChild = newNode;
    //                 current.drawEdge(newNode.x, newNode.y)
    //                 newNode.drawNode();
    //                 return;
    //             }
    //             current = current.leftChild;
    //         } else if (value > current.value) {
    //             if (current.rightChild == null) {
    //                 nodeXRight += 100;
    //                 const newNode = new Node(value, nodeXRight, nodeY);
    //                 current.rightChild = newNode;
    //                 current.drawEdge(newNode.x, newNode.y)
    //                 newNode.drawNode();
    //                 return;
    //             }
    //             current = current.rightChild;
    //         }
    //     }
    // }

    insert(value) {
        this.root = this.insert_recursive(this.root, value, ROOT_X, ROOT_Y, canvas.width / 4);
    }

    insert_recursive(node, value, x, y, offsetX) {
        if (node == null) {
            return new Node(value, ROOT_X, ROOT_Y)
        }

        if (value < node.value) {
            node.leftChild.drawEdge(node.x, node.y)
            node.leftChild.drawNode();
            node.leftChild = this.insert_recursive(node.leftChild, value, x - offsetX, y + LEVEL_HEIGHT, offsetX / 2);
        } else if (value > node.value) {
            node.rightChild.drawEdge(node.x, node.y)
            node.rightChild.drawNode();
            node.rightChild = this.insert_recursive(node.rightChild, value, x + offsetX, y + LEVEL_HEIGHT, offsetX / 2);
        }

        return node;
    }



    initialize(value) {
        const node = new Node(value, canvas.width / 2, 100);
        node.drawNode();
        this.root = node;
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

const tree = new BinaryTree()
tree.insert(10);
tree.insert(12);
tree.insert(5);
tree.insert(3);
tree.insert(7);
tree.insert(11);