import React from "react"
import styled from "styled-components"

const StatsDisplayWrapper = styled.div`
    background: #5D7E48;
    font-weight: 600;
    padding: 0.5rem 0;
    margin-top: 1.5rem;
`

const HitNMisses = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 0.3rem;
`

const StatsDisplay = ({ gameStats }) => {
    return (
        <StatsDisplayWrapper>
            <span>Turno: {gameStats.turns}</span>
            <HitNMisses>
                <span>Mísseis acertados: {gameStats.hits}</span>
                <span>Mísseis errados: {gameStats.misses}</span>
            </HitNMisses>
        </StatsDisplayWrapper>
    )

}
export default StatsDisplay