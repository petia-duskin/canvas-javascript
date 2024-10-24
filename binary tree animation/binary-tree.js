class Node {
    leftChild = null;
    rightChild = null;
    value = null;


    constructor(value) {
        this.value = value;
    }
}

export class BinaryTree {
    root = null;

    insert(value) {
        if (this.isEmpty()) {
            this.initialize(value);
            return;
        }

        const newNode = new Node(value);
        let current = this.root;

        while (true) {
            if (value < current.value) {
                if (current.leftChild == null) {
                    current.leftChild = newNode;
                    return;
                }
                current = current.leftChild;
            } else if (value > current.value) {
                if (current.rightChild == null) {
                    current.rightChild = newNode;
                    return;
                }
                current = current.rightChild;
            }
        }
    }

    initialize(value) {
        this.root = new Node(value);
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