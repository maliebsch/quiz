import styled from 'styled-components'

type SumProp = {
    correct: boolean;
}
export const SumWrapper = styled.div<SumProp>`
    .sum {
        background: ${({ correct }) =>
        correct ? 'linear-gradient(90deg, #56ffa4, #59bc86)' : 'linear-gradient(90deg, #ff5656, #c16868)'}
    }
`;