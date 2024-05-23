export interface QuizType {
  id: string;
  quizzes: Array<Quiz> | string;
  created_at: string;
}

type Quiz = {
  topic: string;
  questions: Array<Question>;
};

export type Question = {
  question: string;
  weightage: number;
  answer: string;
  options: Array<string>;
  difficulty: Difficulty;
};

type Difficulty = "easy" | "medium" | "hard";
