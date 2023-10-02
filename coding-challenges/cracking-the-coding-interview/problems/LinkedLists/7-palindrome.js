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
    isPalindrome() {
        if (!this.head) return true;

        const occurrences = {}
        let current = this.head
        while (current) {
            const lowerCasedChar = current.val.toLowerCase()
            if (lowerCasedChar.match(/[a-z0-9]/i)) occurrences[lowerCasedChar] = ++occurrences[lowerCasedChar] || 1
            current = current.next
        }

        let singleLetters = 0
        for (let key in occurrences) {
            if (occurrences[key] % 2 !== 0) singleLetters++
        }

        return singleLetters > 1 ? false : true;
    }
}

const list = new LinkedList();
list.push('c')
list.push('i')
list.push('v')
list.push('i')
list.push('c')

list.isPalindrome()