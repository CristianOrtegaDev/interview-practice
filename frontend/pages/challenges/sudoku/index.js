import { useState } from 'react';
import styles from './index.module.css'

const SIZE = 9

function isCompleted(board) {
  return board.every(row => row.every(col => col))
}

function getRandom() {
  return Math.floor(Math.random() * (9 - 1) + 1);
}

function generateBoard(size) {
  const board = generateMatrix(size)

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const insert = getRandom()
      if (isValid(board, row, col, insert)) {
        board[row][col] = insert
      }
    }
  }

  return board
}

function isValid(board, row, col, num) {
  return (
    !isInRow(board, row, num) &&
    !isInCol(board, col, num) &&
    !isInBox(board, row - (row % 3), col - (col % 3), num)
  );
};

function isInRow(board, row, num) { return board[row].includes(num) }

function isInCol(board, col, num) { return board.some(row => row[col] === num) }

function isInBox(board, startRow, startCol, num) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row + startRow][col + startCol] === num) {
        return true;
      }
    }
  }

  return false;
};

function generateMatrix(size) {
  return new Array(size).fill('').map(() => new Array(size).fill(0))
}

export default function SudokuGame() {
  const [board, setBoard] = useState(() => generateBoard(SIZE));

  const handleCellChange = (row, col, value) => {
    const intValue = parseInt(value, 10)
    if (isValid(board, row, col, intValue)) updateBoard(row, col, intValue)
    else alert('Invalid number')
  };

  const updateBoard = (row, col, value) => {
    const tempBoard = [...board]
    tempBoard[row][col] = value
    setBoard(tempBoard)

    if (isCompleted(tempBoard)) alert('Board completed!')
  }

  const { boardContainer, rowContainer, cellElement, withBorder } = styles

  return (
    <div>
      <h1>
        Sudoku
      </h1>
      <div className={boardContainer}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className={`${rowContainer} ${rowIndex > 0 && rowIndex % 3 === 0 ? withBorder : ''}`}>
            {row.map((cell, colIndex) => (
              <div key={`${rowIndex}${colIndex}`} style={{ display: 'flex' }}>
                {colIndex > 0 && colIndex % 3 === 0 && <div style={{ border: '1px solid black' }} />}
                <input
                  className={cellElement}
                  type="number"
                  min="1"
                  max="9"
                  maxLength={1}
                  value={cell || ''}
                  onChange={e => handleCellChange(rowIndex, colIndex, e.target.value)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
