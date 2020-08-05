import React, { useState } from 'react'
import './App.css'
import QuizCard from './components/QuizCard'
import QuizSummary from './components/QuizSummary'
import { QuestionCatalogue, fetchData, Difficulty } from './api'
import Popup from 'reactjs-popup'

const totalQuestions = 10

export type Answer = {
  question: string
  answer: string
  correct: boolean
  correct_answer: string
}

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionCatalogue[]>([])
  const [questionNumber, setQuestionNumber] = useState(0)
  const [answerUser, setAnswerUser] = useState<Answer[]>([])
  const [quizEnd, setQuizEnd] = useState(true)
  const [quizScore, setQuizScore] = useState(0)

  const startQuiz = async () => {
    setLoading(true)
    setQuizEnd(false)
    setQuizScore(0)

    const quizQuestions = await fetchData(totalQuestions, Difficulty.MEDIUM)

    setQuestions(quizQuestions)
    setQuestionNumber(0)
    setQuizScore(0)
    setLoading(false)
    setAnswerUser([])
  }

  const checkAnswerOfUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!quizEnd) {
      // check answer of user
      const userAnswer = e.currentTarget.value
      const correct = questions[questionNumber].correct_answer === userAnswer

      //set score for correct answer
      if (correct) {
        setQuizScore((prev) => prev + 1)
      }
      //store answer of user
      const Answer = {
        question: questions[questionNumber].question,
        answer: userAnswer,
        correct,
        correct_answer: questions[questionNumber].correct_answer,
      }

      setAnswerUser((prev) => [...prev, Answer])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1

    if (questionNumber === totalQuestions) {
      setQuizEnd(true)
      setQuizScore(quizScore)
    } else {
      setQuestionNumber(nextQuestion)
    }
  }

  return (
    <>
      <div className="App">
        <h1 className="heading">Quiz</h1>
        <h4 className="sub-heading">Test your general knowledge!</h4>
        {questionNumber === 0 || questionNumber === totalQuestions ? (
          <button className="btn" id="start" onClick={startQuiz}>
            Start Quiz
          </button>
        ) : null}
        <p className="quiz-score">Your score: {quizScore}</p>
        {loading ? <div className="loader">Loading...</div> : null}
        {!loading && !quizEnd && (
          <QuizCard
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            userAnswer={answerUser ? answerUser[questionNumber] : undefined}
            questionNumber={questionNumber + 1}
            totalQuestions={totalQuestions}
            callback={checkAnswerOfUser}
          />
        )}
        {!loading &&
        !quizEnd &&
        answerUser.length === questionNumber + 1 &&
        questionNumber !== totalQuestions - 1 ? (
          <button className="btn" id="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
        {questionNumber !== 0 && questionNumber === totalQuestions - 1 ? (
          <Popup
            className="popup"
            trigger={
              <button className="btn" id="score">
                View your quiz score
              </button>
            }
            modal
          >
            <QuizSummary summary={answerUser} score={quizScore} />
          </Popup>
        ) : null}
      </div>
    </>
  )
}

export default App
