import React from "react"
import Button from "../Button"
import styled from "styled-components"

const StyledH2 = styled.h2`
color: #94C973;
font-size: 1.5rem;
`

const StyledDiv = styled.div`
width: 90vw;
margin: 0 auto;
padding: 5rem 0;
text-align: center;
`

const RestartDialog = ({ handleRestart, twoPlayers, P1Wins }) => {
    return (
        <StyledDiv>
            <StyledH2>
                {twoPlayers ?
                    `O jogador ${P1Wins ? '1' : '2'} foi o primeiro a derrubar os navios inimigos`
                    :
                    'Navios inimigos derrubados com êxito'
                }
            </StyledH2>
            <Button onClick={handleRestart} buttonText="Reiniciar o jogo" />
        </StyledDiv>
    )
}
export default RestartDialog