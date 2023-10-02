// Time O(N^2) - Space O(N)
function transposeMatrix(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const rotatedMatrix = []

    for (let i = numRows - 1; i >= 0; i--) {
        for (let j = 0; j < numCols; j++) {
            if (!rotatedMatrix[j]) rotatedMatrix[j] = []
            rotatedMatrix[j].push(matrix[i][j])
        }
    }

    return rotatedMatrix
}

let matrix = [
    [1, 1, 0],
    [0, 1, 1]
];

console.log(matrix)
transposeMatrix(originalMatrix);