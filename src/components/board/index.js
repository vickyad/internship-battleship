import React from "react"
import styled from "styled-components"

const StyledBoard = styled.div`
    display: grid;
    margin: 0 auto;
    width: 90vmin;
`

const StyledIndex = styled.div`
    align-items: center;
    display: flex;
    font-weight: bold;
    justify-content: center;
    height: 3rem;
    align-self: center;
`

const StyledItem = styled.div`
    align-items: center;
    background: ${props => props.secondPlayer ? '#232F1B' : '#121212'};
    border-width: 2px;
    border-style: outset;
    color: #94C973;
    display: flex;
    font-weight: bold;
    justify-content: center;
    height: calc(90vmin / ${props => props.gameBoardColumns});
    width: calc(90vmin / ${props => props.gameBoardColumns});
`

const Board = ({ gameBoard, gameBoardColumns, secondPlayer }) => {

    return (
        <StyledBoard style={{ gridTemplateColumns: `repeat(${gameBoardColumns + 1}, 1fr)` }}>
            <span></span>
            {[...Array(gameBoardColumns).keys()].map((item, index) => <StyledIndex key={`header-index_${index}`}>{item + 1}</StyledIndex>)}
            {gameBoard ?
                gameBoard.map((array, arrayIndex) => {
                    return (
                        <>
                            <StyledIndex>{String.fromCharCode(arrayIndex + 65)}</StyledIndex>
                            {array.map(item => <StyledItem secondPlayer={secondPlayer} gameBoardColumns={gameBoardColumns + 1}>{item === 'S' ? ' ' : item}</StyledItem>)}
                        </>
                    )
                })
                :
                <></>
            }
        </StyledBoard>
    )
}
export default Board