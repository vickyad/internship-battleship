import React from "react"
import Button from "../button"
import styled from "styled-components"

const StyledH2 = styled.h2`
color: #94C973;
font-size: 1.5rem;
`

const StyledDiv = styled.div`
width: 90vw;
margin: 0 auto;
padding: 5rem 0;
`

const RestartDialog = ({ handleRestart }) => {
    return (
        <StyledDiv>
            <StyledH2>Navios inimigos derrubados com êxito</StyledH2>
            <Button onClick={handleRestart} buttonText="Reiniciar o jogo" />
        </StyledDiv>
    )
}
export default RestartDialog