import styled from "styled-components"

const InputWrapper = styled.div`
    display: flex;
    align-items: center;

    input {
        margin-right: 0.5rem;
    }

    label {
        font-size: 1.1rem;
    }
`

const Checkbox = ({ labelText, isChecked, onChange }) => {
    return (
        <InputWrapper>
            <input type="checkbox" defaultChecked={isChecked} onChange={onChange} />
            <label>{labelText}</label>
        </InputWrapper>
    )
}
export default Checkbox