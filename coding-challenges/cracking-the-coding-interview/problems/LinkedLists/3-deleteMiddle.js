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

    // O(N)
    get(index) {
        if (index < 0 || index >= this.length) return null;

        let current = this.head;
        let counter = 0;
        while (counter < index) {
            current = current.next;
            counter++;
        }

        return current;
    }

    // Time O(N) - Space O(1)
    deleteMiddle() {
        const middle = Math.floor((this.length - 1) / 2)
        if (middle <= 0 || middle >= this.length - 1) return undefined;

        const prev = this.get(middle - 1);
        const removed = prev.next;
        prev.next = removed.next;
        this.length--;

        return this;
    }
}

const list = new LinkedList();
list.push('a')
list.push('b')
list.push('c')
list.push('d')
list.push('e')
list.push('f')

list.deleteMiddle()