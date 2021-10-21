import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Board from "../board"
import Button from "../button"
import Input from "../input"
import RestartDialog from "../dialog"
import { startGame, shoot, gameStats } from '../../engine/engine'
import StatsDisplay from "../stats_display"

const StyledWrapper = styled.div`
    padding: 2rem 0;
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

const Game = () => {
    const [currentGameStatus, setCurrentGameStatus] = useState(gameStatus.SETUP)
    const [inputValue, setInputValue] = useState("")
    const [messageDisplayer, setMessageDisplayer] = useState("")
    const [restartGame, setRestartGame] = useState(false)
    const [gameBoard, setGameBoard] = useState(null)
    const [gameStatsData, setGameStatsData] = useState(null)

    useEffect(() => {
        setGameBoard(startGame())
        setGameStatsData(gameStats())
    }, [])

    const isValidInput = () => {
        if (inputValue.length !== 2) {
            return false
        }
        if (!inputValue[0].match(/[a-jA-J]/)) {
            return false
        }
        if (!inputValue[1].match(/[0-9]/)) {
            return false
        }
        return true
    }

    const handleAttack = () => {
        if (isValidInput()) {
            const data = shoot(inputValue)
            setGameBoard(data[0])
            setInputValue("")

            setMessageDisplayer(`${data[2] ? 'Alvo inimigo foi atingido' : 'O míssel caiu no mar'}`)

            if (!data[1]) {
                setRestartGame(true)
            }

            let obj = gameStats()
            console.log(obj)
            setGameStatsData(gameStats())
        } else {
            setMessageDisplayer("Entrada inválida. A posição deve estar no formato [letra (A-J)][número(1-10)]")
        }
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleRestart = () => {
        setRestartGame(false)
        setGameBoard(startGame())
    }

    return (
        <>
            {currentGameStatus === gameStatus.SETUP ?
                <Button onClick={() => setCurrentGameStatus(gameStatus.PLAYING)} buttonText="" />
                :
                <></>
            }
            {restartGame ?
                <RestartDialog handleRestart={() => handleRestart()} />
                :
                <StyledWrapper>
                    <StyledH1>Batalha Naval</StyledH1>
                    <StyledMainGameContainer>
                        {gameStatsData ? <StatsDisplay gameStats={gameStatsData} /> : <></>}
                        <StyledInputWrapper>
                            <Input inputText="Posição a ser atacada:" value={inputValue} onChange={event => handleInputChange(event)} />
                            <Button onClick={() => handleAttack()} buttonText="Atacar" />
                        </StyledInputWrapper>
                        <Board gameBoard={gameBoard} />
                        <StyledSpan>{messageDisplayer}</StyledSpan>
                    </StyledMainGameContainer>
                </StyledWrapper>
            }
        </>
    )
}
export default Game