import { QuizPlayReducerAction, QuizPlayReducerState } from "../../types";

const initState = {
  score: 0,
  loading: false,
  quizRecord: null,
  userResponses: [],
  activeQuestionIndex: 0,
};

const quizPlayReducer = (
  state: QuizPlayReducerState,
  action: QuizPlayReducerAction
) => {
  switch (action.type) {
    case "TOGGLE_LOADER":
      return { ...state, loading: !state.loading };
    case "SET_QUIZ_RECORD":
      return { ...state, loading: false, quizRecord: action.payload };
    case "PREV_QUESTION":
      return { ...state, activeQuestionIndex: state.activeQuestionIndex - 1 };
    case "NEXT_QUESTION":
      return { ...state, activeQuestionIndex: state.activeQuestionIndex + 1 };
    case "SET_USER_ANSWER":
      const newAnswers = [...state.userResponses];
      newAnswers[action.payload.index] = action.payload.answer;
      return { ...state, userResponses: newAnswers };
    case "SET_USER_SCORE":
      const { userResponses, questions } = action.payload;
      const score = questions.reduce((prev, curr, _) => {
        const { answer, weightage } = curr;
        console.log({ prev, curr });
        if (answer === userResponses[_]) {
          return Number(prev) + Number(weightage);
        }
        return prev;
      }, 0);
      return { ...state, score };
    default:
      return state;
  }
};

export { initState, quizPlayReducer };
