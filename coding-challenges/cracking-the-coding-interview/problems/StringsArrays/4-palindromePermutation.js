//  Time O(N) - Space O(N)
function palindromePermutation(str) {
    const occurrences = {}
    for (let char of str) {
        const lowerCasedChar = char.toLowerCase()
        // Ignore special characters for cases like: "Don’t nod"
        if (lowerCasedChar.match(/[a-z0-9]/i)) occurrences[lowerCasedChar] = ++occurrences[lowerCasedChar] || 1
    }

    let singleLetters = 0
    for (let key in occurrences) {
        if (occurrences[key] % 2 !== 0) singleLetters++
    }

    return singleLetters > 1 ? false : true;
}

palindromePermutation('Red roses run no risk, sir, on Nurse’s order') // True