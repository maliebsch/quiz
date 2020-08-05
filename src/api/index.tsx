import { shuffleArray } from '../Utils'

export type Question = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export type QuestionCatalogue = Question & { answers: string[] }

export enum Difficulty {
  'EASY' = 'easy',
  'MEDIUM' = 'medium',
  'HARD' = 'hard',
}

export const fetchData = async (
  amount: number,
  difficulty: Difficulty,
): Promise<QuestionCatalogue[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=9&type=multiple`

  const data = await (await fetch(endpoint)).json()
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      question.correct_answer,
      ...question.incorrect_answers,
    ]),
  }))
}
