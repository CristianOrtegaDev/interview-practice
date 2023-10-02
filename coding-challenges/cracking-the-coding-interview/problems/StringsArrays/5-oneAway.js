// Time O(N) - Space O(1)
function oneAway(str1, str2) {
    const lengthDiff = Math.abs(str1.length - str2.length);

    if (lengthDiff > 1) {
        return false;
    }

    let replacements = 0;
    let deletions = 0;
    let insertions = 0;

    let i = 0;
    let j = 0;

    while (i < str1.length && j < str2.length) {
        if (str1[i] === str2[j]) {
            i++;
            j++;
        } else {
            if (str1.length === str2.length) {
                // Replacement
                replacements++;
                i++;
                j++;
            } else if (str1.length < str2.length) {
                // Deletion in str1
                deletions++;
                j++;
            } else {
                // Insertion in str2
                insertions++;
                i++;
            }
        }
    }

    while (i < str1.length) {
        deletions++;
        i++;
    }

    while (j < str2.length) {
        insertions++;
        j++;
    }

    return replacements <= 1 && deletions <= 1 && insertions <= 1;
}



const str = 'Cristian'
const strRemovedChar = 'Critian'
oneAway(str, strRemovedChar) // True

const strMultipleChanges = 'Critiann'
oneAway(str, strMultipleChanges) // False