// Time O(N*M) - Space O(N*M)
function zeroMatrix(matrix) {
    const rows = matrix.length;
    const columns = matrix[0].length;

    const zeroRows = new Array(rows).fill(false);
    const zeroCols = new Array(columns).fill(false);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (matrix[i][j] === 0) {
                zeroRows[i] = true;
                zeroCols[j] = true;
            }
        }
    }

    // Set rows to zero
    for (let i = 0; i < rows; i++) {
        if (zeroRows[i]) {
            for (let j = 0; j < columns; j++) {
                matrix[i][j] = 0;
            }
        }
    }

    // Set columns to zero
    for (let j = 0; j < columns; j++) {
        if (zeroCols[j]) {
            for (let i = 0; i < rows; i++) {
                matrix[i][j] = 0;
            }
        }
    }
}

const matrix = [
    [1, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 0],
];

zeroMatrix(matrix);
console.log(matrix)