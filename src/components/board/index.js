import React from "react"
import styled from "styled-components"

const StyledBoard = styled.div`
    display: grid;
    margin: 0 auto;
    width: 90vmin;
`

const StyledItem = styled.div`
    align-items: center;
    background: #121212;
    border-width: 2px;
    border-style: outset;
    color: #94C973;
    display: flex;
    font-weight: bold;
    justify-content: center;
`

const StyledIndex = styled.div`
    align-items: center;
    color: #f5f5f5;
    display: flex;
    font-weight: bold;
    justify-content: center;
`

const Board = ({ gameBoard, gameBoardColumns }) => {
    return (
        <StyledBoard style={{ gridTemplateColumns: `repeat(${gameBoardColumns + 1}, 1fr)` }}>
            <span></span>
            {[...Array(gameBoardColumns).keys()].map((item, index) => <StyledIndex style={{ height: `calc(90vmin / ${gameBoardColumns + 1})`, width: `calc(90vmin / ${gameBoardColumns + 1})` }} key={`header-index_${index}`}>{item + 1}</StyledIndex>)}
            {gameBoard ?
                gameBoard.map((array, arrayIndex) => {
                    return (
                        <>
                            <StyledIndex style={{ height: `calc(90vmin / ${gameBoardColumns + 1})`, width: `calc(90vmin / ${gameBoardColumns + 1})` }} key={`lateral-index_${arrayIndex}`}>{String.fromCharCode(arrayIndex + 65)}</StyledIndex>
                            {array.map((item, itemIndex) => <StyledItem style={{ height: `calc(90vmin / ${gameBoardColumns + 1})`, width: `calc(90vmin / ${gameBoardColumns + 1})` }} key={`game-table_${arrayIndex}${itemIndex}`}>{item === 'S' ? ' ' : item}</StyledItem>)}
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