export interface QuizType {
  id: string;
  quiz: Array<Quiz> | string;
  created_at: string;
}

type Quiz = {
  topic: string;
  questions: Array<Question>;
};

export type QuizRecord = {
  id: string;
  uid: string;
  quiz: Quiz;
  history: Array<any>;
  created_at: string;
};

export type Question = {
  answer: string;
  question: string;
  weightage: number;
  options: Array<string>;
  difficulty: Difficulty;
};

type Difficulty = "easy" | "medium" | "hard";
