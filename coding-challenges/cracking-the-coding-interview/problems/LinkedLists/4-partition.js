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

    // Time O(N) - Space O(N)
    partition(pivot) {
        const smallHead = new Node()
        let smallTail = smallHead
        const bigHead = new Node()
        let bigTail = bigHead

        let current = this.head

        while (current) {
            if (current.val < pivot) {
                smallTail.next = current
                smallTail = smallTail.next;
            } else {
                bigTail.next = current
                bigTail = bigTail.next;
            }

            current = current.next
        }

        bigTail.next = null
        smallTail.next = bigHead.next

        return smallHead.next
    }
}

const list = new LinkedList();
list.push(3)
list.push(5)
list.push(8)
list.push(5)
list.push(10)
list.push(2)
list.push(1)

list.partition(5)
