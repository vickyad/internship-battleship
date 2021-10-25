import styled from "styled-components"

const StyledInputWrapper = styled.div`
padding-right: 0.5rem;
text-align: left;
display: flex;
flex-direction: column;
`

const StyledInput = styled.input`
background-color: #121212;
color: #f5f5f5;
font-size: 1.1rem;
padding: 0.3rem 0.5rem;
`

const SyledLabel = styled.label`
margin: 0.3rem 0;
`

const Input = ({ inputText, value, onChange }) => {
    return (
        <StyledInputWrapper>
            <SyledLabel>{inputText}</SyledLabel>
            <StyledInput type="text" value={value} onChange={event => onChange(event)} />
        </StyledInputWrapper>
    )
}
export default Input