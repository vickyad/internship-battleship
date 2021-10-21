import React from "react"
import styled from "styled-components"

const StyledStatsDisplay = styled.div`
    background: #5D7E48;
    font-weight: 600;
    padding: 0.5rem 0;
`

const StyledHitNMisses = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 0.3rem;
`

const StatsDisplay = ({ gameStats }) => {
    return (
        <StyledStatsDisplay>
            <span>Turno: {gameStats.turns}</span>
            <StyledHitNMisses>
                <span>Mísseis acertados: {gameStats.hits}</span>
                <span>Mísseis errados: {gameStats.misses}</span>
            </StyledHitNMisses>
        </StyledStatsDisplay>
    )

}
export default StatsDisplay