import React, { useState } from "react"
import Button from "../Button"
import Input from "../Input"
import styled from "styled-components"
import Checkbox from "../Checkbox"

const DialogWrapper = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    height: 60vh;
    justify-content: space-evenly;
    margin: 0 auto;
    width: 90vw;

    .error-messages {
        color: #f5f5f5;
        font-weight: 700;
    }
`

const StartDialog = ({ handleStart }) => {
    const [lineInput, setLineInput] = useState('')
    const [columnInput, setColumnInput] = useState('')
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const isValidNumberInput = (input) => {
        if (isNaN(input)) {
            return false
        }
        if (input < 2 || input > 20) {
            return false
        }
        return true
    }

    const handleButtonClick = () => {
        const linesAmount = parseInt(lineInput)
        const columnsAmount = parseInt(columnInput)
        const playersAmount = isCheckboxChecked ? 2 : 1

        if (isValidNumberInput(linesAmount) && isValidNumberInput(columnsAmount)) {
            handleStart(linesAmount, columnsAmount, playersAmount)
        } else {
            setErrorMessage('Por favor, insira um valor entre 2 e 20 para linhas e colunas')
        }
    }

    return (
        <DialogWrapper>
            <Input inputText="Informe o número de linhas:" value={lineInput} onChange={event => setLineInput(event.target.value)} />
            <Input inputText="Informe o número de colunas:" value={columnInput} onChange={event => setColumnInput(event.target.value)} />
            <Checkbox labelText="2 jogadores" isChecked={isCheckboxChecked} onChange={() => setIsCheckboxChecked(!isCheckboxChecked)} />
            <span className="error-messages">{errorMessage}</span>
            <Button onClick={() => handleButtonClick()} buttonText="Iniciar o jogo" />
        </DialogWrapper>
    )
}
export default StartDialog