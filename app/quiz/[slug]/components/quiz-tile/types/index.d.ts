import { Question } from "@/types/quiz";
import { QuizPlayReducerAction } from "../../../types";

export interface Props {
  topic: string;
  questions: Array<Question>;
  activeQuestionIndex: number;
  userResponses: Array<string>;
  quizPlayDispatch: Dispatch<QuizPlayReducerAction>;
}
