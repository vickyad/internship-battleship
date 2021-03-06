import styled from "styled-components"

const InputWrapper = styled.div`
    padding-right: 0.5rem;
    text-align: left;
    display: flex;
    flex-direction: column;

    input {
        background-color: #121212;
        color: #f5f5f5;
        font-size: 1.1rem;
        padding: 0.3rem 0.5rem;
    }

    label {
        margin: 0.3rem 0;
    }
`

const Input = ({ inputText, value, onChange }) => {
    return (
        <InputWrapper>
            <label>{inputText}</label>
            <input type="text" value={value} onChange={event => onChange(event)} />
        </InputWrapper>
    )
}
export default Input