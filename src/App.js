import React, { useState } from "react"
import styled from "styled-components"
import Board from "./components/Board"
import Button from "./components/Button"
import Input from "./components/Input"
import RestartDialog from "./components/RestartDialog"
import StatsDisplay from "./components/StatsDisplay"
import StartDialog from "./components/StartDialog"
import { startGame, shoot, gameStats } from './engine/engine'
import './App.css'

const StyledWrapper = styled.div`
    padding: 2rem 0;
    text-align: center;
`

const StyledInputWrapper = styled.div`
    align-items: flex-end;
    justify-content: center;
    display: flex;
    padding: 0.5rem;
`

const StyledH1 = styled.h1`
    color: #94C973;
    font-size: 2.2rem;
    padding: 0.5rem 0;
`

const StyledSpan = styled.span`
    color: #f5f5f5;
    font-weight: 700;
    height: 1rem;
`

const StyledMainGameContainer = styled.div`
    @media (min-width: 1024px) {
        .main-game {
            padding: 2rem 0;
            display: flex;
            flex-direction: row-reverse;
            align-items: flex-start;
        }
    }
`

const gameStatus = {
  SETUP: 0,
  PLAYING: 1,
  ENDED: 2
}

const App = () => {
  const [currentGameStatus, setCurrentGameStatus] = useState(gameStatus.SETUP)
  const [inputValue, setInputValue] = useState("")
  const [messageDisplayer, setMessageDisplayer] = useState("")
  const [gameBoard, setGameBoard] = useState(null)
  const [gameStatsData, setGameStatsData] = useState(null)
  const [lineInput, setLineInput] = useState("")
  const [columnInput, setColumnInput] = useState("")

  const isValidNumberInput = (input) => {
    if (parseInt(input) < 2 || parseInt(input) > 20) {
      return false
    }
    return true
  }

  const isValidAttackInput = () => {
    if (inputValue.length !== 2) {
      return false
    }
    if (inputValue[0].toUpperCase() < 'A' || inputValue[0].toUpperCase() > String.fromCharCode(parseInt(lineInput) + 64)) {
      return false
    }
    if (inputValue[1] < '0' || inputValue[1] > columnInput) {
      return false
    }
    return true
  }

  const handleAttack = () => {
    if (isValidAttackInput()) {
      const data = shoot(inputValue)
      setGameBoard(data[0])
      setInputValue("")

      setMessageDisplayer(`${data[2] ? 'Alvo inimigo foi atingido' : 'O míssel caiu no mar'}`)

      if (!data[1]) {
        setCurrentGameStatus(gameStatus.ENDED)
      }
      setGameStatsData(gameStats())
    } else {
      setMessageDisplayer(`Entrada inválida. A posição deve estar no formato [letra (A-${String.fromCharCode(parseInt(lineInput) + 64)})][número(1 - ${columnInput})]`)
    }
  }

  const handleGameStart = () => {
    if (isValidNumberInput(lineInput) && isValidNumberInput(columnInput)) {
      setCurrentGameStatus(gameStatus.PLAYING)
      setGameBoard(startGame(parseInt(lineInput), parseInt(columnInput)))
      setGameStatsData(gameStats())
    } else {
      setMessageDisplayer("Por favor, insira um valor entre 2 e 20 para linhas e colunas")
    }
  }

  const handleRestart = () => {
    setCurrentGameStatus(gameStatus.SETUP)
    setGameBoard(startGame(parseInt(lineInput), parseInt(columnInput)))
  }

  return (
    <>
      {currentGameStatus === gameStatus.SETUP ?
        <StartDialog handleStart={() => handleGameStart()} lineValue={lineInput} handleLineChange={(event) => setLineInput(event.target.value)} columnValue={columnInput} handleColumnChange={(event) => setColumnInput(event.target.value)} errorMessage={messageDisplayer} />
        :
        currentGameStatus === gameStatus.ENDED ?
          <RestartDialog handleRestart={() => handleRestart()} />
          :
          <>
            <StyledWrapper>
              <StyledH1>Batalha Naval</StyledH1>
              <StyledMainGameContainer>
                {gameStatsData ? <StatsDisplay gameStats={gameStatsData} /> : <></>}
                <StyledInputWrapper>
                  <Input inputText="Posição a ser atacada:" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                  <Button onClick={() => handleAttack()} buttonText="Atacar" />
                </StyledInputWrapper>
                <Board gameBoard={gameBoard} gameBoardColumns={parseInt(columnInput)} />
                <StyledSpan>{messageDisplayer}</StyledSpan>
              </StyledMainGameContainer>
            </StyledWrapper>
          </>
      }
    </>
  )
}
export default App
