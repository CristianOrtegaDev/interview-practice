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
    reverse() {
        this.tail = this.head
        let prev = null;
        let current = this.head;
        let next = null;

        while (current.next) {
            next = current.next;
            current.next = prev;
            prev = current
            current = next
        }

        this.head = current;
        this.head.next = prev;

        return this;
    }
}

// Time O(N) - Space O(N)
function sumLists(l1, l2) {
    l1.reverse()
    l2.reverse()
    const list = new LinkedList()
    let currentL1 = l1.head
    let currentL2 = l2.head
    let excedent = 0

    while (currentL1 || currentL2) {
        const val1 = currentL1 ? currentL1.val : 0
        const val2 = currentL2 ? currentL2.val : 0

        let sum = val1 + val2 + excedent

        if (sum >= 10) {
            excedent = 1
            sum -= 10
        } else {
            excedent = 0
        }

        list.push(sum)

        currentL1 = currentL1?.next
        currentL2 = currentL2?.next
    }

    return list.reverse()
}

const list1 = new LinkedList();
list1.push(6)
list1.push(1)
list1.push(7)

const list2 = new LinkedList();
list2.push(2)
list2.push(9)
list2.push(5)

sumLists(list1, list2)