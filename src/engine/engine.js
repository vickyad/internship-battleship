const SHIP_LIST = [4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1]
const SHIP_CHAR = 'S'
const MISSILE_HIT = 'X'
const MISSILE_MISS = 'o'
const EMPTY_SPACE = ' '
const INITIAL_GAME_STATS = { turns: 1, hits: 0, misses: 0 }

/**
 * @description generate a random coordinate for the ship beginning and it's orientation
 * @param boardLines board's lines
 * @param boardColumns board's columns
 * @returns array with the ship's coordinates and boolean indicating if the ship is in the horizontal orientation
 */
const generateShipBeginning = (boardLines, boardColumns) => {
    const randomLine = Math.floor(Math.random() * (boardLines - 1))
    const randomColumn = Math.floor(Math.random() * (boardColumns - 1))
    const isHorizontal = Math.round(Math.random())
    return [randomLine, randomColumn, isHorizontal]
}

/**
 * @description verifies if the coordinate given accommodate a ship with the given size
 * @param shipLine ship's beginning line
 * @param shipColumn ships's beginning columns
 * @param isHorizontalShip boolean indicating if the ship is in the horizontal orientation
 * @param size ship's size
 * @param boardLines board's lines
 * @param boardColumns board's columns
 * @param gameBoard board current state
 * @returns boolean indicating if the ship can be placed or not
 */
const isValidBeginnig = (shipLine, shipColumn, isHorizontalShip, size, boardLines, boardColumns, gameBoard) => {
    if (gameBoard[shipLine][shipColumn] === SHIP_CHAR) {
        return false
    }
    if (isHorizontalShip && (shipColumn + size - 1 >= boardColumns || gameBoard[shipLine][shipColumn + size - 1] === SHIP_CHAR)) {
        return false
    }
    if (!isHorizontalShip && (shipLine + size - 1 >= boardLines || gameBoard[shipLine + size - 1][shipColumn] === SHIP_CHAR)) {
        return false
    }
    return true
}

/**
 * @description place a given ship on the game board
 * @param shipLine ship's beginning line
 * @param shipColumn ships's beginning columns
 * @param isHorizontalShip boolean indicating if the ship is in the horizontal orientation
 * @param size ship's size
 * @param gameBoard board's current state
 * @returns updated game board with the new ship placed
 */
const putShipOnBoard = (shipLine, shipColumn, isHorizontalShip, size, gameBoard) => {
    if (isHorizontalShip) {
        for (let i = 0; i < size; i++) {
            gameBoard[shipLine][shipColumn + i] = SHIP_CHAR
        }
    } else {
        for (let i = 0; i < size; i++) {
            gameBoard[shipLine + i][shipColumn] = SHIP_CHAR
        }
    }
    return gameBoard
}

/**
 * @description generate an empty game board (all spaces are filled with ' ')
 * @param boardLines board's lines
 * @param boardColumns board's columns
 * @returns empty game board
 */
const createEmptyBoard = (boardLines, boardColumns) => {
    const gameBoard = []
    for (let i = 0; i < boardLines; i++) {
        gameBoard.push([...Array(boardColumns).fill(EMPTY_SPACE)])
    }
    return gameBoard
}

/**
 * @description determine witch ships will be placed on the game board
 * @param boardLines board's lines
 * @param boardColumns board's columns
 * @returns object with the list of ships to be placed and the number of units occupied by ships
 */
const defineShipsToUse = (boarsLines, boardColumns) => {
    const maxSpaces = boarsLines * boardColumns
    let spacesRemaining = 0
    const shipsToUse = SHIP_LIST.filter(item => {
        if (item > boardColumns || item > boarsLines) {
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

/**
 * @description fill the board with all the ships
 * @param boardLines board's lines
 * @param boardColumns board's columns
 * @param gameBoard board's current state 
 * @param shipsToUse list with all ships to be placed
 * @returns updated game board with all ships placed
 */
const fillBoard = (boardLines, boardColumns, gameBoard, shipsToUse) => {
    const shipAmount = shipsToUse.length
    for (let i = 0; i < shipAmount; i++) {
        let iterations = 0
        let positionInfo
        do {
            positionInfo = generateShipBeginning(boardLines, boardColumns)
            iterations++
        } while (!isValidBeginnig(...positionInfo, shipsToUse[i], boardLines, boardColumns, gameBoard) && iterations < 5)

        if (iterations < 5) {
            gameBoard = putShipOnBoard(...positionInfo, shipsToUse[i], gameBoard)
        }
    }
    return gameBoard
}

/**
 * @description set all initial data needed
 * @param boardLines board's lines
 * @param boardColumns board's columns
 * @returns an object with the game board filled with ships, 
 * the units occupied with ships and the initial game stats
 */
export const startGame = (boardLines, boardColumns) => {
    let gameBoard = createEmptyBoard(boardLines, boardColumns)
    const ShipInfo = defineShipsToUse(boardLines, boardColumns)
    const shipsToUse = ShipInfo.ships
    const gameStatsData = { ...INITIAL_GAME_STATS }
    gameBoard = fillBoard(boardLines, boardColumns, gameBoard, shipsToUse)
    return { board: gameBoard, spacesLeft: ShipInfo.spacesLeft, gameStats: gameStatsData }
}

/**
 * @description make a shoot on the board
 * @param position position to be attacked
 * @param spacesRemaining current ships that are not hit
 * @param gameBoard board's current state
 * @param gameStatsData current game stats
 * @returns an object with the updated game board, 
 * the units occupied with ships not hit, a boolean 
 * indicating if a ship was hit and the updated game stats
 */
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