class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // O(1)
    push(val) {
        var newNode = new Node(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;

        return this;
    }

    // Time O(N) - Space O(1)
    kthToLast(k) {
        const index = this.length - k
        let current = this.head
        let currentIndex = 0
        while (currentIndex < index) {
            current = current.next
            currentIndex++
        }
        return current
    }
}

const list = new LinkedList();
list.push(1)
list.push(2)
list.push(3)
list.push(1)
list.push(2)
list.push(3)
list.push(4)
list.push(5)
list.push(7)

list.kthToLast(2)