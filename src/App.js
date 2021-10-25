import React, { useState } from "react"
import styled from "styled-components"
import Board from "./components/Board"
import Button from "./components/Button"
import Input from "./components/Input"
import RestartDialog from "./components/RestartDialog"
import StatsDisplay from "./components/StatsDisplay"
import StartDialog from "./components/StartDialog"
import { startGame, shoot } from './engine/engine'
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

const StyledPlayerDisplay = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 1rem 0;
`

const gameStatus = {
  SETUP: 0,
  PLAYING: 1,
  ENDED: 2
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const App = () => {
  const [currentGameStatus, setCurrentGameStatus] = useState(gameStatus.SETUP)
  const [inputValue, setInputValue] = useState("")
  const [messageDisplayer, setMessageDisplayer] = useState("")
  const [gameBoardP1, setGameBoardP1] = useState(null)
  const [spacesRemainingP1, setSpacesRemainingP1] = useState(null)
  const [gameBoardP2, setGameBoardP2] = useState(null)
  const [spacesRemainingP2, setSpacesRemainingP2] = useState(null)
  const [gameStatsDataP1, setGameStatsDataP1] = useState(null)
  const [gameStatsDataP2, setGameStatsDataP2] = useState(null)
  const [lineInput, setLineInput] = useState(0)
  const [columnInput, setColumnInput] = useState(0)
  const [players, setPlayers] = useState(1)
  const [isP1Turn, setIsP1Turn] = useState(true)

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

  const handleAttack = async () => {
    if (isValidAttackInput()) {
      let data
      if (isP1Turn) {
        data = shoot(inputValue, spacesRemainingP1, gameBoardP1, gameStatsDataP1)
        setGameBoardP1(data.gameBoard)
        setSpacesRemainingP1(data.spacesRemainning)
        setGameStatsDataP1(data.gameStats)
      } else {
        data = shoot(inputValue, spacesRemainingP2, gameBoardP2, gameStatsDataP2)
        setGameBoardP2(data.gameBoard)
        setSpacesRemainingP2(data.spacesRemainning)
        setGameStatsDataP2(data.gameStats)
      }
      setInputValue("")

      setMessageDisplayer(`${data.isHit ? 'Alvo inimigo foi atingido' : 'O míssel caiu no mar'}`)

      if (!data.spacesRemainning) {
        setCurrentGameStatus(gameStatus.ENDED)
      }
      if (players === 2) {
        await sleep(3000)
        setIsP1Turn(!isP1Turn)
        setMessageDisplayer('')
      }
    } else {
      setMessageDisplayer(`Entrada inválida. A posição deve estar no formato [letra (A-${String.fromCharCode(parseInt(lineInput) + 64)})][número(1 - ${columnInput})]`)
    }
  }

  const handleGameStart = (lineAmount, columnAmount, playersAmount) => {
    setCurrentGameStatus(gameStatus.PLAYING)
    setPlayers(playersAmount)
    setLineInput(lineAmount)
    setColumnInput(columnAmount)
    const initialInfoP1 = startGame(lineAmount, columnAmount)
    setGameBoardP1(initialInfoP1.board)
    setSpacesRemainingP1(initialInfoP1.spacesLeft)
    setGameStatsDataP1(initialInfoP1.gameStats)
    if (playersAmount === 2) {
      const initialInfoP2 = startGame(lineAmount, columnAmount)
      setGameBoardP2(initialInfoP2.board)
      setSpacesRemainingP2(initialInfoP2.spacesLeft)
      setGameStatsDataP2(initialInfoP2.gameStats)
    }
  }

  const handleRestart = () => {
    setCurrentGameStatus(gameStatus.SETUP)
    setGameBoardP1(startGame(parseInt(lineInput), parseInt(columnInput)))
  }

  return (
    <>
      {currentGameStatus === gameStatus.SETUP ?
        <StartDialog handleStart={(lineAmount, columnAmount, playersAmount) => handleGameStart(lineAmount, columnAmount, playersAmount)} />
        :
        currentGameStatus === gameStatus.ENDED ?
          <RestartDialog handleRestart={() => handleRestart()} twoPlayers={players === 2 ? true : false} P1Wins={!isP1Turn} />
          :
          <>
            <StyledWrapper>
              <StyledH1>Batalha Naval</StyledH1>
              <StyledMainGameContainer>
                <StyledPlayerDisplay>Jogador {isP1Turn ? '1' : '2'}</StyledPlayerDisplay>
                <StyledInputWrapper>
                  <Input inputText="Escolha a posição a ser atacada:" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                  <Button onClick={() => handleAttack()} buttonText="Atacar" />
                </StyledInputWrapper>
                <StyledSpan>{messageDisplayer}</StyledSpan>
                {isP1Turn ?
                  <Board gameBoard={gameBoardP1} gameBoardColumns={columnInput} />
                  :
                  <Board secondPlayer gameBoard={gameBoardP2} gameBoardColumns={columnInput} />
                }
                {gameStatsDataP1 && isP1Turn ? <StatsDisplay gameStats={gameStatsDataP1} /> : gameStatsDataP2 ? <StatsDisplay gameStats={gameStatsDataP2} /> : <></>}
              </StyledMainGameContainer>
            </StyledWrapper>
          </>
      }
    </>
  )
}
export default App
