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
    removeDuplicatesBuffer() {
        const tempList = new LinkedList()
        const occurrences = {}
        let currentNode = this.head
        let currentVal;

        while (currentNode) {
            currentVal = currentNode.val
            if (!occurrences[currentVal]) {
                tempList.push(currentVal)
                occurrences[currentVal] = true
            }
            currentNode = currentNode.next
        }

        return tempList
    }

    removeDuplicatesNoBuffer() {
        let currentNode = this.head
        let nextNode = currentNode.next;

        function helper(currentNode, nextNode) {
            if (currentNode && !nextNode) {
                const newCurrent = currentNode.next
                let newNext = null;
                if (newCurrent) {
                    newNext = helper(newCurrent, newCurrent?.next)
                }
                currentNode.next = newNext
                return currentNode
            } else if (currentNode.val === nextNode.val) {
                const newCurrent = currentNode.next
                return helper(newCurrent, newCurrent?.next)
            } else {
                return helper(currentNode, nextNode.next)
            }
        }

        return helper(currentNode, nextNode)
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

console.log('removeDuplicatesNoBuffer', list.removeDuplicatesNoBuffer())
console.log('removeDuplicatesBuffer', list.removeDuplicatesBuffer())