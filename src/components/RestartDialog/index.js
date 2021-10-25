import React from "react"
import Button from "../Button"
import styled from "styled-components"

const DialogWrapper = styled.div`
    width: 90vw;
    margin: 0 auto;
    padding: 5rem 0;
    text-align: center;

    .game-results {
        color: #94C973;
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
`

const RestartDialog = ({ handleRestart, twoPlayers, P1Wins }) => {
    return (
        <DialogWrapper>
            <h2 className="game-results">
                {twoPlayers ?
                    `O jogador ${P1Wins ? '1' : '2'} foi o primeiro a derrubar os navios inimigos`
                    :
                    'Navios inimigos derrubados com êxito'
                }
            </h2>
            <Button onClick={handleRestart} buttonText="Reiniciar o jogo" />
        </DialogWrapper>
    )
}
export default RestartDialog