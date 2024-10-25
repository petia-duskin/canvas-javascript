
class Node {
    leftChild = null;
    rightChild = null;
    value = null;


    constructor(value) {
        this.value = value;
    }
}

class BinaryTree {
    root = null;

    // insert(value) {
    //     if (this.isEmpty()) {
    //         this.initialize();
    //         return;
    //
    //     }
    //
    //     let current = this.root;
    //     while (true) {
    //         if (value < current.value) {
    //             if (current.leftChild == null) {
    //                 current.leftChild = newNode;
    //                 current.drawEdge(newNode.x, newNode.y)
    //                 newNode.drawNode();
    //                 return;
    //             }
    //             current = current.leftChild;
    //         } else if (value > current.value) {
    //             if (current.rightChild == null) {
    //                 current.rightChild = newNode;
    //                 return;
    //             }
    //             current = current.rightChild;
    //         }
    //     }
    // }
    //
    //
    //
    // initialize(value) {
    //     this.root = new Node(value, ROOT_X, ROOT_Y)
    // }

    insert(value) {
        this.root = this.insert_recursive(this.root, value);
    }

    insert_recursive(node, value) {
        if (node == null) {
            return new Node(value);
        }

        if (value < node.value) {
            node.leftChild = this.insert_recursive(node.leftChild, value);
        } else if (value > node.value) {
            node.rightChild = this.insert_recursive(node.rightChild, value);
        }

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
tree.insert(10)
tree.insert(5)
tree.insert(15)
tree.insert(11)
tree.insert(3)
tree.insert(7)
tree.insert(1)
tree.insert(55)
tree.traversePreOrder()
