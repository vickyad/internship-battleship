import React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
background: #94C973;
color: #FDFDFD;
font-size: 1.1rem;
padding: 0.3rem 1.2rem;
height: 3rem;
`

const Button = ({ onClick, buttonText }) => {
    return (
        <StyledButton onClick={onClick}>{buttonText}</StyledButton>
    )

}
export default Button