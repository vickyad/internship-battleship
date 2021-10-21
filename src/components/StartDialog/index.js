import React from "react"
import Button from "../Button"
import Input from "../Input"
import styled from "styled-components"

const StyledDiv = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 60vh;
    justify-content: space-evenly;
    margin: 0 auto;
    width: 90vw;
`

const StyledSpan = styled.span`
    color: #f5f5f5;
    font-weight: 700;
`

const StartDialog = ({ handleStart, lineValue, handleLineChange, columnValue, handleColumnChange, errorMessage }) => {
    return (
        <StyledDiv>
            <Input inputText="Informe o número de linhas: " value={lineValue} onChange={handleLineChange} />
            <Input inputText="Informe o número de colunas: " value={columnValue} onChange={handleColumnChange} />
            <StyledSpan>{errorMessage}</StyledSpan>
            <Button onClick={handleStart} buttonText="Iniciar o jogo" />
        </StyledDiv>
    )
}
export default StartDialog