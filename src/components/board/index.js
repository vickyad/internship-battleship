import React from "react"
import styled from "styled-components"

const StyledBoard = styled.div`
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    height: 90vmin;
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
    height: calc(90vmin / 9);
    justify-content: center;
    width: calc(90vmin / 9);
`

const StyledIndex = styled.div`
    align-items: center;
    color: #f5f5f5;
    display: flex;
    font-weight: bold;
    height: calc(90vmin / 9);
    justify-content: center;
    width: calc(90vmin / 9);
`

const Board = ({ gameBoard }) => {
    return (
        <StyledBoard>
            <span></span>
            {[...Array(8).keys()].map((item, index) => <StyledIndex key={`header-index_${index}`}>{item + 1}</StyledIndex>)}
            {gameBoard ?
                gameBoard.map((array, arrayIndex) => {
                    return (
                        <>
                            <StyledIndex key={`lateral-index_${arrayIndex}`}>{String.fromCharCode(arrayIndex + 65)}</StyledIndex>
                            {array.map((item, itemIndex) => <StyledItem key={`game-table_${arrayIndex}${itemIndex}`}>{item === 'S' ? ' ' : item}</StyledItem>)}
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