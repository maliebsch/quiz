import React from 'react'
import { Answer } from '../App'
import { SumWrapper } from './QuizSummary.styles'

type Props = {
  summary: Answer[]
  score: number
}

const QuizSummary: React.FC<Props> = ({ summary, score }) => {
  return (
    <div className="quiz-summary">
      <h4>
        Congratulations, you solved {score} /20 questions. Please see a summary
        of you answers below:
      </h4>
      <ul className="answers-list">
        {summary.map((sum) => {
          return (
            <SumWrapper correct={sum.correct}>
              <li className="sum">
                <p
                  className="question"
                  dangerouslySetInnerHTML={{ __html: sum.question }}
                ></p>
                <p
                  className="answer"
                  dangerouslySetInnerHTML={{ __html: sum.answer }}
                ></p>
              </li>
            </SumWrapper>
          )
        })}
      </ul>
      <button
        className="btn"
        id="close"
        onClick={() => window.location.reload(false)}
      >
        Close
      </button>
    </div>
  )
}

export default QuizSummary
