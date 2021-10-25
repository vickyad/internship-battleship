import styled from "styled-components"

const StyledInputWrapper = styled.div`
    display: flex;
    align-items: center;
`

const StyledInput = styled.input`
    margin-right: 0.5rem;
`

const SyledLabel = styled.label`
    font-size: 1.1rem;
`

const Checkbox = ({ labelText, isChecked, onChange }) => {
    return (
        <StyledInputWrapper>
            <StyledInput type="checkbox" defaultChecked={isChecked} onChange={onChange} />
            <SyledLabel>{labelText}</SyledLabel>
        </StyledInputWrapper>
    )
}
export default Checkbox