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
    loopDetection() {
        let slow = this.head
        let fast = this.head
        while (fast !== null && fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow === fast) {
                break;
            }
        }

        if (fast === null || fast.next === null) {
            return null;
        }

        slow = this.head;
        while (slow !== fast) {
            slow = slow.next;
            fast = fast.next;
        }

        return slow;
    }
}

const list = new LinkedList();
list.push('a')
list.push('b')
list.push('c')
list.push('d')
list.push('e')
list.push('f')

list.tail.next = list.head.next.next

list.loopDetection()