// Is Unique: Implement an algorithm to determine if a string has all unique characters

// Complexity: Time O(N) - Space O(N)
function isUnique(str) {
    const temp = {}
    for (const char of str) {
        const lowerCasedChar = char.toLowerCase()
        if (temp[lowerCasedChar]) {
            return false
        }
        temp[lowerCasedChar] = true
    }

    return true;
}


// What if you cannot use additional data structures?

// Complexity: Time O(N^2) - Space O(1)
function isUniqueNoExtraDataStructure(str) {
    let isUnique = true;
    for (let i = 0; i < str.length; i++) {
        const charI = str[i].toLowerCase()
        for (let j = i + 1; j < str.length; j++) {
            const charJ = str[j].toLowerCase()
            if (charI === charJ) {
                isUnique = false
            }
        }
    }

    return isUnique
}

const str = 'Test'
isUnique(str) // False
isUniqueNoExtraDataStructure(str) // False