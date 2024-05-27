"use client";
import axios from "axios";
import { useGetUser } from "@/contexts/user";
import { useEffect, useReducer } from "react";
import { QuizTile } from "./components/quiz-tile";
import { initState, quizPlayReducer } from "./reducers/quiz-play-reducer";

const QuizPage = ({ params }: { params: { slug: string } }) => {
  const { user } = useGetUser();
  const [state, dispatch] = useReducer(quizPlayReducer, initState);

  const { loading, quizRecord, activeQuestionIndex, userResponses } = state;

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          dispatch({ type: "TOGGLE_LOADER" });
          const { data } = await axios.get(
            `/api/quizById?quizId=${params.slug}&uid=${user.id}`
          );
          const { id, created_at, history, quiz, uid } = data;
          const res = { id, created_at, history, quiz: JSON.parse(quiz), uid };
          dispatch({ type: "SET_QUIZ_RECORD", payload: res });
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [user, params.slug]);

  if (loading && !quizRecord) return <div>Loading...</div>;

  if (quizRecord) {
    const {
      quiz: { topic, questions },
    } = quizRecord;

    const quizTileProps = {
      topic,
      questions,
      activeQuestionIndex,
      quizPlayDispatch: dispatch,
      userResponses,
    };
    console.log({ state });
    return (
      <div className="flex mt-6 justify-center p-24 ">
        <QuizTile {...quizTileProps} />
      </div>
    );
  }

  return null;
};

export default QuizPage;
