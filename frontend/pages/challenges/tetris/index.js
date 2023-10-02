import { useEffect, useState } from "react"
import styles from './index.module.css'
import { useInterval } from "../hooks";

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

class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Piece {
    constructor(shape, position) {
        this.shape = shape
        this.position = position
    }
}

class Tetris {
    constructor(rows, columns) {
        this.rows = rows
        this.columns = columns
        this.board = new Array(rows).fill('').map(() => new Array(columns).fill(0))
        this.piece = null
        this.score = 0
        this.gameOver = false
    }

    generateRandomPiece() {
        const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
        const piece = new Piece(randomShape, ORIGIN)
        this.piece = piece
    }

    movePiece({ dx = 0, dy = 0 }) {
        // Check collisions
        const hasCollisions = this.checkCollisions({ dx, dy })
        if (hasCollisions) return
        // Remove piece at old position
        if (this.piece.position.y >= 0) this.draw({ remove: true })
        // Update piece position
        this.updatePiecePosition({ dx, dy })
        // Draw piece at new position
        this.draw({})
    }

    rotatePiece() {
        const { shape } = this.piece
        console.log(this.piece.shape)
        this.draw({ remove: true })
        this.piece.shape = transposeMatrix(shape)
        console.log(this.piece.shape)
        this.draw({})
    }

    savePiece() {
        const { shape, position } = this.piece
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const yPos = position.y + y
                    const xPos = position.x + x
                    this.board[yPos][xPos] = 2
                }
            }
        }

        const gameOver = this.checkGameOver()
        if (gameOver) {
            this.gameOver = true
            alert('Game Over')
        } else {
            this.validateCompletedRows()
            this.generateRandomPiece()
        }
    }

    validateCompletedRows() {
        let tempBoard = [...this.board]
        // Remove full lines
        const { position, shape } = this.piece
        for (let i = position.y; i < position.y + shape.length; i++) {
            tempBoard = tempBoard.filter(row => !row.every(e => {
                return e === 2
            }))
        }
        // Create new empty lines
        const removedLRows = this.rows - tempBoard.length
        const newRows = new Array(removedLRows).fill('').map(() => new Array(this.columns).fill(0))
        this.board = newRows.concat(tempBoard)

    }

    updatePiecePosition({ dx, dy }) {
        const { position } = this.piece
        const updatedPos = new Position(position.x + dx, position.y + dy)
        this.piece.position = updatedPos
    }

    checkCollisions({ dx, dy }) {
        const { shape, position } = this.piece
        const updatedY = position.y + dy
        const updatedX = position.x + dx

        // Boundaries
        const shapeXLength = shape[0].length
        if (updatedX < 0 || updatedX > (this.columns - shapeXLength)) return true
        const shapeYLength = shape.length
        if (updatedY < 0 || updatedY > (this.rows - shapeYLength)) {
            this.savePiece()
            return true
        }
        // Other pieces
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const yPos = updatedY + y
                    const xPos = updatedX + x
                    if (this.board[yPos][xPos] === 2) {
                        if (dy) this.savePiece()
                        return true
                    }
                }
            }
        }


        return false
    }

    draw({ remove }) {
        const { shape, position } = this.piece
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const yPos = position.y + y
                    const xPos = position.x + x
                    this.board[yPos][xPos] = remove ? 0 : shape[y][x]
                }
            }
        }
    }

    checkGameOver() {
        const { position } = this.piece
        if (position.x === ORIGIN.x && position.y === ORIGIN.y) {
            alert('Game Over!')
            return true
        }
    }
}

const O = [
    [1, 1],
    [1, 1]
]

const I = [
    [1, 1, 1, 1]
]

const Z = [
    [1, 1, 0],
    [0, 1, 1]
]

const S = [
    [0, 1, 1],
    [1, 1, 0]
]

const T = [
    [0, 1, 0],
    [1, 1, 1]
]

const L = [
    [1, 0],
    [1, 0],
    [1, 1]
]

const J = [
    [0, 1],
    [0, 1],
    [1, 1]
]

const SHAPES = [
    O, I, Z, S, T, L, J
]

const ROWS = 20
const COLUMNS = 10
const MIDDLE = Math.floor((COLUMNS - 1) / 2)
const ORIGIN = new Position(MIDDLE, 0)

const tetris = new Tetris(ROWS, COLUMNS)
tetris.generateRandomPiece()
tetris.draw({})

const ARROW_RIGHT = 'ArrowRight'
const ARROW_LEFT = 'ArrowLeft'
const ARROW_DOWN = 'ArrowDown'
const ARROW_UP = 'ArrowUp'

const cellStyle = cell => ({
    width: '40px',
    height: '40px',
    border: '1px solid black',
    background: cell >= 1 ? cell === 2 ? 'blue' : 'red' : 'white'
})
export default function TetrisGame() {
    const [, setRender] = useState({})

    useEffect(() => {
        const keyDownEvent = 'keydown'
        const handleKeyDown = ({ key }) => {
            switch (key) {
                case ARROW_DOWN:
                    tetris.movePiece({ dy: 1 })
                    update()
                    break;
                case ARROW_UP:
                    tetris.rotatePiece()
                    update()
                    break;
                case ARROW_LEFT:
                    tetris.movePiece({ dx: -1 })
                    update()
                    break;
                case ARROW_RIGHT:
                    tetris.movePiece({ dx: 1 })
                    update()
                    break;
                default:
                    break;
            }
        }
        window.addEventListener(keyDownEvent, handleKeyDown)
        return () => window.removeEventListener(keyDownEvent, handleKeyDown)
    })

    const update = () => {
        setRender({})
    }

    const handleInterval = () => {
        tetris.movePiece({ dy: 1 })
        update()
    }

    useInterval(handleInterval, tetris.gameOver ? null : 1000)

    const { gameContainer, boardContainer, rowContainer } = styles

    return (
        <div>
            <h2>Tetris</h2>
            <div className={gameContainer}>
                <div className={boardContainer}>
                    {tetris.board.map((row, i) => {
                        return <div key={i} className={rowContainer}>{
                            row.map((cell, j) => <div key={`${i}${j}`} style={cellStyle(cell)} />)
                        }</div>
                    })}
                </div>
                <h3>Score {tetris.score}</h3>
            </div>
        </div>
    )
}
