const SHIP_SIZES = [4, 3, 3, 3, 2, 2, 2]
const SHIP_AMOUNT = SHIP_SIZES.length
const BOARD_SIZE = 8
const SHIP_CHAR = 'S'
const MISSILE_HIT = 'X'
const MISSILE_MISS = 'o'

let gameStatsData
let gameBoard
let spacesRemaining

const generateShipBeginning = () => {
    return [Math.floor(Math.random() * (BOARD_SIZE - 1)), Math.floor(Math.random() * (BOARD_SIZE - 1)), Math.round(Math.random())]
}

const isValidBeginnig = (line, column, isHorizontalShip, size) => {
    if (gameBoard[line][column] === SHIP_CHAR) {
        return false
    }
    if (isHorizontalShip && (column + size - 1 > 7 || gameBoard[line][column + size - 1] === SHIP_CHAR)) {
        return false
    } else if (line + size - 1 > 7 || gameBoard[line + size - 1][column] === SHIP_CHAR) {
        return false
    }
    return true
}

const putShipOnBoard = (line, column, isHorizontalShip, size) => {
    if (isHorizontalShip) {
        for (let i = 0; i < size; i++) {
            gameBoard[line][column + i] = SHIP_CHAR
        }
    } else {
        for (let i = 0; i < size; i++) {
            gameBoard[line + i][column] = SHIP_CHAR
        }
    }
}

export const startGame = () => {
    gameBoard = [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ]
    spacesRemaining = SHIP_SIZES.reduce((count, item) => count + item, 0)
    gameStatsData = { turns: 1, hits: 0, misses: 0 }

    for (let i = 0; i < SHIP_AMOUNT; i++) {
        let data
        do {
            data = generateShipBeginning()
        } while (!isValidBeginnig(...data, SHIP_SIZES[i]))

        putShipOnBoard(...data, SHIP_SIZES[i])
    }
    return gameBoard
}

export const shoot = (position) => {
    const gameBoardLine = position[0].toUpperCase().charCodeAt(0) - 65
    const gameBoardColumn = position[1] - 1
    let isHit = false
    let newSymbol

    gameStatsData.turns += 1
    if (gameBoard[gameBoardLine][gameBoardColumn] === SHIP_CHAR) {
        newSymbol = MISSILE_HIT
        spacesRemaining--
        isHit = true
        gameStatsData.hits += 1
    } else {
        newSymbol = MISSILE_MISS
        gameStatsData.misses += 1
    }
    gameBoard[gameBoardLine][gameBoardColumn] = newSymbol
    return [gameBoard, spacesRemaining, isHit]
}

export const gameStats = () => {
    return gameStatsData
}