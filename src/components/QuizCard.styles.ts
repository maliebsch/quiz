import styled from 'styled-components'

type ButtonWrapperProps = {
    correct: boolean,
    clicked: boolean
}
export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 0.3s ease;

    .quiz-button {
        background: ${({ correct, clicked }) =>
        correct ? 'linear-gradient(90deg, #56ffa4, #59bc86)'
            : !correct && clicked
                ? 'linear-gradient(90deg, #ff5656, #c16868)'
                : 'linear-gradient(90deg, #56ccff, #c6eafb4)'
    }}
`;