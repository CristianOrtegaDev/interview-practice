// Time O(N * M) - Space O(N)
function checkPermutation(s1, s2) {
    let left = 0 - s1.length;
    let right = 0;
    const occurrences = {}
    const currentOccurrences = {}

    for (let i = 0; i < s1.length; i++) {
        occurrences[s1[i]] = ++occurrences[s1[i]] || 1
    }

    let matched;
    let addChar, removeChar;

    while (right < s2.length) {
        matched = true;
        addChar = s2[right]
        currentOccurrences[addChar] = ++currentOccurrences[addChar] || 1

        if (left >= 0) {
            removeChar = s2[left]
            currentOccurrences[removeChar] = --currentOccurrences[removeChar]
        }

        for (let key in occurrences) {
            if (occurrences[key] === currentOccurrences[key] === false) {
                matched = false
                break;
            }
        }

        if (matched) return true;

        left++
        right++;
    }

    return false
}


checkPermutation('abc', 'eidebaco') // True
checkPermutation('abc', 'eidebaoco') // False