const SHIP_LIST = [4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1]
const SHIP_CHAR = 'S'
const MISSILE_HIT = 'X'
const MISSILE_MISS = 'o'
const EMPTY_SPACE = ' '
const INITIAL_GAME_STATS = { turns: 1, hits: 0, misses: 0 }

const generateShipBeginning = (linesAmount, columnsAmount) => {
    const randomLine = Math.floor(Math.random() * (linesAmount - 1))
    const randomColumn = Math.floor(Math.random() * (columnsAmount - 1))
    const isHorizontal = Math.round(Math.random())
    return [randomLine, randomColumn, isHorizontal]
}

const isValidBeginnig = (line, column, linesAmount, columnsAmount, isHorizontalShip, size, gameBoard) => {
    if (gameBoard[line][column] === SHIP_CHAR) {
        return false
    }
    if (isHorizontalShip && (column + size - 1 >= columnsAmount || gameBoard[line][column + size - 1] === SHIP_CHAR)) {
        return false
    }
    if (!isHorizontalShip && (line + size - 1 >= linesAmount || gameBoard[line + size - 1][column] === SHIP_CHAR)) {
        return false
    }
    return true
}

const putShipOnBoard = (line, column, isHorizontalShip, size, gameBoard) => {
    if (isHorizontalShip) {
        for (let i = 0; i < size; i++) {
            gameBoard[line][column + i] = SHIP_CHAR
        }
    } else {
        for (let i = 0; i < size; i++) {
            gameBoard[line + i][column] = SHIP_CHAR
        }
    }
    return gameBoard
}

const createEmptyBoard = (lineCount, columnCount) => {
    const gameBoard = []
    for (let i = 0; i < lineCount; i++) {
        gameBoard.push([...Array(columnCount).fill(EMPTY_SPACE)])
    }
    return gameBoard
}

const defineShipsToUse = (lineCount, columnCount) => {
    const maxSpaces = lineCount * columnCount
    let spacesRemaining = 0
    const shipsToUse = SHIP_LIST.filter(item => {
        if (item > columnCount || item > lineCount) {
            return false
        }
        if (spacesRemaining + item > Math.floor(0.4 * maxSpaces)) {
            return false
        }
        spacesRemaining += item
        return true
    })
    return { ships: shipsToUse, spacesLeft: spacesRemaining }
}

const fillBoard = (lineCount, columnCount, gameBoard, shipsToUse) => {
    const shipAmount = shipsToUse.length
    for (let i = 0; i < shipAmount; i++) {
        let iterations = 0
        let positionInfo
        do {
            positionInfo = generateShipBeginning(lineCount, columnCount)
            iterations++
        } while (!isValidBeginnig(...positionInfo, lineCount, columnCount, shipsToUse[i], gameBoard) && iterations < 5)

        if (iterations < 5) {
            gameBoard = putShipOnBoard(...positionInfo, shipsToUse[i], gameBoard)
        }
    }
    return gameBoard
}

export const startGame = (lineCount, columnCount) => {
    let gameBoard = createEmptyBoard(lineCount, columnCount)
    const ShipInfo = defineShipsToUse(lineCount, columnCount)
    const shipsToUse = ShipInfo.ships
    const gameStatsData = { ...INITIAL_GAME_STATS }
    gameBoard = fillBoard(lineCount, columnCount, gameBoard, shipsToUse)
    return { board: gameBoard, spacesLeft: ShipInfo.spacesLeft, gameStats: gameStatsData }
}

export const shoot = (position, spacesRemaining, gameBoard, gameStatsData) => {
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
    return { gameBoard: gameBoard, spacesRemainning: spacesRemaining, isHit: isHit, gameStats: gameStatsData }
}