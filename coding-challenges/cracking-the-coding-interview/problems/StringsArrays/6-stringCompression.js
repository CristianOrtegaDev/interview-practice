// Time O(N) - Space O(1)
function stringCompression(string) {
    let compressedString = ''
    let prevChar = null
    let charCount = 0
    for (const char of string) {
        if (prevChar !== null && prevChar !== char) {
            compressedString = compressedString + prevChar + charCount
            charCount = 0;
        }
        prevChar = char;
        charCount++;
    }

    compressedString += prevChar + charCount

    return compressedString.length < string.length ? compressedString : string;
}

stringCompression('aabcccccaaa') // 'a2b1c5a3'
stringCompression('abcdefghijk') // 'abcdefghijk'