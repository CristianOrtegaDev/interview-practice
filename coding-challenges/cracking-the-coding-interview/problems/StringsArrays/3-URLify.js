// Time O(N) - Space O(1)
function URLify(str) {
    let url = ''
    let prevChar = null
    const spaceEncoded = '%20'
    for (const char of str) {
        if (char !== ' ') {
            if (prevChar === ' ' && url.length > 0) {
                url += spaceEncoded
            }
            url += char
        }
        prevChar = char
    }

    return url;
}

URLify("   Mr 3ohn      Smith ") // Mr%203ohn%20Smith