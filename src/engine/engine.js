const SHIP_LIST = [4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1]
const SHIP_CHAR = 'S'
const MISSILE_HIT = 'X'
const MISSILE_MISS = 'o'

let gameStatsData
let gameBoard
let spacesRemaining

let linesAmount
let columnsAmount

const generateShipBeginning = () => {
    const randomLine = Math.floor(Math.random() * (linesAmount - 1))
    const randomColumn = Math.floor(Math.random() * (columnsAmount - 1))
    const isHorizontal = Math.round(Math.random())
    return [randomLine, randomColumn, isHorizontal]
}

const isValidBeginnig = (line, column, isHorizontalShip, size) => {
    if (gameBoard[line][column] === SHIP_CHAR) {
        return false
    }

    if (isHorizontalShip) {
        if ((column + size - 1 >= columnsAmount || gameBoard[line][column + size - 1] === SHIP_CHAR)) {
            return false
        }
    } else {
        if (line + size - 1 >= linesAmount || gameBoard[line + size - 1][column] === SHIP_CHAR) {
            return false
        }
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

export const startGame = (lineCount, columnCount) => {
    linesAmount = lineCount
    columnsAmount = columnCount
    const maxSpaces = linesAmount * columnsAmount

    gameBoard = []
    for (let i = 0; i < linesAmount; i++) {
        gameBoard.push([...Array(columnsAmount).fill(' ')])
    }

    spacesRemaining = 0
    const shipsToUse = SHIP_LIST.filter(item => {
        if (item > columnsAmount || item > linesAmount) {
            return false
        }
        if (spacesRemaining + item > Math.floor(0.4 * maxSpaces)) {
            return false
        }
        spacesRemaining += item
        return true
    })
    const shipAmount = shipsToUse.length

    gameStatsData = { turns: 1, hits: 0, misses: 0 }

    for (let i = 0; i < shipAmount; i++) {
        let iterations = 0
        let data
        do {
            data = generateShipBeginning()
            iterations++
        } while (!isValidBeginnig(...data, shipsToUse[i]) && iterations < 5)

        if (iterations < 5) {
            putShipOnBoard(...data, shipsToUse[i])
        }
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