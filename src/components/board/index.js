import React from "react"
import styled from "styled-components"

const Board = styled.div`
    display: grid;
    margin: 0 auto;
    width: 90vmin;
    grid-template-columns: repeat(${props => props.boardColumns}, 1fr)
`

const BoardElement = styled.div`
    align-items: center;
    display: flex;
    font-weight: bold;
    justify-content: center;
    align-self: center;
    height: 3rem;
`

const BoardContent = styled(BoardElement)`
    background: ${props => props.secondPlayer ? '#232F1B' : '#121212'};
    border-width: 2px;
    border-style: outset;
    color: #94C973;
    height: calc(90vmin / ${props => props.boardColumns});
    width: calc(90vmin / ${props => props.boardColumns});
`

const GameBoard = ({ gameBoard, gameBoardColumns, secondPlayer }) => {

    return (
        <Board boardColumns={gameBoardColumns + 1}>
            <span></span>
            {[...Array(gameBoardColumns).keys()].map(
                (item, index) => <BoardElement key={`header-index_${index}`}>{item + 1}</BoardElement>
            )}
            {gameBoard && gameBoard.map((array, arrayIndex) => {
                return (
                    <>
                        <BoardElement>
                            {String.fromCharCode(arrayIndex + 65)}
                        </BoardElement>
                        {array.map(item => {
                            return <BoardContent
                                secondPlayer={secondPlayer}
                                boardColumns={gameBoardColumns + 1}
                            >
                                {item === 'S' ? ' ' : item}
                            </BoardContent>
                        })}
                    </>
                )
            })}
        </Board>
    )
}
export default GameBoard