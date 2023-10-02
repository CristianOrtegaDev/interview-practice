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
}

// Time O(N^2) - Space O(1)
function intersection(l1, l2) {
    let l1Current = l1.head
    let l2Current = l2.head

    while (l1Current) {
        while (l2Current) {
            console.log(l1Current, l2Current)
            if (l1Current === l2Current) {
                return l1Current
            }
            l2Current = l2Current.next
        }

        l1Current = l1Current.next
        l2Current = l2.head
    }

    return null
}

const sharedNode = new Node(15)

const list = new LinkedList();
list.push(3)
list.push(5)
list.push(8)
const listLastNode = list.head.next.next
listLastNode.next = sharedNode


const list2 = new LinkedList();
list2.push(10)
list2.push(2)
list2.push(1)
const list2LastNode = list2.head.next.next
list2LastNode.next = sharedNode

intersection(list, list2)
