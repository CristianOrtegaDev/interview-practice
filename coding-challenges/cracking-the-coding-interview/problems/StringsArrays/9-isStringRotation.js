function isSubString(s1, s2) {
    return s1.includes(s2)
}


// Time O(N) - Space O(1)
function isStringRotation(s1, s2) {
    if (s1.length !== s2.length) return false

    const concatenated = `${s1}${s1}`;
    return isSubString(concatenated, s2)
}

isStringRotation('erbottlewat', 'waterbottle') // True