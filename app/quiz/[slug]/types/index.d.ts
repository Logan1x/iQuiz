import { Question, QuizRecord } from "@/types/quiz";

export interface QuizPlayReducerState {
  loading: boolean;
  activeQuestionIndex: number;
  userResponses: Array<string>;
  quizRecord: QuizRecord | null;
}

export type QuizPlayReducerAction =
  | { type: "TOGGLE_LOADER" }
  | { type: "SET_QUIZ_RECORD"; payload: QuizRecord }
  | { type: "NEXT_QUESTION" }
  | { type: "PREV_QUESTION" }
  | {
      type: "SET_USER_ANSWER";
      payload: { index: number; answer: string };
    }
  | {
      type: "SET_USER_SCORE";
      payload: { questions: Array<Question>; userResponses: Array<string> };
    };
