import React from 'react'
import { Answer } from '../App'
import { ButtonWrapper } from './QuizCard.styles'

export type Props = {
  question: string
  answers: string[]
  userAnswer: Answer | undefined
  questionNumber: number
  totalQuestions: number
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const QuizCard: React.FC<Props> = ({
  question,
  answers,
  userAnswer,
  totalQuestions,
  questionNumber,
  callback,
}) => {
  return (
    <div className="quiz-card">
      <h4
        className="quiz-question"
        dangerouslySetInnerHTML={{ __html: question }}
      ></h4>
      <div className="quiz-answers">
        {answers.map((answer) => {
          return (
            <ButtonWrapper
              key={answer}
              correct={userAnswer?.correct_answer === answer}
              clicked={userAnswer?.answer === answer}
            >
              <button
                className="btn quiz-button"
                value={answer}
                disabled={userAnswer ? true : false}
                onClick={callback}
                dangerouslySetInnerHTML={{ __html: answer }}
              ></button>
            </ButtonWrapper>
          )
        })}
      </div>
      <span className="question-count">
        {questionNumber} / {totalQuestions}
      </span>
    </div>
  )
}

export default QuizCard
